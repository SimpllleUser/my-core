<!--
  Snippet: Login Simple
  Description: Clean and minimal login form with email/password fields
  Components: VCard, VCardTitle, VCardText, VCardActions, VTextField, VBtn, VCheckbox
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Sign In</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form ref="formRef" v-model="valid" lazy-validation>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                prepend-icon="mdi-email"
                type="email"
                required
                variant="outlined"
                class="mb-4"
              />

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                variant="outlined"
                @click:append="showPassword = !showPassword"
              />

              <v-checkbox
                v-model="rememberMe"
                label="Remember me"
                color="primary"
              />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn variant="text" color="primary" @click="forgotPassword">
              Forgot Password?
            </v-btn>
            <v-spacer />
            <v-btn
              color="primary"
              size="large"
              :loading="loading"
              :disabled="!valid"
              @click="submit"
            >
              Sign In
            </v-btn>
          </v-card-actions>

          <v-divider />

          <v-card-text class="text-center">
            <span class="text-medium-emphasis">Don't have an account?</span>
            <v-btn variant="text" color="primary" @click="goToRegister">
              Sign Up
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
const valid = ref(true)
const loading = ref(false)
const showPassword = ref(false)

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid',
]

const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 8 || 'Password must be at least 8 characters',
]

const submit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  // Simulate API call
  setTimeout(() => {
    loading.value = false
    console.log('Login:', { email: email.value, password: password.value, rememberMe: rememberMe.value })
  }, 1500)
}

const forgotPassword = () => {
  console.log('Navigate to forgot password')
}

const goToRegister = () => {
  console.log('Navigate to register')
}
</script>
