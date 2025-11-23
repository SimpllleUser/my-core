<script setup lang="ts">
import type { PaginationProps } from '../types.ts';
import type { EmitEvent } from '../../../model/base.ts';
import { Sizes } from '@/shared';

const props = defineProps<PaginationProps>();
const emit = defineEmits<
  EmitEvent<{
    'update:modelValue': number;
  }>
>();

const internalPage = computed({
  get: () => props.modelValue,
  set: (value: number) => {
    emit('update:modelValue', value);
  }
});
</script>

<template>
    <VPagination
      v-model="internalPage"
      :size="Sizes.Small"
      :length="total"
    />
</template>

<style scoped></style>
