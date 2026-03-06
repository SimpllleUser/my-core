<!--
  Snippet: Stats Cards
  Description: Collection of various stat card styles for dashboards
  Components: DashboardStatCard, TrendStatCard, ProgressStatCard,
              ColoredStatCard, SparklineStatCard, CompactStatCard
  Variants: Multiple card styles included
-->
<script setup lang="ts">
import { Icons } from '../../shared/model'
import DashboardStatCard from '../../shared/ui/snippets/DashboardStatCard.vue'
import TrendStatCard from '../../shared/ui/snippets/TrendStatCard.vue'
import ProgressStatCard from '../../shared/ui/snippets/ProgressStatCard.vue'
import ColoredStatCard from '../../shared/ui/snippets/ColoredStatCard.vue'
import SparklineStatCard from '../../shared/ui/snippets/SparklineStatCard.vue'
import CompactStatCard from '../../shared/ui/snippets/CompactStatCard.vue'

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
        <DashboardStatCard
          :title="stat.title"
          :value="stat.value"
          :icon="stat.icon"
          :color="stat.color"
        />
      </VCol>
    </VRow>

    <!-- Style 2: Stats with Trend -->
    <h3 class="text-subtitle-1 font-weight-medium text-medium-emphasis mb-3">Stats with Trend</h3>
    <VRow class="mb-8">
      <VCol v-for="stat in trendStats" :key="stat.title" cols="12" sm="6" md="3">
        <TrendStatCard
          :title="stat.title"
          :value="stat.value"
          :trend="stat.trend"
          :icon="stat.icon"
          :color="stat.color"
        />
      </VCol>
    </VRow>

    <!-- Style 3: Stats with Progress -->
    <h3 class="text-subtitle-1 font-weight-medium text-medium-emphasis mb-3">Stats with Progress</h3>
    <VRow class="mb-8">
      <VCol v-for="stat in progressStats" :key="stat.title" cols="12" sm="6" md="3">
        <ProgressStatCard
          :title="stat.title"
          :value="stat.value"
          :progress="stat.progress"
          :color="stat.color"
        />
      </VCol>
    </VRow>

    <!-- Style 4: Colored Background Cards -->
    <h3 class="text-subtitle-1 font-weight-medium text-medium-emphasis mb-3">Colored Cards</h3>
    <VRow class="mb-8">
      <VCol v-for="stat in coloredStats" :key="stat.title" cols="12" sm="6" md="3">
        <ColoredStatCard
          :title="stat.title"
          :value="stat.value"
          :subtitle="stat.subtitle"
          :icon="stat.icon"
          :color="stat.color"
        />
      </VCol>
    </VRow>

    <!-- Style 5: Stats with Sparkline -->
    <h3 class="text-subtitle-1 font-weight-medium text-medium-emphasis mb-3">Stats with Sparkline</h3>
    <VRow class="mb-8">
      <VCol v-for="stat in sparklineStats" :key="stat.title" cols="12" sm="6" md="3">
        <SparklineStatCard
          :title="stat.title"
          :value="stat.value"
          :trend="stat.trend"
          :sparkline="stat.sparkline"
          :color="stat.color"
        />
      </VCol>
    </VRow>

    <!-- Style 6: Compact Stats -->
    <h3 class="text-subtitle-1 font-weight-medium text-medium-emphasis mb-3">Compact Stats</h3>
    <VRow>
      <VCol v-for="stat in compactStats" :key="stat.title" cols="6" sm="4" md="2">
        <CompactStatCard
          :title="stat.title"
          :value="stat.value"
          :icon="stat.icon"
          :color="stat.color"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>
