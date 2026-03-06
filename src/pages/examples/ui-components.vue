<script setup lang="ts">
import { Icons } from '../../shared/model'
import { EmptyStateExamples, NotificationExamples, BannersAndFaq, AuthCardExamples } from '../../snippets'
</script>
<template>
  <VContainer fluid class="pa-6">
    <!-- Header -->
    <VRow class="mb-6">
      <VCol cols="12">
        <VBtn to="/examples" variant="text" :prepend-icon="Icons.ArrowLeft" class="mb-4">
          Back to Examples
        </VBtn>
        <h1 class="text-h3 font-weight-bold mb-2">
          <VIcon :icon="Icons.Widgets" size="large" color="teal" class="mr-2" />
          UI Components
        </h1>
        <p class="text-h6 text-medium-emphasis">
          Empty states, notifications, banners, FAQ, CTA, newsletters, and auth cards
        </p>
      </VCol>
    </VRow>

    <!-- Empty States -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon :icon="Icons.BoxOutline" class="mr-2" />
            Empty States
            <VSpacer />
            <VChip color="teal" size="small">EmptyState, VCard, VIcon</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Placeholder states for empty lists, no results, access denied, and first-use scenarios.</p>
            <EmptyStateExamples />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Notifications -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon :icon="Icons.Bell" class="mr-2" />
            Notification Items
            <VSpacer />
            <VChip color="teal" size="small">NotificationItem, VCard, VList</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Notification items for dropdown panels and full-page feeds with type-based icons and unread state.</p>
            <NotificationExamples />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Banners, CTAs, Newsletter & FAQ -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon :icon="Icons.Bullhorn" class="mr-2" />
            Banners, CTA, Newsletter & FAQ
            <VSpacer />
            <VChip color="teal" size="small">AnnouncementBanner, CtaBanner, NewsletterCard, FaqItem</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Dismissible banners, call-to-action sections, email subscription forms, and FAQ accordions.</p>
            <BannersAndFaq />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Auth Cards -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon :icon="Icons.Lock" class="mr-2" />
            Auth Cards
            <VSpacer />
            <VChip color="teal" size="small">AuthCard, VTextField, VBtn</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Reusable auth card component for login, register, and forgot-password modes with social provider support.</p>
            <AuthCardExamples />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
