import type { ComponentType } from './types'

// ─── Field kinds ────────────────────────────────────────────────────────────

export type PropField =
  | { kind: 'text';        prop: string; label: string; placeholder?: string; clearable?: boolean }
  | { kind: 'textarea';    label: string }
  | { kind: 'select';      prop: string; label: string; options: string[] }
  | { kind: 'switch';      prop: string; label: string }
  | { kind: 'icon-picker'; prop: string; label: string }
  | { kind: 'slider';      prop: string; label: string; min: number; max: number; step?: number }
  | { kind: 'row';         fields: Array<{ prop: string; label: string; placeholder?: string }> }
  | { kind: 'icon-slots';  slots: Array<{ prop: string; label: string }> }
  | { kind: 'spacing';     withPadding?: boolean }
  | { kind: 'flex-layout' }
  | { kind: 'typography' }
  | { kind: 'custom-classes' }

export interface PropertySection {
  title: string
  fields: PropField[]
}

// ─── Component definition ────────────────────────────────────────────────────

export interface ComponentDef {
  type: string
  label: string
  treeIcon: string
  isLeaf?: boolean
  isWrapContainer?: boolean
  slots: { name: string; label: string }[]
  defaultProps: Record<string, any>
  defaultClasses: string[]
  /** Automatically create a TEXT child on init */
  defaultTextChild?: boolean
  /** Show in the + palette menu */
  showInPalette: boolean
  propertySections: PropertySection[]
}

// ─── Shared option sets ──────────────────────────────────────────────────────

const VARIANTS   = ['elevated', 'flat', 'tonal', 'outlined', 'text']
const COLORS     = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'white', 'transparent']
const ICON_SIZES = ['x-small', 'small', 'default', 'large', 'x-large']

// ─── Registry ────────────────────────────────────────────────────────────────

export const COMPONENT_DEFS: Record<string, ComponentDef> = {

  div: {
    type: 'div',
    label: 'Box (div)',
    treeIcon: 'mdi-xml',
    isWrapContainer: true,
    slots: [{ name: 'default', label: 'Default Content' }],
    defaultProps: {},
    defaultClasses: ['d-block'],
    showInPalette: true,
    propertySections: [
      { title: 'Display & Layout', fields: [{ kind: 'flex-layout' }] },
      { title: 'Spacing',          fields: [{ kind: 'spacing' }] },
      { title: 'Custom Classes',   fields: [{ kind: 'custom-classes' }] },
    ],
  },

  VCard: {
    type: 'VCard',
    label: 'Card',
    treeIcon: 'mdi-card-outline',
    isWrapContainer: true,
    slots: [
      { name: 'default',  label: 'Default' },
      { name: 'title',    label: 'Title' },
      { name: 'subtitle', label: 'Subtitle' },
      { name: 'text',     label: 'Text' },
      { name: 'actions',  label: 'Actions' },
      { name: 'prepend',  label: 'Prepend' },
      { name: 'append',   label: 'Append' },
    ],
    defaultProps: {},
    defaultClasses: [],
    showInPalette: true,
    propertySections: [
      { title: 'Appearance',     fields: [
        { kind: 'select', prop: 'variant', label: 'Variant', options: VARIANTS },
        { kind: 'select', prop: 'color',   label: 'Color',   options: COLORS },
      ]},
      { title: 'Spacing',        fields: [{ kind: 'spacing', withPadding: true }] },
      { title: 'Custom Classes', fields: [{ kind: 'custom-classes' }] },
    ],
  },

  VCardTitle: {
    type: 'VCardTitle',
    label: 'Card Title',
    treeIcon: 'mdi-format-header-1',
    slots: [{ name: 'default', label: 'Default' }],
    defaultProps: {},
    defaultClasses: [],
    defaultTextChild: true,
    showInPalette: true,
    propertySections: [
      { title: 'Typography',     fields: [{ kind: 'typography' }] },
      { title: 'Spacing',        fields: [{ kind: 'spacing' }] },
      { title: 'Custom Classes', fields: [{ kind: 'custom-classes' }] },
    ],
  },

  VCardText: {
    type: 'VCardText',
    label: 'Card Text',
    treeIcon: 'mdi-text-box-outline',
    slots: [{ name: 'default', label: 'Default' }],
    defaultProps: {},
    defaultClasses: [],
    defaultTextChild: true,
    showInPalette: true,
    propertySections: [
      { title: 'Typography',     fields: [{ kind: 'typography' }] },
      { title: 'Spacing',        fields: [{ kind: 'spacing' }] },
      { title: 'Custom Classes', fields: [{ kind: 'custom-classes' }] },
    ],
  },

  VBtn: {
    type: 'VBtn',
    label: 'Button',
    treeIcon: 'mdi-rectangle-outline',
    slots: [
      { name: 'default', label: 'Default' },
      { name: 'prepend', label: 'Prepend' },
      { name: 'append',  label: 'Append' },
    ],
    defaultProps: {},
    defaultClasses: [],
    defaultTextChild: true,
    showInPalette: true,
    propertySections: [
      { title: 'Appearance', fields: [
        { kind: 'select', prop: 'variant', label: 'Variant', options: VARIANTS },
        { kind: 'select', prop: 'color',   label: 'Color',   options: COLORS },
        { kind: 'select', prop: 'size',    label: 'Size',    options: ICON_SIZES },
        { kind: 'switch', prop: 'block',   label: 'Block (full width)' },
        { kind: 'switch', prop: 'rounded', label: 'Rounded' },
      ]},
      { title: 'Icons', fields: [
        { kind: 'icon-slots', slots: [
          { prop: 'prependIcon', label: 'Prepend Icon' },
          { prop: 'appendIcon',  label: 'Append Icon' },
        ]},
      ]},
      { title: 'Typography',     fields: [{ kind: 'typography' }] },
      { title: 'Spacing',        fields: [{ kind: 'spacing' }] },
      { title: 'Custom Classes', fields: [{ kind: 'custom-classes' }] },
    ],
  },

  VTextField: {
    type: 'VTextField',
    label: 'Input Field',
    treeIcon: 'mdi-form-textbox',
    slots: [
      { name: 'prepend',        label: 'Prepend' },
      { name: 'append',         label: 'Append' },
      { name: 'prepend-inner',  label: 'Prepend Inner' },
      { name: 'append-inner',   label: 'Append Inner' },
    ],
    defaultProps: {},
    defaultClasses: [],
    showInPalette: true,
    propertySections: [
      { title: 'Field', fields: [
        { kind: 'text',   prop: 'label',       label: 'Label',       placeholder: 'Field label' },
        { kind: 'text',   prop: 'placeholder', label: 'Placeholder' },
        { kind: 'select', prop: 'type',        label: 'Type',
          options: ['text', 'password', 'number', 'email', 'tel', 'url'] },
        { kind: 'select', prop: 'variant',     label: 'Variant', options: VARIANTS },
        { kind: 'switch', prop: 'clearable',   label: 'Clearable' },
        { kind: 'switch', prop: 'readonly',    label: 'Readonly' },
        { kind: 'switch', prop: 'disabled',    label: 'Disabled' },
      ]},
      { title: 'Icons', fields: [
        { kind: 'icon-slots', slots: [
          { prop: 'prependIcon',      label: 'Prepend Icon' },
          { prop: 'appendIcon',       label: 'Append Icon' },
          { prop: 'prependInnerIcon', label: 'Prepend Inner' },
          { prop: 'appendInnerIcon',  label: 'Append Inner' },
        ]},
      ]},
      { title: 'Spacing',        fields: [{ kind: 'spacing' }] },
      { title: 'Custom Classes', fields: [{ kind: 'custom-classes' }] },
    ],
  },

  VList: {
    type: 'VList',
    label: 'List',
    treeIcon: 'mdi-format-list-bulleted',
    isWrapContainer: true,
    slots: [
      { name: 'default',   label: 'Default' },
      { name: 'subheader', label: 'Subheader' },
      { name: 'prepend',   label: 'Prepend' },
      { name: 'append',    label: 'Append' },
    ],
    defaultProps: {},
    defaultClasses: [],
    showInPalette: true,
    propertySections: [
      { title: 'Appearance', fields: [
        { kind: 'select', prop: 'variant', label: 'Variant', options: VARIANTS },
        { kind: 'select', prop: 'color',   label: 'Color',   options: COLORS },
      ]},
      { title: 'Spacing',        fields: [{ kind: 'spacing', withPadding: true }] },
      { title: 'Custom Classes', fields: [{ kind: 'custom-classes' }] },
    ],
  },

  VListItem: {
    type: 'VListItem',
    label: 'List Item',
    treeIcon: 'mdi-order-bool-ascending-variant',
    slots: [
      { name: 'default',  label: 'Default' },
      { name: 'title',    label: 'Title' },
      { name: 'subtitle', label: 'Subtitle' },
      { name: 'prepend',  label: 'Prepend' },
      { name: 'append',   label: 'Append' },
    ],
    defaultProps: {},
    defaultClasses: [],
    defaultTextChild: true,
    showInPalette: true,
    propertySections: [
      { title: 'Appearance', fields: [
        { kind: 'select', prop: 'variant', label: 'Variant', options: VARIANTS },
        { kind: 'select', prop: 'color',   label: 'Color',   options: COLORS },
      ]},
      { title: 'Icons', fields: [
        { kind: 'icon-slots', slots: [
          { prop: 'prependIcon', label: 'Prepend Icon' },
          { prop: 'appendIcon',  label: 'Append Icon' },
        ]},
      ]},
      { title: 'Typography',     fields: [{ kind: 'typography' }] },
      { title: 'Spacing',        fields: [{ kind: 'spacing', withPadding: true }] },
      { title: 'Custom Classes', fields: [{ kind: 'custom-classes' }] },
    ],
  },

  VRow: {
    type: 'VRow',
    label: 'Row',
    treeIcon: 'mdi-view-sequential-outline',
    isWrapContainer: true,
    slots: [{ name: 'default', label: 'Default' }],
    defaultProps: {},
    defaultClasses: [],
    showInPalette: true,
    propertySections: [
      { title: 'Layout', fields: [
        { kind: 'select', prop: 'justify',    label: 'Justify',
          options: ['start', 'center', 'end', 'space-around', 'space-between'] },
        { kind: 'select', prop: 'align',      label: 'Align',
          options: ['start', 'center', 'end', 'stretch', 'baseline'] },
        { kind: 'switch', prop: 'noGutters',  label: 'No Gutters' },
      ]},
      { title: 'Spacing',        fields: [{ kind: 'spacing' }] },
      { title: 'Custom Classes', fields: [{ kind: 'custom-classes' }] },
    ],
  },

  VCol: {
    type: 'VCol',
    label: 'Col',
    treeIcon: 'mdi-view-column-outline',
    isWrapContainer: true,
    slots: [{ name: 'default', label: 'Default' }],
    defaultProps: { cols: 12 },
    defaultClasses: [],
    showInPalette: true,
    propertySections: [
      { title: 'Grid Column', fields: [
        { kind: 'slider', prop: 'cols', label: 'Width (cols)', min: 1, max: 12, step: 1 },
      ]},
      { title: 'Spacing',        fields: [{ kind: 'spacing', withPadding: true }] },
      { title: 'Custom Classes', fields: [{ kind: 'custom-classes' }] },
    ],
  },

  VIcon: {
    type: 'VIcon',
    label: 'Icon',
    treeIcon: 'mdi-star-circle-outline',
    isLeaf: true,
    slots: [],
    defaultProps: { icon: 'mdi-star', size: 'default' },
    defaultClasses: [],
    showInPalette: true,
    propertySections: [
      { title: 'Icon', fields: [
        { kind: 'icon-picker', prop: 'icon',  label: 'Icon' },
        { kind: 'select',      prop: 'size',  label: 'Size',  options: ICON_SIZES },
        { kind: 'select',      prop: 'color', label: 'Color', options: COLORS },
      ]},
      { title: 'Spacing',        fields: [{ kind: 'spacing' }] },
      { title: 'Custom Classes', fields: [{ kind: 'custom-classes' }] },
    ],
  },

  VImg: {
    type: 'VImg',
    label: 'Image',
    treeIcon: 'mdi-image-outline',
    isLeaf: true,
    slots: [],
    defaultProps: { src: '', alt: '', width: '100%', height: '200', cover: false },
    defaultClasses: [],
    showInPalette: true,
    propertySections: [
      { title: 'Image', fields: [
        { kind: 'text',   prop: 'src',    label: 'Source URL', placeholder: 'https://...', clearable: true },
        { kind: 'text',   prop: 'alt',    label: 'Alt text' },
        { kind: 'row', fields: [
          { prop: 'width',  label: 'Width',  placeholder: '100%' },
          { prop: 'height', label: 'Height', placeholder: '200' },
        ]},
        { kind: 'switch', prop: 'cover',   label: 'Cover (object-fit)' },
        { kind: 'switch', prop: 'rounded', label: 'Rounded' },
      ]},
      { title: 'Spacing',        fields: [{ kind: 'spacing' }] },
      { title: 'Custom Classes', fields: [{ kind: 'custom-classes' }] },
    ],
  },

  VDivider: {
    type: 'VDivider',
    label: 'VDivider',
    treeIcon: 'mdi-horizontal-rule',
    isLeaf: false,
    slots: [],
    defaultProps: {},
    defaultClasses: [],
    showInPalette: true,
    propertySections: [
      { fields: [{ kind: 'text', prop: 'thickness', label: 'thickness' },  { kind: 'select', prop: 'color',   label: 'Color',   options: COLORS },] },
      { title: 'Spacing',        fields: [{ kind: 'spacing' }] },
      { title: 'Custom Classes', fields: [{ kind: 'custom-classes' }] },
    ],
  },

  TEXT: {
    type: 'TEXT',
    label: 'Text',
    treeIcon: 'mdi-format-text',
    isLeaf: true,
    slots: [],
    defaultProps: {},
    defaultClasses: [],
    showInPalette: false,
    propertySections: [
      { title: 'Text Content', fields: [{ kind: 'textarea', label: 'Text Content' }] },
    ],
  },
}

// ─── Derived exports (replace componentRegistry.ts consumers) ───────────────

export const getComponentDef = (type: string): ComponentDef | undefined =>
  COMPONENT_DEFS[type]

/** Components shown in the palette (+) menu */
export const PALETTE_COMPONENTS = Object.values(COMPONENT_DEFS).filter(d => d.showInPalette)
console.log(PALETTE_COMPONENTS);
/** Container types available in the Wrap toolbar */
export const WRAP_CONTAINER_TYPES = Object.values(COMPONENT_DEFS)
  .filter(d => d.isWrapContainer)
  .map(d => ({ type: d.type as ComponentType, label: d.label, icon: d.treeIcon }))

/** Slot definitions for a given component type */
export const getComponentSlots = (type: string) =>
  COMPONENT_DEFS[type]?.slots ?? [{ name: 'default', label: 'Default' }]
