import { VTextField, VTextarea, VSelect, VCheckbox, VAutocomplete } from 'vuetify/components'
import type { AdapterRegistry, InputAdapterContext } from './types'
import type { SelectField } from '../fields/SelectField'
import type { TextareaField } from '../fields/TextareaField'

function base(ctx: InputAdapterContext): Record<string, unknown> {
  return {
    modelValue: ctx.value,
    disabled: ctx.field.isDisabled,
    readonly: ctx.field.isReadonly,
    placeholder: ctx.field.config.placeholder,
    errorMessages: ctx.errors,
    variant: 'outlined',
    density: 'comfortable',
    ...ctx.field.vuetifyProps,
  }
}

export const vuetifyAdapters: AdapterRegistry = {
  text: {
    component: VTextField,
    props: (ctx) => base(ctx),
  },
  email: {
    component: VTextField,
    props: (ctx) => ({ ...base(ctx), type: 'email' }),
  },
  password: {
    component: VTextField,
    props: (ctx) => ({ ...base(ctx), type: 'password' }),
  },
  number: {
    component: VTextField,
    props: (ctx) => ({ ...base(ctx), type: 'number' }),
  },
  textarea: {
    component: VTextarea,
    props: (ctx) => {
      const f = ctx.field as TextareaField
      return { ...base(ctx), rows: f.config.rows ?? 4, autoGrow: f.config.autoGrow ?? false }
    },
  },
  select: {
    component: VSelect,
    props: (ctx) => {
      const f = ctx.field as SelectField
      return { ...base(ctx), items: f.options, multiple: f.multiple }
    },
  },
  autocomplete: {
    component: VAutocomplete,
    props: (ctx) => {
      const f = ctx.field as SelectField
      return { ...base(ctx), items: f.options, multiple: f.multiple }
    },
  },
  checkbox: {
    component: VCheckbox,
    props: (ctx) => base(ctx),
  },
}
