import type { ThemePreset } from './model.ts';

export const THEME_PRESETS: ThemePreset[] = [
  { name: 'Blue',        colors: { primary: '#2196F3', secondary: '#03A9F4' } },
  { name: 'Indigo',      colors: { primary: '#3F51B5', secondary: '#7986CB' } },
  { name: 'Deep Purple', colors: { primary: '#673AB7', secondary: '#9575CD' } },
  { name: 'Purple',      colors: { primary: '#9C27B0', secondary: '#E040FB' } },
  { name: 'Rose',        colors: { primary: '#E91E63', secondary: '#F06292' } },
  { name: 'Red',         colors: { primary: '#F44336', secondary: '#FF5722' } },
  { name: 'Orange',      colors: { primary: '#FF9800', secondary: '#FFC107' } },
  { name: 'Amber',       colors: { primary: '#FFC107', secondary: '#FFD54F' } },
  { name: 'Green',       colors: { primary: '#4CAF50', secondary: '#8BC34A' } },
  { name: 'Teal',        colors: { primary: '#009688', secondary: '#00BCD4' } },
  { name: 'Cyan',        colors: { primary: '#00BCD4', secondary: '#26C6DA' } },
  { name: 'Blue Grey',   colors: { primary: '#607D8B', secondary: '#78909C' } },
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
