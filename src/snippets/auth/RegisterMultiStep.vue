<!--
  Snippet: Register Multi-Step
  Description: Highly customizable multi-step registration wizard with progress stepper
  Components: AuthPageLayout, VCard, VStepper, VTextField, VBtn, VSelect

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

  Card Props:
    - cardElevation: number
    - cardRounded: string
    - cardColor: string
    - cardVariant: 'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain'

  Stepper Props:
    - stepperAltLabels: boolean
    - stepperFlat: boolean
    - stepperColor: string
    - steps: StepConfig[]

  Form Props:
    - title: string
    - inputVariant: 'outlined' | 'filled' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled' | 'plain'
    - inputDensity: 'default' | 'comfortable' | 'compact'
    - showInputIcons: boolean
    - countries: string[]
    - interestOptions: string[]
    - notificationOptions: NotificationOption[]

  Button Props:
    - primaryColor: string
    - backButtonText: string
    - continueButtonText: string
    - submitButtonText: string

  Footer Props:
    - showSignInLink: boolean
    - signInPromptText: string
    - signInButtonText: string

  Slots:
    - logo: Logo above the form
    - header: Custom header content
    - title: Custom title
    - stepper-header: Custom stepper header
    - step-1: Custom step 1 content (Account)
    - step-2: Custom step 2 content (Personal)
    - step-3: Custom step 3 content (Preferences)
    - step-content: Dynamic step content (scoped: { step })
    - form-actions: Custom form actions
    - back-button: Custom back button
    - continue-button: Custom continue button
    - submit-button: Custom submit button
    - footer: Custom footer with sign in link
    - side-content: Content for split layout side
    - side-logo: Logo in side content
    - side-title: Title in side content
    - side-subtitle: Subtitle in side content

  Events:
    - submit: Emitted with form data
    - step-change: Emitted when step changes
    - sign-in: Emitted when sign in is clicked
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
      class="register-multistep-card"
    >
      <!-- Title -->
      <slot name="title">
        <VCardTitle
          v-if="title"
          class="text-h5 font-weight-bold pa-6 pb-0"
        >
          {{ title }}
        </VCardTitle>
      </slot>

      <VStepper
        v-model="currentStep"
        :alt-labels="stepperAltLabels"
        :flat="stepperFlat"
      >
        <!-- Stepper Header -->
        <slot name="stepper-header" :steps="steps" :current-step="currentStep">
          <VStepperHeader>
            <template v-for="(step, index) in steps" :key="step.value">
              <VStepperItem
                :complete="currentStep > step.value"
                :value="step.value"
                :title="step.title"
                :subtitle="step.subtitle"
                :color="stepperColor"
              />
              <VDivider v-if="index < steps.length - 1" />
            </template>
          </VStepperHeader>
        </slot>

        <VStepperWindow>
          <!-- Step 1: Account Information -->
          <VStepperWindowItem :value="1">
            <slot name="step-1" :form="form" :rules="{ emailRules, passwordRules, confirmPasswordRules }">
              <VCard flat>
                <VCardText>
                  <VForm ref="step1FormRef" v-model="step1Valid">
                    <VRow>
                      <VCol cols="12">
                        <VTextField
                          v-model="form.email"
                          :rules="emailRules"
                          :label="emailLabel"
                          type="email"
                          :variant="inputVariant"
                          :density="inputDensity"
                          :prepend-inner-icon="showInputIcons ? 'mdi-email' : undefined"
                        />
                      </VCol>
                      <VCol cols="12" md="6">
                        <VTextField
                          v-model="form.password"
                          :rules="passwordRules"
                          :type="showPassword ? 'text' : 'password'"
                          :label="passwordLabel"
                          :variant="inputVariant"
                          :density="inputDensity"
                          :prepend-inner-icon="showInputIcons ? 'mdi-lock' : undefined"
                          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                          @click:append-inner="showPassword = !showPassword"
                        />
                      </VCol>
                      <VCol cols="12" md="6">
                        <VTextField
                          v-model="form.confirmPassword"
                          :rules="confirmPasswordRules"
                          :type="showPassword ? 'text' : 'password'"
                          :label="confirmPasswordLabel"
                          :variant="inputVariant"
                          :density="inputDensity"
                          :prepend-inner-icon="showInputIcons ? 'mdi-lock-check' : undefined"
                        />
                      </VCol>
                    </VRow>
                  </VForm>
                </VCardText>
              </VCard>
            </slot>
          </VStepperWindowItem>

          <!-- Step 2: Personal Information -->
          <VStepperWindowItem :value="2">
            <slot name="step-2" :form="form" :countries="countries">
              <VCard flat>
                <VCardText>
                  <VForm ref="step2FormRef" v-model="step2Valid">
                    <VRow>
                      <VCol cols="12" md="6">
                        <VTextField
                          v-model="form.firstName"
                          :rules="requiredRules"
                          :label="firstNameLabel"
                          :variant="inputVariant"
                          :density="inputDensity"
                          :prepend-inner-icon="showInputIcons ? 'mdi-account' : undefined"
                        />
                      </VCol>
                      <VCol cols="12" md="6">
                        <VTextField
                          v-model="form.lastName"
                          :rules="requiredRules"
                          :label="lastNameLabel"
                          :variant="inputVariant"
                          :density="inputDensity"
                          :prepend-inner-icon="showInputIcons ? 'mdi-account' : undefined"
                        />
                      </VCol>
                      <VCol cols="12">
                        <VTextField
                          v-model="form.phone"
                          :label="phoneLabel"
                          :variant="inputVariant"
                          :density="inputDensity"
                          :prepend-inner-icon="showInputIcons ? 'mdi-phone' : undefined"
                        />
                      </VCol>
                      <VCol cols="12" md="6">
                        <VSelect
                          v-model="form.country"
                          :items="countries"
                          :rules="requiredRules"
                          :label="countryLabel"
                          :variant="inputVariant"
                          :density="inputDensity"
                          :prepend-inner-icon="showInputIcons ? 'mdi-earth' : undefined"
                        />
                      </VCol>
                      <VCol cols="12" md="6">
                        <VTextField
                          v-model="form.city"
                          :label="cityLabel"
                          :variant="inputVariant"
                          :density="inputDensity"
                          :prepend-inner-icon="showInputIcons ? 'mdi-city' : undefined"
                        />
                      </VCol>
                    </VRow>
                  </VForm>
                </VCardText>
              </VCard>
            </slot>
          </VStepperWindowItem>

          <!-- Step 3: Preferences -->
          <VStepperWindowItem :value="3">
            <slot name="step-3" :form="form" :interest-options="interestOptions" :notification-options="notificationOptions">
              <VCard flat>
                <VCardText>
                  <VForm ref="step3FormRef" v-model="step3Valid">
                    <VRow>
                      <VCol cols="12">
                        <VSelect
                          v-model="form.interests"
                          :items="interestOptions"
                          :label="interestsLabel"
                          :variant="inputVariant"
                          :density="inputDensity"
                          multiple
                          chips
                          closable-chips
                          :prepend-inner-icon="showInputIcons ? 'mdi-heart' : undefined"
                        />
                      </VCol>
                      <VCol cols="12">
                        <VSelect
                          v-model="form.notifications"
                          :items="notificationOptions"
                          :label="notificationsLabel"
                          :variant="inputVariant"
                          :density="inputDensity"
                          :prepend-inner-icon="showInputIcons ? 'mdi-bell' : undefined"
                        />
                      </VCol>
                      <VCol cols="12">
                        <VCheckbox
                          v-model="form.newsletter"
                          :label="newsletterLabel"
                          :color="primaryColor"
                        />
                        <VCheckbox
                          v-model="form.terms"
                          :rules="[(v: boolean) => v || termsRequiredText]"
                          :color="primaryColor"
                        >
                          <template #label>
                            <slot name="terms-label">
                              {{ termsLabelPrefix }}
                              <a href="#" class="text-primary ms-1" @click.prevent="$emit('terms-click')">{{ termsLinkText }}</a>
                              {{ termsLabelMiddle }}
                              <a href="#" class="text-primary ms-1" @click.prevent="$emit('privacy-click')">{{ privacyLinkText }}</a>
                            </slot>
                          </template>
                        </VCheckbox>
                      </VCol>
                    </VRow>
                  </VForm>
                </VCardText>
              </VCard>
            </slot>
          </VStepperWindowItem>
        </VStepperWindow>

        <!-- Form Actions -->
        <slot
          name="form-actions"
          :current-step="currentStep"
          :go-back="goBack"
          :next-step="nextStep"
          :submit="submit"
          :loading="loading"
          :is-valid="isCurrentStepValid"
        >
          <VCardActions class="pa-6 pt-0">
            <slot name="back-button" :go-back="goBack" :current-step="currentStep">
              <VBtn
                v-if="currentStep > 1"
                variant="text"
                @click="goBack"
              >
                {{ backButtonText }}
              </VBtn>
            </slot>

            <VSpacer />

            <slot
              name="continue-button"
              :next-step="nextStep"
              :is-valid="isCurrentStepValid"
              :current-step="currentStep"
            >
              <VBtn
                v-if="currentStep < steps.length"
                :color="primaryColor"
                :disabled="!isCurrentStepValid"
                @click="nextStep"
              >
                {{ continueButtonText }}
              </VBtn>
            </slot>

            <slot
              name="submit-button"
              :submit="submit"
              :loading="loading"
              :is-valid="step3Valid"
              :current-step="currentStep"
            >
              <VBtn
                v-if="currentStep === steps.length"
                :color="primaryColor"
                :loading="loading"
                :disabled="!step3Valid"
                @click="submit"
              >
                {{ submitButtonText }}
              </VBtn>
            </slot>
          </VCardActions>
        </slot>
      </VStepper>
    </VCard>

    <!-- Footer -->
    <slot name="footer" :on-sign-in="handleSignIn">
      <div
        v-if="showSignInLink"
        class="text-center mt-4"
      >
        <span class="text-medium-emphasis">{{ signInPromptText }}</span>
        <VBtn
          variant="text"
          :color="primaryColor"
          @click="handleSignIn"
        >
          {{ signInButtonText }}
        </VBtn>
      </div>
    </slot>
  </AuthPageLayout>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import AuthPageLayout from './AuthPageLayout.vue'

export interface StepConfig {
  value: number
  title: string
  subtitle?: string
}

export interface NotificationOption {
  title: string
  value: string
}

export interface RegisterFormData {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  phone: string
  country: string
  city: string
  interests: string[]
  notifications: string
  newsletter: boolean
  terms: boolean
}

export interface RegisterMultiStepProps {
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

  // Title
  title?: string

  // Stepper props
  stepperAltLabels?: boolean
  stepperFlat?: boolean
  stepperColor?: string
  steps?: StepConfig[]

  // Form field props
  inputVariant?: 'outlined' | 'filled' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled' | 'plain'
  inputDensity?: 'default' | 'comfortable' | 'compact'
  showInputIcons?: boolean

  // Field labels
  emailLabel?: string
  passwordLabel?: string
  confirmPasswordLabel?: string
  firstNameLabel?: string
  lastNameLabel?: string
  phoneLabel?: string
  countryLabel?: string
  cityLabel?: string
  interestsLabel?: string
  notificationsLabel?: string
  newsletterLabel?: string

  // Terms labels
  termsLabelPrefix?: string
  termsLinkText?: string
  termsLabelMiddle?: string
  privacyLinkText?: string
  termsRequiredText?: string

  // Options
  countries?: string[]
  interestOptions?: string[]
  notificationOptions?: NotificationOption[]

  // Button props
  primaryColor?: string
  backButtonText?: string
  continueButtonText?: string
  submitButtonText?: string

  // Footer props
  showSignInLink?: boolean
  signInPromptText?: string
  signInButtonText?: string

  // Initial values
  initialFormData?: Partial<RegisterFormData>
}

const defaultSteps: StepConfig[] = [
  { value: 1, title: 'Account', subtitle: 'Basic info' },
  { value: 2, title: 'Personal', subtitle: 'Your details' },
  { value: 3, title: 'Preferences', subtitle: 'Customize' },
]

const defaultCountries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Australia',
  'Japan',
  'Ukraine',
]

const defaultInterestOptions = [
  'Technology',
  'Design',
  'Business',
  'Marketing',
  'Science',
  'Art',
  'Music',
  'Sports',
]

const defaultNotificationOptions: NotificationOption[] = [
  { title: 'All notifications', value: 'all' },
  { title: 'Important only', value: 'important' },
  { title: 'None', value: 'none' },
]

const props = withDefaults(defineProps<RegisterMultiStepProps>(), {
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

  // Title
  title: 'Create Your Account',

  // Stepper defaults
  stepperAltLabels: true,
  stepperFlat: true,
  stepperColor: 'primary',
  steps: () => defaultSteps,

  // Form field defaults
  inputVariant: 'outlined',
  inputDensity: 'default',
  showInputIcons: true,

  // Field label defaults
  emailLabel: 'Email Address',
  passwordLabel: 'Password',
  confirmPasswordLabel: 'Confirm Password',
  firstNameLabel: 'First Name',
  lastNameLabel: 'Last Name',
  phoneLabel: 'Phone Number',
  countryLabel: 'Country',
  cityLabel: 'City',
  interestsLabel: 'Interests',
  notificationsLabel: 'Notification Preferences',
  newsletterLabel: 'Subscribe to newsletter',

  // Terms label defaults
  termsLabelPrefix: 'I agree to the',
  termsLinkText: 'Terms of Service',
  termsLabelMiddle: 'and',
  privacyLinkText: 'Privacy Policy',
  termsRequiredText: 'You must agree to the terms',

  // Options defaults
  countries: () => defaultCountries,
  interestOptions: () => defaultInterestOptions,
  notificationOptions: () => defaultNotificationOptions,

  // Button defaults
  primaryColor: 'primary',
  backButtonText: 'Back',
  continueButtonText: 'Continue',
  submitButtonText: 'Create Account',

  // Footer defaults
  showSignInLink: true,
  signInPromptText: 'Already have an account?',
  signInButtonText: 'Sign In',

  // Initial values
  initialFormData: undefined,
})

// Emits
const emit = defineEmits<{
  submit: [payload: RegisterFormData]
  'step-change': [step: number]
  'sign-in': []
  'terms-click': []
  'privacy-click': []
}>()

// State
const currentStep = ref(1)
const loading = ref(false)
const showPassword = ref(false)

const step1FormRef = ref()
const step2FormRef = ref()
const step3FormRef = ref()

const step1Valid = ref(false)
const step2Valid = ref(false)
const step3Valid = ref(false)

const form = ref<RegisterFormData>({
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  phone: '',
  country: '',
  city: '',
  interests: [],
  notifications: 'all',
  newsletter: true,
  terms: false,
  ...props.initialFormData,
})

// Watch step changes
watch(currentStep, (newStep) => {
  emit('step-change', newStep)
})

// Validation rules
const requiredRules = [(v: string) => !!v || 'This field is required']

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid',
]

const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 8 || 'Password must be at least 8 characters',
]

const confirmPasswordRules = [
  (v: string) => !!v || 'Please confirm your password',
  (v: string) => v === form.value.password || 'Passwords do not match',
]

// Computed
const isCurrentStepValid = computed(() => {
  if (currentStep.value === 1) return step1Valid.value
  if (currentStep.value === 2) return step2Valid.value
  return step3Valid.value
})

// Methods
const goBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const nextStep = async () => {
  let formRef
  if (currentStep.value === 1) formRef = step1FormRef.value
  else if (currentStep.value === 2) formRef = step2FormRef.value

  if (formRef) {
    const { valid } = await formRef.validate()
    if (valid) currentStep.value++
  }
}

const submit = async () => {
  const { valid } = await step3FormRef.value.validate()
  if (!valid) return

  loading.value = true

  emit('submit', { ...form.value })

  setTimeout(() => {
    loading.value = false
  }, 2000)
}

const handleSignIn = () => {
  emit('sign-in')
}

// Expose for parent component access
defineExpose({
  currentStep,
  form,
  step1FormRef,
  step2FormRef,
  step3FormRef,
  step1Valid,
  step2Valid,
  step3Valid,
  loading,
  goBack,
  nextStep,
  submit,
})
</script>

<style scoped>
.register-multistep-card {
  width: 100%;
}
</style>
