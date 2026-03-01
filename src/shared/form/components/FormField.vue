<script setup lang="ts">
import { computed } from 'vue'
import type { BaseField } from '../fields/BaseField'
import { useFormAdapters } from '../adapters'

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
  blur: []
}>()

const field = computed(() => props.modelValue.field)
const value = computed(() => props.modelValue.value)
const errors = computed(() => props.modelValue.errors)

const adapters = useFormAdapters()

const adapter = computed(() => adapters[field.value.type])

const inputProps = computed(() =>
  adapter.value?.props({ field: field.value, value: value.value, errors: errors.value }) ?? {}
)

const onUpdate = (newValue: unknown) => {
  field.value.value = newValue as never
  emit('update:modelValue', { field: field.value, value: newValue, errors: errors.value })
}

const onBlur = () => emit('blur')
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
        :is="adapter?.component"
        v-bind="inputProps"
        @update:model-value="onUpdate"
        @blur="onBlur"
      />
    </slot>
  </div>
</template>
