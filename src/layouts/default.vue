<script lang="ts" setup>
import { NavBar, Icons, ThemeToggle, ThemeDrawer } from '../shared';

const navigationItems = [
  { title: 'Home', route: '/', icon: Icons.Home },
  { title: 'About', route: '/about', icon: Icons.Info },
  { title: 'UI Builder', route: '/ui-builder', icon: Icons.ViewDashboard },
  { title: 'Theme', route: '/theme-configuration', icon: Icons.Palette },
  {
    title: 'Examples',
    icon: Icons.FolderOpen,
    children: [
      { title: 'Auth', route: '/examples/auth', icon: Icons.Login },
      { title: 'Cards', route: '/examples/cards', icon: Icons.CardOutline },
      { title: 'Dashboard', route: '/examples/dashboard', icon: Icons.ChartBox },
      { title: 'Ecommerce', route: '/examples/ecommerce', icon: Icons.Cart },
      { title: 'Error Pages', route: '/examples/error-pages', icon: Icons.AlertCircle },
      { title: 'Forms', route: '/examples/forms', icon: Icons.FormTextbox },
      { title: 'Form Module', route: '/examples/form-module', icon: Icons.FormSelect },
      { title: 'Index', route: '/examples', icon: Icons.Home },
      { title: 'Landing', route: '/examples/landing', icon: Icons.RocketLaunch },
      { title: 'Lists', route: '/examples/lists', icon: Icons.FormatListBulleted },
      { title: 'Modals', route: '/examples/modals', icon: Icons.WindowMaximize },
      { title: 'Navigation', route: '/examples/navigation', icon: Icons.Menu },
      { title: 'Settings', route: '/examples/settings', icon: Icons.Cog },
      { title: 'Tables', route: '/examples/tables', icon: Icons.Table }
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
        <ThemeDrawer />
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
