<script setup lang="ts">
import { Icons } from '../../shared/model'
import { snippetCatalog } from '../../snippets'

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
    icon: Icons.Lock,
    color: 'blue',
    description: 'Login, registration, and password recovery forms'
  },
  'Dashboards': {
    name: 'Dashboards',
    route: 'dashboard',
    icon: Icons.ViewDashboard,
    color: 'purple',
    description: 'Analytics, admin panels, and stats displays'
  },
  'Landing Pages': {
    name: 'Landing Pages',
    route: 'landing',
    icon: Icons.Web,
    color: 'green',
    description: 'Hero sections, features, pricing, testimonials'
  },
  'Forms': {
    name: 'Forms',
    route: 'forms',
    icon: Icons.FormSelect,
    color: 'orange',
    description: 'Contact, checkout, multi-step, and filter forms'
  },
  'Cards': {
    name: 'Cards',
    route: 'cards',
    icon: Icons.CardOutline,
    color: 'teal',
    description: 'Product, profile, pricing, and stats cards'
  },
  'Tables': {
    name: 'Tables',
    route: 'tables',
    icon: Icons.Table,
    color: 'indigo',
    description: 'Data tables with sorting, filtering, and pagination'
  },
  'Navigation': {
    name: 'Navigation',
    route: 'navigation',
    icon: Icons.Navigation,
    color: 'cyan',
    description: 'Navbars, sidebars, and breadcrumbs'
  },
  'Modals & Dialogs': {
    name: 'Modals & Dialogs',
    route: 'modals',
    icon: Icons.WindowOpen,
    color: 'pink',
    description: 'Alerts, confirmations, and fullscreen dialogs'
  },
  'Lists': {
    name: 'Lists',
    route: 'lists',
    icon: Icons.FormatListBulleted,
    color: 'amber',
    description: 'Notifications, chat interfaces, and activity feeds'
  },
  'Error Pages': {
    name: 'Error Pages',
    route: 'error-pages',
    icon: Icons.AlertCircle,
    color: 'red',
    description: '404, 500, and maintenance pages'
  },
  'Settings & Profile': {
    name: 'Settings & Profile',
    route: 'settings',
    icon: Icons.Settings,
    color: 'blue-grey',
    description: 'User settings and profile pages'
  },
  'E-commerce': {
    name: 'E-commerce',
    route: 'ecommerce',
    icon: Icons.Cart,
    color: 'deep-purple',
    description: 'Product grids and shopping carts'
  },
  'FinTech': {
    name: 'FinTech',
    route: 'fintech',
    icon: Icons.Bank,
    color: 'teal',
    description: 'Banking dashboards, wallets, and payments'
  },
  'Blog': {
    name: 'Blog',
    route: 'blog',
    icon: Icons.Post,
    color: 'indigo',
    description: 'Blog posts, articles, and comments'
  },
  'Social Media': {
    name: 'Social Media',
    route: 'social',
    icon: Icons.Share,
    color: 'pink',
    description: 'Social feeds, profiles, and stories'
  },
  'Chat & Messaging': {
    name: 'Chat & Messaging',
    route: 'chat',
    icon: Icons.MessageText,
    color: 'light-blue',
    description: 'Chat interfaces and messaging apps'
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
