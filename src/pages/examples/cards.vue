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
          <VIcon icon="mdi-card-outline" size="large" color="teal" class="mr-2" />
          Cards
        </h1>
        <p class="text-h6 text-medium-emphasis">
          Product, profile, pricing, and statistics cards
        </p>
      </VCol>
    </VRow>

    <!-- Product Card -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-package-variant" class="mr-2" />
            Product Card
            <VSpacer />
            <VChip color="teal" size="small">VCard, VImg, VRating, VChip</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">E-commerce product cards (grid, horizontal, featured)</p>
            <ProductCard />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- User Profile Card -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-account-circle" class="mr-2" />
            User Profile Card
            <VSpacer />
            <VChip color="teal" size="small">VCard, VAvatar, VList, VChip</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">User profile cards (simple, detailed, social)</p>
            <UserProfileCard />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Pricing Card -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-tag" class="mr-2" />
            Pricing Card
            <VSpacer />
            <VChip color="teal" size="small">VCard, VList, VBtn, VTable</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Pricing plan cards with features list</p>
            <PricingCard />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Stats Card -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-chart-areaspline" class="mr-2" />
            Stats Card
            <VSpacer />
            <VChip color="teal" size="small">VCard, VProgressLinear, VSparkline</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Statistics cards (trends, progress, sparklines)</p>
            <StatsCard />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import {
  ProductCard,
  UserProfileCard,
  PricingCard,
  StatsCard
} from '@/snippets'
</script>
