export interface ThemeColors {
  primary: string;
  secondary: string;
}

export interface ThemePreset {
  name: string;
  colors: ThemeColors;
}

export interface SemanticColors {
  success: string;
  info: string;
  warning: string;
  error: string;
}

export type ThemeMode = 'light' | 'dark' | 'system'
export type SurfacePreset = 'Default' | 'Zinc' | 'Slate'
export type CardStyle = 'elevated' | 'outlined'
export type SemanticPreset = 'Material' | 'Modern' | 'Pastel' | 'Vibrant'
export type InteractiveStyle = 'material' | 'modern'
export type ThemeDensity = 'default' | 'comfortable' | 'compact'
