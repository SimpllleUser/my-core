<template>
  <VContainer fluid class="pa-6">
    <!-- Header -->
    <VRow class="mb-6">
      <VCol cols="12">
        <VBtn
          to="/examples"
          variant="text"
          prepend-icon="mdi-arrow-left"
          class="mb-4"
        >
          Back to Examples
        </VBtn>
        <h1 class="text-h3 font-weight-bold mb-2">
          <VIcon icon="mdi-view-dashboard" size="large" color="purple" class="mr-2" />
          Dashboards
        </h1>
        <p class="text-h6 text-medium-emphasis">
          Analytics dashboards, admin panels, and statistics displays
        </p>
      </VCol>
    </VRow>

    <!-- Analytics Overview -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-chart-line" class="mr-2" />
            Analytics Overview
            <VSpacer />
            <VChip color="purple" size="small">VCard, VRow, VCol, VList</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Full analytics dashboard with charts and metrics</p>
            <AnalyticsOverview />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Stats Cards -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-chart-box" class="mr-2" />
            Stats Cards
            <VSpacer />
            <VChip color="purple" size="small">VCard, VProgressCircular, VSparkline</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Collection of stat card styles with trends and progress indicators</p>
            <StatsCards />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Admin Panel -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-shield-account" class="mr-2" />
            Admin Panel
            <VSpacer />
            <VChip color="purple" size="small">VNavigationDrawer, VAppBar, VDataTable</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Admin dashboard with sidebar navigation and data table</p>
            <AdminPanel />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- E-commerce Dashboard -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-storefront" class="mr-2" />
            E-commerce Dashboard
            <VSpacer />
            <VChip color="purple" size="small">VCard, VDataTable, VProgressLinear</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">E-commerce focused dashboard with sales metrics</p>
            <EcommerceDashboard />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import {
  AnalyticsOverview,
  StatsCards,
  AdminPanel,
  EcommerceDashboard
} from '@/snippets'
</script>
