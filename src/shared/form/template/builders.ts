import type { TemplateChild, NodeOptions, RowNode, ColNode, BlockNode, SlotNode } from './types'

/**
 * Creates a VRow wrapper node.
 *
 * @example
 * row(['name', 'email'])
 * row(['name'], { props: { noGutters: true }, class: 'mb-4' })
 */
export const row = (children: TemplateChild[], opts?: NodeOptions): RowNode => ({
  _type: 'row',
  props: opts?.props,
  class: opts?.class,
  children,
})

/**
 * Creates a VCol wrapper node.
 * Pass Vuetify column props (cols, md, sm, …) via `opts.props`.
 *
 * @example
 * col(['name'], { props: { cols: 12, md: 6 } })
 * col([slot('actions')], { props: { cols: 12 }, class: 'd-flex justify-end' })
 */
export const col = (children: TemplateChild[], opts?: NodeOptions): ColNode => ({
  _type: 'col',
  props: opts?.props,
  class: opts?.class,
  children,
})

/**
 * Creates a plain `<div>` wrapper node.
 *
 * @example
 * block([slot('footer')], { class: 'pa-4 d-flex gap-2' })
 */
export const block = (children: TemplateChild[], opts?: NodeOptions): BlockNode => ({
  _type: 'block',
  props: opts?.props,
  class: opts?.class,
  children,
})

/**
 * Creates a named slot placeholder.
 * In the `<FormTemplate>` component, fill it via `<template #slotName>`.
 *
 * @example
 * // template definition
 * col([slot('actions')])
 *
 * // usage
 * <FormTemplate ...>
 *   <template #actions>
 *     <VBtn type="submit">Submit</VBtn>
 *   </template>
 * </FormTemplate>
 */
export const slot = (name: string): SlotNode => ({ _type: 'slot', name })
