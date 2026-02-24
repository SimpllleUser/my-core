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
  title?: string
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

// ─── Builder ─────────────────────────────────────────────────────────────────

function def(config: Omit<ComponentDef, 'propertySections'>) {
  const sections: PropertySection[] = []

  const builder = {
    section(title: string, fields: PropField[]) {
      sections.push({ title, fields })
      return builder
    },
    spacing(withPadding = false) {
      sections.push({ title: 'Spacing', fields: [{ kind: 'spacing', withPadding }] })
      return builder
    },
    typography() {
      sections.push({ title: 'Typography', fields: [{ kind: 'typography' }] })
      return builder
    },
    classes() {
      sections.push({ title: 'Custom Classes', fields: [{ kind: 'custom-classes' }] })
      return builder
    },
    build(): ComponentDef {
      return { ...config, propertySections: sections }
    },
  }

  return builder
}

// ─── Shared option sets ──────────────────────────────────────────────────────

const VARIANTS   = ['elevated', 'flat', 'tonal', 'outlined', 'text']
const COLORS     = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'white', 'transparent']
const ICON_SIZES = ['x-small', 'small', 'default', 'large', 'x-large']

// ─── Registry ────────────────────────────────────────────────────────────────

export const COMPONENT_DEFS: Record<string, ComponentDef> = {

  div: def({
    type: 'div',
    label: 'Box (div)',
    treeIcon: 'mdi-xml',
    isWrapContainer: true,
    slots: [{ name: 'default', label: 'Default Content' }],
    defaultProps: {},
    defaultClasses: ['d-block'],
    showInPalette: true,
  })
    .section('Display & Layout', [{ kind: 'flex-layout' }])
    .spacing()
    .classes()
    .build(),

  VCard: def({
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
  })
    .section('Appearance', [
      { kind: 'select', prop: 'variant', label: 'Variant', options: VARIANTS },
      { kind: 'select', prop: 'color',   label: 'Color',   options: COLORS },
    ])
    .spacing(true)
    .classes()
    .build(),

  VCardTitle: def({
    type: 'VCardTitle',
    label: 'Card Title',
    treeIcon: 'mdi-format-header-1',
    slots: [{ name: 'default', label: 'Default' }],
    defaultProps: {},
    defaultClasses: [],
    defaultTextChild: true,
    showInPalette: true,
  })
    .typography()
    .spacing()
    .classes()
    .build(),

  VCardText: def({
    type: 'VCardText',
    label: 'Card Text',
    treeIcon: 'mdi-text-box-outline',
    slots: [{ name: 'default', label: 'Default' }],
    defaultProps: {},
    defaultClasses: [],
    defaultTextChild: true,
    showInPalette: true,
  })
    .typography()
    .spacing()
    .classes()
    .build(),

  VBtn: def({
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
  })
    .section('Appearance', [
      { kind: 'select', prop: 'variant', label: 'Variant', options: VARIANTS },
      { kind: 'select', prop: 'color',   label: 'Color',   options: COLORS },
      { kind: 'select', prop: 'size',    label: 'Size',    options: ICON_SIZES },
      { kind: 'switch', prop: 'block',   label: 'Block (full width)' },
      { kind: 'switch', prop: 'rounded', label: 'Rounded' },
    ])
    .section('Icons', [
      { kind: 'icon-slots', slots: [
        { prop: 'prependIcon', label: 'Prepend Icon' },
        { prop: 'appendIcon',  label: 'Append Icon' },
      ]},
    ])
    .typography()
    .spacing()
    .classes()
    .build(),

  VTextField: def({
    type: 'VTextField',
    label: 'Input Field',
    treeIcon: 'mdi-form-textbox',
    slots: [
      { name: 'prepend',       label: 'Prepend' },
      { name: 'append',        label: 'Append' },
      { name: 'prepend-inner', label: 'Prepend Inner' },
      { name: 'append-inner',  label: 'Append Inner' },
    ],
    defaultProps: {},
    defaultClasses: [],
    showInPalette: true,
  })
    .section('Field', [
      { kind: 'text',   prop: 'label',       label: 'Label',       placeholder: 'Field label' },
      { kind: 'text',   prop: 'placeholder', label: 'Placeholder' },
      { kind: 'select', prop: 'type',        label: 'Type',
        options: ['text', 'password', 'number', 'email', 'tel', 'url'] },
      { kind: 'select', prop: 'variant',     label: 'Variant', options: VARIANTS },
      { kind: 'switch', prop: 'clearable',   label: 'Clearable' },
      { kind: 'switch', prop: 'readonly',    label: 'Readonly' },
      { kind: 'switch', prop: 'disabled',    label: 'Disabled' },
    ])
    .section('Icons', [
      { kind: 'icon-slots', slots: [
        { prop: 'prependIcon',      label: 'Prepend Icon' },
        { prop: 'appendIcon',       label: 'Append Icon' },
        { prop: 'prependInnerIcon', label: 'Prepend Inner' },
        { prop: 'appendInnerIcon',  label: 'Append Inner' },
      ]},
    ])
    .spacing()
    .classes()
    .build(),

  VList: def({
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
  })
    .section('Appearance', [
      { kind: 'select', prop: 'variant', label: 'Variant', options: VARIANTS },
      { kind: 'select', prop: 'color',   label: 'Color',   options: COLORS },
    ])
    .spacing(true)
    .classes()
    .build(),

  VListItem: def({
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
  })
    .section('Appearance', [
      { kind: 'select', prop: 'variant', label: 'Variant', options: VARIANTS },
      { kind: 'select', prop: 'color',   label: 'Color',   options: COLORS },
    ])
    .section('Icons', [
      { kind: 'icon-slots', slots: [
        { prop: 'prependIcon', label: 'Prepend Icon' },
        { prop: 'appendIcon',  label: 'Append Icon' },
      ]},
    ])
    .typography()
    .spacing(true)
    .classes()
    .build(),

  VRow: def({
    type: 'VRow',
    label: 'Row',
    treeIcon: 'mdi-view-sequential-outline',
    isWrapContainer: true,
    slots: [{ name: 'default', label: 'Default' }],
    defaultProps: {},
    defaultClasses: [],
    showInPalette: true,
  })
    .section('Layout', [
      { kind: 'select', prop: 'justify',   label: 'Justify',
        options: ['start', 'center', 'end', 'space-around', 'space-between'] },
      { kind: 'select', prop: 'align',     label: 'Align',
        options: ['start', 'center', 'end', 'stretch', 'baseline'] },
      { kind: 'switch', prop: 'noGutters', label: 'No Gutters' },
    ])
    .spacing()
    .classes()
    .build(),

  VCol: def({
    type: 'VCol',
    label: 'Col',
    treeIcon: 'mdi-view-column-outline',
    isWrapContainer: true,
    slots: [{ name: 'default', label: 'Default' }],
    defaultProps: { cols: 12 },
    defaultClasses: [],
    showInPalette: true,
  })
    .section('Grid Column', [
      { kind: 'slider', prop: 'cols', label: 'Width (cols)', min: 1, max: 12, step: 1 },
    ])
    .spacing(true)
    .classes()
    .build(),

  VIcon: def({
    type: 'VIcon',
    label: 'Icon',
    treeIcon: 'mdi-star-circle-outline',
    isLeaf: true,
    slots: [],
    defaultProps: { icon: 'mdi-star', size: 'default' },
    defaultClasses: [],
    showInPalette: true,
  })
    .section('Icon', [
      { kind: 'icon-picker', prop: 'icon',  label: 'Icon' },
      { kind: 'select',      prop: 'size',  label: 'Size',  options: ICON_SIZES },
      { kind: 'select',      prop: 'color', label: 'Color', options: COLORS },
    ])
    .spacing()
    .classes()
    .build(),

  VImg: def({
    type: 'VImg',
    label: 'Image',
    treeIcon: 'mdi-image-outline',
    isLeaf: true,
    slots: [],
    defaultProps: { src: '', alt: '', width: '100%', height: '200', cover: false },
    defaultClasses: [],
    showInPalette: true,
  })
    .section('Image', [
      { kind: 'text',   prop: 'src',    label: 'Source URL', placeholder: 'https://...', clearable: true },
      { kind: 'text',   prop: 'alt',    label: 'Alt text' },
      { kind: 'row', fields: [
        { prop: 'width',  label: 'Width',  placeholder: '100%' },
        { prop: 'height', label: 'Height', placeholder: '200' },
      ]},
      { kind: 'switch', prop: 'cover',   label: 'Cover (object-fit)' },
      { kind: 'switch', prop: 'rounded', label: 'Rounded' },
    ])
    .spacing()
    .classes()
    .build(),

  VDivider: def({
    type: 'VDivider',
    label: 'Divider',
    treeIcon: 'mdi-horizontal-rule',
    isLeaf: true,
    slots: [],
    defaultProps: {},
    defaultClasses: [],
    showInPalette: true,
  })
    .section('Divider', [
      { kind: 'slider', prop: 'thickness', label: 'Thickness', min: 1, max: 8, step: 1 },
      { kind: 'select', prop: 'color',     label: 'Color',     options: COLORS },
    ])
    .spacing()
    .classes()
    .build(),

  TEXT: def({
    type: 'TEXT',
    label: 'Text',
    treeIcon: 'mdi-format-text',
    isLeaf: true,
    slots: [],
    defaultProps: {},
    defaultClasses: [],
    showInPalette: false,
  })
    .section('Text Content', [{ kind: 'textarea', label: 'Text Content' }])
    .build(),
}

// ─── Derived exports (replace componentRegistry.ts consumers) ───────────────

export const getComponentDef = (type: string): ComponentDef | undefined =>
  COMPONENT_DEFS[type]

/** Components shown in the palette (+) menu */
export const PALETTE_COMPONENTS = Object.values(COMPONENT_DEFS).filter(d => d.showInPalette)
/** Container types available in the Wrap toolbar */
export const WRAP_CONTAINER_TYPES = Object.values(COMPONENT_DEFS)
  .filter(d => d.isWrapContainer)
  .map(d => ({ type: d.type as ComponentType, label: d.label, icon: d.treeIcon }))

/** Slot definitions for a given component type */
export const getComponentSlots = (type: string) =>
  COMPONENT_DEFS[type]?.slots ?? [{ name: 'default', label: 'Default' }]
