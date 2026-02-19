import type { InjectionKey } from 'vue'

export interface FieldDefaults {
  variant?: 'outlined' | 'filled' | 'underlined' | 'plain' | 'solo' | 'solo-filled' | 'solo-inverted'
  density?: 'default' | 'comfortable' | 'compact'
  hideDetails?: boolean | 'auto'
  baseProps?: Record<string, unknown>
}

export const FIELD_DEFAULTS_KEY: InjectionKey<FieldDefaults> = Symbol('fieldDefaults')

export const defaultFieldDefaults: FieldDefaults = {
  variant: 'outlined',
  density: 'comfortable',
  hideDetails: 'auto'
}
