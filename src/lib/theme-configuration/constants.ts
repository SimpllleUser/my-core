import type { ThemePreset } from './model.ts';

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
