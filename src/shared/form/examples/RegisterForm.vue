<script setup lang="ts">
import { Icons } from '../../model'
import {
  TextField,
  EmailField,
  PasswordField,
  SelectField,
  CheckboxField,
  useForm,
  FormField,
} from '../../lib/form'
import { required, minLength } from '..'

const { form, submit, isValid, reset } = useForm({
  name: new TextField({
    label: "Ім'я",
    description: 'Введіть ваше повне ім\'я',
    validations: { required: true, rules: [minLength(2)] },
  }),
  email: new EmailField({
    label: 'Email',
    validations: { required: true },
  }),
  role: new SelectField({
    label: 'Роль',
    validations: { required: true },
    options: [
      { title: 'Адмін', value: 'admin' },
      { title: 'Менеджер', value: 'manager' },
      { title: 'Користувач', value: 'user' },
    ],
  }),
  password: new PasswordField({
    label: 'Пароль',
    validations: { required: true, rules: [minLength(8)] },
  }),
  agree: new CheckboxField({
    label: 'Я погоджуюсь з умовами',
    info: 'Необхідно прийняти умови для продовження реєстрації',
    validations: { required: true, rules: [required('Необхідно прийняти умови')] },
  }),
})

const handleSubmit = () => submit(() => reset())
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

      <VCol cols="12">
        <FormField v-model="form.role" />
      </VCol>

      <VCol cols="12">
        <FormField v-model="form.password">
          <template #label="{ label, required: isRequired }">
            <label class="custom-label">
              {{ label }}
              <VIcon
                v-if="isRequired"
                :icon="Icons.Asterisk"
                size="8"
                color="error"
              />
            </label>
          </template>
        </FormField>
      </VCol>

      <VCol cols="12">
        <FormField v-model="form.agree" />
      </VCol>
    </VRow>

    <VBtn
      type="submit"
      color="primary"
      variant="flat"
      :disabled="isValid === false"
      block
    >
      Зареєструватись
    </VBtn>
  </VForm>
</template>
