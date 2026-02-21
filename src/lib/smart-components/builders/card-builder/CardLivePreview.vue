<script setup lang="ts">
import { computed } from 'vue'
import { type CardConfig, ActionAlignment } from './model.ts'

const props = defineProps<{
  config: CardConfig
}>()

const actionAlignmentClass = computed(() => {
  switch (props.config.actionAlignment) {
    case ActionAlignment.LEFT:
      return 'justify-start'
    case ActionAlignment.CENTER:
      return 'justify-center'
    case ActionAlignment.SPACE_BETWEEN:
      return 'justify-space-between'
    case ActionAlignment.RIGHT:
    default:
      return 'justify-end'
  }
})
</script>

<template>
  <VCard
    :variant="config.variant"
    class="mx-auto w-100 transition-swing"
    max-width="400"
  >
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

      <VCardTitle>{{ config.title }}</VCardTitle>
      <VCardSubtitle>{{ config.subtitle }}</VCardSubtitle>
    </VCardItem>

    <VCardText>
      {{ config.content }}
    </VCardText>

    <VDivider v-if="config.showDivider && config.showActions" />

    <VCardActions v-if="config.showActions" :class="actionAlignmentClass">
      <VBtn
        v-if="config.secondaryActionText"
        variant="text"
      >
        {{ config.secondaryActionText }}
      </VBtn>

      <VBtn
        variant="flat"
        color="primary"
      >
        {{ config.primaryActionText }}
      </VBtn>
    </VCardActions>
  </VCard>
</template>

<style scoped>
.transition-swing {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>
