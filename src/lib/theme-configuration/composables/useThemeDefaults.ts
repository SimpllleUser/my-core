import { watch, computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { ShadowProfile } from '../model.ts'
import type { CardStyle, InteractiveStyle, ThemeDensity } from '../model.ts'

const activeRadius = useLocalStorage<number>('theme-radius', 8)
const activeCardStyle = useLocalStorage<CardStyle>('theme-card-style', 'elevated')
const activeInteractiveStyle = useLocalStorage<InteractiveStyle>('theme-interactive', 'modern')
const activeDensity = useLocalStorage<ThemeDensity>('theme-density', 'comfortable')
const activeShadowProfile = useLocalStorage<ShadowProfile>('theme-shadow', ShadowProfile.SOFT)

export function useThemeDefaults() {
  const applyRadius = (radius: number) => {
    document.documentElement.style.setProperty('--custom-radius', `${radius}px`)
  }

  const applyShadowProfile = (profile: ShadowProfile) => {
    document.documentElement.setAttribute('data-shadow-profile', profile)
  }

  const dynamicDefaults = computed(() => {
    const isModern = activeInteractiveStyle.value === 'modern'
    const isOutlined = activeCardStyle.value === 'outlined'
    const density = activeDensity.value

    return {
      global: { ripple: !isModern },
      VCard: {
        variant: isOutlined ? 'outlined' : 'elevated',
        elevation: isOutlined ? 0 : undefined,
      },
      VBtn: {
        variant: isModern ? 'flat' : 'elevated',
        style: isModern ? 'text-transform: none; letter-spacing: normal;' : '',
        density: density,
      },
      VTextField: { variant: 'outlined', color: 'primary', hideDetails: 'auto', density: density },
      VSelect:    { variant: 'outlined', color: 'primary', hideDetails: 'auto', density: density },
      VTextarea:  { variant: 'outlined', color: 'primary', hideDetails: 'auto', density: density },
      VDialog:    { persistent: true, maxWidth: 600 },
      VDataTable: { density: density, hover: true },
      VList:      { bg: 'transparent', density: density }
    }
  })

  const initDefaults = () => {
    applyRadius(activeRadius.value)
    applyShadowProfile(activeShadowProfile.value)

    watch(activeRadius, applyRadius)
    watch(activeShadowProfile, applyShadowProfile)
  }

  return {
    activeRadius,
    activeCardStyle,
    activeInteractiveStyle,
    activeDensity,
    activeShadowProfile,
    dynamicDefaults,
    initDefaults
  }
}
