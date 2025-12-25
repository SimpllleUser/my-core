<!--
  Snippet: Shopping Cart
  Description: Shopping cart with items list and summary
  Components: VCard, VList, VBtn, VTextField, VDivider
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <v-container>
    <h1 class="text-h4 font-weight-bold mb-6">Shopping Cart</h1>

    <v-row>
      <!-- Cart Items -->
      <v-col cols="12" lg="8">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>Cart Items ({{ cartItems.length }})</span>
            <v-btn variant="text" color="error" size="small" @click="clearCart">
              Clear Cart
            </v-btn>
          </v-card-title>

          <v-divider />

          <v-list v-if="cartItems.length" lines="two">
            <template v-for="(item, index) in cartItems" :key="item.id">
              <v-list-item>
                <template #prepend>
                  <v-avatar rounded size="80" class="mr-4">
                    <v-img :src="item.image" />
                  </v-avatar>
                </template>

                <div class="d-flex justify-space-between align-center w-100">
                  <div class="flex-grow-1">
                    <p class="text-caption text-medium-emphasis mb-0">{{ item.category }}</p>
                    <h4 class="text-subtitle-1 font-weight-medium mb-1">{{ item.name }}</h4>
                    <div class="d-flex ga-1">
                      <v-chip v-if="item.color" size="x-small" variant="outlined">{{ item.color }}</v-chip>
                      <v-chip v-if="item.size" size="x-small" variant="outlined">{{ item.size }}</v-chip>
                    </div>
                  </div>

                  <div class="d-flex align-center ga-4">
                    <!-- Quantity -->
                    <div class="d-flex align-center">
                      <v-btn
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
                      <v-btn
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
                    <v-btn
                      icon="mdi-delete-outline"
                      variant="text"
                      color="error"
                      size="small"
                      @click="removeItem(item.id)"
                    />
                  </div>
                </div>
              </v-list-item>

              <v-divider v-if="index < cartItems.length - 1" />
            </template>
          </v-list>

          <!-- Empty Cart -->
          <v-card-text v-else class="text-center pa-12">
            <v-icon size="80" color="grey-lighten-1" class="mb-4">mdi-cart-outline</v-icon>
            <h3 class="text-h6 mb-2">Your cart is empty</h3>
            <p class="text-body-2 text-medium-emphasis mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <v-btn color="primary" size="large">Start Shopping</v-btn>
          </v-card-text>
        </v-card>

        <!-- Recommended Products -->
        <v-card class="mt-6" v-if="cartItems.length">
          <v-card-title>You May Also Like</v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="product in recommendedProducts" :key="product.id" cols="6" md="3">
                <v-card variant="outlined">
                  <v-img :src="product.image" height="120" cover />
                  <v-card-text class="pa-3">
                    <p class="text-body-2 font-weight-medium text-truncate mb-1">{{ product.name }}</p>
                    <div class="d-flex justify-space-between align-center">
                      <span class="font-weight-bold text-primary">${{ product.price.toFixed(2) }}</span>
                      <v-btn icon="mdi-plus" size="x-small" color="primary" variant="tonal" />
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Order Summary -->
      <v-col cols="12" lg="4">
        <v-card class="sticky-card">
          <v-card-title>Order Summary</v-card-title>

          <v-card-text>
            <!-- Promo Code -->
            <v-text-field
              v-model="promoCode"
              label="Promo Code"
              variant="outlined"
              density="compact"
              class="mb-4"
              :append-inner-icon="promoApplied ? 'mdi-check-circle' : undefined"
              :color="promoApplied ? 'success' : undefined"
            >
              <template #append>
                <v-btn
                  variant="text"
                  color="primary"
                  :disabled="!promoCode || promoApplied"
                  @click="applyPromo"
                >
                  Apply
                </v-btn>
              </template>
            </v-text-field>

            <v-alert v-if="promoApplied" type="success" variant="tonal" density="compact" class="mb-4">
              Promo code applied! You saved $10.00
            </v-alert>

            <v-divider class="mb-4" />

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

            <v-divider class="my-4" />

            <div class="d-flex justify-space-between mb-6">
              <span class="text-h6 font-weight-bold">Total</span>
              <span class="text-h6 font-weight-bold text-primary">${{ total.toFixed(2) }}</span>
            </div>

            <v-btn color="primary" size="large" block class="mb-3" @click="checkout">
              Proceed to Checkout
            </v-btn>

            <v-btn variant="outlined" size="large" block>
              Continue Shopping
            </v-btn>

            <!-- Trust Badges -->
            <div class="d-flex justify-center ga-4 mt-6">
              <div class="text-center">
                <v-icon color="success">mdi-shield-check</v-icon>
                <p class="text-caption text-medium-emphasis mb-0">Secure</p>
              </div>
              <div class="text-center">
                <v-icon color="primary">mdi-truck-fast</v-icon>
                <p class="text-caption text-medium-emphasis mb-0">Fast Delivery</p>
              </div>
              <div class="text-center">
                <v-icon color="warning">mdi-cash-refund</v-icon>
                <p class="text-caption text-medium-emphasis mb-0">Easy Returns</p>
              </div>
            </div>

            <!-- Payment Methods -->
            <div class="text-center mt-6">
              <p class="text-caption text-medium-emphasis mb-2">We Accept</p>
              <div class="d-flex justify-center ga-2">
                <v-icon>mdi-credit-card</v-icon>
                <v-icon>mdi-apple</v-icon>
                <v-icon>mdi-google</v-icon>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
