<!--
  Snippet: Login with Social
  Description: Login form with social authentication options (Google, GitHub, Facebook)
  Components: VCard, VTextField, VBtn, VDivider, VIcon
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card class="pa-4" elevation="8" rounded="lg">
          <v-card-title class="text-h4 font-weight-bold text-center pb-0">
            Welcome Back
          </v-card-title>
          <v-card-subtitle class="text-center pb-6">
            Sign in to continue to your account
          </v-card-subtitle>

          <v-card-text>
            <!-- Social Login Buttons -->
            <div class="d-flex flex-column ga-3 mb-6">
              <v-btn
                variant="outlined"
                size="large"
                block
                @click="socialLogin('google')"
              >
                <v-icon start color="red">mdi-google</v-icon>
                Continue with Google
              </v-btn>

              <v-btn
                variant="outlined"
                size="large"
                block
                @click="socialLogin('github')"
              >
                <v-icon start>mdi-github</v-icon>
                Continue with GitHub
              </v-btn>

              <v-btn
                variant="outlined"
                size="large"
                block
                @click="socialLogin('facebook')"
              >
                <v-icon start color="blue">mdi-facebook</v-icon>
                Continue with Facebook
              </v-btn>
            </div>

            <!-- Divider -->
            <div class="d-flex align-center mb-6">
              <v-divider />
              <span class="mx-4 text-medium-emphasis">OR</span>
              <v-divider />
            </div>

            <!-- Email/Password Form -->
            <v-form ref="formRef" v-model="valid">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email address"
                type="email"
                variant="outlined"
                density="comfortable"
                class="mb-2"
              />

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                variant="outlined"
                density="comfortable"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword"
              />

              <div class="d-flex justify-space-between align-center my-4">
                <v-checkbox
                  v-model="rememberMe"
                  label="Remember me"
                  color="primary"
                  density="compact"
                  hide-details
                />
                <v-btn variant="text" color="primary" size="small">
                  Forgot Password?
                </v-btn>
              </div>

              <v-btn
                color="primary"
                size="large"
                block
                :loading="loading"
                :disabled="!valid"
                @click="submit"
              >
                Sign In
              </v-btn>
            </v-form>
          </v-card-text>

          <v-card-text class="text-center pt-4">
            <span class="text-medium-emphasis">New to our platform?</span>
            <v-btn variant="text" color="primary">
              Create an account
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

const socialLogin = (provider: string) => {
  console.log('Social login with:', provider)
}

const submit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  setTimeout(() => {
    loading.value = false
    console.log('Login:', { email: email.value, password: password.value })
  }, 1500)
}
</script>
