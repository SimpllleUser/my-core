<script setup lang="ts">
import { Icons } from '../../shared/model'

interface TopPage {
  path: string
  views: number
  bounceRate: number
}

interface Props {
  pages: TopPage[]
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Top Pages',
})

const emit = defineEmits<{
  viewAll: []
}>()

const getBounceRateColor = (rate: number) => {
  if (rate < 40) return 'success'
  if (rate < 60) return 'warning'
  return 'error'
}
</script>

<template>
  <VCard>
    <VCardTitle class="d-flex justify-space-between align-center">
      <span>{{ title }}</span>
      <VBtn variant="text" size="small" color="primary" @click="emit('viewAll')">View All</VBtn>
    </VCardTitle>
    <VCardText class="pa-0">
      <VTable>
        <thead>
          <tr>
            <th class="text-left">Page</th>
            <th class="text-right">Views</th>
            <th class="text-right">Bounce Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="page in pages" :key="page.path">
            <td>
              <div class="d-flex align-center">
                <VIcon size="small" class="mr-2">{{ Icons.FileDocument }}</VIcon>
                {{ page.path }}
              </div>
            </td>
            <td class="text-right font-weight-medium">{{ page.views.toLocaleString() }}</td>
            <td class="text-right">
              <VChip :color="getBounceRateColor(page.bounceRate)" size="small" variant="tonal">
                {{ page.bounceRate }}%
              </VChip>
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCardText>
  </VCard>
</template>
