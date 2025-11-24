<script lang="ts" setup>
import { NavBar, Icons, ThemeToggle } from '../shared';

const navigationItems = [
  { title: 'Home', route: '/', icon: Icons.Home },
  { title: 'UiBuilder', route: '/ui-builder', icon: Icons.Settings },
  { title: 'About', route: '/about', icon: Icons.Account }
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
