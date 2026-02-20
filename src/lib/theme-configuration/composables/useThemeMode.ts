import { watch } from 'vue'
import { useTheme } from 'vuetify'
import { useLocalStorage, usePreferredDark } from '@vueuse/core'
import type { ThemeMode } from '../model.ts'

const activeMode = useLocalStorage<ThemeMode>('theme-mode', 'system')

export function useThemeMode() {
  const theme = useTheme()
  const isSystemDark = usePreferredDark()

  const applyThemeMode = (mode: ThemeMode) => {
    if (mode === 'system') {
      theme.global.name.value = isSystemDark.value ? 'dark' : 'light'
    } else {
      theme.global.name.value = mode
    }
  }

  const initMode = () => {
    applyThemeMode(activeMode.value)
    watch(activeMode, applyThemeMode)
    watch(isSystemDark, () => {
      if (activeMode.value === 'system') applyThemeMode('system')
    })
  }

  return { activeMode, initMode }
}
