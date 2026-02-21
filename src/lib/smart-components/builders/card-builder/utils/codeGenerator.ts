
import { type CardConfig, ActionAlignment, HoverEffect } from '../model.ts'

export function generateCardSnippet(config: CardConfig): string {
  let scriptBlock = ''
  if (config.showExpandable) {
    scriptBlock = `<script setup lang="ts">\nimport { ref } from 'vue'\n\nconst isExpanded = ref(false)\n</script>\n\n`
  }

  let templateBlock = `<template>\n`

  let cardClasses = 'mx-auto transition-swing'
  if (config.hoverEffect === HoverEffect.LIFT) cardClasses += ' hover-lift'
  if (config.hoverEffect === HoverEffect.GLOW) cardClasses += ' hover-glow'

  templateBlock += `  <VCard \n    variant="${config.variant}" \n    class="${cardClasses}" \n    max-width="400"`
  if (config.isLoading) {
    templateBlock += `\n    loading\n    disabled`
  }
  templateBlock += `\n  >\n`

  if (config.isLoading) {
    templateBlock += `    <VSkeletonLoader \n      type="card, article, actions" \n      class="position-absolute w-100 h-100" \n      style="z-index: 1;" \n    />\n\n`
  }

  if (config.showImage) {
    templateBlock += `    <VImg \n      height="${config.imageHeight}" \n      src="https://cdn.vuetifyjs.com/images/cards/cooking.png" \n      cover \n    />\n\n`
  }

  if (config.showHeader) {
    templateBlock += `    <VCardItem>\n`
    if (config.showAvatar) {
      templateBlock += `      <template #prepend>\n        <VAvatar color="primary" icon="mdi-account" />\n      </template>\n`
    }
    if (config.showBadge) {
      templateBlock += `      <template #append>\n        <VChip size="small" color="${config.badgeColor}" class="font-weight-bold">\n          ${config.badgeText}\n        </VChip>\n      </template>\n`
    }
    templateBlock += `      <VCardTitle>${config.title}</VCardTitle>\n`
    templateBlock += `      <VCardSubtitle>${config.subtitle}</VCardSubtitle>\n`
    templateBlock += `    </VCardItem>\n\n`
  }

  if (config.content) {
    templateBlock += `    <VCardText>\n      ${config.content}\n    </VCardText>\n\n`
  }

  // Список фіч
  if (config.showList && config.listItems && config.listItems.length > 0) {
    templateBlock += `    <VList density="compact" class="bg-transparent px-2">\n`
    config.listItems.forEach(item => {
      templateBlock += `      <VListItem class="px-0">\n`
      templateBlock += `        <template #prepend>\n`
      templateBlock += `          <VIcon color="success" icon="mdi-check-circle" size="small" class="mr-2" />\n`
      templateBlock += `        </template>\n`
      templateBlock += `        <VListItemTitle class="text-body-2">${item}</VListItemTitle>\n`
      templateBlock += `      </VListItem>\n`
    })
    templateBlock += `    </VList>\n\n`
  }

  if (config.showExpandable) {
    templateBlock += `    <VExpandTransition>\n`
    templateBlock += `      <div v-show="isExpanded">\n`
    templateBlock += `        <VCardText class="text-medium-emphasis pt-0">\n`
    templateBlock += `          ${config.expandableContent}\n`
    templateBlock += `        </VCardText>\n`
    templateBlock += `      </div>\n`
    templateBlock += `    </VExpandTransition>\n\n`
  }

  if (config.showDivider && config.showActions) {
    templateBlock += `    <VDivider />\n\n`
  }

  if (config.showActions) {
    let alignClass = ''
    if (config.actionAlignment === ActionAlignment.LEFT) alignClass = ' justify-start'
    else if (config.actionAlignment === ActionAlignment.CENTER) alignClass = ' justify-center'
    else if (config.actionAlignment === ActionAlignment.SPACE_BETWEEN) alignClass = ' justify-space-between'
    else alignClass = ' justify-end' // Default for RIGHT

    templateBlock += `    <VCardActions class="px-4 pb-4${alignClass}">\n`

    if (config.secondaryActionText) {
      templateBlock += `      <VBtn variant="text">${config.secondaryActionText}</VBtn>\n`
    }

    if (config.primaryActionText) {
      templateBlock += `      <VBtn variant="flat" color="primary">${config.primaryActionText}</VBtn>\n`
    }

    if (config.showExpandable) {
      if (config.actionAlignment !== ActionAlignment.SPACE_BETWEEN) {
        templateBlock += `      <VSpacer />\n`
      }
      templateBlock += `      <VBtn \n        :icon="isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'" \n        @click="isExpanded = !isExpanded" \n      />\n`
    }

    templateBlock += `    </VCardActions>\n`
  }

  templateBlock += `  </VCard>\n</template>\n`

  let styleBlock = ''
  if (config.hoverEffect !== HoverEffect.NONE) {
    styleBlock += `\n<style scoped>\n`
    styleBlock += `.transition-swing {\n  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);\n}\n\n`

    if (config.hoverEffect === HoverEffect.LIFT) {
      styleBlock += `.hover-lift:hover {\n  transform: translateY(-6px);\n  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1) !important;\n}\n`
    }

    if (config.hoverEffect === HoverEffect.GLOW) {
      styleBlock += `.hover-glow:hover {\n  box-shadow: 0 0 20px rgba(var(--v-theme-primary), 0.4) !important;\n  border-color: rgba(var(--v-theme-primary), 0.5) !important;\n}\n`
    }

    styleBlock += `</style>`
  }

  return scriptBlock + templateBlock + styleBlock
}
