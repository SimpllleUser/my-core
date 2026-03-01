import { provide, inject } from 'vue'
import { vuetifyAdapters } from './vuetify'
import type { AdapterRegistry } from './types'

const ADAPTERS_KEY = Symbol('form-adapters')

export function provideFormAdapters(registry: AdapterRegistry): void {
  provide(ADAPTERS_KEY, registry)
}

export function useFormAdapters(): AdapterRegistry {
  return inject(ADAPTERS_KEY, vuetifyAdapters)
}

export { vuetifyAdapters } from './vuetify'
export type { InputAdapter, InputAdapterContext, AdapterRegistry } from './types'
