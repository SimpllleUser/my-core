<!--
  Snippet: Payment Form
  Description: Payment forms with card input, saved cards, and checkout flow
  Components: PriceDisplay
  Variants: Simple payment, checkout with summary, card management
-->
<template>
  <div>
    <!-- Style 1: Simple Payment Form -->
    <section class="py-8">
      <VContainer>
        <VRow justify="center">
          <VCol cols="12" md="6" lg="5">
            <VCard variant="outlined">
              <VCardTitle class="text-h5 font-weight-bold pa-6 pb-0">
                Payment Details
              </VCardTitle>
              <VCardText class="pa-6">
                <VForm>
                  <div class="mb-4">
                    <label class="text-body-2 font-weight-medium mb-2 d-block">Card Number</label>
                    <VTextField
                      v-model="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      :prepend-inner-icon="Icons.CreditCard"
                      variant="outlined"
                      density="comfortable"
                    />
                  </div>

                  <VRow>
                    <VCol cols="6">
                      <label class="text-body-2 font-weight-medium mb-2 d-block">Expiry</label>
                      <VTextField
                        v-model="expiry"
                        placeholder="MM/YY"
                        variant="outlined"
                        density="comfortable"
                      />
                    </VCol>
                    <VCol cols="6">
                      <label class="text-body-2 font-weight-medium mb-2 d-block">CVC</label>
                      <VTextField
                        v-model="cvc"
                        placeholder="123"
                        :append-inner-icon="Icons.HelpCircle"
                        variant="outlined"
                        density="comfortable"
                      />
                    </VCol>
                  </VRow>

                  <div class="mb-4">
                    <label class="text-body-2 font-weight-medium mb-2 d-block">Name on Card</label>
                    <VTextField
                      v-model="cardName"
                      placeholder="John Doe"
                      variant="outlined"
                      density="comfortable"
                    />
                  </div>

                  <VCheckbox
                    v-model="saveCard"
                    label="Save card for future payments"
                    color="primary"
                    hide-details
                    class="mb-4"
                  />

                  <VBtn color="primary" size="large" block>
                    Pay $99.00
                  </VBtn>

                  <div class="text-center mt-4">
                    <div class="d-flex align-center justify-center ga-2 text-medium-emphasis">
                      <VIcon size="16">{{ Icons.Lock }}</VIcon>
                      <span class="text-caption">Secured by 256-bit SSL encryption</span>
                    </div>
                  </div>
                </VForm>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 2: Checkout with Order Summary -->
    <section class="py-8 bg-grey-lighten-5">
      <VContainer>
        <VRow>
          <VCol cols="12" md="7">
            <VCard variant="flat">
              <VCardTitle class="text-h5 font-weight-bold pa-6 pb-4">
                Checkout
              </VCardTitle>
              <VCardText class="pa-6 pt-0">
                <!-- Saved Cards -->
                <div class="mb-6">
                  <div class="text-subtitle-1 font-weight-bold mb-3">Saved Cards</div>
                  <VRadioGroup v-model="selectedCard" hide-details>
                    <VCard
                      v-for="card in savedCards"
                      :key="card.id"
                      :variant="selectedCard === card.id ? 'tonal' : 'outlined'"
                      :color="selectedCard === card.id ? 'primary' : undefined"
                      class="mb-2"
                    >
                      <VCardText class="pa-4">
                        <div class="d-flex align-center">
                          <VRadio :value="card.id" hide-details />
                          <VIcon :color="getCardBrandColor(card.type)" size="32" class="mx-3">
                            {{ Icons.CreditCard }}
                          </VIcon>
                          <div class="flex-grow-1">
                            <div class="font-weight-medium">•••• •••• •••• {{ card.lastFour }}</div>
                            <div class="text-caption text-medium-emphasis">
                              Expires {{ card.expiryDate }}
                            </div>
                          </div>
                          <VChip v-if="card.isDefault" size="small" color="primary" variant="tonal">
                            Default
                          </VChip>
                        </div>
                      </VCardText>
                    </VCard>
                  </VRadioGroup>

                  <VBtn variant="text" color="primary" class="mt-2">
                    <VIcon start>{{ Icons.Plus }}</VIcon>
                    Add New Card
                  </VBtn>
                </div>

                <VDivider class="mb-6" />

                <!-- Billing Address -->
                <div class="mb-6">
                  <div class="text-subtitle-1 font-weight-bold mb-3">Billing Address</div>
                  <VRow>
                    <VCol cols="12">
                      <VTextField
                        v-model="address.street"
                        label="Street Address"
                        variant="outlined"
                        density="comfortable"
                      />
                    </VCol>
                    <VCol cols="6">
                      <VTextField
                        v-model="address.city"
                        label="City"
                        variant="outlined"
                        density="comfortable"
                      />
                    </VCol>
                    <VCol cols="6">
                      <VTextField
                        v-model="address.zip"
                        label="ZIP Code"
                        variant="outlined"
                        density="comfortable"
                      />
                    </VCol>
                  </VRow>
                </div>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12" md="5">
            <VCard variant="outlined" class="sticky" style="top: 20px;">
              <VCardTitle class="text-h6 font-weight-bold pa-6 pb-4">
                Order Summary
              </VCardTitle>
              <VCardText class="pa-6 pt-0">
                <VList lines="two">
                  <VListItem v-for="item in orderItems" :key="item.name" class="px-0">
                    <template #prepend>
                      <VAvatar rounded="lg" size="48">
                        <VImg :src="item.image" :alt="item.name" />
                      </VAvatar>
                    </template>
                    <VListItemTitle class="font-weight-medium">{{ item.name }}</VListItemTitle>
                    <VListItemSubtitle>Qty: {{ item.qty }}</VListItemSubtitle>
                    <template #append>
                      <span class="font-weight-bold">${{ (item.price * item.qty).toFixed(2) }}</span>
                    </template>
                  </VListItem>
                </VList>

                <VDivider class="my-4" />

                <div class="d-flex justify-space-between mb-2">
                  <span class="text-medium-emphasis">Subtotal</span>
                  <span>$297.00</span>
                </div>
                <div class="d-flex justify-space-between mb-2">
                  <span class="text-medium-emphasis">Shipping</span>
                  <span>$12.00</span>
                </div>
                <div class="d-flex justify-space-between mb-2">
                  <span class="text-medium-emphasis">Tax</span>
                  <span>$24.72</span>
                </div>

                <VDivider class="my-4" />

                <div class="d-flex justify-space-between mb-4">
                  <span class="text-h6 font-weight-bold">Total</span>
                  <span class="text-h6 font-weight-bold text-primary">$333.72</span>
                </div>

                <VTextField
                  v-model="promoCode"
                  placeholder="Promo code"
                  variant="outlined"
                  density="compact"
                  class="mb-4"
                >
                  <template #append-inner>
                    <VBtn size="small" variant="text" color="primary">Apply</VBtn>
                  </template>
                </VTextField>

                <VBtn color="primary" size="large" block>
                  Complete Purchase
                </VBtn>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 3: Card Management -->
    <section class="py-8">
      <VContainer>
        <div class="d-flex justify-space-between align-center mb-6">
          <div>
            <h3 class="text-h5 font-weight-bold">Payment Methods</h3>
            <p class="text-body-2 text-medium-emphasis mb-0">Manage your payment methods</p>
          </div>
          <VBtn color="primary">
            <VIcon start>{{ Icons.Plus }}</VIcon>
            Add Card
          </VBtn>
        </div>

        <VRow>
          <VCol v-for="card in managementCards" :key="card.id" cols="12" sm="6" md="4">
            <VCard
              variant="outlined"
              :class="{ 'border-primary': card.isDefault }"
              style="border-width: 2px"
            >
              <VCardText class="pa-4">
                <div class="d-flex justify-space-between align-center mb-4">
                  <VIcon :color="getCardBrandColor(card.type)" size="40">
                    {{ Icons.CreditCard }}
                  </VIcon>
                  <VMenu>
                    <template #activator="{ props }">
                      <VBtn icon variant="text" size="small" v-bind="props">
                        <VIcon>{{ Icons.DotsVertical }}</VIcon>
                      </VBtn>
                    </template>
                    <VList density="compact">
                      <VListItem>
                        <VListItemTitle>Set as Default</VListItemTitle>
                      </VListItem>
                      <VListItem>
                        <VListItemTitle>Edit</VListItemTitle>
                      </VListItem>
                      <VListItem class="text-error">
                        <VListItemTitle>Remove</VListItemTitle>
                      </VListItem>
                    </VList>
                  </VMenu>
                </div>

                <div class="text-h6 font-weight-bold mb-1">
                  •••• •••• •••• {{ card.lastFour }}
                </div>
                <div class="text-body-2 text-medium-emphasis mb-3">
                  {{ card.holderName }}
                </div>

                <div class="d-flex justify-space-between align-center">
                  <span class="text-caption text-medium-emphasis">
                    Expires {{ card.expiryDate }}
                  </span>
                  <VChip v-if="card.isDefault" size="small" color="primary" variant="tonal">
                    Default
                  </VChip>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Icons } from '@/shared/model'
import type { IPaymentCard } from '@/shared/ui/snippets'

// Form data
const cardNumber = ref('')
const expiry = ref('')
const cvc = ref('')
const cardName = ref('')
const saveCard = ref(false)
const selectedCard = ref(1)
const promoCode = ref('')

const address = reactive({
  street: '',
  city: '',
  zip: '',
})

const savedCards: IPaymentCard[] = [
  { id: 1, type: 'visa', lastFour: '4242', expiryDate: '12/25', holderName: 'John Doe', isDefault: true },
  { id: 2, type: 'mastercard', lastFour: '8888', expiryDate: '06/24', holderName: 'John Doe', isDefault: false },
]

const managementCards: IPaymentCard[] = [
  { id: 1, type: 'visa', lastFour: '4242', expiryDate: '12/25', holderName: 'John Doe', isDefault: true },
  { id: 2, type: 'mastercard', lastFour: '8888', expiryDate: '06/24', holderName: 'John Doe', isDefault: false },
  { id: 3, type: 'amex', lastFour: '0005', expiryDate: '09/26', holderName: 'John Doe', isDefault: false },
]

const orderItems = [
  { name: 'Premium Subscription', price: 99, qty: 1, image: 'https://picsum.photos/seed/sub/100' },
  { name: 'Add-on Package', price: 49, qty: 2, image: 'https://picsum.photos/seed/addon/100' },
  { name: 'Support Plan', price: 100, qty: 1, image: 'https://picsum.photos/seed/support/100' },
]

const getCardBrandColor = (type: string) => {
  const colors: Record<string, string> = {
    visa: 'blue',
    mastercard: 'orange',
    amex: 'indigo',
    other: 'grey',
  }
  return colors[type] || colors.other
}
</script>
