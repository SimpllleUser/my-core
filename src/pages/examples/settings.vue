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
          <VIcon icon="mdi-cog" size="large" color="blue-grey" class="mr-2" />
          Settings & Profile
        </h1>
        <p class="text-h6 text-medium-emphasis">
          User settings pages and profile management
        </p>
      </VCol>
    </VRow>

    <!-- Settings Page -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-cog-outline" class="mr-2" />
            Settings Page
            <VSpacer />
            <VChip color="blue-grey" size="small">VCard, VSwitch, VSelect, VList</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">User settings page with tabs and preferences</p>
            <SettingsPage />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Profile Page -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-account" class="mr-2" />
            Profile Page
            <VSpacer />
            <VChip color="blue-grey" size="small">VCard, VTabs, VTimeline, VAvatar</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">User profile page with activity timeline</p>
            <ProfilePage />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import {
  SettingsPage,
  ProfilePage
} from '@/snippets'
</script>
