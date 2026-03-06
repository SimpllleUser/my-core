<script setup lang="ts">
import ActivityFeedItem from '../../shared/ui/snippets/ActivityFeedItem.vue'

interface Activity {
  id: number | string
  title: string
  description?: string
  time?: string
  icon: string
  color: string
}

interface Props {
  activities: Activity[]
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Recent Activity',
})

const emit = defineEmits<{
  viewAll: []
}>()
</script>

<template>
  <VCard>
    <VCardTitle class="d-flex justify-space-between align-center">
      <span>{{ title }}</span>
      <VBtn variant="text" size="small" color="primary" @click="emit('viewAll')">View All</VBtn>
    </VCardTitle>
    <VCardText class="pa-0">
      <VList lines="two">
        <ActivityFeedItem
          v-for="activity in activities"
          :key="activity.id"
          :title="activity.title"
          :description="activity.description"
          :time="activity.time"
          :icon="activity.icon"
          :color="activity.color"
        />
      </VList>
    </VCardText>
  </VCard>
</template>
