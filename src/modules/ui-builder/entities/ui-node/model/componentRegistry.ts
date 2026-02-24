import type { ComponentType } from './types'

export const WRAP_ALLOWED_TYPES: { type: ComponentType; label: string; icon: string }[] = [
  { type: 'div',   label: 'Box (div)', icon: 'mdi-xml' },
  { type: 'VCard', label: 'Card',      icon: 'mdi-card-outline' },
  { type: 'VRow',  label: 'Row',       icon: 'mdi-view-sequential-outline' },
  { type: 'VCol',  label: 'Col',       icon: 'mdi-view-column-outline' },
  { type: 'VList', label: 'List',      icon: 'mdi-format-list-bulleted' },
]

export interface SlotDefinition {
  name: string
  label: string
}

export const COMPONENT_SLOTS: Record<string, SlotDefinition[]> = {
  div: [
    { name: 'default', label: 'Default Content' },
  ],
  VCard: [
    { name: 'default', label: 'Default' },
    { name: 'title', label: 'Title' },
    { name: 'subtitle', label: 'Subtitle' },
    { name: 'text', label: 'Text' },
    { name: 'actions', label: 'Actions' },
    { name: 'prepend', label: 'Prepend' },
    { name: 'append', label: 'Append' },
  ],
  VBtn: [
    { name: 'default', label: 'Default' },
    { name: 'prepend', label: 'Prepend' },
    { name: 'append', label: 'Append' },
  ],
  VList: [
    { name: 'default', label: 'Default' },
    { name: 'subheader', label: 'Subheader' },
    { name: 'prepend', label: 'Prepend' },
    { name: 'append', label: 'Append' },
  ],
  VListItem: [
    { name: 'default', label: 'Default' },
    { name: 'title', label: 'Title' },
    { name: 'subtitle', label: 'Subtitle' },
    { name: 'prepend', label: 'Prepend' },
    { name: 'append', label: 'Append' },
  ],
  VRow: [
    { name: 'default', label: 'Default' },
  ],
  VCol: [
    { name: 'default', label: 'Default' },
  ],
  VTextField: [
    { name: 'prepend', label: 'Prepend' },
    { name: 'append', label: 'Append' },
    { name: 'prepend-inner', label: 'Prepend Inner' },
    { name: 'append-inner', label: 'Append Inner' },
  ],
  VCardTitle: [
    { name: 'default', label: 'Default' },
  ],
  VCardText: [
    { name: 'default', label: 'Default' },
  ],
}

export const getComponentSlots = (type: string): SlotDefinition[] => {
  return COMPONENT_SLOTS[type] ?? [{ name: 'default', label: 'Default' }]
}
