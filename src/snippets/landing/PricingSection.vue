<!--
  Snippet: Pricing Section
  Description: Pricing tables with feature comparison
  Components: VContainer, VRow, VCol, VCard, VBtn, VChip, VSwitch, VList
  Variants: Monthly/Yearly toggle, Featured plan highlight
-->
<template>
  <section class="py-16">
    <v-container>
      <!-- Header -->
      <div class="text-center mb-12">
        <v-chip color="primary" variant="tonal" class="mb-4">Pricing</v-chip>
        <h2 class="text-h3 font-weight-bold mb-4">Simple, Transparent Pricing</h2>
        <p class="text-body-1 text-medium-emphasis mx-auto mb-6" style="max-width: 600px;">
          Choose the perfect plan for your needs. No hidden fees, cancel anytime.
        </p>

        <!-- Billing Toggle -->
        <div class="d-flex align-center justify-center ga-3">
          <span :class="{ 'text-medium-emphasis': isYearly }">Monthly</span>
          <v-switch
            v-model="isYearly"
            color="primary"
            hide-details
            inset
          />
          <span :class="{ 'text-medium-emphasis': !isYearly }">
            Yearly
            <v-chip color="success" size="x-small" class="ml-1">Save 20%</v-chip>
          </span>
        </div>
      </div>

      <!-- Pricing Cards -->
      <v-row justify="center">
        <v-col v-for="plan in plans" :key="plan.name" cols="12" sm="6" lg="4">
          <v-card
            :class="{ 'border-primary border-2': plan.featured }"
            :elevation="plan.featured ? 12 : 2"
            height="100%"
            class="d-flex flex-column"
          >
            <v-card-text class="flex-grow-1">
              <!-- Featured Badge -->
              <v-chip
                v-if="plan.featured"
                color="primary"
                size="small"
                class="position-absolute"
                style="top: 12px; right: 12px;"
              >
                Most Popular
              </v-chip>

              <!-- Plan Name & Price -->
              <div class="text-center pt-4 pb-6">
                <h3 class="text-h5 font-weight-bold mb-2">{{ plan.name }}</h3>
                <p class="text-body-2 text-medium-emphasis mb-4">{{ plan.description }}</p>
                <div class="d-flex align-baseline justify-center">
                  <span class="text-h3 font-weight-bold">
                    ${{ isYearly ? plan.yearlyPrice : plan.monthlyPrice }}
                  </span>
                  <span class="text-medium-emphasis ml-1">/month</span>
                </div>
                <p v-if="isYearly" class="text-caption text-medium-emphasis mt-1">
                  Billed annually (${{ plan.yearlyPrice * 12 }}/year)
                </p>
              </div>

              <v-divider class="mb-4" />

              <!-- Features -->
              <v-list density="compact" class="bg-transparent">
                <v-list-item
                  v-for="feature in plan.features"
                  :key="feature.text"
                  class="px-0"
                >
                  <template #prepend>
                    <v-icon
                      :color="feature.included ? 'success' : 'grey-lighten-1'"
                      size="small"
                      class="mr-2"
                    >
                      {{ feature.included ? 'mdi-check-circle' : 'mdi-close-circle' }}
                    </v-icon>
                  </template>
                  <v-list-item-title
                    :class="{ 'text-medium-emphasis': !feature.included }"
                    class="text-body-2"
                  >
                    {{ feature.text }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>

            <v-card-actions class="pa-4 pt-0">
              <v-btn
                :color="plan.featured ? 'primary' : undefined"
                :variant="plan.featured ? 'flat' : 'outlined'"
                block
                size="large"
              >
                {{ plan.cta }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- FAQ or Money Back Guarantee -->
      <div class="text-center mt-12">
        <v-icon color="success" class="mr-2">mdi-shield-check</v-icon>
        <span class="text-body-1">30-day money-back guarantee • No questions asked</span>
      </div>

      <!-- Feature Comparison Table -->
      <v-card class="mt-16" variant="outlined">
        <v-card-title class="text-center py-6">
          <h3 class="text-h5 font-weight-bold">Compare All Features</h3>
        </v-card-title>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Feature</th>
              <th v-for="plan in plans" :key="plan.name" class="text-center">
                {{ plan.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="feature in comparisonFeatures" :key="feature.name">
              <td>{{ feature.name }}</td>
              <td v-for="plan in plans" :key="plan.name" class="text-center">
                <template v-if="typeof feature[plan.key] === 'boolean'">
                  <v-icon :color="feature[plan.key] ? 'success' : 'grey-lighten-1'">
                    {{ feature[plan.key] ? 'mdi-check' : 'mdi-close' }}
                  </v-icon>
                </template>
                <template v-else>
                  {{ feature[plan.key] }}
                </template>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isYearly = ref(false)

const plans = [
  {
    name: 'Starter',
    key: 'starter',
    description: 'Perfect for individuals and small projects',
    monthlyPrice: 9,
    yearlyPrice: 7,
    featured: false,
    cta: 'Start Free Trial',
    features: [
      { text: 'Up to 3 projects', included: true },
      { text: '1 GB storage', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Email support', included: true },
      { text: 'Custom domain', included: false },
      { text: 'API access', included: false },
      { text: 'Priority support', included: false },
    ],
  },
  {
    name: 'Professional',
    key: 'professional',
    description: 'Best for growing teams and businesses',
    monthlyPrice: 29,
    yearlyPrice: 23,
    featured: true,
    cta: 'Start Free Trial',
    features: [
      { text: 'Unlimited projects', included: true },
      { text: '50 GB storage', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Custom domain', included: true },
      { text: 'API access', included: true },
      { text: 'Priority support', included: false },
    ],
  },
  {
    name: 'Enterprise',
    key: 'enterprise',
    description: 'For large organizations with custom needs',
    monthlyPrice: 99,
    yearlyPrice: 79,
    featured: false,
    cta: 'Contact Sales',
    features: [
      { text: 'Unlimited everything', included: true },
      { text: 'Unlimited storage', included: true },
      { text: 'Custom analytics', included: true },
      { text: '24/7 phone support', included: true },
      { text: 'Custom domain', included: true },
      { text: 'Full API access', included: true },
      { text: 'Dedicated account manager', included: true },
    ],
  },
]

const comparisonFeatures = [
  { name: 'Projects', starter: '3', professional: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'Storage', starter: '1 GB', professional: '50 GB', enterprise: 'Unlimited' },
  { name: 'Team members', starter: '1', professional: '10', enterprise: 'Unlimited' },
  { name: 'API access', starter: false, professional: true, enterprise: true },
  { name: 'Custom domain', starter: false, professional: true, enterprise: true },
  { name: 'Analytics', starter: 'Basic', professional: 'Advanced', enterprise: 'Custom' },
  { name: 'Support', starter: 'Email', professional: 'Priority', enterprise: '24/7 Phone' },
  { name: 'SSO', starter: false, professional: false, enterprise: true },
  { name: 'SLA', starter: false, professional: false, enterprise: true },
]
</script>
