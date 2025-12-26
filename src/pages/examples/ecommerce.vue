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
          <VIcon icon="mdi-cart" size="large" color="deep-purple" class="mr-2" />
          E-commerce
        </h1>
        <p class="text-h6 text-medium-emphasis">
          Product grids, shopping carts, and e-commerce components
        </p>
      </VCol>
    </VRow>

    <!-- Product Grid -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-view-grid" class="mr-2" />
            Product Grid
            <VSpacer />
            <VChip color="deep-purple" size="small">VCard, VRating, VPagination</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Product grid with filters and pagination</p>
            <ProductGrid />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Shopping Cart -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-cart-outline" class="mr-2" />
            Shopping Cart
            <VSpacer />
            <VChip color="deep-purple" size="small">VCard, VList, VTextField, VBtn</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Shopping cart with item management and summary</p>
            <ShoppingCart />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import {
  ProductGrid,
  ShoppingCart
} from '@/snippets'
</script>
