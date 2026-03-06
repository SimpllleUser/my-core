<script setup lang="ts">
import type { ColorType, IconType } from './types'

interface Props {
  title: string
  description?: string
  time?: string
  icon: IconType
  color: ColorType | string
}

defineProps<Props>()
</script>

<template>
  <VListItem>
    <template #prepend>
      <VAvatar :color="color" size="40">
        <VIcon color="white" size="small">{{ icon }}</VIcon>
      </VAvatar>
    </template>
    <VListItemTitle>{{ title }}</VListItemTitle>
    <VListItemSubtitle v-if="description">{{ description }}</VListItemSubtitle>
    <template v-if="time" #append>
      <span class="text-caption text-medium-emphasis">{{ time }}</span>
    </template>
  </VListItem>
</template>
