<!--
  Snippet: Pricing Card
  Description: Pricing plan cards with feature lists
  Components: VCard, VBtn, VList, VListItem, VIcon, VChip
  Variants: Standard, Featured, Compact
-->
<template>
  <VContainer fluid>
    <h2 class="text-h5 font-weight-bold mb-6">Pricing Card Variants</h2>

    <!-- Standard Pricing Cards -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Standard Cards</h3>
    <VRow class="mb-8" justify="center">
      <VCol v-for="plan in pricingPlans" :key="plan.name" cols="12" sm="6" lg="4">
        <VCard
          :class="{ 'border-primary border-2': plan.featured }"
          :elevation="plan.featured ? 8 : 2"
          height="100%"
          class="d-flex flex-column"
        >
          <VCardText class="text-center pa-6 flex-grow-0">
            <VChip
              v-if="plan.featured"
              color="primary"
              class="mb-4"
            >
              Most Popular
            </VChip>
            <h3 class="text-h5 font-weight-bold mb-2">{{ plan.name }}</h3>
            <p class="text-body-2 text-medium-emphasis mb-4">{{ plan.description }}</p>
            <div class="mb-4">
              <span class="text-h3 font-weight-bold">${{ plan.price }}</span>
              <span class="text-body-2 text-medium-emphasis">/month</span>
            </div>
          </VCardText>

          <VDivider />

          <VCardText class="flex-grow-1">
            <VList density="compact" class="bg-transparent">
              <VListItem
                v-for="feature in plan.features"
                :key="feature.text"
                class="px-0"
              >
                <template #prepend>
                  <VIcon
                    :color="feature.included ? 'success' : 'grey-lighten-1'"
                    size="small"
                    class="mr-2"
                  >
                    {{ feature.included ? 'mdi-check-circle' : 'mdi-close-circle' }}
                  </VIcon>
                </template>
                <VListItemTitle
                  :class="{ 'text-medium-emphasis': !feature.included }"
                  class="text-body-2"
                >
                  {{ feature.text }}
                </VListItemTitle>
              </VListItem>
            </VList>
          </VCardText>

          <VCardActions class="pa-6 pt-0">
            <VBtn
              :color="plan.featured ? 'primary' : undefined"
              :variant="plan.featured ? 'flat' : 'outlined'"
              block
              size="large"
            >
              {{ plan.cta }}
            </VBtn>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>

    <!-- Compact Pricing Cards -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Compact Cards</h3>
    <VRow class="mb-8">
      <VCol v-for="plan in compactPlans" :key="plan.name" cols="12" sm="6" md="3">
        <VCard :color="plan.color" variant="tonal">
          <VCardText class="text-center">
            <VIcon size="48" :color="plan.color" class="mb-3">{{ plan.icon }}</VIcon>
            <h4 class="text-h6 font-weight-bold mb-1">{{ plan.name }}</h4>
            <div class="mb-3">
              <span class="text-h5 font-weight-bold">${{ plan.price }}</span>
              <span class="text-body-2">/mo</span>
            </div>
            <p class="text-body-2 text-medium-emphasis mb-4">{{ plan.users }}</p>
            <VBtn :color="plan.color" block>Choose Plan</VBtn>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Horizontal Pricing Card -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Horizontal Card</h3>
    <VCard class="mb-8">
      <VRow no-gutters align="center">
        <VCol cols="12" md="3" class="text-center pa-6 bg-primary">
          <h3 class="text-h5 font-weight-bold text-white mb-2">Enterprise</h3>
          <div class="mb-4">
            <span class="text-h3 font-weight-bold text-white">$299</span>
            <span class="text-white-darken-1">/month</span>
          </div>
          <VBtn color="white" variant="flat">Contact Sales</VBtn>
        </VCol>
        <VCol cols="12" md="9">
          <VCardText>
            <VRow>
              <VCol v-for="feature in enterpriseFeatures" :key="feature" cols="12" sm="6" md="4">
                <div class="d-flex align-center mb-2">
                  <VIcon color="success" size="small" class="mr-2">mdi-check-circle</VIcon>
                  <span class="text-body-2">{{ feature }}</span>
                </div>
              </VCol>
            </VRow>
          </VCardText>
        </VCol>
      </VRow>
    </VCard>

    <!-- Comparison Table Card -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Comparison Table</h3>
    <VCard>
      <VTable>
        <thead>
          <tr>
            <th class="text-left">Feature</th>
            <th v-for="plan in pricingPlans" :key="plan.name" class="text-center">
              <div class="font-weight-bold">{{ plan.name }}</div>
              <div class="text-body-2">${{ plan.price }}/mo</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="feature in comparisonFeatures" :key="feature.name">
            <td>{{ feature.name }}</td>
            <td v-for="plan in pricingPlans" :key="plan.name" class="text-center">
              <template v-if="typeof feature[plan.key] === 'boolean'">
                <VIcon :color="feature[plan.key] ? 'success' : 'grey-lighten-1'">
                  {{ feature[plan.key] ? 'mdi-check' : 'mdi-close' }}
                </VIcon>
              </template>
              <template v-else>
                {{ feature[plan.key] }}
              </template>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td v-for="plan in pricingPlans" :key="plan.name" class="text-center pa-4">
              <VBtn
                :color="plan.featured ? 'primary' : undefined"
                :variant="plan.featured ? 'flat' : 'outlined'"
                block
              >
                Choose {{ plan.name }}
              </VBtn>
            </td>
          </tr>
        </tfoot>
      </VTable>
    </VCard>
  </VContainer>
</template>

<script setup lang="ts">
const pricingPlans = [
  {
    name: 'Starter',
    key: 'starter',
    description: 'Perfect for individuals',
    price: 9,
    featured: false,
    cta: 'Start Free Trial',
    features: [
      { text: '5 Projects', included: true },
      { text: '10GB Storage', included: true },
      { text: 'Basic Analytics', included: true },
      { text: 'Email Support', included: true },
      { text: 'Custom Domain', included: false },
      { text: 'API Access', included: false },
    ],
  },
  {
    name: 'Professional',
    key: 'pro',
    description: 'Best for growing teams',
    price: 29,
    featured: true,
    cta: 'Start Free Trial',
    features: [
      { text: 'Unlimited Projects', included: true },
      { text: '100GB Storage', included: true },
      { text: 'Advanced Analytics', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Custom Domain', included: true },
      { text: 'API Access', included: true },
    ],
  },
  {
    name: 'Enterprise',
    key: 'enterprise',
    description: 'For large organizations',
    price: 99,
    featured: false,
    cta: 'Contact Sales',
    features: [
      { text: 'Unlimited Everything', included: true },
      { text: 'Unlimited Storage', included: true },
      { text: 'Custom Analytics', included: true },
      { text: '24/7 Phone Support', included: true },
      { text: 'Custom Domain', included: true },
      { text: 'Full API Access', included: true },
    ],
  },
]

const compactPlans = [
  { name: 'Free', price: 0, users: 'Up to 3 users', icon: 'mdi-account', color: 'grey' },
  { name: 'Basic', price: 15, users: 'Up to 10 users', icon: 'mdi-account-group', color: 'primary' },
  { name: 'Pro', price: 49, users: 'Up to 50 users', icon: 'mdi-rocket', color: 'success' },
  { name: 'Team', price: 99, users: 'Unlimited users', icon: 'mdi-office-building', color: 'warning' },
]

const enterpriseFeatures = [
  'Unlimited users',
  'Unlimited storage',
  'Custom integrations',
  'Dedicated support',
  'SLA guarantee',
  'SSO authentication',
  'Advanced security',
  'Custom branding',
  'API access',
]

interface ComparisonFeature {
  name: string
  starter: string | boolean
  pro: string | boolean
  enterprise: string | boolean
}

const comparisonFeatures: ComparisonFeature[] = [
  { name: 'Projects', starter: '5', pro: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'Storage', starter: '10 GB', pro: '100 GB', enterprise: 'Unlimited' },
  { name: 'Team members', starter: '1', pro: '10', enterprise: 'Unlimited' },
  { name: 'API access', starter: false, pro: true, enterprise: true },
  { name: 'Custom domain', starter: false, pro: true, enterprise: true },
  { name: 'SSO', starter: false, pro: false, enterprise: true },
]
</script>
