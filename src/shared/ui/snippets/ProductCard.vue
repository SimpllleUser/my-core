<template>
  <VCard :class="['product-card', cardClass]" :height="height" :variant="cardVariant">
    <!-- Standard Layout -->
    <template v-if="layout === 'standard'">
      <!-- Image with Badges -->
      <div class="position-relative">
        <slot name="image">
          <VImg :src="image" :height="imageHeight" cover>
            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <VProgressCircular indeterminate color="primary" />
              </div>
            </template>
          </VImg>
        </slot>

        <!-- Badges -->
        <div class="position-absolute" style="top: 12px; left: 12px;">
          <slot name="badges">
            <VChip v-if="isNew" :color="newBadgeColor" :size="badgeSize" class="mr-1">
              {{ newBadgeText }}
            </VChip>
            <VChip v-if="discount" :color="discountBadgeColor" :size="badgeSize">
              -{{ discount }}%
            </VChip>
          </slot>
        </div>

        <!-- Wishlist Button -->
        <slot name="wishlist">
          <VBtn
            v-if="showWishlist"
            icon
            :size="wishlistButtonSize"
            variant="flat"
            color="white"
            class="position-absolute"
            style="top: 12px; right: 12px;"
            @click.stop="$emit('toggle-wishlist', id)"
          >
            <VIcon :color="isInWishlist ? wishlistActiveColor : wishlistInactiveColor">
              {{ isInWishlist ? wishlistIconActive : wishlistIconInactive }}
            </VIcon>
          </VBtn>
        </slot>
      </div>

      <VCardText>
        <slot name="category">
          <p v-if="category" :class="[categoryClass, 'mb-1']">{{ category }}</p>
        </slot>

        <slot name="name">
          <h4 :class="[nameClass, 'text-truncate']">{{ name }}</h4>
        </slot>

        <slot name="rating">
          <div v-if="showRating && rating !== undefined" class="d-flex align-center mb-2">
            <VRating
              :model-value="rating"
              :color="ratingColor"
              density="compact"
              :size="ratingSize"
              readonly
              half-increments
            />
            <span v-if="reviews !== undefined" class="text-caption text-medium-emphasis ml-1">
              ({{ reviews }})
            </span>
          </div>
        </slot>

        <slot name="price">
          <PriceDisplay
            :price="price"
            :original-price="originalPrice"
            :currency-symbol="currencySymbol"
            :price-class="priceClass"
            :original-price-class="originalPriceClass"
          />
        </slot>
      </VCardText>

      <VCardActions v-if="showActions" class="px-4 pb-4">
        <slot name="actions">
          <VBtn
            :color="addToCartColor"
            block
            :variant="addToCartVariant"
            @click="$emit('add-to-cart', id)"
          >
            <VIcon start>{{ addToCartIcon }}</VIcon>
            {{ addToCartText }}
          </VBtn>
        </slot>
      </VCardActions>
    </template>

    <!-- Horizontal Layout -->
    <template v-else-if="layout === 'horizontal'">
      <VRow no-gutters>
        <VCol :cols="imageColsHorizontal">
          <slot name="image">
            <VImg :src="image" height="100%" cover class="rounded-s" />
          </slot>
        </VCol>
        <VCol :cols="12 - imageColsHorizontal">
          <VCardText>
            <div class="d-flex justify-space-between align-start">
              <div>
                <VChip v-if="isNew" :color="newBadgeColor" size="x-small" class="mb-2">
                  {{ newBadgeText }}
                </VChip>
                <h4 :class="[nameClass, 'mb-1']">{{ name }}</h4>
                <p v-if="category" :class="[categoryClass, 'mb-2']">{{ category }}</p>
              </div>
              <slot name="wishlist">
                <VBtn
                  v-if="showWishlist"
                  :icon="wishlistIconInactive"
                  variant="text"
                  size="small"
                  @click.stop="$emit('toggle-wishlist', id)"
                />
              </slot>
            </div>

            <p v-if="description" :class="[descriptionClass, 'mb-3']">
              {{ description }}
            </p>

            <div class="d-flex align-center justify-space-between">
              <div>
                <VRating
                  v-if="showRating && rating !== undefined"
                  :model-value="rating"
                  size="x-small"
                  :color="ratingColor"
                  density="compact"
                  readonly
                />
                <slot name="price">
                  <PriceDisplay
                    :price="price"
                    :original-price="originalPrice"
                    :currency-symbol="currencySymbol"
                    inline
                  />
                </slot>
              </div>
              <VBtn :color="addToCartColor" :size="addToCartSizeHorizontal">
                {{ addToCartTextShort }}
              </VBtn>
            </div>
          </VCardText>
        </VCol>
      </VRow>
    </template>

    <!-- Compact Layout -->
    <template v-else-if="layout === 'compact'">
      <slot name="image">
        <VImg :src="image" :height="compactImageHeight" cover />
      </slot>
      <VCardText class="pa-3 text-center">
        <p :class="[nameClass, 'text-truncate mb-1']">{{ name }}</p>
        <span :class="[priceClass, 'font-weight-bold']">
          {{ currencySymbol }}{{ price.toFixed(2) }}
        </span>
      </VCardText>
    </template>

    <!-- Featured Layout -->
    <template v-else-if="layout === 'featured'">
      <VRow no-gutters>
        <VCol cols="12" :md="featuredImageCols">
          <slot name="image">
            <VImg :src="image" :height="featuredImageHeight" cover />
          </slot>
        </VCol>
        <VCol cols="12" :md="12 - featuredImageCols" class="d-flex align-center">
          <VCardText :class="featuredContentClass">
            <slot name="badge">
              <VChip v-if="featuredBadgeText" :color="discountBadgeColor" class="mb-4">
                {{ featuredBadgeText }}
              </VChip>
            </slot>

            <h2 :class="[featuredNameClass, 'font-weight-bold mb-2']">{{ name }}</h2>
            <p v-if="description" :class="[descriptionClass, 'mb-4']">{{ description }}</p>

            <div v-if="showRating && rating !== undefined" class="d-flex align-center mb-4">
              <VRating :model-value="rating" :color="ratingColor" density="comfortable" readonly />
              <span class="text-body-2 ml-2">{{ rating }} ({{ reviews }} reviews)</span>
            </div>

            <div class="mb-6">
              <slot name="price">
                <PriceDisplay
                  :price="price"
                  :original-price="originalPrice"
                  :currency-symbol="currencySymbol"
                  :price-class="featuredPriceClass"
                  :original-price-class="featuredOriginalPriceClass"
                />
              </slot>
              <VChip v-if="discount" color="success" size="small" class="ml-2">
                Save {{ discount }}%
              </VChip>
            </div>

            <div class="d-flex ga-3">
              <slot name="actions">
                <VBtn
                  :color="addToCartColor"
                  size="large"
                  :prepend-icon="addToCartIcon"
                  @click="$emit('add-to-cart', id)"
                >
                  {{ addToCartText }}
                </VBtn>
                <VBtn
                  variant="outlined"
                  size="large"
                  :prepend-icon="wishlistIconInactive"
                  @click="$emit('toggle-wishlist', id)"
                >
                  {{ wishlistText }}
                </VBtn>
              </slot>
            </div>
          </VCardText>
        </VCol>
      </VRow>
    </template>
  </VCard>
</template>

<script setup lang="ts">
import { Colors, Variants, Sizes, Icons } from '@/shared/model'
import type { ColorType, VariantType, SizeType, IconType } from './types'
import PriceDisplay from './PriceDisplay.vue'

type LayoutType = 'standard' | 'horizontal' | 'compact' | 'featured'

interface Props {
  // Product data
  id: number | string
  name: string
  category?: string
  price: number
  originalPrice?: number | null
  rating?: number
  reviews?: number
  image: string
  description?: string
  isNew?: boolean
  discount?: number | null
  isInWishlist?: boolean

  // Layout
  layout?: LayoutType

  // Card
  cardClass?: string
  cardVariant?: VariantType
  height?: string | number

  // Image
  imageHeight?: string | number
  imageColsHorizontal?: number
  compactImageHeight?: string | number
  featuredImageCols?: number
  featuredImageHeight?: string | number

  // Badges
  newBadgeColor?: ColorType
  newBadgeText?: string
  discountBadgeColor?: ColorType
  badgeSize?: SizeType
  featuredBadgeText?: string

  // Wishlist
  showWishlist?: boolean
  wishlistButtonSize?: SizeType
  wishlistIconActive?: IconType
  wishlistIconInactive?: IconType
  wishlistActiveColor?: ColorType
  wishlistInactiveColor?: string
  wishlistText?: string

  // Rating
  showRating?: boolean
  ratingColor?: ColorType
  ratingSize?: SizeType

  // Price
  currencySymbol?: string
  priceClass?: string
  originalPriceClass?: string
  featuredPriceClass?: string
  featuredOriginalPriceClass?: string

  // Add to cart
  showActions?: boolean
  addToCartColor?: ColorType
  addToCartVariant?: VariantType
  addToCartIcon?: IconType
  addToCartText?: string
  addToCartTextShort?: string
  addToCartSizeHorizontal?: SizeType

  // Text classes
  categoryClass?: string
  nameClass?: string
  descriptionClass?: string
  featuredNameClass?: string
  featuredContentClass?: string
}

withDefaults(defineProps<Props>(), {
  layout: 'standard',
  cardVariant: Variants.Flat,
  imageHeight: 200,
  imageColsHorizontal: 4,
  compactImageHeight: 120,
  featuredImageCols: 6,
  featuredImageHeight: 400,
  newBadgeColor: Colors.Primary,
  newBadgeText: 'NEW',
  discountBadgeColor: Colors.Error,
  badgeSize: Sizes.Small,
  featuredBadgeText: 'FEATURED PRODUCT',
  showWishlist: true,
  wishlistButtonSize: Sizes.Small,
  wishlistIconActive: 'mdi-heart',
  wishlistIconInactive: 'mdi-heart-outline',
  wishlistActiveColor: Colors.Error,
  wishlistInactiveColor: 'grey',
  wishlistText: 'Wishlist',
  showRating: true,
  ratingColor: 'warning',
  ratingSize: Sizes.Small,
  currencySymbol: '$',
  priceClass: 'text-h6 text-primary',
  originalPriceClass: 'text-body-2 text-medium-emphasis text-decoration-line-through ml-2',
  featuredPriceClass: 'text-h4 text-primary',
  featuredOriginalPriceClass: 'text-h6 text-medium-emphasis text-decoration-line-through ml-2',
  showActions: true,
  addToCartColor: Colors.Primary,
  addToCartVariant: Variants.Flat,
  addToCartIcon: 'mdi-cart-plus',
  addToCartText: 'Add to Cart',
  addToCartTextShort: 'Add to Cart',
  addToCartSizeHorizontal: Sizes.Small,
  categoryClass: 'text-caption text-medium-emphasis',
  nameClass: 'text-subtitle-1 font-weight-medium mb-2',
  descriptionClass: 'text-body-2 text-medium-emphasis text-truncate-2',
  featuredNameClass: 'text-h4',
  featuredContentClass: 'pa-8',
})

defineEmits<{
  'add-to-cart': [id: number | string]
  'toggle-wishlist': [id: number | string]
}>()
</script>

<style scoped>
.product-card {
  height: 100%;
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
