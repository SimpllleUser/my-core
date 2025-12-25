<!--
  Snippet: Forgot Password
  Description: Password recovery form with email input
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
              <v-icon size="48" color="white">mdi-lock-reset</v-icon>
            </v-avatar>
            <h2 class="text-h5 font-weight-bold mb-2">Forgot Password?</h2>
            <p class="text-medium-emphasis mb-6">
              No worries! Enter your email address and we'll send you a link to reset your password.
            </p>
          </v-card-text>

          <v-card-text>
            <v-alert
              v-if="emailSent"
              type="success"
              variant="tonal"
              class="mb-4"
            >
              <v-alert-title>Email Sent!</v-alert-title>
              Check your inbox for password reset instructions.
            </v-alert>

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

            <v-form
              v-if="!emailSent"
              ref="formRef"
              v-model="valid"
            >
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email Address"
                type="email"
                variant="outlined"
                prepend-inner-icon="mdi-email"
                placeholder="you@example.com"
              />

              <v-btn
                color="primary"
                size="large"
                block
                :loading="loading"
                :disabled="!valid"
                class="mt-4"
                @click="submit"
              >
                Send Reset Link
              </v-btn>
            </v-form>

            <v-btn
              v-else
              color="primary"
              size="large"
              block
              variant="outlined"
              @click="resetForm"
            >
              Send Again
            </v-btn>
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
import { ref } from 'vue'

const formRef = ref()
const valid = ref(false)
const loading = ref(false)
const emailSent = ref(false)
const error = ref('')
const email = ref('')

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Please enter a valid email',
]

const submit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  error.value = ''

  // Simulate API call
  setTimeout(() => {
    loading.value = false
    // Simulate success (or set error.value for failure)
    emailSent.value = true
    console.log('Reset email sent to:', email.value)
  }, 1500)
}

const resetForm = () => {
  emailSent.value = false
  email.value = ''
}
</script>
