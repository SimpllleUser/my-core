<script setup lang="ts">
import { ref } from 'vue'
import {
  TextField,
  EmailField,
  PasswordField,
  SelectField,
  CheckboxField,
  FormTemplate,
  useFormWithTemplate,
  row,
  col,
  block,
  slot,
} from '..'
import { minLength } from '..'

const { form, template, handleBlur, patchNode, patchField, setTemplate, submit, isValid, reset } =
  useFormWithTemplate(
    {
      name: new TextField({
        label: "Ім'я",
        placeholder: "Введіть ваше ім'я",
        validations: { required: true, rules: [minLength(2)] },
      }),
      email: new EmailField({
        label: 'Email',
        placeholder: 'user@example.com',
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
        info: 'Необхідно прийняти умови для продовження',
      }),
    },
    [
      row([
        col(['name'],  { id: 'col-name',  props: { cols: 12, md: 6 } }),
        col(['email'], { id: 'col-email', props: { cols: 12, md: 6 } }),
      ], { id: 'row-top' }),

      row([
        col(['role'], { id: 'col-role', props: { cols: 12 } }),
      ]),

      row([
        col(['password'], { id: 'col-password', props: { cols: 12, md: 8 } }),
        col([
          block([slot('password-hint')], { class: 'd-flex align-center' }),
        ], { props: { cols: 12, md: 4 } }),
      ]),

      row([
        col(['agree'], { props: { cols: 12, md: 8 } }),
        col([
          block([slot('actions')], { class: 'd-flex justify-end align-center gap-2' }),
        ], { props: { cols: 12, md: 4 } }),
      ]),
    ],
  )

// --- Демонстрація зовнішнього впливу ---

// Перемикач: ім'я + email в один рядок або кожен на повну ширину
const stackFields = ref(false)
const toggleLayout = () => {
  stackFields.value = !stackFields.value
  const size = stackFields.value ? 12 : 6
  patchNode('col-name',  { props: { cols: 12, md: size } })
  patchNode('col-email', { props: { cols: 12, md: size } })
}

// Приховати/показати поле ролі
const roleVisible = ref(true)
const toggleRole = () => {
  roleVisible.value = !roleVisible.value
  patchNode('col-role', { visible: roleVisible.value })
}

// Оновити опції ролі динамічно (напр. після запиту до API)
const loadExtraRoles = () => {
  patchField('role', {
    options: [
      { title: 'Адмін',       value: 'admin' },
      { title: 'Менеджер',    value: 'manager' },
      { title: 'Користувач',  value: 'user' },
      { title: 'Модератор',   value: 'moderator' },
      { title: 'Аналітик',    value: 'analyst' },
    ],
  })
}

// Дизейблити пароль (напр. при редагуванні через SSO)
const passwordDisabled = ref(false)
const togglePasswordDisabled = () => {
  passwordDisabled.value = !passwordDisabled.value
  patchField('password', { disabled: passwordDisabled.value })
}

const handleSubmit = () => submit(() => reset())
</script>

<template>
  <VCard max-width="720" class="mx-auto pa-6">
    <!-- Зовнішні контролери -->
    <div class="d-flex flex-wrap gap-2 mb-6">
      <VBtn size="small" variant="tonal" @click="toggleLayout">
        {{ stackFields ? 'Split layout' : 'Stack layout' }}
      </VBtn>
      <VBtn size="small" variant="tonal" @click="toggleRole">
        {{ roleVisible ? 'Hide role' : 'Show role' }}
      </VBtn>
      <VBtn size="small" variant="tonal" @click="loadExtraRoles">
        Load more roles
      </VBtn>
      <VBtn size="small" variant="tonal" @click="togglePasswordDisabled">
        {{ passwordDisabled ? 'Enable password' : 'Disable password' }}
      </VBtn>
    </div>

    <VForm @submit.prevent="handleSubmit">
      <FormTemplate :template="template" :form="form" :handle-blur="handleBlur">
        <template #password-hint>
          <VAlert type="info" variant="tonal" density="compact" class="text-caption w-100">
            Мінімум 8 символів
          </VAlert>
        </template>

        <template #actions>
          <VBtn variant="text" @click="reset">Скинути</VBtn>
          <VBtn
            type="submit"
            color="primary"
            variant="flat"
            :disabled="!isValid"
          >
            Зареєструватись
          </VBtn>
        </template>
      </FormTemplate>
    </VForm>
  </VCard>
</template>
