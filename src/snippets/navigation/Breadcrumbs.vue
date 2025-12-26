<!--
  Snippet: Breadcrumbs
  Description: Various breadcrumb navigation styles
  Components: VBreadcrumbs, VBreadcrumbsItem, VIcon
  Variants: Simple, With Icons, Custom Dividers
-->
<template>
  <v-container>
    <h2 class="text-h5 font-weight-bold mb-6">Breadcrumbs Variants</h2>

    <!-- Simple Breadcrumbs -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Simple</h3>
    <v-card class="mb-6 pa-4">
      <v-breadcrumbs :items="simpleBreadcrumbs" />
    </v-card>

    <!-- With Icons -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-3">With Icons</h3>
    <v-card class="mb-6 pa-4">
      <v-breadcrumbs :items="iconBreadcrumbs">
        <template #prepend>
          <v-icon icon="mdi-home" size="small" />
        </template>
      </v-breadcrumbs>
    </v-card>

    <!-- Custom Divider -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Custom Dividers</h3>
    <v-card class="mb-6 pa-4">
      <v-breadcrumbs :items="simpleBreadcrumbs" divider=">">
        <template #divider>
          <v-icon icon="mdi-chevron-right" />
        </template>
      </v-breadcrumbs>
    </v-card>

    <!-- With Background -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-3">With Background</h3>
    <v-card class="mb-6">
      <v-sheet color="grey-lighten-4" class="pa-4">
        <v-breadcrumbs :items="simpleBreadcrumbs" class="pa-0" />
      </v-sheet>
    </v-card>

    <!-- Large Breadcrumbs -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Large</h3>
    <v-card class="mb-6 pa-4">
      <v-breadcrumbs :items="simpleBreadcrumbs" density="comfortable">
        <template #title="{ item }">
          <span class="text-body-1">{{ item.title }}</span>
        </template>
      </v-breadcrumbs>
    </v-card>

    <!-- Breadcrumbs with Dropdown -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-3">With Dropdown (Collapsed)</h3>
    <v-card class="mb-6 pa-4">
      <v-breadcrumbs>
        <v-breadcrumbs-item href="#">Home</v-breadcrumbs-item>
        <v-breadcrumbs-divider>
          <v-icon>mdi-chevron-right</v-icon>
        </v-breadcrumbs-divider>
        <v-breadcrumbs-item>
          <v-menu>
            <template #activator="{ props }">
              <v-btn variant="text" size="small" v-bind="props" class="text-none">
                ...
              </v-btn>
            </template>
            <v-list density="compact">
              <v-list-item
                v-for="item in collapsedItems"
                :key="item"
                :title="item"
              />
            </v-list>
          </v-menu>
        </v-breadcrumbs-item>
        <v-breadcrumbs-divider>
          <v-icon>mdi-chevron-right</v-icon>
        </v-breadcrumbs-divider>
        <v-breadcrumbs-item href="#">Products</v-breadcrumbs-item>
        <v-breadcrumbs-divider>
          <v-icon>mdi-chevron-right</v-icon>
        </v-breadcrumbs-divider>
        <v-breadcrumbs-item disabled>iPhone 15 Pro</v-breadcrumbs-item>
      </v-breadcrumbs>
    </v-card>

    <!-- Breadcrumbs in Page Header -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Page Header with Breadcrumbs</h3>
    <v-card class="mb-6">
      <v-card-text>
        <v-breadcrumbs :items="simpleBreadcrumbs" class="pa-0 mb-2" density="compact" />
        <div class="d-flex justify-space-between align-center">
          <div>
            <h1 class="text-h4 font-weight-bold">Product Details</h1>
            <p class="text-body-2 text-medium-emphasis mb-0">
              View and manage product information
            </p>
          </div>
          <div class="d-flex ga-2">
            <v-btn variant="outlined">Cancel</v-btn>
            <v-btn color="primary">Save Changes</v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- Tabs Navigation -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Tabs Navigation</h3>
    <v-card>
      <v-tabs v-model="tab" color="primary">
        <v-tab value="overview">Overview</v-tab>
        <v-tab value="analytics">Analytics</v-tab>
        <v-tab value="reports">Reports</v-tab>
        <v-tab value="notifications">
          Notifications
          <v-badge content="3" color="error" class="ml-2" inline />
        </v-tab>
      </v-tabs>
      <v-divider />
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="overview">
          <v-card-text>Overview content goes here...</v-card-text>
        </v-tabs-window-item>
        <v-tabs-window-item value="analytics">
          <v-card-text>Analytics content goes here...</v-card-text>
        </v-tabs-window-item>
        <v-tabs-window-item value="reports">
          <v-card-text>Reports content goes here...</v-card-text>
        </v-tabs-window-item>
        <v-tabs-window-item value="notifications">
          <v-card-text>Notifications content goes here...</v-card-text>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tab = ref('overview')

const simpleBreadcrumbs = [
  { title: 'Home', disabled: false, href: '#' },
  { title: 'Category', disabled: false, href: '#' },
  { title: 'Products', disabled: false, href: '#' },
  { title: 'Current Page', disabled: true },
]

const iconBreadcrumbs = [
  { title: 'Dashboard', disabled: false, href: '#' },
  { title: 'E-commerce', disabled: false, href: '#' },
  { title: 'Products', disabled: true },
]

const collapsedItems = ['Category', 'Subcategory', 'Electronics']
</script>
