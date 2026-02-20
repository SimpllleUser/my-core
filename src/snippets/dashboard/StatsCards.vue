<!--
  Snippet: Stats Cards
  Description: Collection of various stat card styles for dashboards
  Components: VCard, VRow, VCol, VIcon, VProgressCircular, VProgressLinear, VSparkline
  Variants: Multiple card styles included
-->
<script setup lang="ts">
import { Icons } from '../../shared/model'
const simpleStats = [
  { title: 'Total Users', value: '24,532', icon: Icons.AccountGroup, color: 'primary' },
  { title: 'Revenue', value: '$45,678', icon: Icons.CurrencyUsd, color: 'success' },
  { title: 'Orders', value: '1,234', icon: Icons.Cart, color: 'secondary' },
  { title: 'Visitors', value: '89,124', icon: Icons.Eye, color: 'warning' },
]

const trendStats = [
  { title: 'Sales', value: '$12,628', trend: 12.5, icon: Icons.TrendingUp, color: 'success' },
  { title: 'Expenses', value: '$8,234', trend: -5.2, icon: Icons.TrendingDown, color: 'error' },
  { title: 'Profit', value: '$4,394', trend: 23.1, icon: Icons.ChartLine, color: 'primary' },
  { title: 'Customers', value: '1,892', trend: 8.4, icon: Icons.AccountMultiple, color: 'info' },
]

const progressStats = [
  { title: 'Storage Used', value: '75 GB', progress: 75, color: 'primary' },
  { title: 'Tasks Done', value: '32/50', progress: 64, color: 'success' },
  { title: 'Budget Spent', value: '$8.5k', progress: 85, color: 'warning' },
  { title: 'Goals Met', value: '12/15', progress: 80, color: 'secondary' },
]

const coloredStats = [
  { title: 'Total Revenue', value: '$45,678', subtitle: '+12.5% from last month', icon: Icons.CashMultiple, color: 'primary' },
  { title: 'Active Users', value: '2,345', subtitle: '321 new this week', icon: Icons.AccountCheck, color: 'success' },
  { title: 'Pending Orders', value: '45', subtitle: '12 need attention', icon: Icons.ClockOutline, color: 'warning' },
  { title: 'Support Tickets', value: '23', subtitle: '5 unresolved', icon: Icons.Ticket, color: 'secondary' },
]

const sparklineStats = [
  { title: 'Weekly Sales', value: '$7,234', trend: 12.5, sparkline: [5, 10, 5, 12, 8, 15, 10], color: 'primary' },
  { title: 'Page Views', value: '24.5k', trend: -3.2, sparkline: [12, 8, 15, 10, 5, 10, 5], color: 'error' },
  { title: 'Orders', value: '456', trend: 8.1, sparkline: [3, 5, 8, 4, 6, 10, 12], color: 'success' },
  { title: 'Conversions', value: '3.2%', trend: 15.3, sparkline: [2, 4, 3, 6, 5, 8, 9], color: 'secondary' },
]

const compactStats = [
  { title: 'Users', value: '2.4k', icon: Icons.Account, color: 'primary' },
  { title: 'Sales', value: '$12k', icon: Icons.Cash, color: 'success' },
  { title: 'Orders', value: '456', icon: Icons.Cart, color: 'warning' },
  { title: 'Views', value: '89k', icon: Icons.Eye, color: 'info' },
  { title: 'Likes', value: '1.2k', icon: Icons.Heart, color: 'error' },
  { title: 'Comments', value: '234', icon: Icons.Comment, color: 'secondary' },
]
</script>
<template>
  <VContainer fluid>
    <h2 class="text-h5 font-weight-bold mb-6">Stats Cards Collection</h2>

    <!-- Style 1: Simple Stats -->
    <h3 class="text-subtitle-1 font-weight-medium text-medium-emphasis mb-3">Simple Stats</h3>
    <VRow class="mb-8">
      <VCol v-for="stat in simpleStats" :key="stat.title" cols="12" sm="6" md="3">
        <VCard>
          <VCardText class="d-flex justify-space-between align-center">
            <div>
              <p class="text-medium-emphasis text-body-2 mb-1">{{ stat.title }}</p>
              <h3 class="text-h4 font-weight-bold">{{ stat.value }}</h3>
            </div>
            <VAvatar :color="stat.color" size="56" rounded="lg">
              <VIcon color="white" size="28">{{ stat.icon }}</VIcon>
            </VAvatar>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Style 2: Stats with Trend -->
    <h3 class="text-subtitle-1 font-weight-medium text-medium-emphasis mb-3">Stats with Trend</h3>
    <VRow class="mb-8">
      <VCol v-for="stat in trendStats" :key="stat.title" cols="12" sm="6" md="3">
        <VCard>
          <VCardText>
            <div class="d-flex align-center mb-2">
              <VIcon :color="stat.color" class="mr-2">{{ stat.icon }}</VIcon>
              <span class="text-medium-emphasis">{{ stat.title }}</span>
            </div>
            <h3 class="text-h4 font-weight-bold mb-2">{{ stat.value }}</h3>
            <div class="d-flex align-center">
              <VChip
                :color="stat.trend > 0 ? 'success' : 'error'"
                size="small"
                variant="tonal"
                class="mr-2"
              >
                <VIcon start size="small">
                  {{ stat.trend > 0 ? Icons.ArrowUp : Icons.ArrowDown }}
                </VIcon>
                {{ Math.abs(stat.trend) }}%
              </VChip>
              <span class="text-caption text-medium-emphasis">vs last month</span>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Style 3: Stats with Progress -->
    <h3 class="text-subtitle-1 font-weight-medium text-medium-emphasis mb-3">Stats with Progress</h3>
    <VRow class="mb-8">
      <VCol v-for="stat in progressStats" :key="stat.title" cols="12" sm="6" md="3">
        <VCard>
          <VCardText>
            <div class="d-flex justify-space-between align-center mb-4">
              <div>
                <p class="text-medium-emphasis text-body-2 mb-1">{{ stat.title }}</p>
                <h3 class="text-h4 font-weight-bold">{{ stat.value }}</h3>
              </div>
              <VProgressCircular
                :model-value="stat.progress"
                :color="stat.color"
                :size="60"
                :width="6"
              >
                <span class="text-caption font-weight-medium">{{ stat.progress }}%</span>
              </VProgressCircular>
            </div>
            <VProgressLinear
              :model-value="stat.progress"
              :color="stat.color"
              rounded
              height="8"
            />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Style 4: Colored Background Cards -->
    <h3 class="text-subtitle-1 font-weight-medium text-medium-emphasis mb-3">Colored Cards</h3>
    <VRow class="mb-8">
      <VCol v-for="stat in coloredStats" :key="stat.title" cols="12" sm="6" md="3">
        <VCard :color="stat.color">
          <VCardText class="text-white">
            <div class="d-flex justify-space-between align-start">
              <div>
                <p class="text-white-darken-1 text-body-2 mb-1">{{ stat.title }}</p>
                <h3 class="text-h4 font-weight-bold">{{ stat.value }}</h3>
                <p class="text-white-darken-1 text-body-2 mt-2">{{ stat.subtitle }}</p>
              </div>
              <VIcon size="48" class="text-white-darken-1">{{ stat.icon }}</VIcon>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Style 5: Stats with Mini Chart -->
    <h3 class="text-subtitle-1 font-weight-medium text-medium-emphasis mb-3">Stats with Sparkline</h3>
    <VRow class="mb-8">
      <VCol v-for="stat in sparklineStats" :key="stat.title" cols="12" sm="6" md="3">
        <VCard>
          <VCardText>
            <div class="d-flex justify-space-between align-center mb-2">
              <span class="text-medium-emphasis">{{ stat.title }}</span>
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
              :model-value="stat.sparkline"
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

    <!-- Style 6: Compact Stats -->
    <h3 class="text-subtitle-1 font-weight-medium text-medium-emphasis mb-3">Compact Stats</h3>
    <VRow>
      <VCol v-for="stat in compactStats" :key="stat.title" cols="6" sm="4" md="2">
        <VCard variant="tonal" :color="stat.color">
          <VCardText class="text-center pa-4">
            <VIcon :color="stat.color" size="32" class="mb-2">{{ stat.icon }}</VIcon>
            <h4 class="text-h5 font-weight-bold">{{ stat.value }}</h4>
            <p class="text-caption text-medium-emphasis mb-0">{{ stat.title }}</p>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
