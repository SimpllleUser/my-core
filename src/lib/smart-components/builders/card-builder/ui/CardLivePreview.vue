<script setup lang="ts">
import { computed } from 'vue'
import { type CardConfig, ActionAlignment, HoverEffect } from '../model.ts'

const props = defineProps<{ config: CardConfig }>()

const actionAlignmentClass = computed(() => {
  const map: Record<ActionAlignment, string> = {
    [ActionAlignment.LEFT]: 'justify-start',
    [ActionAlignment.CENTER]: 'justify-center',
    [ActionAlignment.SPACE_BETWEEN]: 'justify-space-between',
    [ActionAlignment.RIGHT]: 'justify-end'
  }
  return map[props.config.actionAlignment]
})

const hoverClass = computed(() => {
  if (props.config.hoverEffect === HoverEffect.LIFT) return 'hover-lift'
  if (props.config.hoverEffect === HoverEffect.GLOW) return 'hover-glow'
  return ''
})
</script>

<template>
  <VCard
    :variant="config.variant"
    class="mx-auto w-100 transition-swing"
    :class="hoverClass"
    max-width="400"
    :loading="config.isLoading"
    :disabled="config.isLoading"
  >
    <VSkeletonLoader
      v-if="config.isLoading"
      type="card, article, actions"
      class="position-absolute w-100 h-100"
      style="z-index: 1;"
    />

    <VImg v-if="config.showImage" :height="config.imageHeight" src="https://cdn.vuetifyjs.com/images/cards/cooking.png" cover />

    <VCardItem v-if="config.showHeader">
      <template v-if="config.showAvatar" #prepend>
        <VAvatar color="primary" icon="mdi-account" />
      </template>

      <template v-if="config.showBadge" #append>
        <VChip size="small" :color="config.badgeColor" class="font-weight-bold">
          {{ config.badgeText }}
        </VChip>
      </template>

      <VCardTitle>{{ config.title }}</VCardTitle>
      <VCardSubtitle>{{ config.subtitle }}</VCardSubtitle>
    </VCardItem>

    <VCardText>{{ config.content }}</VCardText>

    <VDivider v-if="config.showDivider && config.showActions" />

    <VCardActions v-if="config.showActions" :class="actionAlignmentClass">
      <VBtn v-if="config.secondaryActionText" variant="text">{{ config.secondaryActionText }}</VBtn>
      <VBtn variant="flat" color="primary">{{ config.primaryActionText }}</VBtn>
    </VCardActions>
  </VCard>
</template>

<style scoped>
.transition-swing {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.hover-lift:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1) !important;
}

.hover-glow:hover {
  box-shadow: 0 0 20px rgba(var(--v-theme-primary), 0.4) !important;
  border-color: rgba(var(--v-theme-primary), 0.5) !important;
}
</style>
