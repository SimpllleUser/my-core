<!--
  Snippet: Analytics Overview
  Description: Dashboard with charts, stats, and recent activity
  Components: DashboardPageHeader, DashboardStatCard, AnalyticsTrafficCard,
              AnalyticsSourcesCard, AnalyticsActivityCard, AnalyticsTopPagesCard
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<script setup lang="ts">
import { Icons } from '../../shared/model'
import { ref } from 'vue'
import DashboardPageHeader from '../../shared/ui/snippets/DashboardPageHeader.vue'
import DashboardStatCard from '../../shared/ui/snippets/DashboardStatCard.vue'
import AnalyticsTrafficCard from './AnalyticsTrafficCard.vue'
import AnalyticsSourcesCard from './AnalyticsSourcesCard.vue'
import AnalyticsActivityCard from './AnalyticsActivityCard.vue'
import AnalyticsTopPagesCard from './AnalyticsTopPagesCard.vue'

const period = ref('30d')

const stats = [
  { title: 'Total Visitors', value: '24,532', trend: 12.5, icon: Icons.AccountGroup, color: 'primary' },
  { title: 'Page Views', value: '89,124', trend: 8.2, icon: Icons.Eye, color: 'secondary' },
  { title: 'Bounce Rate', value: '42.3%', trend: -5.1, icon: Icons.ExitRun, color: 'warning' },
  { title: 'Avg. Session', value: '4m 32s', trend: 15.8, icon: Icons.ClockOutline, color: 'success' },
]

const trafficSources = [
  { name: 'Organic Search', visits: 12453, percentage: 45, icon: Icons.Google, color: 'primary' },
  { name: 'Direct', visits: 8234, percentage: 30, icon: Icons.CursorClick, color: 'success' },
  { name: 'Social Media', visits: 4123, percentage: 15, icon: Icons.Share, color: 'secondary' },
  { name: 'Referral', visits: 2745, percentage: 10, icon: Icons.LinkVariant, color: 'warning' },
]

const recentActivity = [
  { id: 1, title: 'New user registered', description: 'John Doe created an account', time: '2 min ago', icon: Icons.AccountPlus, color: 'success' },
  { id: 2, title: 'Order completed', description: 'Order #12345 was completed', time: '15 min ago', icon: Icons.CheckCircle, color: 'primary' },
  { id: 3, title: 'Payment received', description: '$450.00 from customer', time: '1 hour ago', icon: Icons.Cash, color: 'success' },
  { id: 4, title: 'New comment', description: 'On "Getting Started" article', time: '2 hours ago', icon: Icons.Comment, color: 'info' },
  { id: 5, title: 'Server alert', description: 'High CPU usage detected', time: '3 hours ago', icon: Icons.Alert, color: 'warning' },
]

const topPages = [
  { path: '/home', views: 12453, bounceRate: 32 },
  { path: '/products', views: 8234, bounceRate: 45 },
  { path: '/about', views: 4123, bounceRate: 55 },
  { path: '/contact', views: 2745, bounceRate: 38 },
  { path: '/blog', views: 1892, bounceRate: 62 },
]
</script>

<template>
  <VContainer fluid>
    <DashboardPageHeader
      title="Analytics Overview"
      subtitle="Welcome back! Here's what's happening today."
    >
      <VBtnGroup variant="outlined" density="comfortable">
        <VBtn :variant="period === '7d' ? 'flat' : 'outlined'" @click="period = '7d'">7 Days</VBtn>
        <VBtn :variant="period === '30d' ? 'flat' : 'outlined'" @click="period = '30d'">30 Days</VBtn>
        <VBtn :variant="period === '90d' ? 'flat' : 'outlined'" @click="period = '90d'">90 Days</VBtn>
      </VBtnGroup>
    </DashboardPageHeader>

    <VRow class="mb-6">
      <VCol v-for="stat in stats" :key="stat.title" cols="12" sm="6" lg="3">
        <DashboardStatCard
          :title="stat.title"
          :value="stat.value"
          :trend="stat.trend"
          trend-label="vs last period"
          :icon="stat.icon"
          :color="stat.color"
        />
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="12" lg="8">
        <AnalyticsTrafficCard :trend="12.5" />
      </VCol>
      <VCol cols="12" lg="4">
        <AnalyticsSourcesCard :sources="trafficSources" />
      </VCol>
    </VRow>

    <VRow class="mt-4">
      <VCol cols="12" lg="6">
        <AnalyticsActivityCard :activities="recentActivity" />
      </VCol>
      <VCol cols="12" lg="6">
        <AnalyticsTopPagesCard :pages="topPages" />
      </VCol>
    </VRow>
  </VContainer>
</template>
