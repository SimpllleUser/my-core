
export interface ThemeColors {
  primary: string;
  secondary: string;
}

export interface ThemePreset {
  name: string;
  colors: ThemeColors;
}

// Типи для нових налаштувань
export type ThemeMode = 'light' | 'dark' | 'system'
export type SurfacePreset = 'Default' | 'Zinc' | 'Slate'
export type CardStyle = 'elevated' | 'outlined'
