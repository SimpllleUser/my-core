import type { FieldValidations, ValidationRule } from '../types/field.types'
import * as v from './validators'

function withMsg<T>(config: T | [T, string]): [T, string | undefined] {
  return Array.isArray(config) ? [config[0] as T, config[1] as string] : [config, undefined]
}

function flag(config: boolean | string | undefined, factory: (msg?: string) => ValidationRule): ValidationRule | null {
  if (!config) return null
  return factory(typeof config === 'string' ? config : undefined)
}

function val<T>(config: T | [T, string] | null | undefined, factory: (val: T, msg?: string) => ValidationRule): ValidationRule | null {
  if (config == null) return null
  const [value, msg] = withMsg(config)
  return factory(value, msg)
}

export function resolveValidations(validations: FieldValidations): ValidationRule[] {
  return [
    flag(validations.required,  v.required),
    flag(validations.email,     v.email),
    flag(validations.url,       v.url),
    flag(validations.numeric,   v.numeric),
    flag(validations.integer,   v.integer),
    val(validations.minLength,  v.minLength),
    val(validations.maxLength,  v.maxLength),
    val(validations.min,        v.min),
    val(validations.max,        v.max),
    val(validations.pattern,    v.pattern),
    val(validations.sameAs,     v.sameAs),
    ...(validations.rules ?? []),
  ].filter((r): r is ValidationRule => r !== null)
}
