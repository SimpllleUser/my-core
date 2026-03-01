<script setup lang="ts">
import { computed } from 'vue'
import { VTextField, VTextarea, VSelect, VCheckbox, VAutocomplete } from 'vuetify/components'
import type { BaseField } from '../fields/BaseField'
import type { SelectField } from '../fields/SelectField'
import type { TextareaField } from '../fields/TextareaField'
import type { Component } from 'vue'

export interface FieldState<TValue = unknown> {
  field: BaseField<TValue>
  value: TValue
  errors: string[]
}

const props = defineProps<{
  modelValue: FieldState
}>()

const emit = defineEmits<{
  'update:modelValue': [state: FieldState]
}>()

const field = computed(() => props.modelValue.field)
const value = computed(() => props.modelValue.value)
const errors = computed(() => props.modelValue.errors)

const componentMap: Record<string, Component> = {
  text: VTextField,
  email: VTextField,
  password: VTextField,
  number: VTextField,
  textarea: VTextarea,
  select: VSelect,
  autocomplete: VAutocomplete,
  checkbox: VCheckbox,
}

const inputComponent = computed(() => componentMap[field.value.type] ?? VTextField)

const typeProps = computed((): Record<string, unknown> => {
  switch (field.value.type) {
    case 'email':    return { type: 'email' }
    case 'password': return { type: 'password' }
    case 'number':   return { type: 'number' }
    case 'textarea': {
      const f = field.value as TextareaField
      return { rows: f.config.rows ?? 4, 'auto-grow': f.config.autoGrow ?? false }
    }
    case 'select':
    case 'autocomplete': {
      const f = field.value as SelectField
      return { items: f.options, multiple: f.multiple }
    }
    default: return {}
  }
})

const inputProps = computed(() => ({
  modelValue: value.value,
  disabled: field.value.isDisabled,
  readonly: field.value.isReadonly,
  placeholder: field.value.config.placeholder,
  'hide-details': true,
  variant: 'outlined',
  density: 'comfortable',
  error: errors.value.length > 0,
  ...field.value.vuetifyProps,
  ...typeProps.value,
}))

const onUpdate = (newValue: unknown) => {
  field.value.value = newValue as never
  emit('update:modelValue', { field: field.value, value: newValue, errors: errors.value })
}

const onBlur = () => {
  field.value.value = value.value as never
  const newErrors = field.value.validate()
  emit('update:modelValue', { ...props.modelValue, errors: newErrors })
}
</script>

<template>
  <div>
    <slot name="label" :label="field.label" :required="field.isRequired">
      <label v-if="field.label">
        {{ field.label }}
        <span v-if="field.isRequired">*</span>
      </label>
    </slot>

    <slot name="description" :description="field.description">
      <p v-if="field.description">{{ field.description }}</p>
    </slot>

    <slot :field="field" :value="value" :errors="errors" :on-update="onUpdate" :on-blur="onBlur">
      <component
        :is="inputComponent"
        v-bind="inputProps"
        @update:model-value="onUpdate"
        @blur="onBlur"
      />
    </slot>

    <slot name="errors" :errors="errors">
      <p v-for="error in errors" :key="error">{{ error }}</p>
    </slot>
  </div>
</template>
