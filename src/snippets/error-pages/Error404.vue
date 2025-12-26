<!--
  Snippet: Error 404 Page
  Description: Page not found error page
  Components: VContainer, VBtn, VIcon
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center" class="text-center">
      <v-col cols="12" md="8" lg="6">
        <!-- Style 1: Simple -->
        <div class="mb-16">
          <h1 class="text-h1 font-weight-bold text-primary mb-4">404</h1>
          <h2 class="text-h4 font-weight-bold mb-4">Page Not Found</h2>
          <p class="text-body-1 text-medium-emphasis mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div class="d-flex justify-center ga-4">
            <v-btn color="primary" size="large" prepend-icon="mdi-home" @click="goHome">
              Go Home
            </v-btn>
            <v-btn variant="outlined" size="large" prepend-icon="mdi-arrow-left" @click="goBack">
              Go Back
            </v-btn>
          </div>
        </div>

        <v-divider class="my-12" />

        <!-- Style 2: With Illustration -->
        <div class="mb-16">
          <v-icon size="160" color="primary" class="mb-6">mdi-file-search-outline</v-icon>
          <h2 class="text-h4 font-weight-bold mb-4">We've Lost This Page</h2>
          <p class="text-body-1 text-medium-emphasis mb-6 mx-auto" style="max-width: 400px;">
            Sorry, the page you are looking for could not be found. It might have been removed, renamed, or didn't exist in the first place.
          </p>

          <v-text-field
            v-model="searchQuery"
            variant="outlined"
            placeholder="Search for something else..."
            prepend-inner-icon="mdi-magnify"
            class="mx-auto mb-6"
            style="max-width: 400px;"
            hide-details
          >
            <template #append-inner>
              <v-btn color="primary" variant="flat" size="small">Search</v-btn>
            </template>
          </v-text-field>

          <p class="text-body-2 text-medium-emphasis">
            Or try these helpful links:
          </p>
          <div class="d-flex justify-center ga-2 flex-wrap">
            <v-chip variant="outlined" @click="goHome">Home</v-chip>
            <v-chip variant="outlined">Products</v-chip>
            <v-chip variant="outlined">Support</v-chip>
            <v-chip variant="outlined">Contact</v-chip>
          </div>
        </div>

        <v-divider class="my-12" />

        <!-- Style 3: Creative -->
        <div>
          <div class="text-h1 font-weight-bold mb-4" style="font-size: 120px !important;">
            <span class="text-primary">4</span>
            <v-icon size="100" color="error" class="mx-n2">mdi-emoticon-sad-outline</v-icon>
            <span class="text-primary">4</span>
          </div>
          <h2 class="text-h4 font-weight-bold mb-4">Oops! You're Lost</h2>
          <p class="text-body-1 text-medium-emphasis mb-8">
            The page you're looking for isn't available. But don't worry, you can find plenty of other things on our homepage.
          </p>
          <v-btn color="primary" size="x-large" rounded="pill" @click="goHome">
            Back to Homepage
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
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
