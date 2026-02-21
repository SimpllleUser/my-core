import { type CardConfig, ActionAlignment, HoverEffect } from '../model.ts'

export function generateCardSnippet(config: CardConfig): string {
  let cardClasses = 'mx-auto'
  if (config.hoverEffect === HoverEffect.LIFT) cardClasses += ' hover-lift'
  if (config.hoverEffect === HoverEffect.GLOW) cardClasses += ' hover-glow'

  let template = `<VCard variant="${config.variant}" class="${cardClasses}" max-width="400"${config.isLoading ? ' loading disabled' : ''}>\n`

  if (config.showImage) {
    template += `  <VImg height="${config.imageHeight}" src="https://cdn.vuetifyjs.com/images/cards/cooking.png" cover />\n`
  }

  if (config.showHeader) {
    template += `  <VCardItem>\n`
    if (config.showAvatar) {
      template += `    <template #prepend>\n      <VAvatar color="primary" icon="mdi-account" />\n    </template>\n`
    }
    if (config.showBadge) {
      template += `    <template #append>\n      <VChip size="small" color="${config.badgeColor}" class="font-weight-bold">${config.badgeText}</VChip>\n    </template>\n`
    }
    template += `    <VCardTitle>${config.title}</VCardTitle>\n`
    template += `    <VCardSubtitle>${config.subtitle}</VCardSubtitle>\n`
    template += `  </VCardItem>\n`
  }

  template += `  <VCardText>\n    ${config.content}\n  </VCardText>\n`

  if (config.showDivider && config.showActions) template += `  <VDivider />\n`

  if (config.showActions) {
    const alignClass = config.actionAlignment === ActionAlignment.LEFT ? ' justify-start'
      : config.actionAlignment === ActionAlignment.CENTER ? ' justify-center'
        : config.actionAlignment === ActionAlignment.SPACE_BETWEEN ? ' justify-space-between'
          : ''

    template += `  <VCardActions class="${alignClass}">\n`
    if (config.secondaryActionText) template += `    <VBtn variant="text">${config.secondaryActionText}</VBtn>\n`
    template += `    <VBtn variant="flat" color="primary">${config.primaryActionText}</VBtn>\n`
    template += `  </VCardActions>\n`
  }

  template += `</VCard>\n`

  if (config.hoverEffect !== HoverEffect.NONE) {
    template += `\n<style scoped>\n`
    template += `.hover-lift { transition: all 0.3s ease; }\n`
    template += `.hover-lift:hover { transform: translateY(-6px); box-shadow: 0 12px 24px rgba(0,0,0,0.1) !important; }\n`
    if (config.hoverEffect === HoverEffect.GLOW) {
      template += `.hover-glow { transition: all 0.3s ease; }\n`
      template += `.hover-glow:hover { box-shadow: 0 0 20px rgba(var(--v-theme-primary), 0.4) !important; }\n`
    }
    template += `</style>`
  }

  return template
}
