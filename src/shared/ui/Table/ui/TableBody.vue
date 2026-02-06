<script setup lang="ts">
import { has } from 'lodash';
import type { TableBodyProps, Header } from '../types';

const props = withDefaults(defineProps<TableBodyProps>(), {
  loading: false,
  showSelect: false,
  itemValue: 'id',
  density: 'default',
});

defineEmits<{
  'update:sortBy': [value: { key: string; order: 'asc' | 'desc' }[]];
  'click:row': [item: unknown];
}>();

const slots = useSlots();

const internalHeaders = computed<Header[]>(() =>
  props.headers.map((header) => ({
    align: header.align || 'center',
    sortable: has(header, 'sortable') ? header.sortable : false,
    ...header,
  }))
);

// Check if slot exists for a column
const hasColumnSlot = (key: string) => {
  return !!slots[`item.${key}`];
};
</script>

<template>
  <VDataTable
    :headers="internalHeaders"
    :items="items"
    :loading="loading"
    :show-select="showSelect"
    :item-value="itemValue"
    :sort-by="sortBy"
    :search="search"
    :density="density"
    hide-default-footer
    class="elevation-0"
    @update:sort-by="$emit('update:sortBy', $event)"
    @click:row="(_: Event, { item }: { item: unknown }) => $emit('click:row', item)"
  >
    <!-- Forward all slots dynamically -->
    <template
      v-for="(_, name) in slots"
      :key="name"
      #[name]="slotProps"
    >
      <slot :name="name" v-bind="slotProps" />
    </template>

    <!-- No Data slot -->
    <template v-if="!slots['no-data']" #no-data>
      <slot name="empty">
        <div class="text-center pa-6">
          <VIcon size="48" color="grey-lighten-1" class="mb-2">
            mdi-database-off
          </VIcon>
          <p class="text-medium-emphasis">No data available</p>
        </div>
      </slot>
    </template>

    <!-- Loading slot -->
    <template v-if="!slots['loading']" #loading>
      <slot name="loading-content">
        <VSkeletonLoader type="table-row@5" />
      </slot>
    </template>
  </VDataTable>
</template>
