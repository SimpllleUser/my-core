export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpError =
  | { kind: 'network'; message: string }
  | { kind: 'http'; status: number; statusText: string; data: unknown }
  | { kind: 'timeout' }
  | { kind: 'abort' };

export interface HttpRequestConfig<D = any> {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  data?: D;
  responseType?: 'json' | 'text' | 'blob';
  transformResponse?: (data: any) => any;
  signal?: AbortSignal;
  timeout?: number;
  retry?: number;
  retryDelay?: number;
}

export interface HttpClientConfig {
  baseURL?: string;
  headers?: Record<string, string>;
  timeout?: number;
  retry?: number;
  retryDelay?: number;
}

type InterceptorFulfilled<T> = (value: T) => T | Promise<T>;
type InterceptorRejected = (error: unknown) => unknown;

class InterceptorManager<T> {
  private handlers: Array<{ onFulfilled?: InterceptorFulfilled<T>; onRejected?: InterceptorRejected } | null> = [];

  use(onFulfilled?: InterceptorFulfilled<T>, onRejected?: InterceptorRejected): number {
    this.handlers.push({ onFulfilled, onRejected });
    return this.handlers.length - 1;
  }

  eject(id: number): void {
    this.handlers[id] = null;
  }

  getActive() {
    return this.handlers.filter(Boolean) as Array<{
      onFulfilled?: InterceptorFulfilled<T>;
      onRejected?: InterceptorRejected;
    }>;
  }
}

function buildQuery(params?: Record<string, string | number | boolean>): string {
  if (!params) return '';
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  }
  const qs = searchParams.toString();
  return qs ? `?${qs}` : '';
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function isRetryable(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const e = error as HttpError;
  return e.kind === 'network' || e.kind === 'timeout' || (e.kind === 'http' && e.status >= 500);
}

export function createHttpClient(clientConfig: HttpClientConfig = {}) {
  const {
    baseURL = '',
    headers: defaultHeaders = {},
    timeout: defaultTimeout,
    retry: defaultRetry = 0,
    retryDelay: defaultRetryDelay = 1000,
  } = clientConfig;

  const interceptors = {
    request: new InterceptorManager<HttpRequestConfig>(),
    response: new InterceptorManager<any>(),
  };

  async function request<T = any, D = any>(
    method: HttpMethod,
    url: string,
    config: HttpRequestConfig<D> = {}
  ): Promise<T> {
    let resolvedConfig: HttpRequestConfig<D> = { ...config };
    for (const { onFulfilled, onRejected } of interceptors.request.getActive()) {
      try {
        if (onFulfilled) resolvedConfig = await onFulfilled(resolvedConfig);
      } catch (err) {
        if (onRejected) resolvedConfig = (await onRejected(err)) as HttpRequestConfig<D>;
        else throw err;
      }
    }

    const {
      headers = {},
      params,
      data,
      responseType = 'json',
      transformResponse,
      signal: externalSignal,
      timeout = defaultTimeout,
      retry = defaultRetry,
      retryDelay = defaultRetryDelay,
    } = resolvedConfig;

    const fullUrl = `${baseURL}${url}${buildQuery(params)}`;

    const mergedHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
      ...headers,
    };

    const fetchInit: RequestInit = { method, headers: mergedHeaders };
    if (data !== undefined && method !== 'GET') {
      fetchInit.body = JSON.stringify(data);
    }

    async function doFetch(): Promise<T> {
      let timeoutId: ReturnType<typeof setTimeout> | undefined;
      let controller: AbortController | undefined;
      let timedOut = false;
      let signal = externalSignal;

      if (timeout !== undefined) {
        controller = new AbortController();
        timeoutId = setTimeout(() => {
          timedOut = true;
          controller!.abort();
        }, timeout);

        if (externalSignal) {
          externalSignal.addEventListener('abort', () => controller!.abort(), { once: true });
        }
        signal = controller.signal;
      }

      try {
        const response = await fetch(fullUrl, { ...fetchInit, signal });

        const contentType = response.headers.get('content-type') ?? '';
        let parsedData: any;

        if (responseType === 'blob') {
          parsedData = await response.blob();
        } else if (responseType === 'text') {
          parsedData = await response.text();
        } else {
          parsedData = contentType.includes('application/json')
            ? await response.json()
            : await response.text();
        }

        if (!response.ok) {
          throw {
            kind: 'http',
            status: response.status,
            statusText: response.statusText,
            data: parsedData,
          } satisfies HttpError;
        }

        return transformResponse ? transformResponse(parsedData) : parsedData;
      } catch (err: any) {
        if (err?.kind) throw err;

        if (err?.name === 'AbortError') {
          throw (timedOut ? { kind: 'timeout' } : { kind: 'abort' }) satisfies HttpError;
        }

        throw { kind: 'network', message: err?.message ?? 'Network error' } satisfies HttpError;
      } finally {
        if (timeoutId) clearTimeout(timeoutId);
      }
    }

    for (let attempt = 0; attempt <= retry; attempt++) {
      if (attempt > 0) await sleep(retryDelay * attempt);

      try {
        let result = await doFetch();

        for (const { onFulfilled } of interceptors.response.getActive()) {
          if (onFulfilled) result = await onFulfilled(result);
        }

        return result as T;
      } catch (error) {
        let currentError = error;

        for (const { onRejected } of interceptors.response.getActive()) {
          if (onRejected) {
            try {
              return (await onRejected(currentError)) as T;
            } catch (interceptorError) {
              currentError = interceptorError;
            }
          }
        }

        if (attempt < retry && isRetryable(currentError)) continue;
        throw currentError;
      }
    }

    throw new Error('unreachable');
  }

  return {
    interceptors,
    get: <T = any>(url: string, config?: HttpRequestConfig): Promise<T> =>
      request<T>('GET', url, config),
    post: <T = any, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<T> =>
      request<T, D>('POST', url, { ...config, data }),
    put: <T = any, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<T> =>
      request<T, D>('PUT', url, { ...config, data }),
    patch: <T = any, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<T> =>
      request<T, D>('PATCH', url, { ...config, data }),
    delete: <T = any>(url: string, config?: HttpRequestConfig): Promise<T> =>
      request<T>('DELETE', url, config),
  };
}

export const http = createHttpClient({ baseURL: 'http://localhost:3000' });
