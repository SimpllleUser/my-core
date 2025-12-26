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
          <VIcon icon="mdi-alert-circle" size="large" color="red" class="mr-2" />
          Error Pages
        </h1>
        <p class="text-h6 text-medium-emphasis">
          404, 500, and maintenance pages
        </p>
      </VCol>
    </VRow>

    <!-- Error 404 -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-file-alert" class="mr-2" />
            Error 404
            <VSpacer />
            <VChip color="red" size="small">VContainer, VBtn, VIcon</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Page not found with multiple style variations</p>
            <Error404 />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Error 500 -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-server-off" class="mr-2" />
            Error 500
            <VSpacer />
            <VChip color="red" size="small">VContainer, VAlert, VExpansionPanels</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Server error page with error details</p>
            <Error500 />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Maintenance -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-tools" class="mr-2" />
            Maintenance
            <VSpacer />
            <VChip color="red" size="small">VCard, VProgressLinear, VTextField</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Under maintenance page with countdown timer</p>
            <Maintenance />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import {
  Error404,
  Error500,
  Maintenance
} from '@/snippets'
</script>
