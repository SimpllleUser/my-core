import { type CardConfig, ActionAlignment } from '../../model.ts'

export function generateCardSnippet(config: CardConfig): string {
  let template = `<VCard variant="${config.variant}" class="mx-auto" max-width="400">\n`

  if (config.showImage) {
    template += `  <VImg height="${config.imageHeight}" src="https://cdn.vuetifyjs.com/images/cards/cooking.png" cover />\n`
  }

  if (config.showHeader) {
    if (config.showAvatar) {
      template += `  <VCardItem>\n`
      template += `    <template #prepend>\n`
      template += `      <VAvatar color="primary" icon="mdi-account" />\n`
      template += `    </template>\n`
      template += `    <VCardTitle>${config.title}</VCardTitle>\n`
      template += `    <VCardSubtitle>${config.subtitle}</VCardSubtitle>\n`
      template += `  </VCardItem>\n`
    } else {
      template += `  <VCardItem>\n`
      template += `    <VCardTitle>${config.title}</VCardTitle>\n`
      template += `    <VCardSubtitle>${config.subtitle}</VCardSubtitle>\n`
      template += `  </VCardItem>\n`
    }
  }

  template += `  <VCardText>\n    ${config.content}\n  </VCardText>\n`

  if (config.showDivider && config.showActions) {
    template += `  <VDivider />\n`
  }

  if (config.showActions) {
    const alignClass = config.actionAlignment === ActionAlignment.LEFT ? ' justify-start'
      : config.actionAlignment === ActionAlignment.CENTER ? ' justify-center'
        : config.actionAlignment === ActionAlignment.SPACE_BETWEEN ? ' justify-space-between'
          : ''

    template += `  <VCardActions class="${alignClass}">\n`
    if (config.secondaryActionText) {
      template += `    <VBtn variant="text">${config.secondaryActionText}</VBtn>\n`
    }
    template += `    <VBtn variant="flat" color="primary">${config.primaryActionText}</VBtn>\n`
    template += `  </VCardActions>\n`
  }

  template += `</VCard>`

  return template
}
