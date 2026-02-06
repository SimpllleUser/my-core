<!--
  Snippet: Pricing Section
  Description: Pricing tables with feature comparison
  Components: SectionHeader, PricingCard, FeatureItem
  Variants: Monthly/Yearly toggle, Featured plan highlight
-->
<template>
  <section class="py-16">
    <VContainer>
      <!-- Header -->
      <SectionHeader
        title="Simple, Transparent Pricing"
        subtitle="Choose the perfect plan for your needs. No hidden fees, cancel anytime."
        chip="Pricing"
        title-class="text-h3"
        class="mb-6"
      >
        <!-- Billing Toggle -->
        <div class="d-flex align-center justify-center ga-3 mt-6">
          <span :class="{ 'text-medium-emphasis': isYearly }">Monthly</span>
          <VSwitch
            v-model="isYearly"
            color="primary"
            hide-details
            inset
          />
          <span :class="{ 'text-medium-emphasis': !isYearly }">
            Yearly
            <VChip color="success" size="x-small" class="ml-1">Save 20%</VChip>
          </span>
        </div>
      </SectionHeader>

      <!-- Pricing Cards -->
      <VRow justify="center">
        <VCol v-for="plan in plans" :key="plan.name" cols="12" sm="6" lg="4">
          <PricingCard
            :name="plan.name"
            :description="plan.description"
            :monthly-price="plan.monthlyPrice"
            :yearly-price="plan.yearlyPrice"
            :is-yearly="isYearly"
            :features="plan.features"
            :cta="plan.cta"
            :featured="plan.featured"
            :billing-note="isYearly ? `Billed annually ($${plan.yearlyPrice * 12}/year)` : undefined"
            @select="handleSelectPlan(plan)"
          />
        </VCol>
      </VRow>

      <!-- FAQ or Money Back Guarantee -->
      <div class="text-center mt-12">
        <VIcon color="success" class="mr-2">{{ Icons.ShieldCheck }}</VIcon>
        <span class="text-body-1">30-day money-back guarantee • No questions asked</span>
      </div>

      <!-- Feature Comparison Table -->
      <VCard class="mt-16" variant="outlined">
        <VCardTitle class="text-center py-6">
          <h3 class="text-h5 font-weight-bold">Compare All Features</h3>
        </VCardTitle>
        <VTable>
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
                  <VIcon :color="feature[plan.key] ? 'success' : 'grey-lighten-1'">
                    {{ feature[plan.key] ? Icons.Check : Icons.Close }}
                  </VIcon>
                </template>
                <template v-else>
                  {{ feature[plan.key] }}
                </template>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VContainer>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icons } from '@/shared/model'
import { SectionHeader, PricingCard } from '@/shared/ui/snippets'
import type { IPricingPlan, IPricingFeature } from '@/shared/ui/snippets'

const isYearly = ref(false)

interface IPlan extends IPricingPlan {
  key: string
}

const plans: IPlan[] = [
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

interface IComparisonFeature {
  name: string
  starter: string | boolean
  professional: string | boolean
  enterprise: string | boolean
  [key: string]: string | boolean
}

const comparisonFeatures: IComparisonFeature[] = [
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

const handleSelectPlan = (plan: IPlan) => {
  console.log('Selected plan:', plan.name)
}
</script>
