<!--
  Snippet: Filter Form
  Description: Advanced filter form for data filtering with search, select, and range inputs
  Components: VCard, VTextField, VSelect, VRangeSlider, VChip, VBtn, VExpansionPanels
  Variants: Horizontal, Sidebar, Modal
-->
<template>
  <VContainer fluid>
    <VRow>
      <!-- Sidebar Filters -->
      <VCol cols="12" md="3">
        <VCard>
          <VCardTitle class="d-flex justify-space-between align-center">
            <span>Filters</span>
            <VBtn variant="text" size="small" color="primary" @click="resetFilters">
              Reset All
            </VBtn>
          </VCardTitle>

          <VCardText>
            <!-- Search -->
            <VTextField
              v-model="filters.search"
              label="Search"
              variant="outlined"
              density="compact"
              prepend-inner-icon="mdi-magnify"
              clearable
              class="mb-4"
            />

            <!-- Category -->
            <VSelect
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
              <VRangeSlider
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
              <VRating
                v-model="filters.rating"
                color="warning"
                hover
                half-increments
                density="compact"
              />
            </div>

            <!-- Availability -->
            <VSwitch
              v-model="filters.inStock"
              label="In Stock Only"
              color="primary"
              hide-details
              class="mb-4"
            />

            <!-- Brand -->
            <VExpansionPanels variant="accordion" class="mb-4">
              <VExpansionPanel title="Brand">
                <VExpansionPanelText>
                  <VCheckbox
                    v-for="brand in brands"
                    :key="brand"
                    v-model="filters.brands"
                    :label="brand"
                    :value="brand"
                    color="primary"
                    density="compact"
                    hide-details
                  />
                </VExpansionPanelText>
              </VExpansionPanel>
            </VExpansionPanels>

            <!-- Color -->
            <div class="mb-4">
              <label class="text-body-2 text-medium-emphasis mb-2 d-block">Color</label>
              <div class="d-flex flex-wrap ga-2">
                <VAvatar
                  v-for="color in colors"
                  :key="color.value"
                  :color="color.value"
                  size="32"
                  class="cursor-pointer"
                  :class="{ 'border-2 border-primary': filters.colors.includes(color.value) }"
                  @click="toggleColor(color.value)"
                >
                  <VIcon v-if="filters.colors.includes(color.value)" color="white" size="small">
                    mdi-check
                  </VIcon>
                </VAvatar>
              </div>
            </div>

            <!-- Size -->
            <VChipGroup
              v-model="filters.sizes"
              column
              multiple
              selected-class="text-primary"
            >
              <VChip v-for="size in sizes" :key="size" :value="size" filter variant="outlined">
                {{ size }}
              </VChip>
            </VChipGroup>
          </VCardText>

          <VDivider />

          <VCardActions>
            <VBtn color="primary" block @click="applyFilters">
              Apply Filters
              <VBadge :content="activeFiltersCount" color="error" inline v-if="activeFiltersCount" />
            </VBtn>
          </VCardActions>
        </VCard>
      </VCol>

      <!-- Results Area -->
      <VCol cols="12" md="9">
        <!-- Active Filters -->
        <VCard class="mb-4" v-if="hasActiveFilters">
          <VCardText class="d-flex flex-wrap align-center ga-2 py-2">
            <span class="text-body-2 text-medium-emphasis mr-2">Active Filters:</span>

            <VChip
              v-if="filters.search"
              closable
              size="small"
              @click:close="filters.search = ''"
            >
              Search: {{ filters.search }}
            </VChip>

            <VChip
              v-if="filters.category"
              closable
              size="small"
              @click:close="filters.category = ''"
            >
              {{ filters.category }}
            </VChip>

            <VChip
              v-if="filters.priceRange[0] > 0 || filters.priceRange[1] < 1000"
              closable
              size="small"
              @click:close="filters.priceRange = [0, 1000]"
            >
              ${{ filters.priceRange[0] }} - ${{ filters.priceRange[1] }}
            </VChip>

            <VChip
              v-if="filters.rating > 0"
              closable
              size="small"
              @click:close="filters.rating = 0"
            >
              {{ filters.rating }}+ Stars
            </VChip>

            <VChip
              v-for="brand in filters.brands"
              :key="brand"
              closable
              size="small"
              @click:close="filters.brands = filters.brands.filter((b: string) => b !== brand)"
            >
              {{ brand }}
            </VChip>

            <VSpacer />

            <VBtn variant="text" size="small" @click="resetFilters">
              Clear All
            </VBtn>
          </VCardText>
        </VCard>

        <!-- Toolbar -->
        <VCard class="mb-4">
          <VCardText class="d-flex justify-space-between align-center py-2">
            <span class="text-body-2">
              Showing <strong>{{ filteredCount }}</strong> results
            </span>
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
          </VCardText>
        </VCard>

        <!-- Results Grid -->
        <VRow>
          <VCol
            v-for="item in 8"
            :key="item"
            :cols="viewMode === 'grid' ? 6 : 12"
            :lg="viewMode === 'grid' ? 3 : 12"
          >
            <VCard>
              <VImg
                v-if="viewMode === 'grid'"
                src="https://picsum.photos/seed/product/300/200"
                height="150"
                cover
              />
              <VCardText :class="viewMode === 'list' ? 'd-flex align-center' : ''">
                <VAvatar v-if="viewMode === 'list'" rounded size="80" class="mr-4">
                  <VImg src="https://picsum.photos/seed/product/100/100" />
                </VAvatar>
                <div>
                  <h4 class="text-subtitle-1 font-weight-medium">Product Name {{ item }}</h4>
                  <VRating :model-value="4" color="warning" size="small" density="compact" readonly />
                  <p class="text-h6 font-weight-bold text-primary mb-0">$99.99</p>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </VContainer>
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
