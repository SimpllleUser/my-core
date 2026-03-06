<script setup lang="ts">
import { Icons } from '../../shared/model'
import ChartPlaceholder from '../../shared/ui/snippets/ChartPlaceholder.vue'

interface Props {
  title?: string
  trend?: number
}

withDefaults(defineProps<Props>(), {
  title: 'Traffic Overview',
  trend: 12.5,
})
</script>

<template>
  <VCard>
    <VCardTitle class="d-flex justify-space-between align-center">
      <span>{{ title }}</span>
      <VChip v-if="trend !== undefined" size="small" color="success" variant="tonal">
        <VIcon start size="small">{{ trend >= 0 ? Icons.ArrowUp : Icons.ArrowDown }}</VIcon>
        {{ trend > 0 ? '+' : '' }}{{ trend }}%
      </VChip>
    </VCardTitle>
    <VCardText>
      <slot>
        <ChartPlaceholder
          :icon="Icons.ChartLine"
          label="Chart component goes here"
          description="Use your preferred chart library (Chart.js, ApexCharts, etc.)"
        />
      </slot>
    </VCardText>
  </VCard>
</template>
