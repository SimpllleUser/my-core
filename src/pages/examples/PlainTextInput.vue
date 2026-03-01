<script setup lang="ts">
defineProps<{
  modelValue?: unknown
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  errorMessages?: string[]
}>()

defineEmits<{
  'update:modelValue': [value: string]
  blur: []
}>()
</script>

<template>
  <div class="plain-input-root">
    <input
      class="plain-input"
      :class="{ 'plain-input--error': errorMessages?.length, 'plain-input--disabled': disabled }"
      :value="(modelValue as string) ?? ''"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="$emit('blur')"
    />
    <span v-if="errorMessages?.length" class="plain-input-error">
      {{ errorMessages[0] }}
    </span>
  </div>
</template>

<style scoped>
.plain-input-root {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.plain-input {
  width: 100%;
  padding: 10px 14px;
  border: 2px dashed #9e9e9e;
  border-radius: 6px;
  font-size: 14px;
  background: transparent;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.plain-input:focus {
  border-color: #1976d2;
  border-style: solid;
}

.plain-input--error {
  border-color: #d32f2f;
  border-style: solid;
}

.plain-input--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.plain-input-error {
  font-size: 12px;
  color: #d32f2f;
}
</style>
