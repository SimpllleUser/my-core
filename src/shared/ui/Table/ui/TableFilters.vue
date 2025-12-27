<script setup lang="ts">
import type { TableFiltersProps, FilterState } from '../types';

const props = withDefaults(defineProps<TableFiltersProps>(), {
  showResetButton: true,
  resetButtonText: 'Reset',
});

const emit = defineEmits<{
  'update:modelValue': [value: FilterState];
  'reset': [];
}>();

const getColsClass = (filter: typeof props.filters[0]) => {
  if (!filter.cols) {
    return { cols: 12, sm: 4, md: 3 };
  }
  if (typeof filter.cols === 'number') {
    return { cols: filter.cols };
  }
  return filter.cols;
};

const updateFilterValue = (key: string, value: string | number | boolean | null) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value,
  });
};

const handleReset = () => {
  emit('reset');
};

const hasActiveFilters = computed(() => {
  return Object.values(props.modelValue).some(
    (value) => value !== null && value !== '' && value !== undefined
  );
});
</script>

<template>
  <VCardText class="pb-0">
    <VRow>
      <VCol
        v-for="filter in filters"
        :key="filter.key"
        v-bind="getColsClass(filter)"
      >
        <!-- Text Filter -->
        <VTextField
          v-if="filter.type === 'text'"
          :model-value="modelValue[filter.key] as string || ''"
          :label="filter.label"
          :placeholder="filter.placeholder"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          hide-details
          :clearable="filter.clearable !== false"
          @update:model-value="updateFilterValue(filter.key, $event)"
        />

        <!-- Select Filter -->
        <VSelect
          v-else-if="filter.type === 'select'"
          :model-value="modelValue[filter.key]"
          :items="filter.options"
          :label="filter.label"
          :placeholder="filter.placeholder"
          variant="outlined"
          density="compact"
          hide-details
          :clearable="filter.clearable !== false"
          @update:model-value="updateFilterValue(filter.key, $event)"
        />

        <!-- Date Filter -->
        <VTextField
          v-else-if="filter.type === 'date'"
          :model-value="modelValue[filter.key] as string || ''"
          :label="filter.label"
          type="date"
          variant="outlined"
          density="compact"
          hide-details
          :clearable="filter.clearable !== false"
          @update:model-value="updateFilterValue(filter.key, $event)"
        />
      </VCol>

      <!-- Reset Button -->
      <VCol
        v-if="showResetButton && filters.length > 0"
        cols="12"
        sm="2"
        class="d-flex align-center"
      >
        <VBtn
          variant="outlined"
          :disabled="!hasActiveFilters"
          @click="handleReset"
        >
          {{ resetButtonText }}
        </VBtn>
      </VCol>

      <!-- Custom filter slot -->
      <slot name="filters" />
    </VRow>
  </VCardText>
</template>
