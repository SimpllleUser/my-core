import { VTextField, VTextarea, VSelect, VCheckbox, VAutocomplete } from 'vuetify/components'
import type { FieldType } from '../types/field.types'
import type { Component } from 'vue'

export const fieldComponentMap: Record<FieldType, Component> = {
  text: VTextField,
  email: VTextField,
  password: VTextField,
  textarea: VTextarea,
  select: VSelect,
  autocomplete: VAutocomplete,
  checkbox: VCheckbox
}

export const resolveFieldComponent = (type: FieldType): Component => {
  return fieldComponentMap[type] ?? VTextField
}
