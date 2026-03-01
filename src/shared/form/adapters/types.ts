import type { Component } from 'vue'
import type { BaseField } from '../fields/BaseField'

export interface InputAdapterContext {
  field: BaseField
  value: unknown
  errors: string[]
}

export interface InputAdapter {
  component: Component
  props: (ctx: InputAdapterContext) => Record<string, unknown>
}

export type AdapterRegistry = Record<string, InputAdapter>
