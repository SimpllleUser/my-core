import { watch } from 'vue'
import { useTheme } from 'vuetify'
import { useLocalStorage } from '@vueuse/core'
import type { SurfacePreset, SemanticPreset } from '../model.ts'
import { THEME_PRESETS, SEMANTIC_PALETTES } from '../constants.ts'

const surfacePalettes = {
  Default: { light: { background: '#FFFFFF', surface: '#FFFFFF' }, dark: { background: '#121212', surface: '#212121' } },
  Zinc:    { light: { background: '#FAFAFA', surface: '#FFFFFF' }, dark: { background: '#09090B', surface: '#18181B' } },
  Slate:   { light: { background: '#F8FAFC', surface: '#FFFFFF' }, dark: { background: '#0F172A', surface: '#1E293B' } }
}

const activePresetName     = useLocalStorage<string>('theme-preset', 'Telegram')
const customPrimaryColor   = useLocalStorage<string>('theme-custom-primary', '#2196F3')
const customSecondaryColor = useLocalStorage<string>('theme-custom-secondary', '#03A9F4')
const activeSurface        = useLocalStorage<SurfacePreset>('theme-surface', 'Default')
const activeSemantic       = useLocalStorage<SemanticPreset>('theme-semantic', 'Modern')

export function useThemeColors() {
  const theme = useTheme()

  const applyColors = (presetName: string) => {
    let primary = '', secondary = ''
    if (presetName === 'Custom') {
      primary = customPrimaryColor.value
      secondary = customSecondaryColor.value
    } else {
      const preset = THEME_PRESETS.find(p => p.name === presetName)
      if (!preset) return
      primary = preset.colors.primary
      secondary = preset.colors.secondary
    }
    theme.themes.value.light.colors.primary = primary
    theme.themes.value.light.colors.secondary = secondary
    theme.themes.value.dark.colors.primary = primary
    theme.themes.value.dark.colors.secondary = secondary
  }

  const applySemantic = (preset: SemanticPreset) => {
    const palette = SEMANTIC_PALETTES[preset]
    if (!palette) return
      ;['light', 'dark'].forEach(mode => {
      theme.themes.value[mode].colors.success = palette.success
      theme.themes.value[mode].colors.info = palette.info
      theme.themes.value[mode].colors.warning = palette.warning
      theme.themes.value[mode].colors.error = palette.error
    })
  }

  const applySurface = (preset: SurfacePreset) => {
    const palette = surfacePalettes[preset]
    if (!palette) return
    theme.themes.value.light.colors.background = palette.light.background
    theme.themes.value.light.colors.surface = palette.light.surface
    theme.themes.value.dark.colors.background = palette.dark.background
    theme.themes.value.dark.colors.surface = palette.dark.surface
  }

  const initColors = () => {
    applyColors(activePresetName.value)
    applySemantic(activeSemantic.value)
    applySurface(activeSurface.value)

    watch(activePresetName, applyColors)
    watch(activeSemantic, applySemantic)
    watch(activeSurface, applySurface)
    watch(customPrimaryColor, () => { if (activePresetName.value === 'Custom') applyColors('Custom') })
    watch(customSecondaryColor, () => { if (activePresetName.value === 'Custom') applyColors('Custom') })
  }

  return {
    activePresetName, customPrimaryColor, customSecondaryColor,
    activeSurface, activeSemantic, initColors
  }
}
