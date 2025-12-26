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
          <VIcon icon="mdi-window-open" size="large" color="pink" class="mr-2" />
          Modals & Dialogs
        </h1>
        <p class="text-h6 text-medium-emphasis">
          Alerts, confirmations, form dialogs, and fullscreen modals
        </p>
      </VCol>
    </VRow>

    <!-- Dialog Variants -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-comment-alert" class="mr-2" />
            Dialog Variants
            <VSpacer />
            <VChip color="pink" size="small">VDialog, VCard, VBtn, VForm</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Various dialog types (confirm, alert, form, fullscreen)</p>
            <DialogVariants />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import {
  DialogVariants
} from '@/snippets'
</script>
