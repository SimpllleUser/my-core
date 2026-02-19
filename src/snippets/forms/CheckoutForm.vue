<!--
  Snippet: Checkout Form
  Description: E-commerce checkout form with billing, shipping, and payment
  Components: VCard, DynamicField, FormConfig, useFormState, VRadioGroup
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <VContainer>
    <VRow>
      <!-- Checkout Form -->
      <VCol cols="12" lg="8">
        <VCard class="mb-4">
          <VCardTitle class="d-flex align-center">
            <VIcon color="primary" class="mr-2">{{ Icons.MapMarker }}</VIcon>
            Shipping Information
          </VCardTitle>
          <VCardText>
            <VForm>
              <VRow>
                <VCol cols="12" sm="6">
                  <DynamicField v-bind="shippingBind.firstName" />
                </VCol>
                <VCol cols="12" sm="6">
                  <DynamicField v-bind="shippingBind.lastName" />
                </VCol>
                <VCol cols="12">
                  <DynamicField v-bind="shippingBind.address" />
                </VCol>
                <VCol cols="12" sm="6">
                  <DynamicField v-bind="shippingBind.city" />
                </VCol>
                <VCol cols="12" sm="3">
                  <DynamicField v-bind="shippingBind.state" />
                </VCol>
                <VCol cols="12" sm="3">
                  <DynamicField v-bind="shippingBind.zip" />
                </VCol>
                <VCol cols="12" sm="6">
                  <DynamicField v-bind="shippingBind.email" />
                </VCol>
                <VCol cols="12" sm="6">
                  <DynamicField v-bind="shippingBind.phone" />
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>

        <!-- Shipping Method -->
        <VCard class="mb-4">
          <VCardTitle class="d-flex align-center">
            <VIcon color="primary" class="mr-2">{{ Icons.TruckDelivery }}</VIcon>
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
            <VIcon color="primary" class="mr-2">{{ Icons.CreditCard }}</VIcon>
            Payment Information
          </VCardTitle>
          <VCardText>
            <VForm>
              <VRow>
                <VCol cols="12">
                  <DynamicField v-bind="paymentBind.cardNumber" />
                </VCol>
                <VCol cols="12" sm="6">
                  <DynamicField v-bind="paymentBind.expiry" />
                </VCol>
                <VCol cols="12" sm="6">
                  <DynamicField v-bind="paymentBind.cvv" />
                </VCol>
                <VCol cols="12">
                  <DynamicField v-bind="paymentBind.cardName" />
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
              :append-inner-icon="Icons.ArrowRight"
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
              <VIcon end>{{ Icons.Lock }}</VIcon>
            </VBtn>

            <p class="text-caption text-medium-emphasis text-center mt-4">
              <VIcon size="small">{{ Icons.ShieldCheck }}</VIcon>
              Secure checkout powered by Stripe
            </p>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { Icons } from '../../shared/model'
import { ref, computed } from 'vue'
import {
  FormConfig,
  TextField,
  EmailField,
  SelectField,
  useFormState,
  DynamicField,
  pattern,
} from '../../shared/form'

const loading = ref(false)
const promoCode = ref('')
const sameAsBilling = ref(true)
const shippingMethod = ref('standard')

// --- Shipping Form ---
const shippingForm = new FormConfig({
  firstName: new TextField({ label: 'First Name', required: true }),
  lastName: new TextField({ label: 'Last Name', required: true }),
  address: new TextField({ label: 'Street Address', required: true }),
  city: new TextField({ label: 'City', required: true }),
  state: new SelectField({
    label: 'State',
    required: true,
    options: ['CA', 'NY', 'TX', 'FL', 'WA', 'IL', 'PA', 'OH', 'GA', 'NC'].map(s => ({ title: s, value: s })),
  }),
  zip: new TextField({
    label: 'ZIP Code',
    required: true,
    rules: [pattern(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code')],
  }),
  email: new EmailField({ label: 'Email', required: true }),
  phone: new TextField({ label: 'Phone', required: true }),
})

const {
  bind: shippingBind,
  isValid: shippingValid,
  validateAll: shippingValidateAll,
} = useFormState(shippingForm.getFields())

// --- Payment Form ---
const paymentForm = new FormConfig({
  cardNumber: new TextField({
    label: 'Card Number',
    required: true,
    placeholder: '1234 5678 9012 3456',
    rules: [pattern(/^\d[\d\s]{14,18}$/, 'Please enter a valid card number')],
    vuetifyProps: { 'prepend-inner-icon': Icons.CreditCard },
  }),
  expiry: new TextField({
    label: 'Expiry Date',
    required: true,
    placeholder: 'MM/YY',
    rules: [pattern(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Please enter a valid expiry (MM/YY)')],
  }),
  cvv: new TextField({
    label: 'CVV',
    required: true,
    placeholder: '123',
    rules: [pattern(/^\d{3,4}$/, 'Please enter a valid CVV')],
  }),
  cardName: new TextField({ label: 'Name on Card', required: true }),
})

const {
  bind: paymentBind,
  isValid: paymentValid,
  validateAll: paymentValidateAll,
} = useFormState(paymentForm.getFields())

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

const subtotal = computed(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0))
const selectedShippingPrice = computed(() => shippingMethods.find(m => m.id === shippingMethod.value)?.price || 0)
const tax = computed(() => subtotal.value * 0.08)
const total = computed(() => subtotal.value + selectedShippingPrice.value + tax.value)
const isFormValid = computed(() => shippingValid.value && paymentValid.value)

const applyPromo = () => {
  console.log('Apply promo:', promoCode.value)
}

const placeOrder = () => {
  if (!shippingValidateAll() || !paymentValidateAll()) return

  loading.value = true
  setTimeout(() => {
    loading.value = false
    console.log('Order placed')
  }, 2000)
}
</script>

<style scoped>
.sticky-card {
  position: sticky;
  top: 80px;
}
</style>
