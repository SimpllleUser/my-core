export type ComponentType =
  | 'VBtn'
  | 'VTextField'
  | 'VCard'
  | 'VCardTitle'
  | 'VCardText'
  | 'VList'
  | 'VListItem'

export interface UiNode {
  id: string
  type: ComponentType | string
  name: string
  props: Record<string, any>
  classes: string[]
  children: UiNode[]
}
