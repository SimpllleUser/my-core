<!--
  Snippet: Stats Cards
  Description: Collection of various stat card styles for dashboards
  Components: VCard, VRow, VCol, VIcon, VProgressCircular, VProgressLinear, VSparkline
  Variants: Multiple card styles included
-->
<template>
  <v-container fluid>
    <h2 class="text-h5 font-weight-bold mb-6">Stats Cards Collection</h2>

    <!-- Style 1: Simple Stats -->
    <h3 class="text-subtitle-1 font-weight-medium text-medium-emphasis mb-3">Simple Stats</h3>
    <v-row class="mb-8">
      <v-col v-for="stat in simpleStats" :key="stat.title" cols="12" sm="6" md="3">
        <v-card>
          <v-card-text class="d-flex justify-space-between align-center">
            <div>
              <p class="text-medium-emphasis text-body-2 mb-1">{{ stat.title }}</p>
              <h3 class="text-h4 font-weight-bold">{{ stat.value }}</h3>
            </div>
            <v-avatar :color="stat.color" size="56" rounded="lg">
              <v-icon color="white" size="28">{{ stat.icon }}</v-icon>
            </v-avatar>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Style 2: Stats with Trend -->
    <h3 class="text-subtitle-1 font-weight-medium text-medium-emphasis mb-3">Stats with Trend</h3>
    <v-row class="mb-8">
      <v-col v-for="stat in trendStats" :key="stat.title" cols="12" sm="6" md="3">
        <v-card>
          <v-card-text>
            <div class="d-flex align-center mb-2">
              <v-icon :color="stat.color" class="mr-2">{{ stat.icon }}</v-icon>
              <span class="text-medium-emphasis">{{ stat.title }}</span>
            </div>
            <h3 class="text-h4 font-weight-bold mb-2">{{ stat.value }}</h3>
            <div class="d-flex align-center">
              <v-chip
                :color="stat.trend > 0 ? 'success' : 'error'"
                size="small"
                variant="tonal"
                class="mr-2"
              >
                <v-icon start size="small">
                  {{ stat.trend > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
                </v-icon>
                {{ Math.abs(stat.trend) }}%
              </v-chip>
              <span class="text-caption text-medium-emphasis">vs last month</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Style 3: Stats with Progress -->
    <h3 class="text-subtitle-1 font-weight-medium text-medium-emphasis mb-3">Stats with Progress</h3>
    <v-row class="mb-8">
      <v-col v-for="stat in progressStats" :key="stat.title" cols="12" sm="6" md="3">
        <v-card>
          <v-card-text>
            <div class="d-flex justify-space-between align-center mb-4">
              <div>
                <p class="text-medium-emphasis text-body-2 mb-1">{{ stat.title }}</p>
                <h3 class="text-h4 font-weight-bold">{{ stat.value }}</h3>
              </div>
              <v-progress-circular
                :model-value="stat.progress"
                :color="stat.color"
                :size="60"
                :width="6"
              >
                <span class="text-caption font-weight-medium">{{ stat.progress }}%</span>
              </v-progress-circular>
            </div>
            <v-progress-linear
              :model-value="stat.progress"
              :color="stat.color"
              rounded
              height="8"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Style 4: Colored Background Cards -->
    <h3 class="text-subtitle-1 font-weight-medium text-medium-emphasis mb-3">Colored Cards</h3>
    <v-row class="mb-8">
      <v-col v-for="stat in coloredStats" :key="stat.title" cols="12" sm="6" md="3">
        <v-card :color="stat.color">
          <v-card-text class="text-white">
            <div class="d-flex justify-space-between align-start">
              <div>
                <p class="text-white-darken-1 text-body-2 mb-1">{{ stat.title }}</p>
                <h3 class="text-h4 font-weight-bold">{{ stat.value }}</h3>
                <p class="text-white-darken-1 text-body-2 mt-2">{{ stat.subtitle }}</p>
              </div>
              <v-icon size="48" class="text-white-darken-1">{{ stat.icon }}</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Style 5: Stats with Mini Chart -->
    <h3 class="text-subtitle-1 font-weight-medium text-medium-emphasis mb-3">Stats with Sparkline</h3>
    <v-row class="mb-8">
      <v-col v-for="stat in sparklineStats" :key="stat.title" cols="12" sm="6" md="3">
        <v-card>
          <v-card-text>
            <div class="d-flex justify-space-between align-center mb-2">
              <span class="text-medium-emphasis">{{ stat.title }}</span>
              <v-chip
                :color="stat.trend > 0 ? 'success' : 'error'"
                size="x-small"
                variant="tonal"
              >
                {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
              </v-chip>
            </div>
            <h3 class="text-h4 font-weight-bold">{{ stat.value }}</h3>
            <v-sparkline
              :model-value="stat.sparkline"
              :color="stat.color"
              :line-width="2"
              :padding="8"
              smooth
              auto-draw
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Style 6: Compact Stats -->
    <h3 class="text-subtitle-1 font-weight-medium text-medium-emphasis mb-3">Compact Stats</h3>
    <v-row>
      <v-col v-for="stat in compactStats" :key="stat.title" cols="6" sm="4" md="2">
        <v-card variant="tonal" :color="stat.color">
          <v-card-text class="text-center pa-4">
            <v-icon :color="stat.color" size="32" class="mb-2">{{ stat.icon }}</v-icon>
            <h4 class="text-h5 font-weight-bold">{{ stat.value }}</h4>
            <p class="text-caption text-medium-emphasis mb-0">{{ stat.title }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const simpleStats = [
  { title: 'Total Users', value: '24,532', icon: 'mdi-account-group', color: 'primary' },
  { title: 'Revenue', value: '$45,678', icon: 'mdi-currency-usd', color: 'success' },
  { title: 'Orders', value: '1,234', icon: 'mdi-cart', color: 'secondary' },
  { title: 'Visitors', value: '89,124', icon: 'mdi-eye', color: 'warning' },
]

const trendStats = [
  { title: 'Sales', value: '$12,628', trend: 12.5, icon: 'mdi-trending-up', color: 'success' },
  { title: 'Expenses', value: '$8,234', trend: -5.2, icon: 'mdi-trending-down', color: 'error' },
  { title: 'Profit', value: '$4,394', trend: 23.1, icon: 'mdi-chart-line', color: 'primary' },
  { title: 'Customers', value: '1,892', trend: 8.4, icon: 'mdi-account-multiple', color: 'info' },
]

const progressStats = [
  { title: 'Storage Used', value: '75 GB', progress: 75, color: 'primary' },
  { title: 'Tasks Done', value: '32/50', progress: 64, color: 'success' },
  { title: 'Budget Spent', value: '$8.5k', progress: 85, color: 'warning' },
  { title: 'Goals Met', value: '12/15', progress: 80, color: 'secondary' },
]

const coloredStats = [
  { title: 'Total Revenue', value: '$45,678', subtitle: '+12.5% from last month', icon: 'mdi-cash-multiple', color: 'primary' },
  { title: 'Active Users', value: '2,345', subtitle: '321 new this week', icon: 'mdi-account-check', color: 'success' },
  { title: 'Pending Orders', value: '45', subtitle: '12 need attention', icon: 'mdi-clock-outline', color: 'warning' },
  { title: 'Support Tickets', value: '23', subtitle: '5 unresolved', icon: 'mdi-ticket', color: 'secondary' },
]

const sparklineStats = [
  { title: 'Weekly Sales', value: '$7,234', trend: 12.5, sparkline: [5, 10, 5, 12, 8, 15, 10], color: 'primary' },
  { title: 'Page Views', value: '24.5k', trend: -3.2, sparkline: [12, 8, 15, 10, 5, 10, 5], color: 'error' },
  { title: 'Orders', value: '456', trend: 8.1, sparkline: [3, 5, 8, 4, 6, 10, 12], color: 'success' },
  { title: 'Conversions', value: '3.2%', trend: 15.3, sparkline: [2, 4, 3, 6, 5, 8, 9], color: 'secondary' },
]

const compactStats = [
  { title: 'Users', value: '2.4k', icon: 'mdi-account', color: 'primary' },
  { title: 'Sales', value: '$12k', icon: 'mdi-cash', color: 'success' },
  { title: 'Orders', value: '456', icon: 'mdi-cart', color: 'warning' },
  { title: 'Views', value: '89k', icon: 'mdi-eye', color: 'info' },
  { title: 'Likes', value: '1.2k', icon: 'mdi-heart', color: 'error' },
  { title: 'Comments', value: '234', icon: 'mdi-comment', color: 'secondary' },
]
</script>
