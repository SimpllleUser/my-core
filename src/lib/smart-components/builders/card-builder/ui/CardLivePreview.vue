<script setup lang="ts">
import { computed, ref } from 'vue'
import { type CardConfig, ActionAlignment, HoverEffect } from '../model.ts'

const props = defineProps<{
  config: CardConfig
}>()

const isExpanded = ref(false)

const actionAlignmentClass = computed(() => {
  if (props.config.actionAlignment === ActionAlignment.LEFT) return 'justify-start'
  if (props.config.actionAlignment === ActionAlignment.CENTER) return 'justify-center'
  if (props.config.actionAlignment === ActionAlignment.SPACE_BETWEEN) return 'justify-space-between'
  return 'justify-end' // Default for RIGHT
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

    <VImg
      v-if="config.showImage"
      :height="config.imageHeight"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      cover
    />

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

    <VCardText v-if="config.content">
      {{ config.content }}
    </VCardText>

    <VList v-if="config.showList && config.listItems && config.listItems.length > 0" density="compact" class="bg-transparent px-2">
      <VListItem v-for="(item, i) in config.listItems" :key="i" class="px-0">
        <template #prepend>
          <VIcon color="success" icon="mdi-check-circle" size="small" class="mr-2" />
        </template>
        <VListItemTitle class="text-body-2">{{ item }}</VListItemTitle>
      </VListItem>
    </VList>


    <VExpandTransition v-if="config.showExpandable">
      <div v-show="isExpanded">
        <VDivider />
        <VCardText class="text-medium-emphasis">
          {{ config.expandableContent }}
        </VCardText>
      </div>
    </VExpandTransition>


    <VDivider v-if="config.showDivider && config.showActions" />

    <VCardActions v-if="config.showActions" class="px-4 pb-4" :class="actionAlignmentClass">
      <VBtn
        v-if="config.secondaryActionText"
        variant="text"
      >
        {{ config.secondaryActionText }}
      </VBtn>

      <VBtn
        v-if="config.primaryActionText"
        variant="flat"
        color="primary"
      >
        {{ config.primaryActionText }}
      </VBtn>

      <VSpacer v-if="config.showExpandable && config.actionAlignment !== ActionAlignment.SPACE_BETWEEN" />
      <VBtn
        v-if="config.showExpandable"
        :icon="isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="isExpanded = !isExpanded"
      />
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
