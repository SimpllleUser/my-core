<script setup lang="ts">
import { has } from 'lodash';
import type { TableProps } from '@/shared';
import Pagination from '@/shared/ui/Table/ui/Pagination.vue';

const props = defineProps<TableProps>();

const internalHeaders = props.headers.map(header => ({
  align: header.align || 'center',
  sortable: has(header, 'sortable') ? header.sortable : false,
  ...header
}));

const page = ref(1);
const total = 120;
</script>

<template>
  <VDataTable
    :headers="internalHeaders"
    :items="data"
    hide-default-footer
  >
    <template
      v-for="(_, name) in $slots"
      #[name]="slotProps"
    >
      <slot
        :name="name"
        v-bind="slotProps"
      />
    </template>
    <template #item="{ item, index }">
      <tr :class="getRowClass && getRowClass(item, index)">
        <td
          v-for="header in internalHeaders"
          :key="header.key"
          :class="header.align ? `text-${header.align}` : ''"
        >
          {{ item[header.key] }}
        </td>
      </tr>
    </template>
  </VDataTable>
  <div
    class="pagination-wrapper d-flex justify-center"
  >
    <Pagination
      v-model="page"
      :per-page="12"
      :total="total"
    />
  </div>
</template>

<style lang="scss" scoped>
.pagination-wrapper {
  max-width: 99%;
}
</style>
