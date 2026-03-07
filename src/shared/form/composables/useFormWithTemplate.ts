import { reactive } from 'vue'
import type { BaseField } from '../fields/BaseField'
import type { FieldConfig, UseFormStateOptions } from '../types/field.types'
import type { TemplateNode, TemplateChild, NodeOptions } from '../template/types'
import { useForm } from './useForm'

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Recursively build a flat map of { id → node } for all nodes that carry an id */
function buildNodeMap(nodes: TemplateNode[]): Record<string, TemplateNode> {
  const map: Record<string, TemplateNode> = {}

  function walk(node: TemplateNode) {
    if ('id' in node && node.id) map[node.id] = node
    if ('children' in node) {
      for (const child of node.children) {
        if (typeof child !== 'string') walk(child as TemplateNode)
      }
    }
  }

  for (const node of nodes) walk(node)
  return map
}

/** Rebuild the id→node index after a structural change to the template */
function rebuildMap(
  template: TemplateNode[],
  index: Record<string, TemplateNode>,
) {
  for (const key of Object.keys(index)) delete index[key]
  Object.assign(index, buildNodeMap(template))
}

// ---------------------------------------------------------------------------
// Composable
// ---------------------------------------------------------------------------

/**
 * Combines `useForm` with a declarative layout template.
 *
 * On top of everything returned by `useForm` this composable also exposes:
 *
 * - **`template`** — a deeply reactive `TemplateNode[]` array.
 *   You can mutate any property directly and the `<FormTemplate>` will react.
 *
 * - **`patchNode(id, changes)`** — update a node's options (props, class, visible…)
 *   by the `id` you assigned in the builder call.
 *
 * - **`patchField(key, changes)`** — mutate a field's config properties
 *   (label, placeholder, disabled, options for SelectField, …) reactively.
 *
 * - **`setTemplate(newTemplate)`** — replace the whole template at once.
 *
 * @example
 * ```ts
 * const { form, template, handleBlur, patchNode, patchField, setTemplate, submit } =
 *   useFormWithTemplate(
 *     {
 *       name:  new TextField({ label: "Ім'я", validations: { required: true } }),
 *       role:  new SelectField({ label: 'Роль', options: [] }),
 *     },
 *     [
 *       row([
 *         col(['name'],  { id: 'col-name', props: { cols: 12, md: 6 } }),
 *         col(['role'],  { id: 'col-role', props: { cols: 12, md: 6 } }),
 *       ]),
 *       row([
 *         col([slot('actions')], { id: 'col-actions', props: { cols: 12 } }),
 *       ]),
 *     ],
 *   )
 *
 * // Змінити ширину колонки
 * patchNode('col-name', { props: { cols: 12 } })
 *
 * // Приховати колонку
 * patchNode('col-role', { visible: false })
 *
 * // Оновити опції select поля
 * patchField('role', { options: [{ title: 'Адмін', value: 'admin' }] })
 *
 * // Дизейблити поле
 * patchField('name', { disabled: true })
 *
 * // Повністю замінити шаблон
 * setTemplate([ row([ col(['name'], { props: { cols: 12 } }) ]) ])
 * ```
 */
export const useFormWithTemplate = <TFields extends Record<string, BaseField>>(
  fields: TFields,
  templateDef: TemplateNode[],
  options?: UseFormStateOptions,
) => {
  const formState = useForm(fields, options)

  // Make the template deeply reactive so in-place mutations trigger re-renders
  const template = reactive(templateDef) as TemplateNode[]

  // Lazy id-index — rebuilt on demand after structural changes
  const nodeIndex: Record<string, TemplateNode> = buildNodeMap(template)

  // -------------------------------------------------------------------------
  // patchNode
  // -------------------------------------------------------------------------

  /**
   * Update the options of a specific layout node identified by its `id`.
   * Accepts any subset of `NodeOptions` (props, class, visible, …).
   *
   * @example
   * patchNode('col-name', { props: { cols: 12 }, class: 'highlighted' })
   * patchNode('row-actions', { visible: false })
   */
  const patchNode = (id: string, changes: Partial<NodeOptions>): void => {
    const node = nodeIndex[id]
    if (!node) {
      console.warn(`[useFormWithTemplate] patchNode: node with id "${id}" not found`)
      return
    }

    if (changes.props !== undefined) {
      // Merge props so callers don't have to repeat unchanged keys
      ;(node as NodeOptions).props = { ...(node as NodeOptions).props, ...changes.props }
    }
    if ('class' in changes) (node as NodeOptions).class = changes.class
    if ('visible' in changes) (node as NodeOptions).visible = changes.visible
    if ('id' in changes && changes.id && changes.id !== (node as NodeOptions).id) {
      // ID renamed – update index
      delete nodeIndex[(node as NodeOptions).id!]
      ;(node as NodeOptions).id = changes.id
      nodeIndex[changes.id] = node
    }
  }

  // -------------------------------------------------------------------------
  // patchField
  // -------------------------------------------------------------------------

  /**
   * Reactively update any properties of a field's config.
   * Works for all field types — e.g. `options` on `SelectField`,
   * `disabled`, `label`, `placeholder`, `validations`, etc.
   *
   * Because `useForm` wraps fields inside `reactive()`, Vue tracks the config
   * properties and any component reading them will re-render automatically.
   *
   * @example
   * patchField('role', { options: fetchedOptions })
   * patchField('name', { disabled: true, label: 'Full name' })
   * patchField('email', { validations: { required: false } })
   */
  const patchField = (
    key: string,
    changes: Partial<FieldConfig> & Record<string, unknown>,
  ): void => {
    const state = (formState.form as Record<string, { field: BaseField } | undefined>)[key]
    if (!state?.field?.config) {
      console.warn(`[useFormWithTemplate] patchField: field "${key}" not found`)
      return
    }

    // config is a plain reactive object inside Vue's reactive() — direct property
    // assignment goes through the Proxy and triggers reactivity correctly.
    Object.assign(state.field.config as Record<string, unknown>, changes)
  }

  // -------------------------------------------------------------------------
  // setTemplate
  // -------------------------------------------------------------------------

  /**
   * Replace the entire layout template.
   * Splices the reactive array in-place so Vue picks up the change.
   *
   * @example
   * setTemplate([ row([ col(['name'], { props: { cols: 12 } }) ]) ])
   */
  const setTemplate = (newTemplate: TemplateNode[]): void => {
    template.splice(0, template.length, ...newTemplate)
    rebuildMap(template, nodeIndex)
  }

  return {
    ...formState,
    /** Deeply reactive template array – mutate directly or via helpers */
    template,
    patchNode,
    patchField,
    setTemplate,
  }
}
