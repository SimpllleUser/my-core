import { ref, watch } from 'vue'
import { CardType, CardVariant, ActionAlignment, type CardConfig } from '../../model.ts'

export function useCardBuilder() {
  const config = ref<CardConfig>({
    type: CardType.PROFILE,
    variant: CardVariant.ELEVATED,
    showHeader: true,
    title: 'John Doe',
    subtitle: 'Senior Frontend Developer',
    showAvatar: true,
    showImage: false,
    imageHeight: 200,
    content: 'Passionate about crafting scalable UI architectures and mentoring junior developers.',
    showDivider: true,
    showActions: true,
    actionAlignment: ActionAlignment.RIGHT,
    primaryActionText: 'Connect',
    secondaryActionText: 'Message'
  })

  // Можемо додати логіку: якщо користувач змінює тип на PRICING,
  // автоматично підставляти інші дефолтні тексти
  watch(() => config.value.type, (newType) => {
    if (newType === CardType.PRICING) {
      config.value.title = 'Pro Plan'
      config.value.subtitle = '$29 / month'
      config.value.primaryActionText = 'Upgrade Now'
      config.value.showAvatar = false
    }
  })

  return { config }
}
