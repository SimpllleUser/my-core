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
            <VChip color="teal" size="small">FormConfig, DynamicField, useFormState</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">User registration with email validation, password, role select, and checkbox</p>
            <VForm @submit.prevent="handleRegister">
              <VRow>
                <VCol cols="12" md="6">
                  <DynamicField v-bind="registerBind.name" />
                </VCol>
                <VCol cols="12" md="6">
                  <DynamicField v-bind="registerBind.email" />
                </VCol>
                <VCol cols="12" md="6">
                  <DynamicField v-bind="registerBind.role" />
                </VCol>
                <VCol cols="12" md="6">
                  <DynamicField v-bind="registerBind.password" />
                </VCol>
                <VCol cols="12">
                  <DynamicField v-bind="registerBind.agree" />
                </VCol>
              </VRow>
              <div class="d-flex ga-2 mt-2">
                <VBtn type="submit" color="primary" variant="flat" :disabled="!registerValid">
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
                  <DynamicField v-bind="loginBind.email" />
                </VCol>
                <VCol cols="12">
                  <DynamicField v-bind="loginBind.password" />
                </VCol>
                <VCol cols="12">
                  <DynamicField v-bind="loginBind.remember" />
                </VCol>
              </VRow>
              <div class="d-flex ga-2 mt-2">
                <VBtn type="submit" color="primary" variant="flat" :disabled="!loginValid">
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
                  <DynamicField v-bind="feedbackBind.name" />
                </VCol>
                <VCol cols="12" md="6">
                  <DynamicField v-bind="feedbackBind.email" />
                </VCol>
                <VCol cols="12">
                  <DynamicField v-bind="feedbackBind.category" />
                </VCol>
                <VCol cols="12">
                  <DynamicField v-bind="feedbackBind.message" />
                </VCol>
              </VRow>
              <div class="d-flex ga-2 mt-2">
                <VBtn type="submit" color="primary" variant="flat" :disabled="!feedbackValid">
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
            <VChip color="teal" size="small">isDirty, setValues, vuetifyProps</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Profile form with pre-filled values, dirty state tracking, and custom vuetify props</p>
            <VForm @submit.prevent="handleProfile">
              <VRow>
                <VCol cols="12" md="6">
                  <DynamicField v-bind="profileBind.firstName" />
                </VCol>
                <VCol cols="12" md="6">
                  <DynamicField v-bind="profileBind.lastName" />
                </VCol>
                <VCol cols="12">
                  <DynamicField v-bind="profileBind.bio" />
                </VCol>
                <VCol cols="12" md="6">
                  <DynamicField v-bind="profileBind.language" />
                </VCol>
                <VCol cols="12" md="6">
                  <DynamicField v-bind="profileBind.notifications" />
                </VCol>
              </VRow>
              <div class="d-flex ga-2 align-center mt-2">
                <VBtn type="submit" color="primary" variant="flat" :disabled="!profileDirty">
                  Save Changes
                </VBtn>
                <VBtn variant="outlined" @click="profileReset">Reset</VBtn>
                <VChip v-if="profileDirty" color="warning" size="small" class="ml-2">
                  Unsaved changes
                </VChip>
              </div>
            </VForm>
            <VAlert v-if="profileSubmitted" type="success" class="mt-4" closable @click:close="profileSubmitted = false">
              Profile updated!
            </VAlert>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { Icons } from '@/shared/model'
import { ref } from 'vue'
import {
  FormConfig,
  TextField,
  EmailField,
  PasswordField,
  SelectField,
  TextareaField,
  CheckboxField,
  useFormState,
  DynamicField,
  minLength,
  maxLength,
  required,
} from '@/shared/form'

// --- Registration Form ---
const registerForm = new FormConfig({
  name: new TextField({
    label: "Ім'я",
    placeholder: "Введіть ваше ім'я",
    required: true,
    rules: [minLength(2)],
  }),
  email: new EmailField({
    label: 'Email',
    placeholder: 'user@example.com',
    required: true,
  }),
  role: new SelectField({
    label: 'Роль',
    required: true,
    options: [
      { title: 'Адмін', value: 'admin' },
      { title: 'Менеджер', value: 'manager' },
      { title: 'Користувач', value: 'user' },
    ],
  }),
  password: new PasswordField({
    label: 'Пароль',
    required: true,
    rules: [minLength(8)],
  }),
  agree: new CheckboxField({
    label: 'Я погоджуюсь з умовами',
    required: true,
    rules: [required('Необхідно прийняти умови')],
  }),
})

const {
  bind: registerBind,
  isValid: registerValid,
  validateAll: registerValidateAll,
  reset: registerReset,
} = useFormState(registerForm.getFields())

const registerSubmitted = ref(false)
const handleRegister = () => {
  if (!registerValidateAll()) return
  registerSubmitted.value = true
  registerReset()
}

// --- Login Form ---
const loginForm = new FormConfig({
  email: new EmailField({
    label: 'Email',
    placeholder: 'user@example.com',
    required: true,
  }),
  password: new PasswordField({
    label: 'Пароль',
    required: true,
    rules: [minLength(6)],
  }),
  remember: new CheckboxField({
    label: "Запам'ятати мене",
  }),
})

const {
  bind: loginBind,
  isValid: loginValid,
  validateAll: loginValidateAll,
  reset: loginReset,
} = useFormState(loginForm.getFields())

const loginSubmitted = ref(false)
const handleLogin = () => {
  if (!loginValidateAll()) return
  loginSubmitted.value = true
  loginReset()
}

// --- Feedback Form ---
const feedbackForm = new FormConfig({
  name: new TextField({
    label: "Ім'я",
    required: true,
    rules: [minLength(2)],
  }),
  email: new EmailField({
    label: 'Email',
    required: true,
  }),
  category: new SelectField({
    label: 'Категорія',
    required: true,
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
    required: true,
    rules: [minLength(10), maxLength(500)],
    rows: 4,
    autoGrow: true,
  }),
})

const {
  bind: feedbackBind,
  isValid: feedbackValid,
  validateAll: feedbackValidateAll,
  reset: feedbackReset,
} = useFormState(feedbackForm.getFields())

const feedbackSubmitted = ref(false)
const handleFeedback = () => {
  if (!feedbackValidateAll()) return
  feedbackSubmitted.value = true
  feedbackReset()
}

// --- Profile Settings Form ---
const profileForm = new FormConfig({
  firstName: new TextField({
    label: "Ім'я",
    required: true,
    defaultValue: 'Іван',
    rules: [minLength(2)],
  }),
  lastName: new TextField({
    label: 'Прізвище',
    required: true,
    defaultValue: 'Петренко',
    rules: [minLength(2)],
  }),
  bio: new TextareaField({
    label: 'Про себе',
    defaultValue: 'Frontend developer з Києва',
    rows: 3,
    autoGrow: true,
    rules: [maxLength(200)],
  }),
  language: new SelectField({
    label: 'Мова інтерфейсу',
    defaultValue: 'uk',
    options: [
      { title: 'Українська', value: 'uk' },
      { title: 'English', value: 'en' },
      { title: 'Polski', value: 'pl' },
    ],
  }),
  notifications: new CheckboxField({
    label: 'Отримувати сповіщення на email',
    defaultValue: true,
  }),
})

const {
  bind: profileBind,
  isDirty: profileDirty,
  validateAll: profileValidateAll,
  reset: profileReset,
} = useFormState(profileForm.getFields())

const profileSubmitted = ref(false)
const handleProfile = () => {
  if (!profileValidateAll()) return
  profileSubmitted.value = true
}
</script>
