import { useThemeMode } from '../composables/useThemeMode.ts'
import { useThemeColors } from '../composables/useThemeColors.ts'
import { useThemeDefaults } from '../composables/useThemeDefaults.ts'
import { SEMANTIC_PALETTES, THEME_PRESETS } from '../constants.ts'

// Фонові палітри (бажано також винести в constants.ts)
const surfacePalettes = {
  Default: { light: { background: '#FFFFFF', surface: '#FFFFFF' }, dark: { background: '#121212', surface: '#212121' } },
  Zinc:    { light: { background: '#FAFAFA', surface: '#FFFFFF' }, dark: { background: '#09090B', surface: '#18181B' } },
  Slate:   { light: { background: '#F8FAFC', surface: '#FFFFFF' }, dark: { background: '#0F172A', surface: '#1E293B' } }
}

export function generateThemeCode(): string {
  const { activeMode } = useThemeMode()
  const { activePresetName, customPrimaryColor, customSecondaryColor, activeSurface, activeSemantic } = useThemeColors()
  const { activeRadius, dynamicDefaults } = useThemeDefaults()

  const semantic = SEMANTIC_PALETTES[activeSemantic.value]
  const surface = surfacePalettes[activeSurface.value]

  let primary = '', secondary = ''
  if (activePresetName.value === 'Custom') {
    primary = customPrimaryColor.value
    secondary = customSecondaryColor.value
  } else {
    const preset = THEME_PRESETS.find(p => p.name === activePresetName.value)
    primary = preset?.colors.primary || ''
    secondary = preset?.colors.secondary || ''
  }

  const defaultsString = JSON.stringify(dynamicDefaults.value, null, 4).replace(/"([^"]+)":/g, '$1:')

  return `import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: '${activeMode.value === 'system' ? 'light' : activeMode.value}',
    themes: {
      light: {
        colors: {
          primary: '${primary}',
          secondary: '${secondary}',
          success: '${semantic.success}',
          info: '${semantic.info}',
          warning: '${semantic.warning}',
          error: '${semantic.error}',
          background: '${surface.light.background}',
          surface: '${surface.light.surface}',
        },
      },
      dark: {
        colors: {
          primary: '${primary}',
          secondary: '${secondary}',
          success: '${semantic.success}',
          info: '${semantic.info}',
          warning: '${semantic.warning}',
          error: '${semantic.error}',
          background: '${surface.dark.background}',
          surface: '${surface.dark.surface}',
        },
      },
    },
  },
  defaults: ${defaultsString}
})

/* :root { --custom-radius: ${activeRadius.value}px; } */`
}
