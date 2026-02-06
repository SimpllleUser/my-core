<!--
  Snippet: Breadcrumbs
  Description: Various breadcrumb navigation styles
  Components: VBreadcrumbs, VBreadcrumbsItem, VIcon
  Variants: Simple, With Icons, Custom Dividers
-->
<template>
  <VContainer>
    <h2 class="text-h5 font-weight-bold mb-6">Breadcrumbs Variants</h2>

    <!-- Simple Breadcrumbs -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Simple</h3>
    <VCard class="mb-6 pa-4">
      <VBreadcrumbs :items="simpleBreadcrumbs" />
    </VCard>

    <!-- With Icons -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-3">With Icons</h3>
    <VCard class="mb-6 pa-4">
      <VBreadcrumbs :items="iconBreadcrumbs">
        <template #prepend>
          <VIcon icon="mdi-home" size="small" />
        </template>
      </VBreadcrumbs>
    </VCard>

    <!-- Custom Divider -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Custom Dividers</h3>
    <VCard class="mb-6 pa-4">
      <VBreadcrumbs :items="simpleBreadcrumbs" divider=">">
        <template #divider>
          <VIcon icon="mdi-chevron-right" />
        </template>
      </VBreadcrumbs>
    </VCard>

    <!-- With Background -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-3">With Background</h3>
    <VCard class="mb-6">
      <VSheet color="grey-lighten-4" class="pa-4">
        <VBreadcrumbs :items="simpleBreadcrumbs" class="pa-0" />
      </VSheet>
    </VCard>

    <!-- Large Breadcrumbs -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Large</h3>
    <VCard class="mb-6 pa-4">
      <VBreadcrumbs :items="simpleBreadcrumbs" density="comfortable">
        <template #title="{ item }">
          <span class="text-body-1">{{ item.title }}</span>
        </template>
      </VBreadcrumbs>
    </VCard>

    <!-- Breadcrumbs with Dropdown -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-3">With Dropdown (Collapsed)</h3>
    <VCard class="mb-6 pa-4">
      <VBreadcrumbs>
        <VBreadcrumbsItem href="#">Home</VBreadcrumbsItem>
        <VBreadcrumbsDivider>
          <VIcon>mdi-chevron-right</VIcon>
        </VBreadcrumbsDivider>
        <VBreadcrumbsItem>
          <VMenu>
            <template #activator="{ props }">
              <VBtn variant="text" size="small" v-bind="props" class="text-none">
                ...
              </VBtn>
            </template>
            <VList density="compact">
              <VListItem
                v-for="item in collapsedItems"
                :key="item"
                :title="item"
              />
            </VList>
          </VMenu>
        </VBreadcrumbsItem>
        <VBreadcrumbsDivider>
          <VIcon>mdi-chevron-right</VIcon>
        </VBreadcrumbsDivider>
        <VBreadcrumbsItem href="#">Products</VBreadcrumbsItem>
        <VBreadcrumbsDivider>
          <VIcon>mdi-chevron-right</VIcon>
        </VBreadcrumbsDivider>
        <VBreadcrumbsItem disabled>iPhone 15 Pro</VBreadcrumbsItem>
      </VBreadcrumbs>
    </VCard>

    <!-- Breadcrumbs in Page Header -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Page Header with Breadcrumbs</h3>
    <VCard class="mb-6">
      <VCardText>
        <VBreadcrumbs :items="simpleBreadcrumbs" class="pa-0 mb-2" density="compact" />
        <div class="d-flex justify-space-between align-center">
          <div>
            <h1 class="text-h4 font-weight-bold">Product Details</h1>
            <p class="text-body-2 text-medium-emphasis mb-0">
              View and manage product information
            </p>
          </div>
          <div class="d-flex ga-2">
            <VBtn variant="outlined">Cancel</VBtn>
            <VBtn color="primary">Save Changes</VBtn>
          </div>
        </div>
      </VCardText>
    </VCard>

    <!-- Tabs Navigation -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Tabs Navigation</h3>
    <VCard>
      <VTabs v-model="tab" color="primary">
        <VTab value="overview">Overview</VTab>
        <VTab value="analytics">Analytics</VTab>
        <VTab value="reports">Reports</VTab>
        <VTab value="notifications">
          Notifications
          <VBadge content="3" color="error" class="ml-2" inline />
        </VTab>
      </VTabs>
      <VDivider />
      <VTabsWindow v-model="tab">
        <VTabsWindowItem value="overview">
          <VCardText>Overview content goes here...</VCardText>
        </VTabsWindowItem>
        <VTabsWindowItem value="analytics">
          <VCardText>Analytics content goes here...</VCardText>
        </VTabsWindowItem>
        <VTabsWindowItem value="reports">
          <VCardText>Reports content goes here...</VCardText>
        </VTabsWindowItem>
        <VTabsWindowItem value="notifications">
          <VCardText>Notifications content goes here...</VCardText>
        </VTabsWindowItem>
      </VTabsWindow>
    </VCard>
  </VContainer>
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
