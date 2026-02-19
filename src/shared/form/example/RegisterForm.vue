<script setup lang="ts">
import {
  FormConfig,
  TextField,
  EmailField,
  PasswordField,
  SelectField,
  CheckboxField,
  useFormState,
  DynamicField,
  required,
  minLength
} from '@/shared/form';

const form = new FormConfig({
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

const { bind, isValid, validateAll, reset } = useFormState(form.getFields());

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
        <DynamicField v-bind="bind.name" />
      </VCol>

      <VCol
        cols="12"
        md="6"
      >
        <DynamicField v-bind="bind.email" />
      </VCol>

      <VCol cols="12">
        <DynamicField v-bind="bind.role" />
      </VCol>

      <VCol cols="12">
        <DynamicField v-bind="bind.password">
          <template #label="{ label, required }">
            <label class="custom-label">
              {{ label }}
              <VIcon
                v-if="required"
                icon="mdi-asterisk"
                size="8"
                color="error"
              />
            </label>
          </template>
        </DynamicField>
      </VCol>

      <VCol cols="12">
        <DynamicField v-bind="bind.agree" />
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
