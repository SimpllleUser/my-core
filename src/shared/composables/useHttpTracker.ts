import { ref, computed, type ComputedRef } from 'vue';
import { http as defaultHttp, type HttpRequestConfig } from '../services/http';

type HttpClient = typeof defaultHttp;

const pending = ref(new Set<string>());

function add(url: string) {
  pending.value = new Set(pending.value).add(url);
}

function remove(url: string) {
  const next = new Set(pending.value);
  next.delete(url);
  pending.value = next;
}

async function track<T>(url: string, fn: () => Promise<T>): Promise<T> {
  add(url);
  try {
    return await fn();
  } finally {
    remove(url);
  }
}

export function useHttpTracker(client: HttpClient = defaultHttp) {
  return {
    pending: computed(() => [...pending.value]),

    isLoading: (url: string): ComputedRef<boolean> =>
      computed(() => pending.value.has(url)),

    get: <T>(url: string, config?: HttpRequestConfig): Promise<T> =>
      track(url, () => client.get<T>(url, config)),

    post: <T, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<T> =>
      track(url, () => client.post<T, D>(url, data, config)),

    put: <T, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<T> =>
      track(url, () => client.put<T, D>(url, data, config)),

    patch: <T, D = any>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<T> =>
      track(url, () => client.patch<T, D>(url, data, config)),

    delete: <T>(url: string, config?: HttpRequestConfig): Promise<T> =>
      track(url, () => client.delete<T>(url, config)),
  };
}
