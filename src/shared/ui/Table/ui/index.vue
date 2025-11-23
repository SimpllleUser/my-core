<script setup lang="ts">
import type { TableProps } from '@/shared';
import { has } from 'lodash';

const props = defineProps<TableProps>();

const internalHeaders = props.headers.map(header => ({
  align: header.align || 'center',
  sortable: has(header, 'sortable') ? header.sortable : false,
  ...header
}));

console.log(props);
</script>

<template>
  <VDataTable
    :headers="internalHeaders"
    :items="data"
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
</template>

<style scoped></style>
