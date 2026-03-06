<!--
  Snippet: Product Grid
  Description: E-commerce product grid with filters and sorting
  Components: VCard, VRow, VCol, VBtn, VChip, VSelect, VRating, VPagination, ProductFilter
  Variants: Grid view, List view, Sidebar filter (desktop), Drawer filter (mobile)
-->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'
import { Icons } from '../../shared/model'
import ProductFilter from '../../shared/ui/snippets/ProductFilter.vue'
import type { IFilterField, FilterValues } from '../../shared/ui/snippets/types'

const { mdAndUp } = useDisplay()

const sortBy = ref('featured')
const viewMode = ref<'grid' | 'list'>('grid')
const page = ref(1)
const wishlist = ref<number[]>([])
const filterDrawer = ref(false)
const filterValues = ref<FilterValues>({})

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

const categoryOptions = computed(() => {
  const counts: Record<string, number> = {}
  for (const p of products) {
    counts[p.category] = (counts[p.category] ?? 0) + 1
  }
  return Object.entries(counts).map(([label, count]) => ({
    label,
    value: label,
    count,
  }))
})

const filterConfig = computed<IFilterField[]>(() => [
  {
    key: 'search',
    label: 'Search',
    type: 'search',
    hint: 'Search products...',
  },
  {
    key: 'category',
    label: 'Category',
    type: 'checkbox',
    options: categoryOptions.value,
  },
  {
    key: 'price',
    label: 'Price range',
    type: 'range',
    min: 0,
    max: 300,
    step: 5,
    prefix: '$',
  },
  {
    key: 'rating',
    label: 'Min. rating',
    type: 'rating',
    icon: Icons.Star,
  },
  {
    key: 'onSale',
    label: 'On sale only',
    type: 'toggle',
    color: 'error',
    hint: 'Show products with discount',
  },
  {
    key: 'isNew',
    label: 'New arrivals only',
    type: 'toggle',
    color: 'primary',
  },
])

const filteredProducts = computed(() => {
  const { search, category, price, rating, onSale, isNew } = filterValues.value
  let result = products.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
    if (category?.length && !category.includes(p.category)) return false
    if (price && (p.price < price[0] || p.price > price[1])) return false
    if (rating && p.rating < rating) return false
    if (onSale && !p.discount) return false
    if (isNew && !p.isNew) return false
    return true
  })

  if (sortBy.value === 'price_asc') result = [...result].sort((a, b) => a.price - b.price)
  else if (sortBy.value === 'price_desc') result = [...result].sort((a, b) => b.price - a.price)
  else if (sortBy.value === 'rating') result = [...result].sort((a, b) => b.rating - a.rating)
  else if (sortBy.value === 'newest') result = [...result].sort((a, b) => Number(b.isNew) - Number(a.isNew))

  return result
})

const toggleWishlist = (id: number) => {
  const index = wishlist.value.indexOf(id)
  if (index > -1) wishlist.value.splice(index, 1)
  else wishlist.value.push(id)
}

const addToCart = (product: typeof products[0]) => {
  console.log('Added to cart:', product.name)
}
</script>

<template>
  <VContainer fluid>
    <!-- Drawer filter (mobile) -->
    <ProductFilter
      v-model="filterValues"
      v-model:model-drawer="filterDrawer"
      :filters="filterConfig"
      layout="drawer"
      :drawer-temporary="true"
      title="Filters"
      :title-icon="Icons.FilterOutline"
      :show-actions="true"
      :immediate="false"
      :collapsible="true"
    />

    <!-- Header -->
    <div class="d-flex flex-wrap justify-space-between align-center mb-6 ga-4">
      <div>
        <h1 class="text-h4 font-weight-bold">Products</h1>
        <p class="text-medium-emphasis">
          Showing {{ filteredProducts.length }} of {{ products.length }} products
        </p>
      </div>
      <div class="d-flex align-center ga-2">
        <!-- Mobile: open filter drawer -->
        <VBtn
          v-if="!mdAndUp"
          :prepend-icon="Icons.FilterOutline"
          variant="outlined"
          @click="filterDrawer = true"
        >
          Filters
        </VBtn>

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
          <VBtn value="grid" :icon="Icons.ViewGrid" />
          <VBtn value="list" :icon="Icons.ViewList" />
        </VBtnToggle>
      </div>
    </div>

    <VRow>
      <!-- Sidebar filter (desktop) -->
      <VCol v-if="mdAndUp" cols="3">
        <ProductFilter
          v-model="filterValues"
          :filters="filterConfig"
          layout="sidebar"
          title="Filters"
          :title-icon="Icons.FilterOutline"
          :collapsible="true"
          :immediate="true"
          elevation="1"
        />
      </VCol>

      <!-- Product list -->
      <VCol :cols="mdAndUp ? 9 : 12">
        <!-- Empty state -->
        <div v-if="filteredProducts.length === 0" class="d-flex flex-column align-center justify-center py-16 text-medium-emphasis">
          <VIcon size="64" class="mb-4">{{ Icons.PackageVariantClosed }}</VIcon>
          <p class="text-h6 mb-1">No products found</p>
          <p class="text-body-2">Try adjusting your filters</p>
          <VBtn variant="text" color="primary" class="mt-3" @click="filterValues = {}">
            Clear filters
          </VBtn>
        </div>

        <VRow v-else>
          <VCol
            v-for="product in filteredProducts"
            :key="product.id"
            :cols="viewMode === 'grid' ? 12 : 12"
            :sm="viewMode === 'grid' ? 6 : 12"
            :md="viewMode === 'grid' ? 6 : 12"
            :lg="viewMode === 'grid' ? 4 : 12"
          >
            <!-- Grid View -->
            <VCard v-if="viewMode === 'grid'" class="h-100">
              <div class="position-relative">
                <VImg :src="product.image" height="200" cover>
                  <template #placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <VProgressCircular indeterminate color="primary" />
                    </div>
                  </template>
                </VImg>

                <div class="position-absolute" style="top: 12px; left: 12px;">
                  <VChip v-if="product.isNew" color="primary" size="small" class="mr-1">NEW</VChip>
                  <VChip v-if="product.discount" color="error" size="small">-{{ product.discount }}%</VChip>
                </div>

                <div class="position-absolute d-flex flex-column ga-1" style="top: 12px; right: 12px;">
                  <VBtn icon size="small" variant="flat" color="white" @click="toggleWishlist(product.id)">
                    <VIcon :color="wishlist.includes(product.id) ? 'error' : 'grey'">
                      {{ wishlist.includes(product.id) ? Icons.Heart : Icons.HeartOutline }}
                    </VIcon>
                  </VBtn>
                </div>
              </div>

              <VCardText>
                <p class="text-caption text-medium-emphasis mb-1">{{ product.category }}</p>
                <h4 class="text-subtitle-1 font-weight-medium mb-2 text-truncate">{{ product.name }}</h4>

                <div class="d-flex align-center mb-2">
                  <VRating :model-value="product.rating" color="warning" density="compact" size="small" readonly half-increments />
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
                    <VIcon>{{ Icons.CartPlus }}</VIcon>
                  </VBtn>
                </div>
              </VCardText>
            </VCard>

            <!-- List View -->
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
                      <VBtn
                        :icon="wishlist.includes(product.id) ? Icons.Heart : Icons.HeartOutline"
                        variant="text"
                        size="small"
                        :color="wishlist.includes(product.id) ? 'error' : undefined"
                        @click="toggleWishlist(product.id)"
                      />
                    </div>

                    <p class="text-body-2 text-medium-emphasis flex-grow-1">{{ product.description }}</p>

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
                          <VIcon start>{{ Icons.CartPlus }}</VIcon>
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
        <div v-if="filteredProducts.length > 0" class="d-flex justify-center mt-8">
          <VPagination v-model="page" :length="5" :total-visible="5" rounded />
        </div>
      </VCol>
    </VRow>
  </VContainer>
</template>
