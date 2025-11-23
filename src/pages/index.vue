<script lang="ts" setup>
import { Table } from '@/shared';

const headers = [
  {
    align: 'start',
    key: 'name',
    title: 'Dessert (100g serving)'
  },
  { key: 'calories', title: 'Calories' },
  { key: 'fat', title: 'Fat (g)' },
  { key: 'carbs', title: 'Carbs (g)' },
  { key: 'protein', title: 'Protein (g)' },
  { key: 'iron', title: 'Iron (%)' }
];

const data = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: '7%'
  }
];

const getRowClass = (item: unknown, index: number) => {
  return '';
};
</script>

<template>
  <div>
    <Table
      :headers="headers"
      :data="data"
      :getRowClass="getRowClass"
    >
      <template #header.name="{ column }">
        <div class="d-flex align-center">
          <strong>{{ column.title }}</strong>
        </div>
      </template>
      <template #item.name="{ item }">
        <span class="font-weight-bold text-primary">
          {{ item.name }}
        </span>
      </template>
    </Table>
  </div>
</template>
