<!--
  Snippet: Filter Form
  Description: Advanced filter form for data filtering with search, select, and range inputs
  Components: VCard, VTextField, VSelect, VRangeSlider, VChip, VBtn, VExpansionPanels
  Variants: Horizontal, Sidebar, Modal
-->
<template>
  <v-container fluid>
    <v-row>
      <!-- Sidebar Filters -->
      <v-col cols="12" md="3">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Filters</span>
            <v-btn variant="text" size="small" color="primary" @click="resetFilters">
              Reset All
            </v-btn>
          </v-card-title>

          <v-card-text>
            <!-- Search -->
            <v-text-field
              v-model="filters.search"
              label="Search"
              variant="outlined"
              density="compact"
              prepend-inner-icon="mdi-magnify"
              clearable
              class="mb-4"
            />

            <!-- Category -->
            <v-select
              v-model="filters.category"
              :items="categories"
              label="Category"
              variant="outlined"
              density="compact"
              clearable
              class="mb-4"
            />

            <!-- Price Range -->
            <div class="mb-4">
              <label class="text-body-2 text-medium-emphasis mb-2 d-block">
                Price Range: ${{ filters.priceRange[0] }} - ${{ filters.priceRange[1] }}
              </label>
              <v-range-slider
                v-model="filters.priceRange"
                :min="0"
                :max="1000"
                :step="10"
                color="primary"
                hide-details
              />
            </div>

            <!-- Rating -->
            <div class="mb-4">
              <label class="text-body-2 text-medium-emphasis mb-2 d-block">Minimum Rating</label>
              <v-rating
                v-model="filters.rating"
                color="warning"
                hover
                half-increments
                density="compact"
              />
            </div>

            <!-- Availability -->
            <v-switch
              v-model="filters.inStock"
              label="In Stock Only"
              color="primary"
              hide-details
              class="mb-4"
            />

            <!-- Brand -->
            <v-expansion-panels variant="accordion" class="mb-4">
              <v-expansion-panel title="Brand">
                <v-expansion-panel-text>
                  <v-checkbox
                    v-for="brand in brands"
                    :key="brand"
                    v-model="filters.brands"
                    :label="brand"
                    :value="brand"
                    color="primary"
                    density="compact"
                    hide-details
                  />
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <!-- Color -->
            <div class="mb-4">
              <label class="text-body-2 text-medium-emphasis mb-2 d-block">Color</label>
              <div class="d-flex flex-wrap ga-2">
                <v-avatar
                  v-for="color in colors"
                  :key="color.value"
                  :color="color.value"
                  size="32"
                  class="cursor-pointer"
                  :class="{ 'border-2 border-primary': filters.colors.includes(color.value) }"
                  @click="toggleColor(color.value)"
                >
                  <v-icon v-if="filters.colors.includes(color.value)" color="white" size="small">
                    mdi-check
                  </v-icon>
                </v-avatar>
              </div>
            </div>

            <!-- Size -->
            <v-chip-group
              v-model="filters.sizes"
              column
              multiple
              selected-class="text-primary"
            >
              <v-chip v-for="size in sizes" :key="size" :value="size" filter variant="outlined">
                {{ size }}
              </v-chip>
            </v-chip-group>
          </v-card-text>

          <v-divider />

          <v-card-actions>
            <v-btn color="primary" block @click="applyFilters">
              Apply Filters
              <v-badge :content="activeFiltersCount" color="error" inline v-if="activeFiltersCount" />
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Results Area -->
      <v-col cols="12" md="9">
        <!-- Active Filters -->
        <v-card class="mb-4" v-if="hasActiveFilters">
          <v-card-text class="d-flex flex-wrap align-center ga-2 py-2">
            <span class="text-body-2 text-medium-emphasis mr-2">Active Filters:</span>

            <v-chip
              v-if="filters.search"
              closable
              size="small"
              @click:close="filters.search = ''"
            >
              Search: {{ filters.search }}
            </v-chip>

            <v-chip
              v-if="filters.category"
              closable
              size="small"
              @click:close="filters.category = ''"
            >
              {{ filters.category }}
            </v-chip>

            <v-chip
              v-if="filters.priceRange[0] > 0 || filters.priceRange[1] < 1000"
              closable
              size="small"
              @click:close="filters.priceRange = [0, 1000]"
            >
              ${{ filters.priceRange[0] }} - ${{ filters.priceRange[1] }}
            </v-chip>

            <v-chip
              v-if="filters.rating > 0"
              closable
              size="small"
              @click:close="filters.rating = 0"
            >
              {{ filters.rating }}+ Stars
            </v-chip>

            <v-chip
              v-for="brand in filters.brands"
              :key="brand"
              closable
              size="small"
              @click:close="filters.brands = filters.brands.filter((b: string) => b !== brand)"
            >
              {{ brand }}
            </v-chip>

            <v-spacer />

            <v-btn variant="text" size="small" @click="resetFilters">
              Clear All
            </v-btn>
          </v-card-text>
        </v-card>

        <!-- Toolbar -->
        <v-card class="mb-4">
          <v-card-text class="d-flex justify-space-between align-center py-2">
            <span class="text-body-2">
              Showing <strong>{{ filteredCount }}</strong> results
            </span>
            <div class="d-flex align-center ga-2">
              <v-select
                v-model="sortBy"
                :items="sortOptions"
                label="Sort by"
                variant="outlined"
                density="compact"
                hide-details
                style="width: 180px;"
              />
              <v-btn-toggle v-model="viewMode" mandatory density="compact" variant="outlined">
                <v-btn value="grid" icon="mdi-view-grid" />
                <v-btn value="list" icon="mdi-view-list" />
              </v-btn-toggle>
            </div>
          </v-card-text>
        </v-card>

        <!-- Results Grid -->
        <v-row>
          <v-col
            v-for="item in 8"
            :key="item"
            :cols="viewMode === 'grid' ? 6 : 12"
            :lg="viewMode === 'grid' ? 3 : 12"
          >
            <v-card>
              <v-img
                v-if="viewMode === 'grid'"
                src="https://picsum.photos/seed/product/300/200"
                height="150"
                cover
              />
              <v-card-text :class="viewMode === 'list' ? 'd-flex align-center' : ''">
                <v-avatar v-if="viewMode === 'list'" rounded size="80" class="mr-4">
                  <v-img src="https://picsum.photos/seed/product/100/100" />
                </v-avatar>
                <div>
                  <h4 class="text-subtitle-1 font-weight-medium">Product Name {{ item }}</h4>
                  <v-rating :model-value="4" color="warning" size="small" density="compact" readonly />
                  <p class="text-h6 font-weight-bold text-primary mb-0">$99.99</p>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const filters = ref({
  search: '',
  category: '',
  priceRange: [0, 1000],
  rating: 0,
  inStock: false,
  brands: [] as string[],
  colors: [] as string[],
  sizes: [] as string[],
})

const sortBy = ref('relevance')
const viewMode = ref<'grid' | 'list'>('grid')
const filteredCount = ref(248)

const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Toys']
const brands = ['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas', 'LG']
const colors = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Green', value: '#22C55E' },
  { name: 'Yellow', value: '#EAB308' },
]
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const sortOptions = [
  { title: 'Relevance', value: 'relevance' },
  { title: 'Price: Low to High', value: 'price_asc' },
  { title: 'Price: High to Low', value: 'price_desc' },
  { title: 'Rating', value: 'rating' },
  { title: 'Newest', value: 'newest' },
]

const hasActiveFilters = computed(() => {
  return (
    filters.value.search ||
    filters.value.category ||
    filters.value.priceRange[0] > 0 ||
    filters.value.priceRange[1] < 1000 ||
    filters.value.rating > 0 ||
    filters.value.inStock ||
    filters.value.brands.length > 0 ||
    filters.value.colors.length > 0 ||
    filters.value.sizes.length > 0
  )
})

const activeFiltersCount = computed(() => {
  let count = 0
  if (filters.value.search) count++
  if (filters.value.category) count++
  if (filters.value.priceRange[0] > 0 || filters.value.priceRange[1] < 1000) count++
  if (filters.value.rating > 0) count++
  if (filters.value.inStock) count++
  count += filters.value.brands.length
  count += filters.value.colors.length
  count += filters.value.sizes.length
  return count
})

const toggleColor = (color: string) => {
  const index = filters.value.colors.indexOf(color)
  if (index > -1) {
    filters.value.colors.splice(index, 1)
  } else {
    filters.value.colors.push(color)
  }
}

const resetFilters = () => {
  filters.value = {
    search: '',
    category: '',
    priceRange: [0, 1000],
    rating: 0,
    inStock: false,
    brands: [],
    colors: [],
    sizes: [],
  }
}

const applyFilters = () => {
  console.log('Applying filters:', filters.value)
}
</script>
