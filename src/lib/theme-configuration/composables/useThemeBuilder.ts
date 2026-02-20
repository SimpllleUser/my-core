import { watch } from 'vue'
import { useTheme } from 'vuetify'
import { useLocalStorage, usePreferredDark } from '@vueuse/core'

export interface ThemeColors {
  primary: string;
  secondary: string;
}

export interface ThemePreset {
  name: string;
  colors: ThemeColors;
}

export const themePresets: ThemePreset[] = [
  { name: 'Blue',        colors: { primary: '#2196F3', secondary: '#03A9F4' } },
  { name: 'Indigo',      colors: { primary: '#3F51B5', secondary: '#7986CB' } },
  { name: 'Deep Purple', colors: { primary: '#673AB7', secondary: '#9575CD' } },
  { name: 'Purple',      colors: { primary: '#9C27B0', secondary: '#E040FB' } },
  { name: 'Rose',        colors: { primary: '#E91E63', secondary: '#F06292' } },
  { name: 'Red',         colors: { primary: '#F44336', secondary: '#FF5722' } },
  { name: 'Orange',      colors: { primary: '#FF9800', secondary: '#FFC107' } },
  { name: 'Amber',       colors: { primary: '#FFC107', secondary: '#FFD54F' } },
  { name: 'Green',       colors: { primary: '#4CAF50', secondary: '#8BC34A' } },
  { name: 'Teal',        colors: { primary: '#009688', secondary: '#00BCD4' } },
  { name: 'Cyan',        colors: { primary: '#00BCD4', secondary: '#26C6DA' } },
  { name: 'Blue Grey',   colors: { primary: '#607D8B', secondary: '#78909C' } },
  { name: 'Custom',      colors: { primary: '',        secondary: '' } },
]

export const radiusOptions = [
  { label: 'None',        value: 0 },
  { label: 'Small',       value: 4 },
  { label: 'Medium',      value: 8 },
  { label: 'Large',       value: 12 },
  { label: 'Extra Large', value: 16 },
  { label: 'Full',        value: 24 },
]

// Типи для нових налаштувань
type ThemeMode = 'light' | 'dark' | 'system'
type SurfacePreset = 'Default' | 'Zinc' | 'Slate'
type CardStyle = 'elevated' | 'outlined'

// Палітри для фону та поверхонь
const surfacePalettes = {
  Default: {
    light: { background: '#FFFFFF', surface: '#FFFFFF' },
    dark:  { background: '#121212', surface: '#212121' }
  },
  Zinc: {
    light: { background: '#FAFAFA', surface: '#FFFFFF' },
    dark:  { background: '#09090B', surface: '#18181B' }
  },
  Slate: {
    light: { background: '#F8FAFC', surface: '#FFFFFF' },
    dark:  { background: '#0F172A', surface: '#1E293B' }
  }
}

// Стан (VueUse LocalStorage)
const activePresetName     = useLocalStorage<string>('theme-preset', 'Blue')
const activeRadius         = useLocalStorage<number>('theme-radius', 8)
const activeMode           = useLocalStorage<ThemeMode>('theme-mode', 'system')
const customPrimaryColor   = useLocalStorage<string>('theme-custom-primary',   '#2196F3')
const customSecondaryColor = useLocalStorage<string>('theme-custom-secondary', '#03A9F4')

const activeSurface        = useLocalStorage<SurfacePreset>('theme-surface', 'Default')
const activeCardStyle      = useLocalStorage<CardStyle>('theme-card-style', 'elevated')

export function useThemeBuilder() {
  const theme = useTheme()
  const isSystemDark = usePreferredDark()

  const applyColors = (presetName: string) => {
    let primary   = ''
    let secondary = ''

    if (presetName === 'Custom') {
      primary   = customPrimaryColor.value
      secondary = customSecondaryColor.value
    } else {
      const preset = themePresets.find(p => p.name === presetName)
      if (!preset) return
      primary   = preset.colors.primary
      secondary = preset.colors.secondary
    }

    theme.themes.value.light.colors.primary   = primary
    theme.themes.value.light.colors.secondary = secondary
    theme.themes.value.dark.colors.primary    = primary
    theme.themes.value.dark.colors.secondary  = secondary
  }

  const applySurface = (preset: SurfacePreset) => {
    const palette = surfacePalettes[preset]
    if (!palette) return

    theme.themes.value.light.colors.background = palette.light.background
    theme.themes.value.light.colors.surface    = palette.light.surface

    theme.themes.value.dark.colors.background  = palette.dark.background
    theme.themes.value.dark.colors.surface     = palette.dark.surface
  }

  const applyRadius = (radius: number) => {
    document.documentElement.style.setProperty('--custom-radius', `${radius}px`)
  }

  const applyThemeMode = (mode: ThemeMode) => {
    if (mode === 'system') {
      theme.global.name.value = isSystemDark.value ? 'dark' : 'light'
    } else {
      theme.global.name.value = mode
    }
  }

  const applyCardStyle = (style: CardStyle) => {
    document.documentElement.setAttribute('data-card-style', style)
  }

  const initTheme = () => {
    // 1. Ініціалізація
    applyColors(activePresetName.value)
    applySurface(activeSurface.value)
    applyRadius(activeRadius.value)
    applyThemeMode(activeMode.value)
    applyCardStyle(activeCardStyle.value)

    // 2. Підписки
    watch(activePresetName, applyColors)
    watch(activeSurface, applySurface)
    watch(activeRadius, applyRadius)
    watch(activeMode, applyThemeMode)
    watch(activeCardStyle, applyCardStyle)

    watch(customPrimaryColor, () => {
      if (activePresetName.value === 'Custom') applyColors('Custom')
    })

    watch(customSecondaryColor, () => {
      if (activePresetName.value === 'Custom') applyColors('Custom')
    })

    watch(isSystemDark, () => {
      if (activeMode.value === 'system') applyThemeMode('system')
    })
  }

  return {
    activePresetName,
    activeRadius,
    activeMode,
    activeSurface,
    activeCardStyle,
    customPrimaryColor,
    customSecondaryColor,
    themePresets,
    radiusOptions,
    initTheme,
  }
}
