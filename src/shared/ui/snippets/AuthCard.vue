<script setup lang="ts">
import { ref } from 'vue'
import { Colors, Variants, Icons } from '../../model'
import type { ColorType, VariantType, IconType } from './types'

interface Props {
  mode?: 'login' | 'register' | 'forgot'
  title?: string
  subtitle?: string

  // Logo
  logo?: string
  logoAlt?: string
  logoSize?: number | string

  // Social auth
  showSocials?: boolean
  socialProviders?: Array<{ name: string; icon: IconType; color?: string }>
  socialDividerText?: string

  // Fields
  showName?: boolean
  showEmail?: boolean
  showPassword?: boolean
  showConfirmPassword?: boolean
  showRememberMe?: boolean
  forgotPasswordText?: string
  forgotPasswordLink?: string

  // Buttons
  submitText?: string
  submitColor?: ColorType | string
  submitVariant?: VariantType
  submitIcon?: IconType
  loading?: boolean

  // Switch mode link
  switchText?: string
  switchLinkText?: string

  // Card
  cardVariant?: VariantType
  cardColor?: ColorType | string
  elevation?: number | string
  cardClass?: string
  contentClass?: string
  maxWidth?: string | number

  // Input
  inputVariant?: VariantType
  inputColor?: ColorType | string

  // Text
  titleClass?: string
  subtitleClass?: string
}

withDefaults(defineProps<Props>(), {
  mode: 'login',
  showEmail: true,
  showPassword: true,
  showRememberMe: true,
  showSocials: false,
  forgotPasswordText: 'Forgot password?',
  socialDividerText: 'or continue with',
  submitColor: Colors.Primary,
  submitVariant: Variants.Elevated,
  cardVariant: Variants.Elevated,
  elevation: 2,
  contentClass: 'pa-8',
  maxWidth: 440,
  inputVariant: Variants.Outlined,
  inputColor: Colors.Primary,
  titleClass: 'text-h5 font-weight-bold',
  subtitleClass: 'text-body-2 text-medium-emphasis',
})

const emit = defineEmits<{
  submit: [payload: { email: string; password: string; name?: string; remember?: boolean }]
  'social-login': [provider: string]
  'switch-mode': []
  'forgot-password': []
}>()

const valid = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const remember = ref(false)
const showPass = ref(false)
const showConfirmPass = ref(false)

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Enter a valid email',
]
const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 8 || 'Min 8 characters',
]

function handleSubmit() {
  if (!valid.value) return
  emit('submit', { email: email.value, password: password.value, name: name.value, remember: remember.value })
}
</script>
<template>
  <VCard
    :variant="cardVariant"
    :color="cardColor"
    :elevation="elevation"
    :max-width="maxWidth"
    :class="['auth-card mx-auto', cardClass]"
  >
    <VCardText :class="contentClass">
      <!-- Logo -->
      <slot name="logo" :logo="logo">
        <div v-if="logo" class="text-center mb-6">
          <VImg :src="logo" :alt="logoAlt" :width="logoSize ?? 48" class="mx-auto" />
        </div>
      </slot>

      <!-- Header -->
      <slot name="header">
        <div class="text-center mb-6">
          <h2 v-if="title" :class="[titleClass, 'mb-1']">{{ title }}</h2>
          <p v-if="subtitle" :class="[subtitleClass, 'mb-0']">{{ subtitle }}</p>
        </div>
      </slot>

      <!-- Social Providers -->
      <slot name="socials">
        <div v-if="showSocials && socialProviders?.length" class="mb-4">
          <div class="d-flex gap-2">
            <VBtn
              v-for="p in socialProviders"
              :key="p.name"
              :color="p.color"
              variant="outlined"
              :prepend-icon="p.icon"
              class="flex-grow-1"
              @click="$emit('social-login', p.name)"
            >
              {{ p.name }}
            </VBtn>
          </div>
          <VDivider class="my-4">
            <span class="text-caption text-medium-emphasis px-2">{{ socialDividerText }}</span>
          </VDivider>
        </div>
      </slot>

      <!-- Form -->
      <slot name="form">
        <VForm v-model="valid" @submit.prevent="handleSubmit">
          <div class="d-flex flex-column gap-4">
            <VTextField
              v-if="showName"
              v-model="name"
              label="Full Name"
              :variant="inputVariant"
              :color="inputColor"
              :prepend-inner-icon="Icons.Account"
              :rules="[(v: string) => !!v || 'Name is required']"
            />

            <VTextField
              v-if="showEmail"
              v-model="email"
              label="Email"
              type="email"
              :variant="inputVariant"
              :color="inputColor"
              :prepend-inner-icon="Icons.Email"
              :rules="emailRules"
            />

            <VTextField
              v-if="showPassword"
              v-model="password"
              label="Password"
              :type="showPass ? 'text' : 'password'"
              :variant="inputVariant"
              :color="inputColor"
              :prepend-inner-icon="Icons.Lock"
              :append-inner-icon="showPass ? Icons.EyeOff : Icons.Eye"
              :rules="passwordRules"
              @click:append-inner="showPass = !showPass"
            />

            <VTextField
              v-if="showConfirmPassword"
              v-model="confirmPassword"
              label="Confirm Password"
              :type="showConfirmPass ? 'text' : 'password'"
              :variant="inputVariant"
              :color="inputColor"
              :prepend-inner-icon="Icons.Lock"
              :append-inner-icon="showConfirmPass ? Icons.EyeOff : Icons.Eye"
              :rules="[(v: string) => v === password || 'Passwords do not match']"
              @click:append-inner="showConfirmPass = !showConfirmPass"
            />

            <!-- Remember + Forgot row -->
            <div v-if="showRememberMe || forgotPasswordText" class="d-flex align-center justify-space-between">
              <VCheckbox
                v-if="showRememberMe"
                v-model="remember"
                label="Remember me"
                density="compact"
                hide-details
              />
              <VSpacer v-if="!showRememberMe" />
              <slot name="forgot">
                <a
                  v-if="forgotPasswordText && mode === 'login'"
                  href="#"
                  class="text-caption text-primary text-decoration-none"
                  @click.prevent="$emit('forgot-password')"
                >
                  {{ forgotPasswordText }}
                </a>
              </slot>
            </div>

            <VBtn
              type="submit"
              :color="submitColor"
              :variant="submitVariant"
              :loading="loading"
              :append-icon="submitIcon"
              block
              size="large"
            >
              {{ submitText ?? (mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Reset Password') }}
            </VBtn>
          </div>
        </VForm>
      </slot>

      <!-- Switch mode -->
      <slot name="switch">
        <div v-if="switchText || switchLinkText" class="text-center mt-4">
          <span class="text-body-2 text-medium-emphasis">{{ switchText }} </span>
          <a href="#" class="text-body-2 text-primary text-decoration-none font-weight-medium" @click.prevent="$emit('switch-mode')">
            {{ switchLinkText }}
          </a>
        </div>
      </slot>

      <slot />
    </VCardText>
  </VCard>
</template>
