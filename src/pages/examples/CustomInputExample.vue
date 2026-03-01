<script setup lang="ts">
import { ref } from 'vue'
import {
  TextField,
  EmailField,
  useForm,
  FormField,
  provideFormAdapters,
  vuetifyAdapters,
} from '../../shared/form'
import PlainTextInput from './PlainTextInput.vue'

// Register custom adapter scoped only to this component and its children.
// `text` and `email` are overridden — all other field types fall back to Vuetify.
provideFormAdapters({
  ...vuetifyAdapters,
  text: {
    component: PlainTextInput,
    props: (ctx) => ({
      modelValue: ctx.value,
      placeholder: ctx.field.config.placeholder,
      disabled: ctx.field.isDisabled,
      readonly: ctx.field.isReadonly,
      errorMessages: ctx.errors,
    }),
  },
  email: {
    component: PlainTextInput,
    props: (ctx) => ({
      modelValue: ctx.value,
      placeholder: ctx.field.config.placeholder,
      disabled: ctx.field.isDisabled,
      errorMessages: ctx.errors,
    }),
  },
})

const { form, submit, isSubmitting, reset } = useForm({
  name: new TextField({
    label: "Ім'я",
    placeholder: "Введіть ваше ім'я",
    validations: { required: true, minLength: 2 },
  }),
  email: new EmailField({
    label: 'Email',
    placeholder: 'user@example.com',
    validations: { required: true, email: true },
  }),
})

const submitted = ref(false)
const handleSubmit = () =>
  submit(() => {
    submitted.value = true
    reset()
  })
</script>

<template>
  <VForm @submit.prevent="handleSubmit">
    <VRow>
      <VCol cols="12" md="6">
        <FormField v-model="form.name" />
      </VCol>
      <VCol cols="12" md="6">
        <FormField v-model="form.email" />
      </VCol>
    </VRow>

    <div class="d-flex ga-2 mt-4">
      <VBtn type="submit" color="primary" variant="flat" :loading="isSubmitting">
        Submit
      </VBtn>
      <VBtn variant="outlined" @click="reset">Reset</VBtn>
    </div>

    <VAlert v-if="submitted" type="success" class="mt-4" closable @click:close="submitted = false">
      Submitted successfully!
    </VAlert>
  </VForm>
</template>
