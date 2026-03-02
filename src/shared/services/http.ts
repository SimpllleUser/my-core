export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpError =
  | { kind: 'network'; message: string }
  | { kind: 'http'; status: number; statusText: string; data: unknown }
  | { kind: 'timeout' }
  | { kind: 'abort' };

export interface HttpResponseMeta<T> {
  data: T;
  status: number;
  headers: Headers;
}

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
  onRetry?: (attempt: number, error: unknown) => void;
  dedupe?: boolean;
}

export interface UploadConfig {
  headers?: Record<string, string>;
  onProgress?: (percent: number) => void;
  signal?: AbortSignal;
  timeout?: number;
}

export interface HttpClientConfig {
  baseURL?: string;
  headers?: Record<string, string>;
  timeout?: number;
  retry?: number;
  retryDelay?: number;
}

export function isHttpError(error: unknown): error is HttpError;
export function isHttpError<K extends HttpError['kind']>(error: unknown, kind: K): error is Extract<HttpError, { kind: K }>;
export function isHttpError(error: unknown, kind?: string): boolean {
  if (!error || typeof error !== 'object') return false;
  const e = error as Record<string, unknown>;
  if (typeof e['kind'] !== 'string') return false;
  const validKinds = ['network', 'http', 'timeout', 'abort'];
  return kind !== undefined ? e['kind'] === kind : validKinds.includes(e['kind'] as string);
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

  const pendingRequests = new Map<string, Promise<HttpResponseMeta<any>>>();

  async function request<T = any, D = any>(
    method: HttpMethod,
    url: string,
    config: HttpRequestConfig<D> = {}
  ): Promise<HttpResponseMeta<T>> {
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
      onRetry,
      dedupe = method === 'GET',
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

    async function doFetch(): Promise<HttpResponseMeta<T>> {
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

        const finalData = transformResponse ? transformResponse(parsedData) : parsedData;
        return { data: finalData, status: response.status, headers: response.headers };
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

    async function execute(): Promise<HttpResponseMeta<T>> {
      let lastError: unknown;

      for (let attempt = 0; attempt <= retry; attempt++) {
        if (attempt > 0) {
          onRetry?.(attempt, lastError);
          await sleep(retryDelay * attempt);
        }

        try {
          const meta = await doFetch();
          let result = meta.data;

          for (const { onFulfilled } of interceptors.response.getActive()) {
            if (onFulfilled) result = await onFulfilled(result);
          }

          return { ...meta, data: result };
        } catch (error) {
          let currentError = error;

          for (const { onRejected } of interceptors.response.getActive()) {
            if (onRejected) {
              try {
                const resolved = await onRejected(currentError);
                return { data: resolved as T, status: 0, headers: new Headers() };
              } catch (interceptorError) {
                currentError = interceptorError;
              }
            }
          }

          lastError = currentError;
          if (attempt < retry && isRetryable(currentError)) continue;
          throw currentError;
        }
      }

      throw new Error('unreachable');
    }

    if (dedupe) {
      const existing = pendingRequests.get(fullUrl);
      if (existing) return existing;
      const promise = execute();
      pendingRequests.set(fullUrl, promise);
      promise.finally(() => pendingRequests.delete(fullUrl));
      return promise;
    }

    return execute();
  }

  function upload<T = any>(url: string, formData: FormData, config: UploadConfig = {}): Promise<T> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${baseURL}${url}`);

      const uploadHeaders = { ...defaultHeaders, ...config.headers };
      for (const [key, value] of Object.entries(uploadHeaders)) {
        if (key.toLowerCase() !== 'content-type') {
          xhr.setRequestHeader(key, value);
        }
      }

      if (config.onProgress) {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            config.onProgress!(Math.round((e.loaded / e.total) * 100));
          }
        });
      }

      if (config.timeout) xhr.timeout = config.timeout;

      if (config.signal) {
        config.signal.addEventListener('abort', () => xhr.abort(), { once: true });
      }

      xhr.onload = () => {
        const contentType = xhr.getResponseHeader('content-type') ?? '';
        let data: any;
        try {
          data = contentType.includes('application/json') ? JSON.parse(xhr.responseText) : xhr.responseText;
        } catch {
          data = xhr.responseText;
        }

        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(data);
        } else {
          reject({ kind: 'http', status: xhr.status, statusText: xhr.statusText, data } satisfies HttpError);
        }
      };

      xhr.onerror = () => reject({ kind: 'network', message: 'Upload failed' } satisfies HttpError);
      xhr.ontimeout = () => reject({ kind: 'timeout' } satisfies HttpError);
      xhr.onabort = () => reject({ kind: 'abort' } satisfies HttpError);

      xhr.send(formData);
    });
  }

  return {
    interceptors,
    upload,
    get: <T>(url: string, config?: HttpRequestConfig): Promise<T> =>
      request<T>('GET', url, config).then(r => r.data),
    post: <T, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<T> =>
      request<T, D>('POST', url, { ...config, data }).then(r => r.data),
    put: <T, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<T> =>
      request<T, D>('PUT', url, { ...config, data }).then(r => r.data),
    patch: <T, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<T> =>
      request<T, D>('PATCH', url, { ...config, data }).then(r => r.data),
    delete: <T>(url: string, config?: HttpRequestConfig): Promise<T> =>
      request<T>('DELETE', url, config).then(r => r.data),
    raw: {
      get: <T>(url: string, config?: HttpRequestConfig): Promise<HttpResponseMeta<T>> =>
        request<T>('GET', url, config),
      post: <T, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<HttpResponseMeta<T>> =>
        request<T, D>('POST', url, { ...config, data }),
      put: <T, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<HttpResponseMeta<T>> =>
        request<T, D>('PUT', url, { ...config, data }),
      patch: <T, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<HttpResponseMeta<T>> =>
        request<T, D>('PATCH', url, { ...config, data }),
      delete: <T>(url: string, config?: HttpRequestConfig): Promise<HttpResponseMeta<T>> =>
        request<T>('DELETE', url, config),
    },
  };
}

export const http = createHttpClient({ baseURL: 'http://localhost:3000' });

/*
 * ─── Usage Examples ──────────────────────────────────────────────────────────
 *
 * 1. Basic requests
 *
 *   interface User { id: number; name: string }
 *
 *   const user   = await http.get<User>('/users/1');
 *   const created = await http.post<User>('/users', { name: 'Alice' });
 *   const updated  = await http.put<User>('/users/1', { name: 'Bob' });
 *   const patched  = await http.patch<User>('/users/1', { name: 'Charlie' });
 *   await http.delete('/users/1');
 *
 * 2. Query params
 *
 *   const users = await http.get<User[]>('/users', { params: { page: 1, limit: 20 } });
 *   // → GET /users?page=1&limit=20
 *
 * 3. Raw response (status + headers + data)
 *
 *   const { data, status, headers } = await http.raw.get<User[]>('/users');
 *   console.log(status, headers.get('x-total-count'), data);
 *
 * 4. Custom client
 *
 *   const api = createHttpClient({
 *     baseURL: 'https://api.example.com',
 *     headers: { Authorization: 'Bearer TOKEN' },
 *     timeout: 10_000,
 *     retry: 2,
 *     retryDelay: 500,
 *   });
 *
 * 5. Interceptors
 *
 *   // Add auth token to every request
 *   api.interceptors.request.use(config => ({
 *     ...config,
 *     headers: { ...config.headers, Authorization: `Bearer ${getToken()}` },
 *   }));
 *
 *   // Log every response
 *   const id = api.interceptors.response.use(data => { console.log(data); return data; });
 *   api.interceptors.response.eject(id); // remove later
 *
 * 6. Retry with callback
 *
 *   const result = await http.get<User>('/users/1', {
 *     retry: 3,
 *     retryDelay: 300,
 *     onRetry: (attempt, err) => console.warn(`Retry #${attempt}`, err),
 *   });
 *
 * 7. Timeout & abort
 *
 *   const controller = new AbortController();
 *   setTimeout(() => controller.abort(), 2000);
 *
 *   const data = await http.get('/slow-endpoint', {
 *     timeout: 5000,
 *     signal: controller.signal,
 *   });
 *
 * 8. File upload with progress
 *
 *   const form = new FormData();
 *   form.append('file', fileInput.files[0]);
 *
 *   await http.upload<{ url: string }>('/upload', form, {
 *     onProgress: (pct) => console.log(`${pct}%`),
 *     timeout: 30_000,
 *   });
 *
 * 9. Error handling
 *
 *   try {
 *     await http.get('/protected');
 *   } catch (err) {
 *     if (isHttpError(err, 'http') && err.status === 401) { redirect('/login'); }
 *     if (isHttpError(err, 'timeout'))  { showRetryToast(); }
 *     if (isHttpError(err, 'network'))  { showOfflineBanner(); }
 *     if (isHttpError(err, 'abort'))    { /* request was cancelled *\/ }
 *   }
 *
 * 10. Request deduplication (default for GET)
 *
 *   // Both calls share one in-flight request → one fetch
 *   Promise.all([http.get('/users'), http.get('/users')]);
 *
 *   // Opt-out
 *   http.get('/users', { dedupe: false });
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */
