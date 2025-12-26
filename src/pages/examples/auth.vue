<template>
  <VContainer fluid class="pa-6">
    <!-- Header -->
    <VRow class="mb-6">
      <VCol cols="12">
        <VBtn
          to="/examples"
          variant="text"
          prepend-icon="mdi-arrow-left"
          class="mb-4"
        >
          Back to Examples
        </VBtn>
        <h1 class="text-h3 font-weight-bold mb-2">
          <VIcon icon="mdi-lock" size="large" color="blue" class="mr-2" />
          Authentication
        </h1>
        <p class="text-h6 text-medium-emphasis">
          Login forms, registration wizards, password recovery, and OTP verification
        </p>
      </VCol>
    </VRow>

    <!-- Login Simple -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-login" class="mr-2" />
            Login Simple
            <VSpacer />
            <VChip color="blue" size="small">VCard, VTextField, VBtn</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Clean and minimal login form with email/password fields</p>
            <LoginSimple />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Login With Social -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-account-multiple" class="mr-2" />
            Login With Social
            <VSpacer />
            <VChip color="blue" size="small">VCard, VTextField, VBtn, VDivider</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Login with social authentication (Google, GitHub, Facebook)</p>
            <LoginWithSocial />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Register Multi-Step -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-account-plus" class="mr-2" />
            Register Multi-Step
            <VSpacer />
            <VChip color="blue" size="small">VStepper, VTextField, VSelect</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Multi-step registration wizard with validation</p>
            <RegisterMultiStep />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Forgot Password -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-lock-reset" class="mr-2" />
            Forgot Password
            <VSpacer />
            <VChip color="blue" size="small">VCard, VTextField, VAlert</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Password recovery form with email verification</p>
            <ForgotPassword />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- OTP Verification -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-shield-key" class="mr-2" />
            OTP Verification
            <VSpacer />
            <VChip color="blue" size="small">VCard, VTextField, VBtn</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">OTP/2FA verification with 6-digit input</p>
            <OtpVerification />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import {
  LoginSimple,
  LoginWithSocial,
  RegisterMultiStep,
  ForgotPassword,
  OtpVerification
} from '@/snippets'
</script>
