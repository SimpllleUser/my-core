<script setup lang="ts">
import { Icons } from '../../shared/model'
import { ref } from 'vue'
import {
  TextField,
  EmailField,
  PasswordField,
  NumberField,
  SelectField,
  TextareaField,
  CheckboxField,
  useForm,
  FormField,
  minLength,
  maxLength,
  required,
} from '../../shared/form'
import CustomInputExample from './CustomInputExample.vue'

// --- Registration Form ---
const {
  form: registerForm,
  submit: registerSubmit,
  isSubmitting: registerSubmitting,
  reset: registerReset,
} = useForm({
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
    // validations: { required: true, rules: [required('Необхідно прийняти умови')] },
  }),
})

const registerSubmitted = ref(false)
const handleRegister = () =>
  registerSubmit(() => {
    registerSubmitted.value = true
    registerReset()
  })

// --- Login Form ---
const {
  form: loginForm,
  submit: loginSubmit,
  isSubmitting: loginSubmitting,
  reset: loginReset,
} = useForm({
  email: new EmailField({
    label: 'Email',
    placeholder: 'user@example.com',
    validations: { required: true },
  }),
  password: new PasswordField({
    label: 'Пароль',
    validations: { required: true, rules: [minLength(6)] },
  }),
  remember: new CheckboxField({
    label: "Запам'ятати мене",
  }),
})

const loginSubmitted = ref(false)
const handleLogin = () =>
  loginSubmit(() => {
    loginSubmitted.value = true
    loginReset()
  })

// --- Feedback Form ---
const {
  form: feedbackForm,
  submit: feedbackSubmit,
  isSubmitting: feedbackSubmitting,
  reset: feedbackReset,
} = useForm({
  name: new TextField({
    label: "Ім'я",
    validations: { required: true, rules: [minLength(2)] },
  }),
  email: new EmailField({
    label: 'Email',
    validations: { required: true },
  }),
  category: new SelectField({
    label: 'Категорія',
    validations: { required: true },
    options: [
      { title: 'Баг', value: 'bug' },
      { title: 'Пропозиція', value: 'feature' },
      { title: 'Питання', value: 'question' },
      { title: 'Інше', value: 'other' },
    ],
  }),
  message: new TextareaField({
    label: 'Повідомлення',
    placeholder: 'Опишіть вашу проблему або пропозицію...',
    validations: { required: true, rules: [minLength(10), maxLength(500)] },
    rows: 4,
    autoGrow: true,
  }),
})

const feedbackSubmitted = ref(false)
const handleFeedback = () =>
  feedbackSubmit(() => {
    feedbackSubmitted.value = true
    feedbackReset()
  })

// --- Profile Settings Form ---
const {
  form: profileForm,
  submit: profileSubmit,
  reset: profileReset,
} = useForm({
  firstName: new TextField({
    label: "Ім'я",
    value: 'Іван',
    validations: { required: true, rules: [minLength(2)] },
  }),
  lastName: new TextField({
    label: 'Прізвище',
    value: 'Петренко',
    validations: { required: true, rules: [minLength(2)] },
  }),
  age: new NumberField({
    label: 'Вік',
    value: 30,
  }),
  bio: new TextareaField({
    label: 'Про себе',
    value: 'Frontend developer з Києва',
    rows: 3,
    autoGrow: true,
    validations: { rules: [maxLength(200)] },
  }),
  language: new SelectField({
    label: 'Мова інтерфейсу',
    value: 'uk',
    options: [
      { title: 'Українська', value: 'uk' },
      { title: 'English', value: 'en' },
      { title: 'Polski', value: 'pl' },
    ],
  }),
  notifications: new CheckboxField({
    label: 'Отримувати сповіщення на email',
    info: 'Ви будете отримувати листи про важливі події',
    value: true,
  }),
})

const profileSubmitted = ref(false)
const handleProfile = () =>
  profileSubmit(() => {
    profileSubmitted.value = true
  })
</script>

<template>
  <VContainer fluid class="pa-6">
    <!-- Header -->
    <VRow class="mb-6">
      <VCol cols="12">
        <VBtn
          to="/examples"
          variant="text"
          :prepend-icon="Icons.ArrowLeft"
          class="mb-4"
        >
          Back to Examples
        </VBtn>
        <h1 class="text-h3 font-weight-bold mb-2">
          <VIcon :icon="Icons.FormTextbox" size="large" color="teal" class="mr-2" />
          Form Module
        </h1>
        <p class="text-h6 text-medium-emphasis">
          Dynamic form system with validation, field types, and reactive state management
        </p>
      </VCol>
    </VRow>

    <!-- Registration Form -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon :icon="Icons.AccountPlus" class="mr-2" />
            Registration Form
            <VSpacer />
            <VChip color="teal" size="small">useForm, FormField, validations</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">User registration with email validation, password, role select, and checkbox</p>
            <VForm @submit.prevent="handleRegister">
              <VRow>
                <VCol cols="12" md="6">
                  <FormField v-model="registerForm.name" />
                </VCol>
                <VCol cols="12" md="6">
                  <FormField v-model="registerForm.email" />
                </VCol>
                <VCol cols="12" md="6">
                  <FormField v-model="registerForm.role" />
                </VCol>
                <VCol cols="12" md="6">
                  <FormField v-model="registerForm.password" />
                </VCol>
                <VCol cols="12">
                  <FormField v-model="registerForm.agree" />
                </VCol>
              </VRow>
              <div class="d-flex ga-2 mt-2">
                <VBtn type="submit" color="primary" variant="flat" :loading="registerSubmitting">
                  Register
                </VBtn>
                <VBtn variant="outlined" @click="registerReset">Reset</VBtn>
              </div>
            </VForm>
            <VAlert v-if="registerSubmitted" type="success" class="mt-4" closable @click:close="registerSubmitted = false">
              Registration submitted successfully!
            </VAlert>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Login Form -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon :icon="Icons.Login" class="mr-2" />
            Login Form
            <VSpacer />
            <VChip color="teal" size="small">EmailField, PasswordField, validators</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Simple login form with email and password validation</p>
            <VForm @submit.prevent="handleLogin">
              <VRow>
                <VCol cols="12">
                  <FormField v-model="loginForm.email" />
                </VCol>
                <VCol cols="12">
                  <FormField v-model="loginForm.password" />
                </VCol>
                <VCol cols="12">
                  <FormField v-model="loginForm.remember" />
                </VCol>
              </VRow>
              <div class="d-flex ga-2 mt-2">
                <VBtn type="submit" color="primary" variant="flat" :loading="loginSubmitting">
                  Login
                </VBtn>
                <VBtn variant="outlined" @click="loginReset">Reset</VBtn>
              </div>
            </VForm>
            <VAlert v-if="loginSubmitted" type="success" class="mt-4" closable @click:close="loginSubmitted = false">
              Login successful!
            </VAlert>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Feedback Form -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon :icon="Icons.MessageText" class="mr-2" />
            Feedback Form
            <VSpacer />
            <VChip color="teal" size="small">TextareaField, SelectField, maxLength</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Feedback form with textarea, category select, and validation rules</p>
            <VForm @submit.prevent="handleFeedback">
              <VRow>
                <VCol cols="12" md="6">
                  <FormField v-model="feedbackForm.name" />
                </VCol>
                <VCol cols="12" md="6">
                  <FormField v-model="feedbackForm.email" />
                </VCol>
                <VCol cols="12">
                  <FormField v-model="feedbackForm.category" />
                </VCol>
                <VCol cols="12">
                  <FormField v-model="feedbackForm.message" />
                </VCol>
              </VRow>
              <div class="d-flex ga-2 mt-2">
                <VBtn type="submit" color="primary" variant="flat" :loading="feedbackSubmitting">
                  Send Feedback
                </VBtn>
                <VBtn variant="outlined" @click="feedbackReset">Reset</VBtn>
              </div>
            </VForm>
            <VAlert v-if="feedbackSubmitted" type="success" class="mt-4" closable @click:close="feedbackSubmitted = false">
              Feedback sent successfully!
            </VAlert>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Profile Settings Form -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon :icon="Icons.AccountCog" class="mr-2" />
            Profile Settings
            <VSpacer />
            <VChip color="teal" size="small">NumberField, value, info tooltip</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Profile form with pre-filled values, NumberField, and info tooltips</p>
            <VForm @submit.prevent="handleProfile">
              <VRow>
                <VCol cols="12" md="6">
                  <FormField v-model="profileForm.firstName" />
                </VCol>
                <VCol cols="12" md="6">
                  <FormField v-model="profileForm.lastName" />
                </VCol>
                <VCol cols="12" md="2">
                  <FormField v-model="profileForm.age" />
                </VCol>
                <VCol cols="12">
                  <FormField v-model="profileForm.bio" />
                </VCol>
                <VCol cols="12" md="6">
                  <FormField v-model="profileForm.language" />
                </VCol>
                <VCol cols="12" md="6">
                  <FormField v-model="profileForm.notifications" />
                </VCol>
              </VRow>
              <div class="d-flex ga-2 align-center mt-2">
                <VBtn type="submit" color="primary" variant="flat">
                  Save Changes
                </VBtn>
                <VBtn variant="outlined" @click="profileReset">Reset</VBtn>
              </div>
            </VForm>
            <VAlert v-if="profileSubmitted" type="success" class="mt-4" closable @click:close="profileSubmitted = false">
              Profile updated!
            </VAlert>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Custom Input Adapter Example -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon :icon="Icons.Pencil" class="mr-2" />
            Custom Input Adapter
            <VSpacer />
            <VChip color="deep-purple" size="small">provideFormAdapters, PlainTextInput</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">
              Поля <code>text</code> та <code>email</code> замінені на кастомний <code>PlainTextInput</code>
              без залежності від Vuetify. Адаптер зареєстровано локально через
              <code>provideFormAdapters</code> всередині компонента.
            </p>
            <CustomInputExample />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
