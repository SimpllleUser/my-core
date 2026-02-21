import { useThemeMode } from './useThemeMode.ts'
import { useThemeColors } from './useThemeColors.ts'
import { useThemeDefaults } from './useThemeDefaults.ts'

export function useThemeFacade() {
  const { initMode } = useThemeMode()
  const { initColors } = useThemeColors()
  const { initDefaults, dynamicDefaults } = useThemeDefaults()

  const initTheme = () => {
    initMode()
    initColors()
    initDefaults()
  }

  return {
    initTheme,
    dynamicDefaults
  }
}
