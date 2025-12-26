<!--
  Snippet: Login Simple
  Description: Clean and minimal login form with email/password fields
  Components: VCard, VCardTitle, VCardText, VCardActions, VTextField, VBtn, VCheckbox
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <VContainer class="fill-height" fluid>
    <VRow align="center" justify="center">
      <VCol cols="12" sm="8" md="4">
        <VCard class="elevation-12">
          <VToolbar color="primary" dark flat>
            <VToolbarTitle>Sign In</VToolbarTitle>
          </VToolbar>

          <VCardText>
            <VForm ref="formRef" v-model="valid" lazy-validation>
              <VTextField
                v-model="email"
                :rules="emailRules"
                label="Email"
                prepend-icon="mdi-email"
                type="email"
                required
                variant="outlined"
                class="mb-4"
              />

              <VTextField
                v-model="password"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                variant="outlined"
                @click:append="showPassword = !showPassword"
              />

              <VCheckbox
                v-model="rememberMe"
                label="Remember me"
                color="primary"
              />
            </VForm>
          </VCardText>

          <VCardActions>
            <VBtn variant="text" color="primary" @click="forgotPassword">
              Forgot Password?
            </VBtn>
            <VSpacer />
            <VBtn
              color="primary"
              size="large"
              :loading="loading"
              :disabled="!valid"
              @click="submit"
            >
              Sign In
            </VBtn>
          </VCardActions>

          <VDivider />

          <VCardText class="text-center">
            <span class="text-medium-emphasis">Don't have an account?</span>
            <VBtn variant="text" color="primary" @click="goToRegister">
              Sign Up
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
