// composables/useThemeBuilder.ts
import { watch, computed } from 'vue'
import { useTheme } from 'vuetify'
import { useLocalStorage, usePreferredDark } from '@vueuse/core'
import type { CardStyle, SurfacePreset, ThemeMode, SemanticPreset, InteractiveStyle } from '../model.ts';
import { RADIUS_OPTION, THEME_PRESETS, SEMANTIC_PALETTES } from '../constants.ts';

const themePresets = THEME_PRESETS
const radiusOptions = RADIUS_OPTION
const semanticPalettes = SEMANTIC_PALETTES

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

const activePresetName     = useLocalStorage<string>('theme-preset', 'Telegram')
const activeRadius         = useLocalStorage<number>('theme-radius', 8)
const activeMode           = useLocalStorage<ThemeMode>('theme-mode', 'system')
const customPrimaryColor   = useLocalStorage<string>('theme-custom-primary',   '#2196F3')
const customSecondaryColor = useLocalStorage<string>('theme-custom-secondary', '#03A9F4')
const activeSurface        = useLocalStorage<SurfacePreset>('theme-surface', 'Default')
const activeSemantic       = useLocalStorage<SemanticPreset>('theme-semantic', 'Modern')

// Налаштування структури та інтерактивності
const activeCardStyle        = useLocalStorage<CardStyle>('theme-card-style', 'elevated')
const activeInteractiveStyle = useLocalStorage<InteractiveStyle>('theme-interactive', 'modern')

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

  const applySemantic = (preset: SemanticPreset) => {
    const palette = semanticPalettes[preset]
    if (!palette) return
      ;['light', 'dark'].forEach(mode => {
      theme.themes.value[mode].colors.success = palette.success
      theme.themes.value[mode].colors.info    = palette.info
      theme.themes.value[mode].colors.warning = palette.warning
      theme.themes.value[mode].colors.error   = palette.error
    })
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

  // Vuetify
  const dynamicDefaults = computed(() => {
    const isModern = activeInteractiveStyle.value === 'modern'
    const isOutlined = activeCardStyle.value === 'outlined'

    return {
      global: {
        ripple: !isModern,
      },
      VCard: {
        variant: isOutlined ? 'outlined' : 'elevated',
        elevation: isOutlined ? 0 : undefined,
      },
      VBtn: {
        // Якщо стиль Modern, робимо кнопки плоскими. Інакше - класичні з тінями
        variant: isModern ? 'flat' : 'elevated',
      },
      VList: {
        bg: 'transparent'
      }
    }
  })

  const initTheme = () => {
    applyColors(activePresetName.value)
    applySemantic(activeSemantic.value)
    applySurface(activeSurface.value)
    applyRadius(activeRadius.value)
    applyThemeMode(activeMode.value)

    watch(activePresetName, applyColors)
    watch(activeSemantic, applySemantic)
    watch(activeSurface, applySurface)
    watch(activeRadius, applyRadius)
    watch(activeMode, applyThemeMode)

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
    activeInteractiveStyle,
    activeSemantic,
    customPrimaryColor,
    customSecondaryColor,
    themePresets,
    radiusOptions,
    semanticPalettes,
    dynamicDefaults,
    initTheme,
  }
}
