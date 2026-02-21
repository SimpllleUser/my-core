import { useThemeMode } from '../composables/useThemeMode.ts'
import { useThemeColors } from '../composables/useThemeColors.ts'
import { useThemeDefaults } from '../composables/useThemeDefaults.ts'
import { SEMANTIC_PALETTES, THEME_PRESETS } from '../constants.ts'
import { ShadowProfile } from '../model.ts'

const surfacePalettes = {
  Default: { light: { background: '#FFFFFF', surface: '#FFFFFF' }, dark: { background: '#121212', surface: '#212121' } },
  Zinc:    { light: { background: '#FAFAFA', surface: '#FFFFFF' }, dark: { background: '#09090B', surface: '#18181B' } },
  Slate:   { light: { background: '#F8FAFC', surface: '#FFFFFF' }, dark: { background: '#0F172A', surface: '#1E293B' } }
}

export function generateThemeCode(): string {
  const { activeMode } = useThemeMode()
  const { activePresetName, customPrimaryColor, customSecondaryColor, activeSurface, activeSemantic } = useThemeColors()
  const { activeRadius, dynamicDefaults, activeShadowProfile } = useThemeDefaults()

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

  let shadowCssSnippet = ''
  if (activeShadowProfile.value === ShadowProfile.SOFT) {
    shadowCssSnippet = `\n/* Shadow Profile: Soft */\n.v-card--elevated { box-shadow: 0 15px 35px -5px rgba(0,0,0,0.05), 0 0 3px rgba(0,0,0,0.05) !important; }\n.v-btn--elevated { box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important; }`
  } else if (activeShadowProfile.value === ShadowProfile.CRISP) {
    shadowCssSnippet = `\n/* Shadow Profile: Crisp */\n.v-card--elevated { box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1) !important; border: 1px solid rgba(var(--v-theme-on-surface), 0.1) !important; }\n.v-btn--elevated { box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05) !important; border: 1px solid rgba(var(--v-theme-on-surface), 0.1) !important; }`
  } else if (activeShadowProfile.value === ShadowProfile.NEO_BRUTAL) {
    shadowCssSnippet = `\n/* Shadow Profile: Neo-brutalism */\n.v-card--elevated { box-shadow: 4px 4px 0px 0px rgb(var(--v-theme-on-surface)) !important; border: 2px solid rgb(var(--v-theme-on-surface)) !important; }\n.v-btn--elevated { box-shadow: 3px 3px 0px 0px rgb(var(--v-theme-on-surface)) !important; border: 2px solid rgb(var(--v-theme-on-surface)) !important; }\n.v-btn--elevated:active { box-shadow: 0 0 0 !important; transform: translate(3px, 3px); }`
  }

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

/* ==========================================================
 * 💡 Додайте цей CSS у ваш глобальний файл стилів
 * ==========================================================
 *
 * :root {
 * --custom-radius: ${activeRadius.value}px;
 * }
 * ${shadowCssSnippet.replace(/\n/g, '\n * ')}
 */`
}
