import { type SemanticColors, type SemanticPreset, ShadowProfile, type ThemePreset } from './model.ts';

const BASE_PRESETS = [
  { name: 'Blue',        colors: { primary: '#1E88E5', secondary: '#FFCA28' } }, // Синій + Бурштиновий
  { name: 'Indigo',      colors: { primary: '#3949AB', secondary: '#EC407A' } }, // Індиго + Рожевий
  { name: 'Deep Purple', colors: { primary: '#5E35B1', secondary: '#26C6DA' } }, // Глибокий фіолетовий + Бірюзовий
  { name: 'Purple',      colors: { primary: '#8E24AA', secondary: '#FFA726' } }, // Фіолетовий + Оранжевий
  { name: 'Rose',        colors: { primary: '#D81B60', secondary: '#26A69A' } }, // Рожевий + М'ятний
  { name: 'Red',         colors: { primary: '#E53935', secondary: '#42A5F5' } }, // Червоний + Блакитний
  { name: 'Orange',      colors: { primary: '#F4511E', secondary: '#5C6BC0' } }, // Насичений оранжевий + Індиго
  { name: 'Amber',       colors: { primary: '#FFB300', secondary: '#7E57C2' } }, // Бурштиновий + Фіолетовий
  { name: 'Green',       colors: { primary: '#43A047', secondary: '#FF7043' } }, // Зелений + Теракотовий
  { name: 'Teal',        colors: { primary: '#00897B', secondary: '#FFCA28' } }, // Бірюзовий + Бурштиновий
  { name: 'Cyan',        colors: { primary: '#00ACC1', secondary: '#FF7043' } }, // Блакитний + Теракотовий
  { name: 'Blue Grey',   colors: { primary: '#546E7A', secondary: '#FFA726' } }, // Сіро-синій + Оранжевий
]

export const THEME_PRESETS: ThemePreset[] = [
  { name: 'Instagram', colors: { primary: '#E1306C', secondary: '#FCAF45' } },
  { name: 'Discord',   colors: { primary: '#5865F2', secondary: '#EB459E' } },
  { name: 'Twitter',   colors: { primary: '#1DA1F2', secondary: '#17BF63' } },
  { name: 'Twitch',    colors: { primary: '#9146FF', secondary: '#00E6CB' } },
  { name: 'Reddit',    colors: { primary: '#FF4500', secondary: '#24A0ED' } },
  { name: 'Stripe',    colors: { primary: '#635BFF', secondary: '#00D4FF' } },
  { name: 'Airbnb',    colors: { primary: '#FF5A5F', secondary: '#00A699' } },
  { name: 'Figma',     colors: { primary: '#F24E1E', secondary: '#0ACF83' } },
  { name: 'Slack',     colors: { primary: '#E01E5A', secondary: '#36C5F0' } },
  { name: 'Custom',      colors: { primary: '',        secondary: '' } },
]

export const RADIUS_OPTION = [
  { label: 'None',        value: 0 },
  { label: 'Small',       value: 4 },
  { label: 'Medium',      value: 8 },
  { label: 'Large',       value: 12 },
  { label: 'Extra Large', value: 16 },
  { label: 'Full',        value: 24 },
]

export const SEMANTIC_PALETTES: Record<SemanticPreset, SemanticColors> = {
  // Класичні кольори Material Design
  Material: { success: '#4CAF50', info: '#2196F3', warning: '#FB8C00', error: '#F44336' },
  // Сучасні, трохи приглушені кольори (як у Shadcn/Tailwind)
  Modern:   { success: '#22C55E', info: '#3B82F6', warning: '#F59E0B', error: '#EF4444' },
  // М'які пастельні відтінки (добре для світлої теми та строгих CRM)
  Pastel:   { success: '#81C784', info: '#64B5F6', warning: '#FFB74D', error: '#E57373' },
  // Насичені неонові кольори (ідеально для темних тем)
  Vibrant:  { success: '#00E676', info: '#00B0FF', warning: '#FFEA00', error: '#FF1744' },
}


export const MATERIAL_SWATCHES = [
  ['#FFCDD2', '#E57373', '#F44336', '#D32F2F', '#B71C1C'],
  ['#F8BBD0', '#F06292', '#E91E63', '#C2185B', '#880E4F'],
  ['#E1BEE7', '#BA68C8', '#9C27B0', '#7B1FA2', '#4A148C'],
  ['#D1C4E9', '#9575CD', '#673AB7', '#512DA8', '#311B92'],
  ['#C5CAE9', '#7986CB', '#3F51B5', '#303F9F', '#1A237E'],
  ['#BBDEFB', '#64B5F6', '#2196F3', '#1976D2', '#0D47A1'],
  ['#B3E5FC', '#4FC3F7', '#03A9F4', '#0288D1', '#01579B'],
  ['#B2EBF2', '#4DD0E1', '#00BCD4', '#0097A7', '#006064'],
  ['#B2DFDB', '#4DB6AC', '#009688', '#00796B', '#004D40'],
  ['#C8E6C9', '#81C784', '#4CAF50', '#388E3C', '#1B5E20'],
  ['#FFF9C4', '#FFF176', '#FFEB3B', '#FBC02D', '#F57F17'],
  ['#FFECB3', '#FFD54F', '#FFC107', '#FFA000', '#FF6F00'],
  ['#FFE0B2', '#FFB74D', '#FF9800', '#F57C00', '#E65100'],
  ['#FFCCBC', '#FF8A65', '#FF5722', '#E64A19', '#BF360C'],
  ['#D7CCC8', '#A1887F', '#795548', '#5D4037', '#3E2723'],
  ['#F5F5F5', '#E0E0E0', '#9E9E9E', '#616161', '#212121'],
  ['#CFD8DC', '#90A4AE', '#607D8B', '#455A64', '#263238'],
]


export const DENSITY_OPTIONS = [
  { value: 'default', label: 'Просторий', icon: 'mdi-format-line-spacing-normal' },
  { value: 'comfortable', label: 'Зручний', icon: 'mdi-format-list-text' },
  { value: 'compact', label: 'Компактний', icon: 'mdi-view-headline' },
]

export const SHADOW_OPTIONS = [
  { value: ShadowProfile.MATERIAL, label: 'Material (Vuetify)' },
  { value: ShadowProfile.SOFT, label: 'Soft (Apple)' },
  { value: ShadowProfile.CRISP, label: 'Crisp (Shadcn)' },
  { value: ShadowProfile.NEO_BRUTAL, label: 'Neo-brutalism' },
  { value: ShadowProfile.GLOW, label: 'Glow' },
  { value: ShadowProfile.NEUMORPHIC, label: 'Neumorphic' },
  { value: ShadowProfile.GLASS, label: 'Glassmorphism' },
]

export const CARD_STYLE_OPTIONS = [
  { value: 'elevated', label: 'З тінями', icon: 'mdi-layers' },
  { value: 'outlined', label: 'Плоскі', icon: 'mdi-border-all' },
]

export const INTERACTIVE_OPTIONS = [
  { value: 'material', label: 'Material', icon: 'mdi-animation-play' },
  { value: 'modern', label: 'Modern', icon: 'mdi-cursor-default-click' },
]
