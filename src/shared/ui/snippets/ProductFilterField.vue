<script setup lang="ts">
import { Colors } from '../../model'
import type { IFilterField } from './types'

interface Props {
  field: IFilterField
  value: any
}

defineProps<Props>()

const emit = defineEmits<{ update: [any] }>()
</script>

<template>
  <!-- Search -->
  <VTextField
    v-if="field.type === 'search'"
    :model-value="value ?? ''"
    density="compact"
    variant="outlined"
    hide-details
    clearable
    prepend-inner-icon="mdi-magnify"
    :placeholder="field.hint"
    :color="field.color"
    @update:model-value="emit('update', $event)"
  />

  <!-- Checkbox (chip group) -->
  <VChipGroup
    v-else-if="field.type === 'checkbox'"
    :model-value="value ?? []"
    multiple
    column
    :color="field.color ?? Colors.Primary"
    @update:model-value="emit('update', $event)"
  >
    <VChip
      v-for="opt in field.options"
      :key="opt.value"
      :value="opt.value"
      filter
      size="small"
    >
      <VIcon v-if="opt.icon" start size="14">{{ opt.icon }}</VIcon>
      {{ opt.label }}
      <span v-if="opt.count !== undefined" class="text-medium-emphasis ml-1">({{ opt.count }})</span>
    </VChip>
  </VChipGroup>

  <!-- Range slider -->
  <template v-else-if="field.type === 'range'">
    <VRangeSlider
      :model-value="value ?? [field.min ?? 0, field.max ?? 100]"
      :min="field.min ?? 0"
      :max="field.max ?? 100"
      :step="field.step ?? 1"
      :color="field.color ?? Colors.Primary"
      thumb-label
      hide-details
      density="compact"
      @update:model-value="emit('update', $event)"
    />
    <div class="d-flex justify-space-between text-caption text-medium-emphasis mt-1">
      <span>{{ field.prefix }}{{ value?.[0] ?? field.min ?? 0 }}{{ field.suffix }}</span>
      <span>{{ field.prefix }}{{ value?.[1] ?? field.max ?? 100 }}{{ field.suffix }}</span>
    </div>
  </template>

  <!-- Rating -->
  <VRating
    v-else-if="field.type === 'rating'"
    :model-value="value ?? 0"
    :color="field.color ?? 'warning'"
    half-increments
    density="compact"
    clearable
    @update:model-value="emit('update', $event)"
  />

  <!-- Select -->
  <VSelect
    v-else-if="field.type === 'select'"
    :model-value="value"
    :items="field.options ?? []"
    item-title="label"
    item-value="value"
    :multiple="field.multiple"
    :chips="field.multiple"
    density="compact"
    variant="outlined"
    hide-details
    clearable
    :color="field.color"
    :placeholder="field.hint"
    @update:model-value="emit('update', $event)"
  />

  <!-- Toggle -->
  <VSwitch
    v-else-if="field.type === 'toggle'"
    :model-value="value ?? false"
    :color="field.color ?? Colors.Primary"
    :hint="field.hint"
    :persistent-hint="!!field.hint"
    density="compact"
    hide-details
    @update:model-value="emit('update', $event)"
  />
</template>
