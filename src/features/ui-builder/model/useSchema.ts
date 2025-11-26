import type { SchemaMap } from '../types';

export function useSchema() {
  const schema: SchemaMap = {
    VBtn: [
      { key: 'text', label: 'Text', input: 'text' },
      {
        key: 'color',
        label: 'Color',
        input: 'select',
        options: ['primary', 'secondary', 'success', 'info', 'warning', 'error']
      },
      {
        key: 'variant',
        label: 'Variant',
        input: 'select',
        options: ['flat', 'elevated', 'tonal', 'outlined', 'text', 'plain']
      },
      { key: 'disabled', label: 'Disabled', input: 'switch' }
    ],
    VChip: [
      { key: 'text', label: 'Text', input: 'text' },
      {
        key: 'color',
        label: 'Color',
        input: 'select',
        options: ['primary', 'secondary', 'success', 'info', 'warning', 'error']
      },
      { key: 'label', label: 'Label', input: 'switch' }
    ],
    VAlert: [
      { key: 'text', label: 'Text', input: 'text' },
      { key: 'type', label: 'Type', input: 'select', options: ['info', 'success', 'warning', 'error'] },
      {
        key: 'variant',
        label: 'Variant',
        input: 'select',
        options: ['flat', 'elevated', 'tonal', 'outlined', 'text', 'plain']
      }
    ],
    VRow: [],
    VCol: [
      {
        key: 'cols',
        label: 'Cols',
        input: 'select',
        options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
      }
    ]
  };
  return { schema };
}
