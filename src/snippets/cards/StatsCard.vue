<!--
  Snippet: Stats Card
  Description: Statistics display cards with various styles
  Components: VCard, VIcon, VProgressLinear, VProgressCircular, VSparkline
  Variants: Simple, With Trend, With Progress, Colored
-->
<template>
  <VContainer fluid>
    <h2 class="text-h5 font-weight-bold mb-6">Stats Card Variants</h2>

    <!-- Simple Stats -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Simple Stats</h3>
    <VRow class="mb-8">
      <VCol v-for="stat in simpleStats" :key="stat.title" cols="12" sm="6" md="3">
        <VCard>
          <VCardText class="d-flex justify-space-between align-center">
            <div>
              <p class="text-caption text-medium-emphasis mb-1">{{ stat.title }}</p>
              <h3 class="text-h4 font-weight-bold">{{ stat.value }}</h3>
            </div>
            <VAvatar :color="stat.color" size="48" rounded="lg">
              <VIcon color="white">{{ stat.icon }}</VIcon>
            </VAvatar>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Stats with Trend -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">With Trend</h3>
    <VRow class="mb-8">
      <VCol v-for="stat in trendStats" :key="stat.title" cols="12" sm="6" md="3">
        <VCard>
          <VCardText>
            <div class="d-flex justify-space-between align-center mb-2">
              <span class="text-body-2 text-medium-emphasis">{{ stat.title }}</span>
              <VIcon :color="stat.color">{{ stat.icon }}</VIcon>
            </div>
            <h3 class="text-h4 font-weight-bold mb-2">{{ stat.value }}</h3>
            <div class="d-flex align-center">
              <VChip
                :color="stat.trend > 0 ? 'success' : 'error'"
                size="x-small"
                variant="tonal"
              >
                <VIcon start size="small">
                  {{ stat.trend > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
                </VIcon>
                {{ Math.abs(stat.trend) }}%
              </VChip>
              <span class="text-caption text-medium-emphasis ml-2">vs last month</span>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Stats with Progress -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">With Progress</h3>
    <VRow class="mb-8">
      <VCol v-for="stat in progressStats" :key="stat.title" cols="12" sm="6" md="3">
        <VCard>
          <VCardText>
            <div class="d-flex justify-space-between align-center mb-4">
              <div>
                <p class="text-caption text-medium-emphasis mb-1">{{ stat.title }}</p>
                <h3 class="text-h5 font-weight-bold">{{ stat.value }}</h3>
              </div>
              <VProgressCircular
                :model-value="stat.progress"
                :color="stat.color"
                :size="50"
                :width="5"
              >
                <span class="text-caption">{{ stat.progress }}%</span>
              </VProgressCircular>
            </div>
            <VProgressLinear
              :model-value="stat.progress"
              :color="stat.color"
              rounded
              height="6"
            />
            <p class="text-caption text-medium-emphasis mt-2">{{ stat.subtitle }}</p>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Colored Background Stats -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Colored Background</h3>
    <VRow class="mb-8">
      <VCol v-for="stat in coloredStats" :key="stat.title" cols="12" sm="6" md="3">
        <VCard :color="stat.color">
          <VCardText class="text-white">
            <div class="d-flex justify-space-between align-start">
              <div>
                <p class="text-white-darken-1 text-body-2 mb-1">{{ stat.title }}</p>
                <h3 class="text-h4 font-weight-bold">{{ stat.value }}</h3>
                <p class="text-white-darken-1 text-caption mt-2">{{ stat.subtitle }}</p>
              </div>
              <VIcon size="48" class="text-white-darken-1">{{ stat.icon }}</VIcon>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Stats with Sparkline -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">With Sparkline</h3>
    <VRow class="mb-8">
      <VCol v-for="stat in sparklineStats" :key="stat.title" cols="12" sm="6" md="3">
        <VCard>
          <VCardText>
            <div class="d-flex justify-space-between align-center mb-1">
              <span class="text-body-2 text-medium-emphasis">{{ stat.title }}</span>
              <VChip
                :color="stat.trend > 0 ? 'success' : 'error'"
                size="x-small"
                variant="tonal"
              >
                {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
              </VChip>
            </div>
            <h3 class="text-h4 font-weight-bold">{{ stat.value }}</h3>
            <VSparkline
              :model-value="stat.data"
              :color="stat.color"
              :line-width="2"
              :padding="8"
              smooth
              auto-draw
            />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Compact Stats Row -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Compact Row</h3>
    <VCard class="mb-8">
      <VCardText>
        <VRow>
          <VCol v-for="(stat, index) in compactStats" :key="stat.title" cols="6" sm="4" md="2">
            <div class="text-center" :class="{ 'border-e': index < compactStats.length - 1 }">
              <VIcon :color="stat.color" size="32" class="mb-2">{{ stat.icon }}</VIcon>
              <h4 class="text-h5 font-weight-bold">{{ stat.value }}</h4>
              <p class="text-caption text-medium-emphasis mb-0">{{ stat.title }}</p>
            </div>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <!-- Large Feature Stats -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Feature Stats</h3>
    <VRow>
      <VCol v-for="stat in featureStats" :key="stat.title" cols="12" md="4">
        <VCard variant="tonal" :color="stat.color">
          <VCardText class="pa-6">
            <div class="d-flex align-center mb-4">
              <VAvatar :color="stat.color" size="56" rounded="lg">
                <VIcon color="white" size="28">{{ stat.icon }}</VIcon>
              </VAvatar>
              <div class="ml-4">
                <h3 class="text-h3 font-weight-bold">{{ stat.value }}</h3>
                <p class="text-body-1 mb-0">{{ stat.title }}</p>
              </div>
            </div>
            <p class="text-body-2 text-medium-emphasis mb-0">{{ stat.description }}</p>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
const simpleStats = [
  { title: 'Total Users', value: '24,532', icon: 'mdi-account-group', color: 'primary' },
  { title: 'Revenue', value: '$45,678', icon: 'mdi-currency-usd', color: 'success' },
  { title: 'Orders', value: '1,234', icon: 'mdi-cart', color: 'warning' },
  { title: 'Visitors', value: '89.1K', icon: 'mdi-eye', color: 'info' },
]

const trendStats = [
  { title: 'Total Sales', value: '$12,628', trend: 12.5, icon: 'mdi-chart-line', color: 'primary' },
  { title: 'Expenses', value: '$8,234', trend: -5.2, icon: 'mdi-cash-minus', color: 'error' },
  { title: 'Profit', value: '$4,394', trend: 23.1, icon: 'mdi-trending-up', color: 'success' },
  { title: 'Customers', value: '1,892', trend: 8.4, icon: 'mdi-account-multiple', color: 'info' },
]

const progressStats = [
  { title: 'Storage Used', value: '75 GB', progress: 75, color: 'primary', subtitle: '100 GB total' },
  { title: 'Tasks Done', value: '32/50', progress: 64, color: 'success', subtitle: '18 remaining' },
  { title: 'Budget Spent', value: '$8.5k', progress: 85, color: 'warning', subtitle: '$10k budget' },
  { title: 'Goals Met', value: '12/15', progress: 80, color: 'info', subtitle: '3 in progress' },
]

const coloredStats = [
  { title: 'Total Revenue', value: '$45,678', subtitle: '+12.5% from last month', icon: 'mdi-cash-multiple', color: 'primary' },
  { title: 'Active Users', value: '2,345', subtitle: '321 new this week', icon: 'mdi-account-check', color: 'success' },
  { title: 'Pending Orders', value: '45', subtitle: '12 need attention', icon: 'mdi-clock-outline', color: 'warning' },
  { title: 'Support Tickets', value: '23', subtitle: '5 unresolved', icon: 'mdi-ticket', color: 'error' },
]

const sparklineStats = [
  { title: 'Weekly Sales', value: '$7,234', trend: 12.5, data: [5, 10, 5, 12, 8, 15, 10], color: 'primary' },
  { title: 'Page Views', value: '24.5k', trend: -3.2, data: [12, 8, 15, 10, 5, 10, 5], color: 'error' },
  { title: 'Orders', value: '456', trend: 8.1, data: [3, 5, 8, 4, 6, 10, 12], color: 'success' },
  { title: 'Conversions', value: '3.2%', trend: 15.3, data: [2, 4, 3, 6, 5, 8, 9], color: 'warning' },
]

const compactStats = [
  { title: 'Users', value: '2.4k', icon: 'mdi-account', color: 'primary' },
  { title: 'Sales', value: '$12k', icon: 'mdi-cash', color: 'success' },
  { title: 'Orders', value: '456', icon: 'mdi-cart', color: 'warning' },
  { title: 'Views', value: '89k', icon: 'mdi-eye', color: 'info' },
  { title: 'Likes', value: '1.2k', icon: 'mdi-heart', color: 'error' },
  { title: 'Comments', value: '234', icon: 'mdi-comment', color: 'secondary' },
]

const featureStats = [
  { title: 'Total Downloads', value: '1.2M', icon: 'mdi-download', color: 'primary', description: 'Downloads across all platforms in the last 30 days' },
  { title: 'Active Sessions', value: '8,456', icon: 'mdi-account-multiple', color: 'success', description: 'Users currently active on the platform' },
  { title: 'Response Time', value: '45ms', icon: 'mdi-lightning-bolt', color: 'warning', description: 'Average API response time this week' },
]
</script>
