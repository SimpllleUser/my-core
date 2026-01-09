<!--
  Snippet: Login with Social
  Description: Highly customizable login form with social authentication options
  Components: AuthPageLayout, VCard, VTextField, VBtn, VDivider, VIcon

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
    - cardPadding: string
    - title: string
    - subtitle: string
    - socialProviders: SocialProvider[]
    - showDivider: boolean
    - dividerText: string
    - showRememberMe: boolean
    - showForgotPassword: boolean
    - showSignUpLink: boolean
    - submitButtonText: string
    - submitButtonColor: string
    - submitButtonVariant: string
    - emailLabel: string
    - passwordLabel: string
    - inputVariant: 'outlined' | 'filled' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled' | 'plain'
    - inputDensity: 'default' | 'comfortable' | 'compact'

  Slots:
    - logo: Logo above the form
    - header: Custom header content
    - title: Custom title
    - subtitle: Subtitle below title
    - social-buttons: Custom social login buttons
    - social-button: Individual social button (scoped: { provider })
    - divider: Custom divider between social and form
    - prepend-form: Content before form fields
    - email-field: Custom email field
    - password-field: Custom password field
    - after-password: Content after password field
    - remember-forgot-row: Custom remember me and forgot password row
    - submit-button: Custom submit button
    - append-form: Content after form
    - footer: Custom footer with sign up link
    - side-content: Content for split layout side
    - side-logo: Logo in side content
    - side-title: Title in side content
    - side-subtitle: Subtitle in side content

  Events:
    - submit: Emitted with { email, password, rememberMe }
    - social-login: Emitted with provider name
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
      :class="['login-social-card', cardPadding ? `pa-${cardPadding}` : 'pa-4']"
    >
      <!-- Title -->
      <slot name="title">
        <VCardTitle
          v-if="title"
          class="text-h4 font-weight-bold text-center pb-0"
        >
          {{ title }}
        </VCardTitle>
      </slot>

      <!-- Subtitle -->
      <slot name="subtitle">
        <VCardSubtitle
          v-if="subtitle"
          class="text-center pb-6"
        >
          {{ subtitle }}
        </VCardSubtitle>
      </slot>

      <VCardText>
        <!-- Social Login Buttons -->
        <slot name="social-buttons" :providers="socialProviders" :on-social-login="handleSocialLogin">
          <div
            v-if="socialProviders.length > 0"
            class="d-flex flex-column ga-3 mb-6"
          >
            <template v-for="provider in socialProviders" :key="provider.id">
              <slot
                name="social-button"
                :provider="provider"
                :on-click="() => handleSocialLogin(provider.id)"
              >
                <VBtn
                  :variant="socialButtonVariant"
                  :size="socialButtonSize"
                  block
                  @click="handleSocialLogin(provider.id)"
                >
                  <VIcon start :color="provider.iconColor">{{ provider.icon }}</VIcon>
                  {{ provider.label }}
                </VBtn>
              </slot>
            </template>
          </div>
        </slot>

        <!-- Divider -->
        <slot name="divider">
          <div
            v-if="showDivider && socialProviders.length > 0"
            class="d-flex align-center mb-6"
          >
            <VDivider />
            <span class="mx-4 text-medium-emphasis">{{ dividerText }}</span>
            <VDivider />
          </div>
        </slot>

        <slot name="prepend-form" />

        <!-- Email/Password Form -->
        <VForm ref="formRef" v-model="valid">
          <!-- Email Field -->
          <slot
            name="email-field"
            :email="email"
            :rules="emailRules"
            :update-email="(v: string) => email = v"
          >
            <VTextField
              v-model="email"
              :rules="emailRules"
              :label="emailLabel"
              type="email"
              :variant="inputVariant"
              :density="inputDensity"
              class="mb-2"
            />
          </slot>

          <!-- Password Field -->
          <slot
            name="password-field"
            :password="password"
            :rules="passwordRules"
            :show-password="showPassword"
            :toggle-password="() => showPassword = !showPassword"
            :update-password="(v: string) => password = v"
          >
            <VTextField
              v-model="password"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              :label="passwordLabel"
              :variant="inputVariant"
              :density="inputDensity"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
            />
          </slot>

          <slot name="after-password" />

          <!-- Remember Me & Forgot Password Row -->
          <slot
            name="remember-forgot-row"
            :remember-me="rememberMe"
            :update-remember-me="(v: boolean) => rememberMe = v"
            :on-forgot-password="handleForgotPassword"
          >
            <div
              v-if="showRememberMe || showForgotPassword"
              class="d-flex justify-space-between align-center my-4"
            >
              <VCheckbox
                v-if="showRememberMe"
                v-model="rememberMe"
                :label="rememberMeLabel"
                :color="submitButtonColor"
                density="compact"
                hide-details
              />
              <VSpacer v-if="!showRememberMe" />
              <VBtn
                v-if="showForgotPassword"
                variant="text"
                :color="submitButtonColor"
                size="small"
                @click="handleForgotPassword"
              >
                {{ forgotPasswordText }}
              </VBtn>
            </div>
          </slot>

          <!-- Submit Button -->
          <slot
            name="submit-button"
            :submit="submit"
            :loading="loading"
            :valid="valid"
          >
            <VBtn
              :color="submitButtonColor"
              :variant="submitButtonVariant"
              size="large"
              block
              :loading="loading"
              :disabled="!valid"
              @click="submit"
            >
              {{ submitButtonText }}
            </VBtn>
          </slot>
        </VForm>

        <slot name="append-form" />
      </VCardText>

      <!-- Footer -->
      <slot name="footer" :on-sign-up="handleSignUp">
        <VCardText
          v-if="showSignUpLink"
          class="text-center pt-4"
        >
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
    </VCard>
  </AuthPageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AuthPageLayout from './AuthPageLayout.vue'

export interface SocialProvider {
  id: string
  label: string
  icon: string
  iconColor?: string
}

export interface LoginWithSocialProps {
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
  cardPadding?: string | number

  // Title props
  title?: string
  subtitle?: string

  // Social login props
  socialProviders?: SocialProvider[]
  socialButtonVariant?: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain'
  socialButtonSize?: 'x-small' | 'small' | 'default' | 'large' | 'x-large'

  // Divider props
  showDivider?: boolean
  dividerText?: string

  // Form field props
  emailLabel?: string
  passwordLabel?: string
  inputVariant?: 'outlined' | 'filled' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled' | 'plain'
  inputDensity?: 'default' | 'comfortable' | 'compact'

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
  submitButtonVariant?: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain'

  // Initial values
  initialEmail?: string
  initialRememberMe?: boolean
}

const defaultSocialProviders: SocialProvider[] = [
  { id: 'google', label: 'Continue with Google', icon: 'mdi-google', iconColor: 'red' },
  { id: 'github', label: 'Continue with GitHub', icon: 'mdi-github' },
  { id: 'facebook', label: 'Continue with Facebook', icon: 'mdi-facebook', iconColor: 'blue' },
]

const props = withDefaults(defineProps<LoginWithSocialProps>(), {
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
  cardElevation: 8,
  cardRounded: 'lg',
  cardColor: undefined,
  cardVariant: 'elevated',
  cardPadding: '4',

  // Title defaults
  title: 'Welcome Back',
  subtitle: 'Sign in to continue to your account',

  // Social login defaults
  socialProviders: () => defaultSocialProviders,
  socialButtonVariant: 'outlined',
  socialButtonSize: 'large',

  // Divider defaults
  showDivider: true,
  dividerText: 'OR',

  // Form field defaults
  emailLabel: 'Email address',
  passwordLabel: 'Password',
  inputVariant: 'outlined',
  inputDensity: 'comfortable',

  // Feature defaults
  showRememberMe: true,
  showForgotPassword: true,
  showSignUpLink: true,

  // Text defaults
  rememberMeLabel: 'Remember me',
  forgotPasswordText: 'Forgot Password?',
  submitButtonText: 'Sign In',
  signUpPromptText: 'New to our platform?',
  signUpButtonText: 'Create an account',

  // Button defaults
  submitButtonColor: 'primary',
  submitButtonVariant: 'flat',

  // Initial values
  initialEmail: '',
  initialRememberMe: false,
})

// Emits
const emit = defineEmits<{
  submit: [payload: { email: string; password: string; rememberMe: boolean }]
  'social-login': [provider: string]
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
const handleSocialLogin = (provider: string) => {
  emit('social-login', provider)
}

const submit = async () => {
  const { valid: isValid } = await formRef.value.validate()
  if (!isValid) return

  loading.value = true

  emit('submit', {
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value,
  })

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
.login-social-card {
  width: 100%;
}
</style>
