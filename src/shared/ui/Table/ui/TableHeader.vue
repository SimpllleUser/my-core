<script setup lang="ts">
import type { TableHeaderProps } from '../types';

withDefaults(defineProps<TableHeaderProps>(), {
  title: '',
  showAddButton: false,
  addButtonText: 'Add',
  addButtonIcon: 'mdi-plus',
});

const emit = defineEmits<{
  'click:add': [];
}>();
</script>

<template>
  <VCardTitle class="d-flex align-center">
    <span v-if="title" class="text-h6">{{ title }}</span>
    <slot name="title" />
    <VSpacer />
    <slot name="actions" />
    <VBtn
      v-if="showAddButton"
      color="primary"
      :prepend-icon="addButtonIcon"
      @click="emit('click:add')"
    >
      {{ addButtonText }}
    </VBtn>
  </VCardTitle>
</template>
