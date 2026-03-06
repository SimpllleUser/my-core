<script setup lang="ts">
import TrafficSourceItem from '../../shared/ui/snippets/TrafficSourceItem.vue'
import ProgressStatItem from '../../shared/ui/snippets/ProgressStatItem.vue'

interface TrafficSource {
  name: string
  visits: number
  percentage: number
  icon: string
  color: string
}

interface Props {
  sources: TrafficSource[]
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Traffic Sources',
})
</script>

<template>
  <VCard>
    <VCardTitle>{{ title }}</VCardTitle>
    <VCardText>
      <VList>
        <TrafficSourceItem
          v-for="source in sources"
          :key="source.name"
          :name="source.name"
          :visits="source.visits"
          :percentage="source.percentage"
          :icon="source.icon"
          :color="source.color"
        />
      </VList>

      <VDivider class="my-4" />

      <ProgressStatItem
        v-for="source in sources"
        :key="source.name"
        :label="source.name"
        :percentage="source.percentage"
        :color="source.color"
        class="mb-3"
      />
    </VCardText>
  </VCard>
</template>
