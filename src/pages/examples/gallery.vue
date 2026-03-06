<script setup lang="ts">
import { Icons } from '../../shared/model'
import { GalleryShowcase } from '../../snippets'
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
          <VIcon :icon="Icons.ImageMultiple" size="large" color="pink" class="mr-2" />
          Gallery
        </h1>
        <p class="text-h6 text-medium-emphasis">
          Image grids with hover overlays, category filters, like and zoom actions
        </p>
      </VCol>
    </VRow>

    <!-- Gallery Showcase -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon :icon="Icons.ViewGrid" class="mr-2" />
            Gallery Showcase
            <VSpacer />
            <VChip color="pink" size="small">GalleryCard, VChipGroup</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">
              Image gallery with hover overlays, category filters, like/zoom/share actions and always-visible caption variants.
            </p>
            <GalleryShowcase />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
