<!--
  Snippet: Checkout Form
  Description: E-commerce checkout form with billing, shipping, and payment
  Components: VCard, VTextField, VSelect, VRadioGroup, VDivider, VBtn
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <v-container>
    <v-row>
      <!-- Checkout Form -->
      <v-col cols="12" lg="8">
        <v-card class="mb-4">
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="mr-2">mdi-map-marker</v-icon>
            Shipping Information
          </v-card-title>
          <v-card-text>
            <v-form ref="shippingFormRef" v-model="shippingValid">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="shipping.firstName"
                    :rules="requiredRules"
                    label="First Name"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="shipping.lastName"
                    :rules="requiredRules"
                    label="Last Name"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="shipping.address"
                    :rules="requiredRules"
                    label="Street Address"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="shipping.city"
                    :rules="requiredRules"
                    label="City"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" sm="3">
                  <v-select
                    v-model="shipping.state"
                    :items="states"
                    :rules="requiredRules"
                    label="State"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field
                    v-model="shipping.zip"
                    :rules="zipRules"
                    label="ZIP Code"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="shipping.email"
                    :rules="emailRules"
                    label="Email"
                    type="email"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="shipping.phone"
                    :rules="requiredRules"
                    label="Phone"
                    variant="outlined"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>

        <!-- Shipping Method -->
        <v-card class="mb-4">
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="mr-2">mdi-truck-delivery</v-icon>
            Shipping Method
          </v-card-title>
          <v-card-text>
            <v-radio-group v-model="shippingMethod" hide-details>
              <v-card
                v-for="method in shippingMethods"
                :key="method.id"
                :variant="shippingMethod === method.id ? 'tonal' : 'outlined'"
                :color="shippingMethod === method.id ? 'primary' : undefined"
                class="mb-3 pa-4"
                @click="shippingMethod = method.id"
              >
                <div class="d-flex align-center">
                  <v-radio :value="method.id" hide-details class="mr-4" />
                  <div class="flex-grow-1">
                    <div class="d-flex justify-space-between">
                      <span class="font-weight-medium">{{ method.name }}</span>
                      <span class="font-weight-bold">${{ method.price.toFixed(2) }}</span>
                    </div>
                    <span class="text-caption text-medium-emphasis">{{ method.description }}</span>
                  </div>
                </div>
              </v-card>
            </v-radio-group>
          </v-card-text>
        </v-card>

        <!-- Payment Information -->
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="mr-2">mdi-credit-card</v-icon>
            Payment Information
          </v-card-title>
          <v-card-text>
            <v-form ref="paymentFormRef" v-model="paymentValid">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="payment.cardNumber"
                    :rules="cardRules"
                    label="Card Number"
                    variant="outlined"
                    placeholder="1234 5678 9012 3456"
                    prepend-inner-icon="mdi-credit-card"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="payment.expiry"
                    :rules="expiryRules"
                    label="Expiry Date"
                    variant="outlined"
                    placeholder="MM/YY"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="payment.cvv"
                    :rules="cvvRules"
                    label="CVV"
                    variant="outlined"
                    placeholder="123"
                    type="password"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="payment.cardName"
                    :rules="requiredRules"
                    label="Name on Card"
                    variant="outlined"
                  />
                </v-col>
              </v-row>

              <v-checkbox
                v-model="sameAsBilling"
                label="Billing address same as shipping"
                color="primary"
              />
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Order Summary -->
      <v-col cols="12" lg="4">
        <v-card class="sticky-card">
          <v-card-title>Order Summary</v-card-title>
          <v-card-text>
            <v-list density="compact">
              <v-list-item v-for="item in cartItems" :key="item.id">
                <template #prepend>
                  <v-avatar rounded size="48" class="mr-3">
                    <v-img :src="item.image" />
                  </v-avatar>
                </template>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>Qty: {{ item.quantity }}</v-list-item-subtitle>
                <template #append>
                  <span class="font-weight-medium">${{ (item.price * item.quantity).toFixed(2) }}</span>
                </template>
              </v-list-item>
            </v-list>

            <v-divider class="my-4" />

            <div class="d-flex justify-space-between mb-2">
              <span class="text-medium-emphasis">Subtotal</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="d-flex justify-space-between mb-2">
              <span class="text-medium-emphasis">Shipping</span>
              <span>${{ selectedShippingPrice.toFixed(2) }}</span>
            </div>
            <div class="d-flex justify-space-between mb-2">
              <span class="text-medium-emphasis">Tax</span>
              <span>${{ tax.toFixed(2) }}</span>
            </div>

            <v-text-field
              v-model="promoCode"
              label="Promo Code"
              variant="outlined"
              density="compact"
              class="my-4"
              append-inner-icon="mdi-arrow-right"
              @click:append-inner="applyPromo"
            />

            <v-divider class="mb-4" />

            <div class="d-flex justify-space-between mb-4">
              <span class="text-h6 font-weight-bold">Total</span>
              <span class="text-h6 font-weight-bold">${{ total.toFixed(2) }}</span>
            </div>

            <v-btn
              color="primary"
              size="large"
              block
              :loading="loading"
              :disabled="!isFormValid"
              @click="placeOrder"
            >
              Place Order
              <v-icon end>mdi-lock</v-icon>
            </v-btn>

            <p class="text-caption text-medium-emphasis text-center mt-4">
              <v-icon size="small">mdi-shield-check</v-icon>
              Secure checkout powered by Stripe
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const shippingFormRef = ref()
const paymentFormRef = ref()
const shippingValid = ref(false)
const paymentValid = ref(false)
const loading = ref(false)
const promoCode = ref('')
const sameAsBilling = ref(true)
const shippingMethod = ref('standard')

const shipping = ref({
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  email: '',
  phone: '',
})

const payment = ref({
  cardNumber: '',
  expiry: '',
  cvv: '',
  cardName: '',
})

const states = ['CA', 'NY', 'TX', 'FL', 'WA', 'IL', 'PA', 'OH', 'GA', 'NC']

const shippingMethods = [
  { id: 'standard', name: 'Standard Shipping', description: '5-7 business days', price: 5.99 },
  { id: 'express', name: 'Express Shipping', description: '2-3 business days', price: 12.99 },
  { id: 'overnight', name: 'Overnight Shipping', description: 'Next business day', price: 24.99 },
]

const cartItems = [
  { id: 1, name: 'Wireless Headphones', quantity: 1, price: 129.99, image: 'https://picsum.photos/seed/item1/100' },
  { id: 2, name: 'Phone Case', quantity: 2, price: 24.99, image: 'https://picsum.photos/seed/item2/100' },
  { id: 3, name: 'USB-C Cable', quantity: 3, price: 14.99, image: 'https://picsum.photos/seed/item3/100' },
]

const requiredRules = [(v: string) => !!v || 'This field is required']
const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Please enter a valid email',
]
const zipRules = [
  (v: string) => !!v || 'ZIP code is required',
  (v: string) => /^\d{5}(-\d{4})?$/.test(v) || 'Please enter a valid ZIP code',
]
const cardRules = [
  (v: string) => !!v || 'Card number is required',
  (v: string) => v.replace(/\s/g, '').length >= 16 || 'Please enter a valid card number',
]
const expiryRules = [
  (v: string) => !!v || 'Expiry date is required',
  (v: string) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(v) || 'Please enter a valid expiry (MM/YY)',
]
const cvvRules = [
  (v: string) => !!v || 'CVV is required',
  (v: string) => /^\d{3,4}$/.test(v) || 'Please enter a valid CVV',
]

const subtotal = computed(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0))
const selectedShippingPrice = computed(() => shippingMethods.find(m => m.id === shippingMethod.value)?.price || 0)
const tax = computed(() => subtotal.value * 0.08)
const total = computed(() => subtotal.value + selectedShippingPrice.value + tax.value)
const isFormValid = computed(() => shippingValid.value && paymentValid.value)

const applyPromo = () => {
  console.log('Apply promo:', promoCode.value)
}

const placeOrder = async () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    console.log('Order placed:', { shipping: shipping.value, payment: payment.value })
  }, 2000)
}
</script>

<style scoped>
.sticky-card {
  position: sticky;
  top: 80px;
}
</style>
