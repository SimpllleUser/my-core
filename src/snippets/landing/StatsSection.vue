<!--
  Snippet: Stats Section
  Description: Statistics and metrics display sections
  Components: VContainer, VRow, VCol, VCard, VIcon
  Complexity: Medium
-->
<template>
  <div>
    <!-- Stats Style 1: Simple Grid -->
    <section class="py-12">
      <VContainer>
        <VRow>
          <VCol v-for="stat in simpleStats" :key="stat.label" cols="6" md="3" class="text-center">
            <h2 class="text-h3 font-weight-bold text-primary mb-2">{{ stat.value }}</h2>
            <p class="text-body-1 text-medium-emphasis mb-0">{{ stat.label }}</p>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider class="my-8" />

    <!-- Stats Style 2: Cards with Icons -->
    <section class="py-12 bg-grey-lighten-5">
      <VContainer>
        <div class="text-center mb-8">
          <h2 class="text-h4 font-weight-bold mb-2">By the Numbers</h2>
          <p class="text-body-1 text-medium-emphasis">Our impact in numbers</p>
        </div>

        <VRow>
          <VCol v-for="stat in cardStats" :key="stat.label" cols="12" sm="6" lg="3">
            <VCard class="pa-6 text-center" height="100%" hover>
              <VAvatar :color="stat.color" size="64" class="mb-4">
                <VIcon color="white" size="32">{{ stat.icon }}</VIcon>
              </VAvatar>
              <h3 class="text-h4 font-weight-bold mb-1">{{ stat.value }}</h3>
              <p class="text-body-2 text-medium-emphasis mb-0">{{ stat.label }}</p>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider class="my-8" />

    <!-- Stats Style 3: Progress Bars -->
    <section class="py-12">
      <VContainer>
        <VRow align="center">
          <VCol cols="12" md="5">
            <h2 class="text-h4 font-weight-bold mb-3">Proven Results</h2>
            <p class="text-body-1 text-medium-emphasis">
              Our customers see real improvements in their key metrics after switching to our platform.
            </p>
          </VCol>
          <VCol cols="12" md="7">
            <div v-for="metric in progressStats" :key="metric.label" class="mb-4">
              <div class="d-flex justify-space-between mb-1">
                <span class="text-body-2 font-weight-medium">{{ metric.label }}</span>
                <span class="text-body-2 text-primary font-weight-bold">{{ metric.value }}</span>
              </div>
              <VProgressLinear
                :model-value="metric.progress"
                :color="metric.color"
                height="8"
                rounded
              />
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider class="my-8" />

    <!-- Stats Style 4: Dark with Trends -->
    <section class="py-12" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);">
      <VContainer>
        <VRow>
          <VCol v-for="stat in trendStats" :key="stat.label" cols="6" md="3">
            <VCard color="rgba(255,255,255,0.05)" class="pa-4">
              <div class="d-flex align-center mb-2">
                <VIcon :color="stat.trend > 0 ? 'success' : 'error'" size="small">
                  {{ stat.trend > 0 ? Icons.TrendingUp : Icons.TrendingDown }}
                </VIcon>
                <span :class="stat.trend > 0 ? 'text-success' : 'text-error'" class="text-caption ml-1">
                  {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
                </span>
              </div>
              <h3 class="text-h4 font-weight-bold text-white mb-1">{{ stat.value }}</h3>
              <p class="text-body-2 text-grey-lighten-1 mb-0">{{ stat.label }}</p>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/shared/model'

const simpleStats = [
  { value: '10K+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '150+', label: 'Countries' },
  { value: '24/7', label: 'Support' },
]

const cardStats = [
  { value: '2.5M+', label: 'Tasks Completed', icon: Icons.CheckCircle, color: 'success' },
  { value: '500K+', label: 'Happy Customers', icon: Icons.AccountMultiple, color: 'primary' },
  { value: '50+', label: 'Team Members', icon: Icons.AccountGroup, color: 'secondary' },
  { value: '4.9/5', label: 'Average Rating', icon: Icons.Star, color: 'warning' },
]

const progressStats = [
  { label: 'Customer Satisfaction', value: '98%', progress: 98, color: 'success' },
  { label: 'Productivity Increase', value: '45%', progress: 45, color: 'primary' },
  { label: 'Time Saved', value: '60%', progress: 60, color: 'info' },
  { label: 'Cost Reduction', value: '35%', progress: 35, color: 'warning' },
]

const trendStats = [
  { value: '$2.4M', label: 'Revenue', trend: 12.5 },
  { value: '45K', label: 'New Users', trend: 8.3 },
  { value: '92%', label: 'Retention', trend: 2.1 },
  { value: '1.2M', label: 'API Calls', trend: -3.2 },
]
</script>
