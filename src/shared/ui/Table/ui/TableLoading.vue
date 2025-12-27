<script setup lang="ts">
import type { TableLoadingProps } from '../types';

withDefaults(defineProps<TableLoadingProps>(), {
  rows: 5,
  type: 'table-row',
});
</script>

<template>
  <VSkeletonLoader :type="`${type}@${rows}`" />
</template>
