<script lang="ts" setup>
import { NavBar, Icons, ThemeToggle } from '../shared';

const navigationItems = [
  { title: 'Home', route: '/', icon: 'mdi-home' },
  { title: 'About', route: '/about', icon: 'mdi-information' },
  { title: 'UI Builder', route: '/ui-builder', icon: 'mdi-view-dashboard-edit' },
  {
    title: 'Examples',
    icon: 'mdi-folder-open',
    children: [
      { title: 'Auth', route: '/examples/auth', icon: 'mdi-login' },
      { title: 'Cards', route: '/examples/cards', icon: 'mdi-card' },
      { title: 'Dashboard', route: '/examples/dashboard', icon: 'mdi-chart-box' },
      { title: 'Ecommerce', route: '/examples/ecommerce', icon: 'mdi-cart' },
      { title: 'Error Pages', route: '/examples/error-pages', icon: 'mdi-alert-circle' },
      { title: 'Forms', route: '/examples/forms', icon: 'mdi-form-textbox' },
      { title: 'Index', route: '/examples', icon: 'mdi-home' },
      { title: 'Landing', route: '/examples/landing', icon: 'mdi-rocket-launch' },
      { title: 'Lists', route: '/examples/lists', icon: 'mdi-format-list-bulleted' },
      { title: 'Modals', route: '/examples/modals', icon: 'mdi-window-maximize' },
      { title: 'Navigation', route: '/examples/navigation', icon: 'mdi-menu' },
      { title: 'Settings', route: '/examples/settings', icon: 'mdi-cog' },
      { title: 'Tables', route: '/examples/tables', icon: 'mdi-table' }
    ]
  }
];
</script>

<template>
  <v-main>
    <VToolbar
      title="Core"
      class="text-secondary"
    >
      <template #append>
        <ThemeToggle />
      </template>
    </VToolbar>
    <hr class="elevation-0" />
    <div class="layout d-flex">
      <div class="layout-sidebar">
        <NavBar :items="navigationItems" />
      </div>
      <div class="layout-wrapper pa-4 w-100">
        <router-view />
      </div>
    </div>
  </v-main>

  <AppFooter />
</template>

<style scoped></style>

<style lang="scss" scoped>
.layout-sidebar {
  width: 15rem;
  height: calc(100vh - 106px);
  background-color: rgb(var(--v-theme-surface));
}
.layout-wrapper {
  background-color: rgb(var(--v-theme-background));
}
</style>
