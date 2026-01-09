<!--
  Snippet: Login Simple
  Description: Highly customizable login form with email/password fields
  Components: AuthPageLayout, VCard, VTextField, VBtn, VCheckbox

  Layout Props (passed to AuthPageLayout):
    - formPosition: 'left' | 'center' | 'right' (form position)
    - backgroundType: 'color' | 'image' | 'gradient' | 'split'
    - backgroundColor: string
    - backgroundImage: string
    - backgroundGradient: string
    - overlayColor: string
    - overlayOpacity: number
    - splitRatio: number
    - sideContentBackground: string
    - sideContentImage: string
    - showPattern: boolean

  Form Props:
    - cardElevation: number
    - cardRounded: string
    - cardColor: string
    - cardVariant: 'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain'
    - showToolbar: boolean
    - toolbarColor: string
    - toolbarTitle: string
    - showRememberMe: boolean
    - showForgotPassword: boolean
    - showSignUpLink: boolean
    - submitButtonText: string
    - submitButtonColor: string
    - emailLabel: string
    - passwordLabel: string
    - inputVariant: 'outlined' | 'filled' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled' | 'plain'
    - inputDensity: 'default' | 'comfortable' | 'compact'
    - showInputIcons: boolean

  Slots:
    - logo: Logo above the form
    - header: Custom header content
    - title: Custom title (replaces toolbar)
    - subtitle: Subtitle below title
    - prepend-form: Content before form fields
    - email-field: Custom email field
    - password-field: Custom password field
    - after-password: Content after password field (before remember me)
    - remember-me: Custom remember me checkbox
    - form-actions: Custom form actions
    - submit-button: Custom submit button
    - forgot-password: Custom forgot password link
    - append-form: Content after form
    - footer: Custom footer with sign up link
    - side-content: Content for split layout side
    - side-logo: Logo in side content
    - side-title: Title in side content
    - side-subtitle: Subtitle in side content

  Events:
    - submit: Emitted with { email, password, rememberMe }
    - forgot-password: Emitted when forgot password is clicked
    - sign-up: Emitted when sign up is clicked
-->
<template>
  <AuthPageLayout
    :form-position="formPosition"
    :background-type="backgroundType"
    :background-color="backgroundColor"
    :background-image="backgroundImage"
    :background-gradient="backgroundGradient"
    :overlay-color="overlayColor"
    :overlay-opacity="overlayOpacity"
    :split-ratio="splitRatio"
    :side-content-background="sideContentBackground"
    :side-content-image="sideContentImage"
    :show-pattern="showPattern"
    :min-height="minHeight"
  >
    <template #logo>
      <slot name="logo" />
    </template>

    <template #header>
      <slot name="header" />
    </template>

    <template #side-content>
      <slot name="side-content" />
    </template>

    <template #side-logo>
      <slot name="side-logo" />
    </template>

    <template #side-title>
      <slot name="side-title" />
    </template>

    <template #side-subtitle>
      <slot name="side-subtitle" />
    </template>

    <VCard
      :elevation="cardElevation"
      :rounded="cardRounded"
      :color="cardColor"
      :variant="cardVariant"
      class="login-simple-card"
    >
      <!-- Toolbar / Title -->
      <slot name="title">
        <VToolbar
          v-if="showToolbar"
          :color="toolbarColor"
          dark
          flat
        >
          <VToolbarTitle>{{ toolbarTitle }}</VToolbarTitle>
        </VToolbar>

        <VCardTitle
          v-else-if="!showToolbar && toolbarTitle"
          class="text-h5 font-weight-bold pa-6 pb-2"
        >
          {{ toolbarTitle }}
        </VCardTitle>
      </slot>

      <slot name="subtitle">
        <VCardSubtitle
          v-if="subtitle && !showToolbar"
          class="px-6 pb-4"
        >
          {{ subtitle }}
        </VCardSubtitle>
      </slot>

      <VCardText>
        <slot name="prepend-form" />

        <VForm ref="formRef" v-model="valid" lazy-validation>
          <!-- Email Field -->
          <slot name="email-field" :email="email" :rules="emailRules" :update-email="(v: string) => email = v">
            <VTextField
              v-model="email"
              :rules="emailRules"
              :label="emailLabel"
              :prepend-icon="showInputIcons ? 'mdi-email' : undefined"
              :prepend-inner-icon="!showInputIcons ? undefined : undefined"
              type="email"
              required
              :variant="inputVariant"
              :density="inputDensity"
              class="mb-4"
            />
          </slot>

          <!-- Password Field -->
          <slot name="password-field" :password="password" :rules="passwordRules" :show-password="showPassword" :toggle-password="() => showPassword = !showPassword" :update-password="(v: string) => password = v">
            <VTextField
              v-model="password"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              :label="passwordLabel"
              :prepend-icon="showInputIcons ? 'mdi-lock' : undefined"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :variant="inputVariant"
              :density="inputDensity"
              @click:append="showPassword = !showPassword"
            />
          </slot>

          <slot name="after-password" />

          <!-- Remember Me -->
          <slot name="remember-me" :remember-me="rememberMe" :update-remember-me="(v: boolean) => rememberMe = v">
            <VCheckbox
              v-if="showRememberMe"
              v-model="rememberMe"
              :label="rememberMeLabel"
              :color="submitButtonColor"
            />
          </slot>
        </VForm>

        <slot name="append-form" />
      </VCardText>

      <!-- Form Actions -->
      <slot name="form-actions" :submit="submit" :loading="loading" :valid="valid">
        <VCardActions class="px-4 pb-4">
          <slot name="forgot-password" :on-click="handleForgotPassword">
            <VBtn
              v-if="showForgotPassword"
              variant="text"
              :color="submitButtonColor"
              @click="handleForgotPassword"
            >
              {{ forgotPasswordText }}
            </VBtn>
          </slot>

          <VSpacer />

          <slot name="submit-button" :submit="submit" :loading="loading" :valid="valid">
            <VBtn
              :color="submitButtonColor"
              size="large"
              :loading="loading"
              :disabled="!valid"
              @click="submit"
            >
              {{ submitButtonText }}
            </VBtn>
          </slot>
        </VCardActions>
      </slot>

      <template v-if="showSignUpLink">
        <VDivider />

        <!-- Footer -->
        <slot name="footer" :on-sign-up="handleSignUp">
          <VCardText class="text-center">
            <span class="text-medium-emphasis">{{ signUpPromptText }}</span>
            <VBtn
              variant="text"
              :color="submitButtonColor"
              @click="handleSignUp"
            >
              {{ signUpButtonText }}
            </VBtn>
          </VCardText>
        </slot>
      </template>
    </VCard>
  </AuthPageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AuthPageLayout from './AuthPageLayout.vue'

// Layout Props
export interface LoginSimpleProps {
  // Layout props
  formPosition?: 'left' | 'center' | 'right'
  backgroundType?: 'color' | 'image' | 'gradient' | 'split'
  backgroundColor?: string
  backgroundImage?: string
  backgroundGradient?: string
  overlayColor?: string
  overlayOpacity?: number
  splitRatio?: number
  sideContentBackground?: string
  sideContentImage?: string
  showPattern?: boolean
  minHeight?: string

  // Card props
  cardElevation?: number
  cardRounded?: string
  cardColor?: string
  cardVariant?: 'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain'

  // Toolbar props
  showToolbar?: boolean
  toolbarColor?: string
  toolbarTitle?: string
  subtitle?: string

  // Form field props
  emailLabel?: string
  passwordLabel?: string
  inputVariant?: 'outlined' | 'filled' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled' | 'plain'
  inputDensity?: 'default' | 'comfortable' | 'compact'
  showInputIcons?: boolean

  // Feature toggles
  showRememberMe?: boolean
  showForgotPassword?: boolean
  showSignUpLink?: boolean

  // Text customization
  rememberMeLabel?: string
  forgotPasswordText?: string
  submitButtonText?: string
  signUpPromptText?: string
  signUpButtonText?: string

  // Button styling
  submitButtonColor?: string

  // Initial values
  initialEmail?: string
  initialRememberMe?: boolean
}

const props = withDefaults(defineProps<LoginSimpleProps>(), {
  // Layout defaults
  formPosition: 'center',
  backgroundType: 'color',
  backgroundColor: undefined,
  backgroundImage: undefined,
  backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  overlayColor: 'rgba(0, 0, 0, 0.5)',
  overlayOpacity: 0.5,
  splitRatio: 6,
  sideContentBackground: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  sideContentImage: undefined,
  showPattern: false,
  minHeight: '100vh',

  // Card defaults
  cardElevation: 12,
  cardRounded: 'lg',
  cardColor: undefined,
  cardVariant: 'elevated',

  // Toolbar defaults
  showToolbar: true,
  toolbarColor: 'primary',
  toolbarTitle: 'Sign In',
  subtitle: undefined,

  // Form field defaults
  emailLabel: 'Email',
  passwordLabel: 'Password',
  inputVariant: 'outlined',
  inputDensity: 'default',
  showInputIcons: true,

  // Feature defaults
  showRememberMe: true,
  showForgotPassword: true,
  showSignUpLink: true,

  // Text defaults
  rememberMeLabel: 'Remember me',
  forgotPasswordText: 'Forgot Password?',
  submitButtonText: 'Sign In',
  signUpPromptText: "Don't have an account?",
  signUpButtonText: 'Sign Up',

  // Button defaults
  submitButtonColor: 'primary',

  // Initial values
  initialEmail: '',
  initialRememberMe: false,
})

// Emits
const emit = defineEmits<{
  submit: [payload: { email: string; password: string; rememberMe: boolean }]
  'forgot-password': []
  'sign-up': []
}>()

// Form state
const formRef = ref()
const valid = ref(true)
const loading = ref(false)
const showPassword = ref(false)

const email = ref(props.initialEmail)
const password = ref('')
const rememberMe = ref(props.initialRememberMe)

// Validation rules
const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid',
]

const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 8 || 'Password must be at least 8 characters',
]

// Methods
const submit = async () => {
  const { valid: isValid } = await formRef.value.validate()
  if (!isValid) return

  loading.value = true

  emit('submit', {
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value,
  })

  // Reset loading after emit (parent should handle actual loading state)
  setTimeout(() => {
    loading.value = false
  }, 1500)
}

const handleForgotPassword = () => {
  emit('forgot-password')
}

const handleSignUp = () => {
  emit('sign-up')
}

// Expose for parent component access
defineExpose({
  formRef,
  email,
  password,
  rememberMe,
  valid,
  loading,
  submit,
})
</script>

<style scoped>
.login-simple-card {
  width: 100%;
}
</style>
