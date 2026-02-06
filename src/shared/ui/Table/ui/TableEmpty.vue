<script setup lang="ts">
import type { TableEmptyProps } from '../types';

withDefaults(defineProps<TableEmptyProps>(), {
  icon: 'mdi-database-off',
  title: 'No data available',
  subtitle: '',
  showResetButton: false,
  resetButtonText: 'Reset Filters',
});

const emit = defineEmits<{
  'reset': [];
}>();
</script>

<template>
  <div class="text-center pa-6">
    <VIcon size="48" color="grey-lighten-1" class="mb-2">
      {{ icon }}
    </VIcon>
    <p class="text-body-1 font-weight-medium mb-1">{{ title }}</p>
    <p v-if="subtitle" class="text-medium-emphasis text-body-2 mb-3">
      {{ subtitle }}
    </p>
    <slot />
    <VBtn
      v-if="showResetButton"
      color="primary"
      @click="emit('reset')"
    >
      {{ resetButtonText }}
    </VBtn>
  </div>
</template>
