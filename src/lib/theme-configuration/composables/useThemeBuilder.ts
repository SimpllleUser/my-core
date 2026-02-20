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
  { name: 'Blue', colors: { primary: '#2196F3', secondary: '#03A9F4' } },
  { name: 'Green', colors: { primary: '#4CAF50', secondary: '#8BC34A' } },
  { name: 'Purple', colors: { primary: '#9C27B0', secondary: '#E040FB' } },
  { name: 'Rose', colors: { primary: '#E91E63', secondary: '#F06292' } },
  { name: 'Orange', colors: { primary: '#FF9800', secondary: '#FFC107' } },
  { name: 'Teal', colors: { primary: '#009688', secondary: '#00BCD4' } },
  { name: 'Custom', colors: { primary: '', secondary: '' } }
]

export const radiusOptions = [
  { label: 'None', value: 0 },
  { label: 'Small', value: 4 },
  { label: 'Medium', value: 8 },
  { label: 'Large', value: 12 },
  { label: 'Extra Large', value: 16 },
  { label: 'Full', value: 24 },
]

type ThemeMode = 'light' | 'dark' | 'system'

const activePresetName = useLocalStorage<string>('theme-preset', 'Blue')
const activeRadius = useLocalStorage<number>('theme-radius', 8)
const activeMode = useLocalStorage<ThemeMode>('theme-mode', 'system')
const customPrimaryColor = useLocalStorage<string>('theme-custom-primary', '#607D8B')

export function useThemeBuilder() {
  const theme = useTheme()
  const isSystemDark = usePreferredDark()

  const applyColors = (presetName: string) => {
    let primary = ''
    let secondary = ''

    if (presetName === 'Custom') {
      primary = customPrimaryColor.value
      secondary = customPrimaryColor.value
    } else {
      const preset = themePresets.find(p => p.name === presetName)
      if (!preset) return
      primary = preset.colors.primary
      secondary = preset.colors.secondary
    }

    theme.themes.value.light.colors.primary = primary
    theme.themes.value.light.colors.secondary = secondary

    theme.themes.value.dark.colors.primary = primary
    theme.themes.value.dark.colors.secondary = secondary
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

  const initTheme = () => {
    applyColors(activePresetName.value)
    applyRadius(activeRadius.value)
    applyThemeMode(activeMode.value)

    watch(activePresetName, applyColors)
    watch(activeRadius, applyRadius)
    watch(activeMode, applyThemeMode)

    watch(customPrimaryColor, () => {
      if (activePresetName.value === 'Custom') {
        applyColors('Custom')
      }
    })

    watch(isSystemDark, () => {
      if (activeMode.value === 'system') applyThemeMode('system')
    })
  }

  return {
    activePresetName,
    activeRadius,
    activeMode,
    customPrimaryColor,
    themePresets,
    radiusOptions,
    initTheme,
  }
}
