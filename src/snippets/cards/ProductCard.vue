<!--
  Snippet: Product Card
  Description: E-commerce product cards with various styles
  Components: VCard, VImg, VBtn, VChip, VRating, VIcon
  Variants: Standard, Horizontal, Compact, Featured
-->
<template>
  <VContainer fluid>
    <h2 class="text-h5 font-weight-bold mb-6">Product Card Variants</h2>

    <!-- Standard Product Cards -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Standard Cards</h3>
    <VRow class="mb-8">
      <VCol v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <VCard class="h-100">
          <!-- Image with Badges -->
          <div class="position-relative">
            <VImg :src="product.image" height="200" cover>
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <VProgressCircular indeterminate color="primary" />
                </div>
              </template>
            </VImg>

            <!-- Badges -->
            <div class="position-absolute" style="top: 12px; left: 12px;">
              <VChip v-if="product.isNew" color="primary" size="small" class="mr-1">NEW</VChip>
              <VChip v-if="product.discount" color="error" size="small">-{{ product.discount }}%</VChip>
            </div>

            <!-- Wishlist Button -->
            <VBtn
              icon
              size="small"
              variant="flat"
              color="white"
              class="position-absolute"
              style="top: 12px; right: 12px;"
              @click="toggleWishlist(product.id)"
            >
              <VIcon :color="wishlist.includes(product.id) ? 'error' : 'grey'">
                {{ wishlist.includes(product.id) ? 'mdi-heart' : 'mdi-heart-outline' }}
              </VIcon>
            </VBtn>
          </div>

          <VCardText>
            <p class="text-caption text-medium-emphasis mb-1">{{ product.category }}</p>
            <h4 class="text-subtitle-1 font-weight-medium mb-2 text-truncate">{{ product.name }}</h4>

            <div class="d-flex align-center mb-2">
              <VRating
                :model-value="product.rating"
                color="warning"
                density="compact"
                size="small"
                readonly
                half-increments
              />
              <span class="text-caption text-medium-emphasis ml-1">({{ product.reviews }})</span>
            </div>

            <div class="d-flex align-center">
              <span class="text-h6 font-weight-bold text-primary">${{ product.price.toFixed(2) }}</span>
              <span v-if="product.originalPrice" class="text-body-2 text-medium-emphasis text-decoration-line-through ml-2">
                ${{ product.originalPrice.toFixed(2) }}
              </span>
            </div>
          </VCardText>

          <VCardActions class="px-4 pb-4">
            <VBtn color="primary" block variant="flat" @click="addToCart(product)">
              <VIcon start>mdi-cart-plus</VIcon>
              Add to Cart
            </VBtn>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>

    <!-- Horizontal Product Cards -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Horizontal Cards</h3>
    <VRow class="mb-8">
      <VCol v-for="product in products.slice(0, 2)" :key="'h-' + product.id" cols="12" md="6">
        <VCard>
          <VRow no-gutters>
            <VCol cols="4">
              <VImg :src="product.image" height="100%" cover class="rounded-s" />
            </VCol>
            <VCol cols="8">
              <VCardText>
                <div class="d-flex justify-space-between align-start">
                  <div>
                    <VChip v-if="product.isNew" color="primary" size="x-small" class="mb-2">NEW</VChip>
                    <h4 class="text-subtitle-1 font-weight-medium mb-1">{{ product.name }}</h4>
                    <p class="text-caption text-medium-emphasis mb-2">{{ product.category }}</p>
                  </div>
                  <VBtn icon="mdi-heart-outline" variant="text" size="small" />
                </div>

                <p class="text-body-2 text-medium-emphasis mb-3 text-truncate-2">
                  {{ product.description }}
                </p>

                <div class="d-flex align-center justify-space-between">
                  <div>
                    <VRating :model-value="product.rating" size="x-small" color="warning" density="compact" readonly />
                    <span class="text-h6 font-weight-bold text-primary d-block">${{ product.price.toFixed(2) }}</span>
                  </div>
                  <VBtn color="primary" size="small">Add to Cart</VBtn>
                </div>
              </VCardText>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VRow>

    <!-- Compact Product Cards -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Compact Cards</h3>
    <VRow class="mb-8">
      <VCol v-for="product in products" :key="'c-' + product.id" cols="6" sm="4" md="3" lg="2">
        <VCard class="text-center">
          <VImg :src="product.image" height="120" cover />
          <VCardText class="pa-3">
            <p class="text-body-2 font-weight-medium text-truncate mb-1">{{ product.name }}</p>
            <span class="text-subtitle-1 font-weight-bold text-primary">${{ product.price.toFixed(2) }}</span>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Featured Product Card -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Featured Card</h3>
    <VCard class="overflow-hidden">
      <VRow no-gutters>
        <VCol cols="12" md="6">
          <VImg
            :src="products[0].image"
            height="400"
            cover
          />
        </VCol>
        <VCol cols="12" md="6" class="d-flex align-center">
          <VCardText class="pa-8">
            <VChip color="error" class="mb-4">FEATURED PRODUCT</VChip>
            <h2 class="text-h4 font-weight-bold mb-2">{{ products[0].name }}</h2>
            <p class="text-body-1 text-medium-emphasis mb-4">{{ products[0].description }}</p>

            <div class="d-flex align-center mb-4">
              <VRating :model-value="products[0].rating" color="warning" density="comfortable" readonly />
              <span class="text-body-2 ml-2">{{ products[0].rating }} ({{ products[0].reviews }} reviews)</span>
            </div>

            <div class="mb-6">
              <span class="text-h4 font-weight-bold text-primary">${{ products[0].price.toFixed(2) }}</span>
              <span v-if="products[0].originalPrice" class="text-h6 text-medium-emphasis text-decoration-line-through ml-2">
                ${{ products[0].originalPrice.toFixed(2) }}
              </span>
              <VChip v-if="products[0].discount" color="success" size="small" class="ml-2">
                Save {{ products[0].discount }}%
              </VChip>
            </div>

            <div class="d-flex ga-3">
              <VBtn color="primary" size="large" prepend-icon="mdi-cart-plus">Add to Cart</VBtn>
              <VBtn variant="outlined" size="large" prepend-icon="mdi-heart-outline">Wishlist</VBtn>
            </div>
          </VCardText>
        </VCol>
      </VRow>
    </VCard>
  </VContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const wishlist = ref<number[]>([])

const products = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviews: 234,
    image: 'https://picsum.photos/seed/prod1/400/400',
    isNew: true,
    discount: 38,
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    category: 'Electronics',
    price: 249.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 567,
    image: 'https://picsum.photos/seed/prod2/400/400',
    isNew: false,
    discount: null,
    description: 'Advanced smartwatch with health monitoring, GPS, and water resistance.',
  },
  {
    id: 3,
    name: 'Leather Messenger Bag',
    category: 'Accessories',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.2,
    reviews: 89,
    image: 'https://picsum.photos/seed/prod3/400/400',
    isNew: false,
    discount: 25,
    description: 'Handcrafted genuine leather bag perfect for work or casual use.',
  },
  {
    id: 4,
    name: 'Minimalist Desk Lamp',
    category: 'Home',
    price: 45.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 156,
    image: 'https://picsum.photos/seed/prod4/400/400',
    isNew: true,
    discount: null,
    description: 'Modern LED desk lamp with adjustable brightness and color temperature.',
  },
]

const toggleWishlist = (id: number) => {
  const index = wishlist.value.indexOf(id)
  if (index > -1) {
    wishlist.value.splice(index, 1)
  } else {
    wishlist.value.push(id)
  }
}

const addToCart = (product: typeof products[0]) => {
  console.log('Added to cart:', product.name)
}
</script>

<style scoped>
.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
