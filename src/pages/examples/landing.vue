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
          <VIcon icon="mdi-web" size="large" color="green" class="mr-2" />
          Landing Pages
        </h1>
        <p class="text-h6 text-medium-emphasis">
          Hero sections, features, pricing tables, and testimonials
        </p>
      </VCol>
    </VRow>

    <!-- Hero Section -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-view-carousel" class="mr-2" />
            Hero Section
            <VSpacer />
            <VChip color="green" size="small">VContainer, VRow, VCol, VBtn</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Multiple hero section styles (centered, split, gradient)</p>
            <HeroSection />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Features Section -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-feature-search" class="mr-2" />
            Features Section
            <VSpacer />
            <VChip color="green" size="small">VCard, VIcon, VRow, VCol</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Feature showcases (grid, alternating, icons)</p>
            <FeaturesSection />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Pricing Section -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-currency-usd" class="mr-2" />
            Pricing Section
            <VSpacer />
            <VChip color="green" size="small">VCard, VSwitch, VList, VTable</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Pricing tables with comparison and toggle</p>
            <PricingSection />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Testimonials Section -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-comment-quote" class="mr-2" />
            Testimonials Section
            <VSpacer />
            <VChip color="green" size="small">VCard, VAvatar, VRating</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Customer testimonials (grid, carousel, featured)</p>
            <TestimonialsSection />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import {
  HeroSection,
  FeaturesSection,
  PricingSection,
  TestimonialsSection
} from '@/snippets'
</script>
