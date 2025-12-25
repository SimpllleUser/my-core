<!--
  Snippet: OTP Verification
  Description: One-time password verification with 6-digit input
  Components: VCard, VTextField, VBtn, VAlert
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card class="pa-4" elevation="8" rounded="lg">
          <v-card-text class="text-center pb-0">
            <v-avatar color="primary" size="80" class="mb-4">
              <v-icon size="48" color="white">mdi-shield-key</v-icon>
            </v-avatar>
            <h2 class="text-h5 font-weight-bold mb-2">Verify Your Identity</h2>
            <p class="text-medium-emphasis mb-2">
              We've sent a 6-digit code to
            </p>
            <p class="font-weight-medium mb-6">{{ maskedEmail }}</p>
          </v-card-text>

          <v-card-text>
            <v-alert
              v-if="error"
              type="error"
              variant="tonal"
              class="mb-4"
              closable
              @click:close="error = ''"
            >
              {{ error }}
            </v-alert>

            <!-- OTP Input -->
            <div class="d-flex justify-center ga-2 mb-6">
              <v-text-field
                v-for="(_, index) in otpDigits"
                :key="index"
                :ref="(el) => setOtpRef(el, index)"
                v-model="otpDigits[index]"
                variant="outlined"
                density="comfortable"
                class="otp-input"
                maxlength="1"
                type="text"
                inputmode="numeric"
                hide-details
                @input="onOtpInput(index)"
                @keydown="onOtpKeydown($event, index)"
                @paste="onPaste"
              />
            </div>

            <v-btn
              color="primary"
              size="large"
              block
              :loading="loading"
              :disabled="!isOtpComplete"
              @click="verify"
            >
              Verify
            </v-btn>

            <div class="text-center mt-6">
              <p class="text-medium-emphasis mb-2">Didn't receive the code?</p>
              <v-btn
                variant="text"
                color="primary"
                :disabled="resendCooldown > 0"
                @click="resendCode"
              >
                {{ resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code' }}
              </v-btn>
            </div>
          </v-card-text>

          <v-card-text class="text-center pt-2">
            <v-btn variant="text" color="primary" prepend-icon="mdi-arrow-left">
              Back to Login
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const loading = ref(false)
const error = ref('')
const maskedEmail = ref('j***@example.com')
const otpDigits = ref(['', '', '', '', '', ''])
const otpRefs = ref<any[]>([])
const resendCooldown = ref(30)
let cooldownInterval: ReturnType<typeof setInterval> | null = null

const isOtpComplete = computed(() => {
  return otpDigits.value.every(digit => digit !== '')
})

const setOtpRef = (el: any, index: number) => {
  if (el) {
    otpRefs.value[index] = el
  }
}

const onOtpInput = (index: number) => {
  const value = otpDigits.value[index]

  // Only allow numbers
  if (value && !/^\d$/.test(value)) {
    otpDigits.value[index] = ''
    return
  }

  // Move to next input
  if (value && index < 5) {
    otpRefs.value[index + 1]?.focus()
  }
}

const onOtpKeydown = (event: KeyboardEvent, index: number) => {
  // Handle backspace
  if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
    otpRefs.value[index - 1]?.focus()
  }

  // Handle arrow keys
  if (event.key === 'ArrowLeft' && index > 0) {
    otpRefs.value[index - 1]?.focus()
  }
  if (event.key === 'ArrowRight' && index < 5) {
    otpRefs.value[index + 1]?.focus()
  }
}

const onPaste = (event: ClipboardEvent) => {
  event.preventDefault()
  const paste = event.clipboardData?.getData('text') || ''
  const digits = paste.replace(/\D/g, '').slice(0, 6).split('')

  digits.forEach((digit, index) => {
    if (index < 6) {
      otpDigits.value[index] = digit
    }
  })

  // Focus last filled input or the one after
  const lastIndex = Math.min(digits.length, 5)
  otpRefs.value[lastIndex]?.focus()
}

const verify = async () => {
  const otp = otpDigits.value.join('')

  loading.value = true
  error.value = ''

  // Simulate API call
  setTimeout(() => {
    loading.value = false

    // Simulate verification (123456 is valid for demo)
    if (otp === '123456') {
      console.log('OTP verified successfully')
    } else {
      error.value = 'Invalid code. Please try again.'
      otpDigits.value = ['', '', '', '', '', '']
      otpRefs.value[0]?.focus()
    }
  }, 1500)
}

const resendCode = () => {
  resendCooldown.value = 30
  startCooldown()
  console.log('Resending OTP...')
}

const startCooldown = () => {
  if (cooldownInterval) clearInterval(cooldownInterval)

  cooldownInterval = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0) {
      clearInterval(cooldownInterval!)
      cooldownInterval = null
    }
  }, 1000)
}

onMounted(() => {
  startCooldown()
})

onUnmounted(() => {
  if (cooldownInterval) clearInterval(cooldownInterval)
})
</script>

<style scoped>
.otp-input {
  max-width: 50px;
}

.otp-input :deep(input) {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
