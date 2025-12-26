<!--
  Snippet: Analytics Overview
  Description: Dashboard with charts, stats, and recent activity
  Components: VCard, VRow, VCol, VList, VListItem, VIcon, VChip, VProgressLinear
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <VContainer fluid>
    <!-- Header -->
    <div class="d-flex justify-space-between align-center mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold">Analytics Overview</h1>
        <p class="text-medium-emphasis">Welcome back! Here's what's happening today.</p>
      </div>
      <VBtnGroup variant="outlined" density="comfortable">
        <VBtn :variant="period === '7d' ? 'flat' : 'outlined'" @click="period = '7d'">7 Days</VBtn>
        <VBtn :variant="period === '30d' ? 'flat' : 'outlined'" @click="period = '30d'">30 Days</VBtn>
        <VBtn :variant="period === '90d' ? 'flat' : 'outlined'" @click="period = '90d'">90 Days</VBtn>
      </VBtnGroup>
    </div>

    <!-- Stats Cards -->
    <VRow class="mb-6">
      <VCol v-for="stat in stats" :key="stat.title" cols="12" sm="6" lg="3">
        <VCard>
          <VCardText>
            <div class="d-flex justify-space-between align-start">
              <div>
                <p class="text-medium-emphasis text-body-2 mb-1">{{ stat.title }}</p>
                <h3 class="text-h4 font-weight-bold">{{ stat.value }}</h3>
                <div class="d-flex align-center mt-2">
                  <VIcon
                    :color="stat.trend > 0 ? 'success' : 'error'"
                    size="small"
                  >
                    {{ stat.trend > 0 ? 'mdi-trending-up' : 'mdi-trending-down' }}
                  </VIcon>
                  <span
                    :class="stat.trend > 0 ? 'text-success' : 'text-error'"
                    class="text-body-2 ml-1"
                  >
                    {{ Math.abs(stat.trend) }}%
                  </span>
                  <span class="text-medium-emphasis text-body-2 ml-1">vs last period</span>
                </div>
              </div>
              <VAvatar :color="stat.color" size="48" rounded>
                <VIcon color="white">{{ stat.icon }}</VIcon>
              </VAvatar>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VRow>
      <!-- Traffic Chart Placeholder -->
      <VCol cols="12" lg="8">
        <VCard>
          <VCardTitle class="d-flex justify-space-between align-center">
            <span>Traffic Overview</span>
            <VChip size="small" color="success" variant="tonal">
              <VIcon start size="small">mdi-arrow-up</VIcon>
              +12.5%
            </VChip>
          </VCardTitle>
          <VCardText>
            <!-- Chart Placeholder -->
            <div class="chart-placeholder d-flex align-center justify-center rounded-lg" style="height: 300px; background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);">
              <div class="text-center">
                <VIcon size="64" color="primary" class="mb-2">mdi-chart-line</VIcon>
                <p class="text-medium-emphasis">Chart component goes here</p>
                <p class="text-caption text-medium-emphasis">Use your preferred chart library (Chart.js, ApexCharts, etc.)</p>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Traffic Sources -->
      <VCol cols="12" lg="4">
        <VCard>
          <VCardTitle>Traffic Sources</VCardTitle>
          <VCardText>
            <VList>
              <VListItem
                v-for="source in trafficSources"
                :key="source.name"
                class="px-0"
              >
                <template #prepend>
                  <VAvatar :color="source.color" size="36" rounded>
                    <VIcon color="white" size="small">{{ source.icon }}</VIcon>
                  </VAvatar>
                </template>
                <VListItemTitle>{{ source.name }}</VListItemTitle>
                <VListItemSubtitle>{{ source.visits }} visits</VListItemSubtitle>
                <template #append>
                  <span class="font-weight-medium">{{ source.percentage }}%</span>
                </template>
              </VListItem>
            </VList>

            <VDivider class="my-4" />

            <!-- Progress bars -->
            <div v-for="source in trafficSources" :key="source.name + '-progress'" class="mb-3">
              <div class="d-flex justify-space-between mb-1">
                <span class="text-body-2">{{ source.name }}</span>
                <span class="text-body-2">{{ source.percentage }}%</span>
              </div>
              <VProgressLinear
                :model-value="source.percentage"
                :color="source.color"
                rounded
                height="6"
              />
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VRow class="mt-4">
      <!-- Recent Activity -->
      <VCol cols="12" lg="6">
        <VCard>
          <VCardTitle class="d-flex justify-space-between align-center">
            <span>Recent Activity</span>
            <VBtn variant="text" size="small" color="primary">View All</VBtn>
          </VCardTitle>
          <VCardText class="pa-0">
            <VList lines="two">
              <VListItem
                v-for="activity in recentActivity"
                :key="activity.id"
              >
                <template #prepend>
                  <VAvatar :color="activity.color" size="40">
                    <VIcon color="white" size="small">{{ activity.icon }}</VIcon>
                  </VAvatar>
                </template>
                <VListItemTitle>{{ activity.title }}</VListItemTitle>
                <VListItemSubtitle>{{ activity.description }}</VListItemSubtitle>
                <template #append>
                  <span class="text-caption text-medium-emphasis">{{ activity.time }}</span>
                </template>
              </VListItem>
            </VList>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Top Pages -->
      <VCol cols="12" lg="6">
        <VCard>
          <VCardTitle class="d-flex justify-space-between align-center">
            <span>Top Pages</span>
            <VBtn variant="text" size="small" color="primary">View All</VBtn>
          </VCardTitle>
          <VCardText class="pa-0">
            <VTable>
              <thead>
                <tr>
                  <th class="text-left">Page</th>
                  <th class="text-right">Views</th>
                  <th class="text-right">Bounce Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="page in topPages" :key="page.path">
                  <td>
                    <div class="d-flex align-center">
                      <VIcon size="small" class="mr-2">mdi-file-document</VIcon>
                      {{ page.path }}
                    </div>
                  </td>
                  <td class="text-right font-weight-medium">{{ page.views.toLocaleString() }}</td>
                  <td class="text-right">
                    <VChip
                      :color="page.bounceRate < 40 ? 'success' : page.bounceRate < 60 ? 'warning' : 'error'"
                      size="small"
                      variant="tonal"
                    >
                      {{ page.bounceRate }}%
                    </VChip>
                  </td>
                </tr>
              </tbody>
            </VTable>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const period = ref('30d')

const stats = [
  { title: 'Total Visitors', value: '24,532', trend: 12.5, icon: 'mdi-account-group', color: 'primary' },
  { title: 'Page Views', value: '89,124', trend: 8.2, icon: 'mdi-eye', color: 'secondary' },
  { title: 'Bounce Rate', value: '42.3%', trend: -5.1, icon: 'mdi-exit-run', color: 'warning' },
  { title: 'Avg. Session', value: '4m 32s', trend: 15.8, icon: 'mdi-clock-outline', color: 'success' },
]

const trafficSources = [
  { name: 'Organic Search', visits: 12453, percentage: 45, icon: 'mdi-google', color: 'primary' },
  { name: 'Direct', visits: 8234, percentage: 30, icon: 'mdi-cursor-default-click', color: 'success' },
  { name: 'Social Media', visits: 4123, percentage: 15, icon: 'mdi-share-variant', color: 'secondary' },
  { name: 'Referral', visits: 2745, percentage: 10, icon: 'mdi-link-variant', color: 'warning' },
]

const recentActivity = [
  { id: 1, title: 'New user registered', description: 'John Doe created an account', time: '2 min ago', icon: 'mdi-account-plus', color: 'success' },
  { id: 2, title: 'Order completed', description: 'Order #12345 was completed', time: '15 min ago', icon: 'mdi-check-circle', color: 'primary' },
  { id: 3, title: 'Payment received', description: '$450.00 from customer', time: '1 hour ago', icon: 'mdi-cash', color: 'success' },
  { id: 4, title: 'New comment', description: 'On "Getting Started" article', time: '2 hours ago', icon: 'mdi-comment', color: 'info' },
  { id: 5, title: 'Server alert', description: 'High CPU usage detected', time: '3 hours ago', icon: 'mdi-alert', color: 'warning' },
]

const topPages = [
  { path: '/home', views: 12453, bounceRate: 32 },
  { path: '/products', views: 8234, bounceRate: 45 },
  { path: '/about', views: 4123, bounceRate: 55 },
  { path: '/contact', views: 2745, bounceRate: 38 },
  { path: '/blog', views: 1892, bounceRate: 62 },
]
</script>
