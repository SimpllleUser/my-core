import { inject } from 'vue'
import { FIELD_DEFAULTS_KEY, defaultFieldDefaults } from './fieldDefaults'
import type { FieldDefaults } from './fieldDefaults'

export const useFieldDefaults = (): FieldDefaults => {
  return inject(FIELD_DEFAULTS_KEY, defaultFieldDefaults)
}
