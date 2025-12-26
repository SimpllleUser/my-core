<!--
  Snippet: Product Grid
  Description: E-commerce product grid with filters and sorting
  Components: VCard, VRow, VCol, VBtn, VChip, VSelect, VRating, VPagination
  Variants: Grid view, List view
-->
<template>
  <VContainer fluid>
    <!-- Header -->
    <div class="d-flex flex-wrap justify-space-between align-center mb-6 ga-4">
      <div>
        <h1 class="text-h4 font-weight-bold">Products</h1>
        <p class="text-medium-emphasis">Showing {{ products.length }} products</p>
      </div>
      <div class="d-flex align-center ga-2">
        <VSelect
          v-model="sortBy"
          :items="sortOptions"
          label="Sort by"
          variant="outlined"
          density="compact"
          hide-details
          style="width: 180px;"
        />
        <VBtnToggle v-model="viewMode" mandatory density="compact" variant="outlined">
          <VBtn value="grid" icon="mdi-view-grid" />
          <VBtn value="list" icon="mdi-view-list" />
        </VBtnToggle>
      </div>
    </div>

    <!-- Product Grid -->
    <VRow>
      <VCol
        v-for="product in products"
        :key="product.id"
        :cols="viewMode === 'grid' ? 12 : 12"
        :sm="viewMode === 'grid' ? 6 : 12"
        :md="viewMode === 'grid' ? 4 : 12"
        :lg="viewMode === 'grid' ? 3 : 12"
      >
        <!-- Grid View Card -->
        <VCard v-if="viewMode === 'grid'" class="h-100">
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

            <!-- Quick Actions -->
            <div class="position-absolute d-flex flex-column ga-1" style="top: 12px; right: 12px;">
              <VBtn
                icon
                size="small"
                variant="flat"
                color="white"
                @click="toggleWishlist(product.id)"
              >
                <VIcon :color="wishlist.includes(product.id) ? 'error' : 'grey'">
                  {{ wishlist.includes(product.id) ? 'mdi-heart' : 'mdi-heart-outline' }}
                </VIcon>
              </VBtn>
              <VBtn icon size="small" variant="flat" color="white" @click="quickView(product)">
                <VIcon color="grey">mdi-eye</VIcon>
              </VBtn>
            </div>
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

            <div class="d-flex align-center justify-space-between">
              <div>
                <span class="text-h6 font-weight-bold text-primary">${{ product.price.toFixed(2) }}</span>
                <span v-if="product.originalPrice" class="text-body-2 text-medium-emphasis text-decoration-line-through ml-2">
                  ${{ product.originalPrice.toFixed(2) }}
                </span>
              </div>
              <VBtn icon size="small" color="primary" @click="addToCart(product)">
                <VIcon>mdi-cart-plus</VIcon>
              </VBtn>
            </div>
          </VCardText>
        </VCard>

        <!-- List View Card -->
        <VCard v-else>
          <VRow no-gutters>
            <VCol cols="3">
              <VImg :src="product.image" height="100%" cover class="rounded-s" />
            </VCol>
            <VCol cols="9">
              <VCardText class="h-100 d-flex flex-column">
                <div class="d-flex justify-space-between align-start mb-2">
                  <div>
                    <div class="d-flex ga-1 mb-2">
                      <VChip v-if="product.isNew" color="primary" size="x-small">NEW</VChip>
                      <VChip v-if="product.discount" color="error" size="x-small">-{{ product.discount }}%</VChip>
                      <VChip size="x-small" variant="outlined">{{ product.category }}</VChip>
                    </div>
                    <h4 class="text-h6 font-weight-medium">{{ product.name }}</h4>
                  </div>
                  <VBtn icon="mdi-heart-outline" variant="text" size="small" />
                </div>

                <p class="text-body-2 text-medium-emphasis flex-grow-1">
                  {{ product.description }}
                </p>

                <div class="d-flex justify-space-between align-center">
                  <div>
                    <VRating :model-value="product.rating" size="small" color="warning" density="compact" readonly />
                    <span class="text-caption text-medium-emphasis ml-2">{{ product.reviews }} reviews</span>
                  </div>
                  <div class="d-flex align-center ga-4">
                    <div class="text-right">
                      <span class="text-h5 font-weight-bold text-primary">${{ product.price.toFixed(2) }}</span>
                      <span v-if="product.originalPrice" class="text-body-2 text-medium-emphasis text-decoration-line-through ml-2">
                        ${{ product.originalPrice.toFixed(2) }}
                      </span>
                    </div>
                    <VBtn color="primary" @click="addToCart(product)">
                      <VIcon start>mdi-cart-plus</VIcon>
                      Add to Cart
                    </VBtn>
                  </div>
                </div>
              </VCardText>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VRow>

    <!-- Pagination -->
    <div class="d-flex justify-center mt-8">
      <VPagination
        v-model="page"
        :length="5"
        :total-visible="5"
        rounded
      />
    </div>
  </VContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const sortBy = ref('featured')
const viewMode = ref<'grid' | 'list'>('grid')
const page = ref(1)
const wishlist = ref<number[]>([])

const sortOptions = [
  { title: 'Featured', value: 'featured' },
  { title: 'Price: Low to High', value: 'price_asc' },
  { title: 'Price: High to Low', value: 'price_desc' },
  { title: 'Rating', value: 'rating' },
  { title: 'Newest', value: 'newest' },
]

const products = [
  { id: 1, name: 'Wireless Bluetooth Headphones', category: 'Electronics', price: 79.99, originalPrice: 129.99, rating: 4.5, reviews: 234, image: 'https://picsum.photos/seed/prod1/400/400', isNew: true, discount: 38, description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.' },
  { id: 2, name: 'Smart Watch Pro', category: 'Electronics', price: 249.99, originalPrice: null, rating: 4.8, reviews: 567, image: 'https://picsum.photos/seed/prod2/400/400', isNew: false, discount: null, description: 'Advanced smartwatch with health monitoring, GPS, and water resistance up to 50m.' },
  { id: 3, name: 'Leather Messenger Bag', category: 'Accessories', price: 89.99, originalPrice: 119.99, rating: 4.2, reviews: 89, image: 'https://picsum.photos/seed/prod3/400/400', isNew: false, discount: 25, description: 'Handcrafted genuine leather bag perfect for work or casual use.' },
  { id: 4, name: 'Minimalist Desk Lamp', category: 'Home', price: 45.99, originalPrice: null, rating: 4.6, reviews: 156, image: 'https://picsum.photos/seed/prod4/400/400', isNew: true, discount: null, description: 'Modern LED desk lamp with adjustable brightness and color temperature.' },
  { id: 5, name: 'Running Shoes Elite', category: 'Sports', price: 129.99, originalPrice: 159.99, rating: 4.7, reviews: 312, image: 'https://picsum.photos/seed/prod5/400/400', isNew: false, discount: 19, description: 'Lightweight running shoes with advanced cushioning technology.' },
  { id: 6, name: 'Portable Bluetooth Speaker', category: 'Electronics', price: 59.99, originalPrice: null, rating: 4.4, reviews: 178, image: 'https://picsum.photos/seed/prod6/400/400', isNew: true, discount: null, description: 'Waterproof speaker with 360-degree sound and 12-hour battery life.' },
  { id: 7, name: 'Yoga Mat Premium', category: 'Sports', price: 39.99, originalPrice: 49.99, rating: 4.3, reviews: 95, image: 'https://picsum.photos/seed/prod7/400/400', isNew: false, discount: 20, description: 'Eco-friendly yoga mat with non-slip surface and carrying strap.' },
  { id: 8, name: 'Coffee Maker Deluxe', category: 'Home', price: 149.99, originalPrice: null, rating: 4.9, reviews: 423, image: 'https://picsum.photos/seed/prod8/400/400', isNew: false, discount: null, description: 'Programmable coffee maker with built-in grinder and thermal carafe.' },
]

const toggleWishlist = (id: number) => {
  const index = wishlist.value.indexOf(id)
  if (index > -1) {
    wishlist.value.splice(index, 1)
  } else {
    wishlist.value.push(id)
  }
}

const quickView = (product: typeof products[0]) => {
  console.log('Quick view:', product.name)
}

const addToCart = (product: typeof products[0]) => {
  console.log('Added to cart:', product.name)
}
</script>
