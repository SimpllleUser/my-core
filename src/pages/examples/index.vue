<template>
  <VContainer fluid class="pa-6">
    <VRow>
      <VCol cols="12">
        <h1 class="text-h3 font-weight-bold mb-2">UI Snippets Examples</h1>
        <p class="text-h6 text-medium-emphasis mb-6">
          Browse our comprehensive collection of ready-to-use UI components built with Vuetify 3
        </p>
      </VCol>
    </VRow>

    <VRow>
      <VCol
        v-for="category in categories"
        :key="category.route"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <VCard
          :to="`/examples/${category.route}`"
          hover
          class="h-100"
        >
          <VCardText class="d-flex flex-column align-center pa-6">
            <VIcon
              :icon="category.icon"
              size="64"
              :color="category.color"
              class="mb-4"
            />
            <h3 class="text-h5 mb-2 text-center">{{ category.name }}</h3>
            <p class="text-body-2 text-center text-medium-emphasis">
              {{ category.description }}
            </p>
            <VChip
              :color="category.color"
              size="small"
              class="mt-4"
            >
              {{ category.count }} snippets
            </VChip>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { snippetCatalog } from '@/snippets'

interface Category {
  name: string
  route: string
  icon: string
  color: string
  description: string
  count: number
}

const categoryMap: Record<string, Omit<Category, 'count'>> = {
  'Authentication': {
    name: 'Authentication',
    route: 'auth',
    icon: 'mdi-lock',
    color: 'blue',
    description: 'Login, registration, and password recovery forms'
  },
  'Dashboards': {
    name: 'Dashboards',
    route: 'dashboard',
    icon: 'mdi-view-dashboard',
    color: 'purple',
    description: 'Analytics, admin panels, and stats displays'
  },
  'Landing Pages': {
    name: 'Landing Pages',
    route: 'landing',
    icon: 'mdi-web',
    color: 'green',
    description: 'Hero sections, features, pricing, testimonials'
  },
  'Forms': {
    name: 'Forms',
    route: 'forms',
    icon: 'mdi-form-select',
    color: 'orange',
    description: 'Contact, checkout, multi-step, and filter forms'
  },
  'Cards': {
    name: 'Cards',
    route: 'cards',
    icon: 'mdi-card-outline',
    color: 'teal',
    description: 'Product, profile, pricing, and stats cards'
  },
  'Tables': {
    name: 'Tables',
    route: 'tables',
    icon: 'mdi-table',
    color: 'indigo',
    description: 'Data tables with sorting, filtering, and pagination'
  },
  'Navigation': {
    name: 'Navigation',
    route: 'navigation',
    icon: 'mdi-navigation',
    color: 'cyan',
    description: 'Navbars, sidebars, and breadcrumbs'
  },
  'Modals & Dialogs': {
    name: 'Modals & Dialogs',
    route: 'modals',
    icon: 'mdi-window-open',
    color: 'pink',
    description: 'Alerts, confirmations, and fullscreen dialogs'
  },
  'Lists': {
    name: 'Lists',
    route: 'lists',
    icon: 'mdi-format-list-bulleted',
    color: 'amber',
    description: 'Notifications, chat interfaces, and activity feeds'
  },
  'Error Pages': {
    name: 'Error Pages',
    route: 'error-pages',
    icon: 'mdi-alert-circle',
    color: 'red',
    description: '404, 500, and maintenance pages'
  },
  'Settings & Profile': {
    name: 'Settings & Profile',
    route: 'settings',
    icon: 'mdi-cog',
    color: 'blue-grey',
    description: 'User settings and profile pages'
  },
  'E-commerce': {
    name: 'E-commerce',
    route: 'ecommerce',
    icon: 'mdi-cart',
    color: 'deep-purple',
    description: 'Product grids and shopping carts'
  }
}

const categoryCounts = snippetCatalog.reduce((acc, snippet) => {
  acc[snippet.category] = (acc[snippet.category] || 0) + 1
  return acc
}, {} as Record<string, number>)

const categories: Category[] = Object.entries(categoryMap).map(([key, value]) => ({
  ...value,
  count: categoryCounts[key] || 0
}))
</script>
