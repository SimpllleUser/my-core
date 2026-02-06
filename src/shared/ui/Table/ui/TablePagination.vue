<script setup lang="ts">
import type { PaginationProps } from '../types';
import type { EmitEvent } from '../../../model/base';
import { Sizes } from '@/shared';

const props = withDefaults(defineProps<PaginationProps>(), {
  showInfo: false,
  infoTemplate: 'Showing {start}-{end} of {total}',
});

const emit = defineEmits<
  EmitEvent<{
    'update:modelValue': number;
    'update:perPage': number;
  }>
>();

const internalPage = computed({
  get: () => props.modelValue,
  set: (value: number) => {
    emit('update:modelValue', value);
  },
});

const totalPages = computed(() => {
  return Math.ceil(props.total / props.perPage);
});

const paginationInfo = computed(() => {
  const start = (props.modelValue - 1) * props.perPage + 1;
  const end = Math.min(props.modelValue * props.perPage, props.total);

  return props.infoTemplate
    .replace('{start}', String(start))
    .replace('{end}', String(end))
    .replace('{total}', String(props.total));
});

const perPageOptions = [5, 10, 15, 25, 50, 100];
</script>

<template>
  <div class="table-pagination d-flex justify-space-between align-center flex-wrap ga-2 pa-2">
    <span v-if="showInfo" class="text-body-2 text-medium-emphasis">
      {{ paginationInfo }}
    </span>
    <VSpacer v-else />

    <div class="d-flex align-center ga-4">
      <slot name="per-page">
        <div v-if="showInfo" class="d-flex align-center ga-2">
          <span class="text-body-2 text-medium-emphasis">Per page:</span>
          <VSelect
            :model-value="perPage"
            :items="perPageOptions"
            variant="outlined"
            density="compact"
            hide-details
            style="max-width: 80px"
            @update:model-value="emit('update:perPage', $event)"
          />
        </div>
      </slot>

      <VPagination
        v-model="internalPage"
        :size="Sizes.Small"
        :length="totalPages"
        :total-visible="5"
        density="compact"
      />
    </div>
  </div>
</template>

<style scoped>
.table-pagination {
  border-top: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>
