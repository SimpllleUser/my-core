<!--
  Snippet: Shopping Cart
  Description: Shopping cart with items list and summary
  Components: VCard, VList, VBtn, VTextField, VDivider
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <VContainer>
    <h1 class="text-h4 font-weight-bold mb-6">Shopping Cart</h1>

    <VRow>
      <!-- Cart Items -->
      <VCol cols="12" lg="8">
        <VCard>
          <VCardTitle class="d-flex justify-space-between align-center">
            <span>Cart Items ({{ cartItems.length }})</span>
            <VBtn variant="text" color="error" size="small" @click="clearCart">
              Clear Cart
            </VBtn>
          </VCardTitle>

          <VDivider />

          <VList v-if="cartItems.length" lines="two">
            <template v-for="(item, index) in cartItems" :key="item.id">
              <VListItem>
                <template #prepend>
                  <VAvatar rounded size="80" class="mr-4">
                    <VImg :src="item.image" />
                  </VAvatar>
                </template>

                <div class="d-flex justify-space-between align-center w-100">
                  <div class="flex-grow-1">
                    <p class="text-caption text-medium-emphasis mb-0">{{ item.category }}</p>
                    <h4 class="text-subtitle-1 font-weight-medium mb-1">{{ item.name }}</h4>
                    <div class="d-flex ga-1">
                      <VChip v-if="item.color" size="x-small" variant="outlined">{{ item.color }}</VChip>
                      <VChip v-if="item.size" size="x-small" variant="outlined">{{ item.size }}</VChip>
                    </div>
                  </div>

                  <div class="d-flex align-center ga-4">
                    <!-- Quantity -->
                    <div class="d-flex align-center">
                      <VBtn
                        icon="mdi-minus"
                        size="small"
                        variant="outlined"
                        density="compact"
                        :disabled="item.quantity <= 1"
                        @click="updateQuantity(item.id, item.quantity - 1)"
                      />
                      <span class="mx-3 font-weight-medium" style="min-width: 24px; text-align: center;">
                        {{ item.quantity }}
                      </span>
                      <VBtn
                        icon="mdi-plus"
                        size="small"
                        variant="outlined"
                        density="compact"
                        @click="updateQuantity(item.id, item.quantity + 1)"
                      />
                    </div>

                    <!-- Price -->
                    <div class="text-right" style="min-width: 100px;">
                      <p class="text-h6 font-weight-bold mb-0">${{ (item.price * item.quantity).toFixed(2) }}</p>
                      <p class="text-caption text-medium-emphasis mb-0">${{ item.price.toFixed(2) }} each</p>
                    </div>

                    <!-- Remove -->
                    <VBtn
                      icon="mdi-delete-outline"
                      variant="text"
                      color="error"
                      size="small"
                      @click="removeItem(item.id)"
                    />
                  </div>
                </div>
              </VListItem>

              <VDivider v-if="index < cartItems.length - 1" />
            </template>
          </VList>

          <!-- Empty Cart -->
          <VCardText v-else class="text-center pa-12">
            <VIcon size="80" color="grey-lighten-1" class="mb-4">mdi-cart-outline</VIcon>
            <h3 class="text-h6 mb-2">Your cart is empty</h3>
            <p class="text-body-2 text-medium-emphasis mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <VBtn color="primary" size="large">Start Shopping</VBtn>
          </VCardText>
        </VCard>

        <!-- Recommended Products -->
        <VCard class="mt-6" v-if="cartItems.length">
          <VCardTitle>You May Also Like</VCardTitle>
          <VCardText>
            <VRow>
              <VCol v-for="product in recommendedProducts" :key="product.id" cols="6" md="3">
                <VCard variant="outlined">
                  <VImg :src="product.image" height="120" cover />
                  <VCardText class="pa-3">
                    <p class="text-body-2 font-weight-medium text-truncate mb-1">{{ product.name }}</p>
                    <div class="d-flex justify-space-between align-center">
                      <span class="font-weight-bold text-primary">${{ product.price.toFixed(2) }}</span>
                      <VBtn icon="mdi-plus" size="x-small" color="primary" variant="tonal" />
                    </div>
                  </VCardText>
                </VCard>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Order Summary -->
      <VCol cols="12" lg="4">
        <VCard class="sticky-card">
          <VCardTitle>Order Summary</VCardTitle>

          <VCardText>
            <!-- Promo Code -->
            <VTextField
              v-model="promoCode"
              label="Promo Code"
              variant="outlined"
              density="compact"
              class="mb-4"
              :append-inner-icon="promoApplied ? 'mdi-check-circle' : undefined"
              :color="promoApplied ? 'success' : undefined"
            >
              <template #append>
                <VBtn
                  variant="text"
                  color="primary"
                  :disabled="!promoCode || promoApplied"
                  @click="applyPromo"
                >
                  Apply
                </VBtn>
              </template>
            </VTextField>

            <v-alert v-if="promoApplied" type="success" variant="tonal" density="compact" class="mb-4">
              Promo code applied! You saved $10.00
            </v-alert>

            <VDivider class="mb-4" />

            <!-- Summary Lines -->
            <div class="d-flex justify-space-between mb-2">
              <span class="text-medium-emphasis">Subtotal</span>
              <span class="font-weight-medium">${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="d-flex justify-space-between mb-2">
              <span class="text-medium-emphasis">Shipping</span>
              <span class="font-weight-medium">
                {{ shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}` }}
              </span>
            </div>
            <div v-if="promoApplied" class="d-flex justify-space-between mb-2 text-success">
              <span>Promo Discount</span>
              <span>-$10.00</span>
            </div>
            <div class="d-flex justify-space-between mb-2">
              <span class="text-medium-emphasis">Tax</span>
              <span class="font-weight-medium">${{ tax.toFixed(2) }}</span>
            </div>

            <VDivider class="my-4" />

            <div class="d-flex justify-space-between mb-6">
              <span class="text-h6 font-weight-bold">Total</span>
              <span class="text-h6 font-weight-bold text-primary">${{ total.toFixed(2) }}</span>
            </div>

            <VBtn color="primary" size="large" block class="mb-3" @click="checkout">
              Proceed to Checkout
            </VBtn>

            <VBtn variant="outlined" size="large" block>
              Continue Shopping
            </VBtn>

            <!-- Trust Badges -->
            <div class="d-flex justify-center ga-4 mt-6">
              <div class="text-center">
                <VIcon color="success">mdi-shield-check</VIcon>
                <p class="text-caption text-medium-emphasis mb-0">Secure</p>
              </div>
              <div class="text-center">
                <VIcon color="primary">mdi-truck-fast</VIcon>
                <p class="text-caption text-medium-emphasis mb-0">Fast Delivery</p>
              </div>
              <div class="text-center">
                <VIcon color="warning">mdi-cash-refund</VIcon>
                <p class="text-caption text-medium-emphasis mb-0">Easy Returns</p>
              </div>
            </div>

            <!-- Payment Methods -->
            <div class="text-center mt-6">
              <p class="text-caption text-medium-emphasis mb-2">We Accept</p>
              <div class="d-flex justify-center ga-2">
                <VIcon>mdi-credit-card</VIcon>
                <VIcon>mdi-apple</VIcon>
                <VIcon>mdi-google</VIcon>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const promoCode = ref('')
const promoApplied = ref(false)

const cartItems = ref([
  { id: 1, name: 'Wireless Bluetooth Headphones', category: 'Electronics', price: 79.99, quantity: 1, image: 'https://picsum.photos/seed/cart1/200', color: 'Black', size: null },
  { id: 2, name: 'Smart Watch Pro', category: 'Electronics', price: 249.99, quantity: 1, image: 'https://picsum.photos/seed/cart2/200', color: 'Silver', size: '42mm' },
  { id: 3, name: 'Running Shoes Elite', category: 'Sports', price: 129.99, quantity: 2, image: 'https://picsum.photos/seed/cart3/200', color: 'Blue', size: 'US 10' },
])

const recommendedProducts = [
  { id: 5, name: 'Phone Case', price: 24.99, image: 'https://picsum.photos/seed/rec1/200' },
  { id: 6, name: 'USB-C Cable', price: 14.99, image: 'https://picsum.photos/seed/rec2/200' },
  { id: 7, name: 'Screen Protector', price: 9.99, image: 'https://picsum.photos/seed/rec3/200' },
  { id: 8, name: 'Wireless Charger', price: 29.99, image: 'https://picsum.photos/seed/rec4/200' },
]

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const shipping = computed(() => subtotal.value >= 100 ? 0 : 9.99)

const discount = computed(() => promoApplied.value ? 10 : 0)

const tax = computed(() => (subtotal.value - discount.value) * 0.08)

const total = computed(() => subtotal.value + shipping.value + tax.value - discount.value)

const updateQuantity = (id: number, quantity: number) => {
  const item = cartItems.value.find(i => i.id === id)
  if (item) item.quantity = quantity
}

const removeItem = (id: number) => {
  cartItems.value = cartItems.value.filter(i => i.id !== id)
}

const clearCart = () => {
  cartItems.value = []
}

const applyPromo = () => {
  if (promoCode.value.toLowerCase() === 'save10') {
    promoApplied.value = true
  }
}

const checkout = () => {
  console.log('Proceeding to checkout...')
}
</script>

<style scoped>
.sticky-card {
  position: sticky;
  top: 80px;
}
</style>
