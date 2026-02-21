import { ref, watch } from 'vue'
import { CardType, CardVariant, ActionAlignment, HoverEffect, ThemeColor, type CardConfig } from '../model.ts'

export function useCardBuilder() {
  const config = ref<CardConfig>({
    type: CardType.PROFILE,
    variant: CardVariant.ELEVATED,

    showHeader: true,
    title: 'John Doe',
    subtitle: 'Senior Frontend Developer',
    showAvatar: true,

    showBadge: false,
    badgeText: 'Pro',
    badgeColor: ThemeColor.PRIMARY,

    showImage: false,
    imageHeight: 200,
    content: 'Passionate about crafting scalable UI architectures.',
    showDivider: true,

    isLoading: false,
    hoverEffect: HoverEffect.NONE,

    showActions: true,
    actionAlignment: ActionAlignment.RIGHT,
    primaryActionText: 'Connect',
    secondaryActionText: 'Message'
  })

  watch(() => config.value.type, (newType) => {
    if (newType === CardType.PRICING) {
      config.value.title = 'Pro Plan'
      config.value.subtitle = '$29 / month'
      config.value.primaryActionText = 'Upgrade Now'
      config.value.showAvatar = false
      config.value.showBadge = true
      config.value.badgeText = 'Most Popular'
      config.value.badgeColor = ThemeColor.WARNING
      config.value.hoverEffect = HoverEffect.LIFT
    }
  })

  return { config }
}
