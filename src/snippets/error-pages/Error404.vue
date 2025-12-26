<!--
  Snippet: Error 404 Page
  Description: Page not found error page
  Components: VContainer, VBtn, VIcon
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <VContainer class="fill-height">
    <VRow align="center" justify="center" class="text-center">
      <VCol cols="12" md="8" lg="6">
        <!-- Style 1: Simple -->
        <div class="mb-16">
          <h1 class="text-h1 font-weight-bold text-primary mb-4">404</h1>
          <h2 class="text-h4 font-weight-bold mb-4">Page Not Found</h2>
          <p class="text-body-1 text-medium-emphasis mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div class="d-flex justify-center ga-4">
            <VBtn color="primary" size="large" prepend-icon="mdi-home" @click="goHome">
              Go Home
            </VBtn>
            <VBtn variant="outlined" size="large" prepend-icon="mdi-arrow-left" @click="goBack">
              Go Back
            </VBtn>
          </div>
        </div>

        <VDivider class="my-12" />

        <!-- Style 2: With Illustration -->
        <div class="mb-16">
          <VIcon size="160" color="primary" class="mb-6">mdi-file-search-outline</VIcon>
          <h2 class="text-h4 font-weight-bold mb-4">We've Lost This Page</h2>
          <p class="text-body-1 text-medium-emphasis mb-6 mx-auto" style="max-width: 400px;">
            Sorry, the page you are looking for could not be found. It might have been removed, renamed, or didn't exist in the first place.
          </p>

          <VTextField
            v-model="searchQuery"
            variant="outlined"
            placeholder="Search for something else..."
            prepend-inner-icon="mdi-magnify"
            class="mx-auto mb-6"
            style="max-width: 400px;"
            hide-details
          >
            <template #append-inner>
              <VBtn color="primary" variant="flat" size="small">Search</VBtn>
            </template>
          </VTextField>

          <p class="text-body-2 text-medium-emphasis">
            Or try these helpful links:
          </p>
          <div class="d-flex justify-center ga-2 flex-wrap">
            <VChip variant="outlined" @click="goHome">Home</VChip>
            <VChip variant="outlined">Products</VChip>
            <VChip variant="outlined">Support</VChip>
            <VChip variant="outlined">Contact</VChip>
          </div>
        </div>

        <VDivider class="my-12" />

        <!-- Style 3: Creative -->
        <div>
          <div class="text-h1 font-weight-bold mb-4" style="font-size: 120px !important;">
            <span class="text-primary">4</span>
            <VIcon size="100" color="error" class="mx-n2">mdi-emoticon-sad-outline</VIcon>
            <span class="text-primary">4</span>
          </div>
          <h2 class="text-h4 font-weight-bold mb-4">Oops! You're Lost</h2>
          <p class="text-body-1 text-medium-emphasis mb-8">
            The page you're looking for isn't available. But don't worry, you can find plenty of other things on our homepage.
          </p>
          <VBtn color="primary" size="x-large" rounded="pill" @click="goHome">
            Back to Homepage
            <VIcon end>mdi-arrow-right</VIcon>
          </VBtn>
        </div>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

const goHome = () => {
  console.log('Navigate to home')
}

const goBack = () => {
  window.history.back()
}
</script>
