<script setup lang="ts">
import type { ColorType, IconType } from './types'

interface Props {
  name: string
  visits: number
  percentage: number
  icon: IconType
  color: ColorType | string
}

defineProps<Props>()
</script>

<template>
  <VListItem class="px-0">
    <template #prepend>
      <VAvatar :color="color" size="36" rounded>
        <VIcon color="white" size="small">{{ icon }}</VIcon>
      </VAvatar>
    </template>
    <VListItemTitle>{{ name }}</VListItemTitle>
    <VListItemSubtitle>{{ visits.toLocaleString() }} visits</VListItemSubtitle>
    <template #append>
      <span class="font-weight-medium">{{ percentage }}%</span>
    </template>
  </VListItem>
</template>
