export type TemplateChild = string | TemplateNode

export interface NodeOptions {
  /** Unique identifier – used by `patchNode(id, changes)` */
  id?: string
  /** When `false` the node is not rendered at all */
  visible?: boolean
  /** Props forwarded to the wrapper element (VRow / VCol / div) */
  props?: Record<string, unknown>
  /** CSS class(es) applied to the wrapper element */
  class?: string | string[] | Record<string, boolean>
}

export interface RowNode extends NodeOptions {
  _type: 'row'
  children: TemplateChild[]
}

export interface ColNode extends NodeOptions {
  _type: 'col'
  children: TemplateChild[]
}

export interface BlockNode extends NodeOptions {
  _type: 'block'
  children: TemplateChild[]
}

/** Renders a named slot – use this to inject buttons or custom UI into the layout */
export interface SlotNode {
  _type: 'slot'
  name: string
}

export type TemplateNode = RowNode | ColNode | BlockNode | SlotNode
