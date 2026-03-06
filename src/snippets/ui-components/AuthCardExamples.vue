<!--
  Snippet: AuthCard Examples
  Description: Reusable auth card in login, register, and forgot password modes
  Components: AuthCard, VRow, VCol
  Variants: Login, Register, Forgot Password, With Social
-->
<script setup lang="ts">
import { ref } from 'vue'
import { Icons } from '../../shared/model'
import { AuthCard } from '../../shared/ui/snippets'

const mode = ref<'login' | 'register' | 'forgot'>('login')

const socialProviders = [
  { name: 'Google', icon: Icons.Google, color: 'error' },
  { name: 'GitHub', icon: Icons.Github, color: 'grey-darken-3' },
]
</script>
<template>
  <VContainer>
    <!-- Mode switcher -->
    <VRow class="mb-4" justify="center">
      <VCol cols="auto">
        <VBtnToggle v-model="mode" mandatory variant="outlined" rounded="lg">
          <VBtn value="login">Login</VBtn>
          <VBtn value="register">Register</VBtn>
          <VBtn value="forgot">Forgot</VBtn>
        </VBtnToggle>
      </VCol>
    </VRow>

    <VRow justify="center">
      <!-- Simple Login -->
      <VCol cols="12" md="4">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3 text-center">Simple</h3>
        <AuthCard
          :mode="mode"
          :title="mode === 'login' ? 'Welcome back' : mode === 'register' ? 'Create account' : 'Reset password'"
          :subtitle="mode === 'login' ? 'Sign in to your account' : mode === 'register' ? 'Start for free today' : 'Enter your email to reset'"
          :show-name="mode === 'register'"
          :show-confirm-password="mode === 'register'"
          :show-remember-me="mode === 'login'"
          switch-text="Don't have an account?"
          switch-link-text="Sign up"
          elevation="1"
          input-variant="outlined"
        />
      </VCol>

      <!-- With Social Providers -->
      <VCol cols="12" md="4">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3 text-center">With Social</h3>
        <AuthCard
          mode="login"
          title="Sign in"
          subtitle="Welcome back, please sign in."
          :show-socials="true"
          :social-providers="socialProviders"
          switch-text="New here?"
          switch-link-text="Create account"
          elevation="1"
        />
      </VCol>

      <!-- Register -->
      <VCol cols="12" md="4">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3 text-center">Register</h3>
        <AuthCard
          mode="register"
          title="Join us"
          subtitle="Create your free account"
          :show-name="true"
          :show-confirm-password="true"
          :show-remember-me="false"
          :show-socials="true"
          :social-providers="[{ name: 'Google', icon: Icons.Google, color: 'error' }]"
          switch-text="Already have an account?"
          switch-link-text="Sign in"
          elevation="1"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>
