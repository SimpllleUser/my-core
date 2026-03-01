<script setup lang="ts">
import { Icons } from '../../model'
import {
  FormConfig,
  TextField,
  EmailField,
  PasswordField,
  SelectField,
  CheckboxField,
  useForm,
  FormField,
  required,
  minLength
} from '..';

const formConfig = new FormConfig({
  name: new TextField({
    label: "Ім'я",
    description: 'Введіть ваше повне імя',
    required: true,
    rules: [minLength(2)]
  }),
  email: new EmailField({
    label: 'Email',
    required: true
  }),
  role: new SelectField({
    label: 'Роль',
    required: true,
    options: [
      { title: 'Адмін', value: 'admin' },
      { title: 'Менеджер', value: 'manager' },
      { title: 'Користувач', value: 'user' }
    ]
  }),
  password: new PasswordField({
    label: 'Пароль',
    required: true,
    rules: [minLength(8)]
  }),
  agree: new CheckboxField({
    label: 'Я погоджуюсь з умовами',
    required: true,
    rules: [required('Необхідно прийняти умови')]
  })
});

const { form, isValid, validateAll, reset } = useForm(formConfig.getFields());

const handleSubmit = () => {
  if (!validateAll()) return;
  reset();
};
</script>

<template>
  <VForm @submit.prevent="handleSubmit">
    <VRow>
      <VCol
        cols="12"
        md="6"
      >
        <FormField v-model="form.name" />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <FormField v-model="form.email" />
      </VCol>

      <VCol cols="12">
        <FormField v-model="form.role" />
      </VCol>

      <VCol cols="12">
        <FormField v-model="form.password">
          <template #label="{ label, required }">
            <label class="custom-label">
              {{ label }}
              <VIcon
                v-if="required"
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
      :disabled="!isValid"
      block
    >
      Зареєструватись
    </VBtn>
  </VForm>
</template>
