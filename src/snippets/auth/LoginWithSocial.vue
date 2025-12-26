<!--
  Snippet: Login with Social
  Description: Login form with social authentication options (Google, GitHub, Facebook)
  Components: VCard, VTextField, VBtn, VDivider, VIcon
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <VContainer class="fill-height" fluid>
    <VRow align="center" justify="center">
      <VCol cols="12" sm="8" md="5" lg="4">
        <VCard class="pa-4" elevation="8" rounded="lg">
          <VCardTitle class="text-h4 font-weight-bold text-center pb-0">
            Welcome Back
          </VCardTitle>
          <VCardSubtitle class="text-center pb-6">
            Sign in to continue to your account
          </VCardSubtitle>

          <VCardText>
            <!-- Social Login Buttons -->
            <div class="d-flex flex-column ga-3 mb-6">
              <VBtn
                variant="outlined"
                size="large"
                block
                @click="socialLogin('google')"
              >
                <VIcon start color="red">mdi-google</VIcon>
                Continue with Google
              </VBtn>

              <VBtn
                variant="outlined"
                size="large"
                block
                @click="socialLogin('github')"
              >
                <VIcon start>mdi-github</VIcon>
                Continue with GitHub
              </VBtn>

              <VBtn
                variant="outlined"
                size="large"
                block
                @click="socialLogin('facebook')"
              >
                <VIcon start color="blue">mdi-facebook</VIcon>
                Continue with Facebook
              </VBtn>
            </div>

            <!-- Divider -->
            <div class="d-flex align-center mb-6">
              <VDivider />
              <span class="mx-4 text-medium-emphasis">OR</span>
              <VDivider />
            </div>

            <!-- Email/Password Form -->
            <VForm ref="formRef" v-model="valid">
              <VTextField
                v-model="email"
                :rules="emailRules"
                label="Email address"
                type="email"
                variant="outlined"
                density="comfortable"
                class="mb-2"
              />

              <VTextField
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
                <VCheckbox
                  v-model="rememberMe"
                  label="Remember me"
                  color="primary"
                  density="compact"
                  hide-details
                />
                <VBtn variant="text" color="primary" size="small">
                  Forgot Password?
                </VBtn>
              </div>

              <VBtn
                color="primary"
                size="large"
                block
                :loading="loading"
                :disabled="!valid"
                @click="submit"
              >
                Sign In
              </VBtn>
            </VForm>
          </VCardText>

          <VCardText class="text-center pt-4">
            <span class="text-medium-emphasis">New to our platform?</span>
            <VBtn variant="text" color="primary">
              Create an account
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
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
