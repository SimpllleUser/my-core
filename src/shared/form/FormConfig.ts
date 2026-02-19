import type { BaseField } from './fields/BaseField'

export class FormConfig<TFields extends Record<string, BaseField> = Record<string, BaseField>> {
  constructor(public readonly fields: TFields) {}

  getField<K extends keyof TFields>(key: K): TFields[K] {
    return this.fields[key]
  }

  getFields(): TFields {
    return this.fields
  }
}
