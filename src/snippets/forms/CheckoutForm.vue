<!--
  Snippet: Checkout Form
  Description: E-commerce checkout form with billing, shipping, and payment
  Components: VCard, VTextField, VSelect, VRadioGroup, VDivider, VBtn
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <VContainer>
    <VRow>
      <!-- Checkout Form -->
      <VCol cols="12" lg="8">
        <VCard class="mb-4">
          <VCardTitle class="d-flex align-center">
            <VIcon color="primary" class="mr-2">mdi-map-marker</VIcon>
            Shipping Information
          </VCardTitle>
          <VCardText>
            <VForm ref="shippingFormRef" v-model="shippingValid">
              <VRow>
                <VCol cols="12" sm="6">
                  <VTextField
                    v-model="shipping.firstName"
                    :rules="requiredRules"
                    label="First Name"
                    variant="outlined"
                  />
                </VCol>
                <VCol cols="12" sm="6">
                  <VTextField
                    v-model="shipping.lastName"
                    :rules="requiredRules"
                    label="Last Name"
                    variant="outlined"
                  />
                </VCol>
                <VCol cols="12">
                  <VTextField
                    v-model="shipping.address"
                    :rules="requiredRules"
                    label="Street Address"
                    variant="outlined"
                  />
                </VCol>
                <VCol cols="12" sm="6">
                  <VTextField
                    v-model="shipping.city"
                    :rules="requiredRules"
                    label="City"
                    variant="outlined"
                  />
                </VCol>
                <VCol cols="12" sm="3">
                  <VSelect
                    v-model="shipping.state"
                    :items="states"
                    :rules="requiredRules"
                    label="State"
                    variant="outlined"
                  />
                </VCol>
                <VCol cols="12" sm="3">
                  <VTextField
                    v-model="shipping.zip"
                    :rules="zipRules"
                    label="ZIP Code"
                    variant="outlined"
                  />
                </VCol>
                <VCol cols="12" sm="6">
                  <VTextField
                    v-model="shipping.email"
                    :rules="emailRules"
                    label="Email"
                    type="email"
                    variant="outlined"
                  />
                </VCol>
                <VCol cols="12" sm="6">
                  <VTextField
                    v-model="shipping.phone"
                    :rules="requiredRules"
                    label="Phone"
                    variant="outlined"
                  />
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>

        <!-- Shipping Method -->
        <VCard class="mb-4">
          <VCardTitle class="d-flex align-center">
            <VIcon color="primary" class="mr-2">mdi-truck-delivery</VIcon>
            Shipping Method
          </VCardTitle>
          <VCardText>
            <VRadioGroup v-model="shippingMethod" hide-details>
              <VCard
                v-for="method in shippingMethods"
                :key="method.id"
                :variant="shippingMethod === method.id ? 'tonal' : 'outlined'"
                :color="shippingMethod === method.id ? 'primary' : undefined"
                class="mb-3 pa-4"
                @click="shippingMethod = method.id"
              >
                <div class="d-flex align-center">
                  <VRadio :value="method.id" hide-details class="mr-4" />
                  <div class="flex-grow-1">
                    <div class="d-flex justify-space-between">
                      <span class="font-weight-medium">{{ method.name }}</span>
                      <span class="font-weight-bold">${{ method.price.toFixed(2) }}</span>
                    </div>
                    <span class="text-caption text-medium-emphasis">{{ method.description }}</span>
                  </div>
                </div>
              </VCard>
            </VRadioGroup>
          </VCardText>
        </VCard>

        <!-- Payment Information -->
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon color="primary" class="mr-2">mdi-credit-card</VIcon>
            Payment Information
          </VCardTitle>
          <VCardText>
            <VForm ref="paymentFormRef" v-model="paymentValid">
              <VRow>
                <VCol cols="12">
                  <VTextField
                    v-model="payment.cardNumber"
                    :rules="cardRules"
                    label="Card Number"
                    variant="outlined"
                    placeholder="1234 5678 9012 3456"
                    prepend-inner-icon="mdi-credit-card"
                  />
                </VCol>
                <VCol cols="12" sm="6">
                  <VTextField
                    v-model="payment.expiry"
                    :rules="expiryRules"
                    label="Expiry Date"
                    variant="outlined"
                    placeholder="MM/YY"
                  />
                </VCol>
                <VCol cols="12" sm="6">
                  <VTextField
                    v-model="payment.cvv"
                    :rules="cvvRules"
                    label="CVV"
                    variant="outlined"
                    placeholder="123"
                    type="password"
                  />
                </VCol>
                <VCol cols="12">
                  <VTextField
                    v-model="payment.cardName"
                    :rules="requiredRules"
                    label="Name on Card"
                    variant="outlined"
                  />
                </VCol>
              </VRow>

              <VCheckbox
                v-model="sameAsBilling"
                label="Billing address same as shipping"
                color="primary"
              />
            </VForm>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Order Summary -->
      <VCol cols="12" lg="4">
        <VCard class="sticky-card">
          <VCardTitle>Order Summary</VCardTitle>
          <VCardText>
            <VList density="compact">
              <VListItem v-for="item in cartItems" :key="item.id">
                <template #prepend>
                  <VAvatar rounded size="48" class="mr-3">
                    <VImg :src="item.image" />
                  </VAvatar>
                </template>
                <VListItemTitle>{{ item.name }}</VListItemTitle>
                <VListItemSubtitle>Qty: {{ item.quantity }}</VListItemSubtitle>
                <template #append>
                  <span class="font-weight-medium">${{ (item.price * item.quantity).toFixed(2) }}</span>
                </template>
              </VListItem>
            </VList>

            <VDivider class="my-4" />

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

            <VTextField
              v-model="promoCode"
              label="Promo Code"
              variant="outlined"
              density="compact"
              class="my-4"
              append-inner-icon="mdi-arrow-right"
              @click:append-inner="applyPromo"
            />

            <VDivider class="mb-4" />

            <div class="d-flex justify-space-between mb-4">
              <span class="text-h6 font-weight-bold">Total</span>
              <span class="text-h6 font-weight-bold">${{ total.toFixed(2) }}</span>
            </div>

            <VBtn
              color="primary"
              size="large"
              block
              :loading="loading"
              :disabled="!isFormValid"
              @click="placeOrder"
            >
              Place Order
              <VIcon end>mdi-lock</VIcon>
            </VBtn>

            <p class="text-caption text-medium-emphasis text-center mt-4">
              <VIcon size="small">mdi-shield-check</VIcon>
              Secure checkout powered by Stripe
            </p>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
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
