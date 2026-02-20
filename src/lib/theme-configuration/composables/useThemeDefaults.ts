import { watch, computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import type { CardStyle, InteractiveStyle } from '../model.ts'

const activeRadius         = useLocalStorage<number>('theme-radius', 8)
const activeCardStyle      = useLocalStorage<CardStyle>('theme-card-style', 'elevated')
const activeInteractiveStyle = useLocalStorage<InteractiveStyle>('theme-interactive', 'modern')

export function useThemeDefaults() {
  const applyRadius = (radius: number) => {
    document.documentElement.style.setProperty('--custom-radius', `${radius}px`)
  }

  const dynamicDefaults = computed(() => {
    const isModern = activeInteractiveStyle.value === 'modern'
    const isOutlined = activeCardStyle.value === 'outlined'

    return {
      global: { ripple: !isModern },
      VCard: {
        variant: isOutlined ? 'outlined' : 'elevated',
        elevation: isOutlined ? 0 : undefined,
      },
      VBtn: {
        variant: isModern ? 'flat' : 'elevated',
        style: isModern ? 'text-transform: none; letter-spacing: normal;' : '',
      },
      VTextField: { variant: 'outlined', color: 'primary', hideDetails: 'auto' },
      VSelect: { variant: 'outlined', color: 'primary', hideDetails: 'auto' },
      VTextarea: { variant: 'outlined', color: 'primary', hideDetails: 'auto' },
      VDialog: { persistent: true, maxWidth: 600 },
      VDataTable: { density: 'compact', hover: true },
      VList: { bg: 'transparent', density: 'compact' }
    }
  })

  const initDefaults = () => {
    applyRadius(activeRadius.value)
    watch(activeRadius, applyRadius)
  }

  return { activeRadius, activeCardStyle, activeInteractiveStyle, dynamicDefaults, initDefaults }
}
