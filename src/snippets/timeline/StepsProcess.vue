<!--
  Snippet: Steps & Process
  Description: Step-by-step process indicators with completion states
  Components: StepItem, VRow, VCol
  Variants: Vertical, Horizontal (via grid), Compact
-->
<script setup lang="ts">
import { ref } from 'vue'
import { Icons } from '../../shared/model'
import { StepItem } from '../../shared/ui/snippets'

const onboardingSteps = [
  { step: 1, title: 'Create your account', description: 'Sign up with your email and set a secure password.', icon: Icons.AccountPlus, completed: true, active: false },
  { step: 2, title: 'Verify your email', description: 'Check your inbox and click the confirmation link.', icon: Icons.EmailOpen, completed: true, active: false },
  { step: 3, title: 'Set up your profile', description: 'Add your details, avatar, and preferences.', icon: Icons.AccountCog, completed: false, active: true },
  { step: 4, title: 'Invite teammates', description: 'Bring your team on board to collaborate.', icon: Icons.AccountMultiple, completed: false, active: false },
  { step: 5, title: 'You\'re all set!', description: 'Start using all features of the platform.', icon: Icons.Trophy, completed: false, active: false },
]

const checkoutSteps = [
  { step: 1, title: 'Cart', description: 'Review your items', completed: true, active: false },
  { step: 2, title: 'Shipping', description: 'Enter delivery address', completed: true, active: false },
  { step: 3, title: 'Payment', description: 'Choose payment method', completed: false, active: true },
  { step: 4, title: 'Confirm', description: 'Place your order', completed: false, active: false },
]
</script>
<template>
  <VContainer>
    <!-- Vertical Steps (onboarding) -->
    <VRow class="mb-8">
      <VCol cols="12" md="6">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Vertical (Onboarding)</h3>
        <div class="d-flex flex-column">
          <StepItem
            v-for="(step, i) in onboardingSteps"
            :key="step.step"
            :step="step.step"
            :title="step.title"
            :description="step.description"
            :icon="step.icon"
            :completed="step.completed"
            :active="step.active"
            :is-last="i === onboardingSteps.length - 1"
            :show-connector="true"
          />
        </div>
      </VCol>

      <!-- Compact steps (numbered, no description) -->
      <VCol cols="12" md="6">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Compact (numbered)</h3>
        <div class="d-flex flex-column">
          <StepItem
            v-for="(step, i) in checkoutSteps"
            :key="step.step"
            :step="step.step"
            :title="step.title"
            :description="step.description"
            :completed="step.completed"
            :active="step.active"
            :is-last="i === checkoutSteps.length - 1"
            dot-size="36"
            active-color="primary"
            completed-color="success"
            title-class="text-body-2 font-weight-semibold"
            description-class="text-caption text-medium-emphasis"
            content-class="pa-2"
          />
        </div>
      </VCol>
    </VRow>

    <!-- Horizontal steps (grid simulation) -->
    <VRow>
      <VCol cols="12">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Horizontal layout (grid)</h3>
        <VRow>
          <VCol
            v-for="(step, i) in checkoutSteps"
            :key="step.step"
            cols="6"
            md="3"
          >
            <VCard variant="outlined" :class="[step.active ? 'border-primary' : '', 'text-center pa-4']">
              <VAvatar
                :color="step.completed ? 'success' : step.active ? 'primary' : 'grey-lighten-2'"
                size="52"
                class="mb-3"
              >
                <VIcon v-if="step.completed" color="white">{{ Icons.Check }}</VIcon>
                <span v-else class="text-body-1 font-weight-bold" :class="step.active ? 'text-white' : 'text-grey'">
                  {{ step.step }}
                </span>
              </VAvatar>
              <p class="text-body-2 font-weight-medium mb-1">{{ step.title }}</p>
              <p class="text-caption text-medium-emphasis mb-0">{{ step.description }}</p>
            </VCard>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </VContainer>
</template>
