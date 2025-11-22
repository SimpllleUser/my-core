<script lang="ts" setup>
import { NavBar, Icons, ThemeToggle } from '../shared';

const navigationItems = [
  { title: 'Home', route: '/', icon: Icons.Home },
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
      <div class="layout-wrapper pa-4">
        <router-view />
      </div>
    </div>
  </v-main>

  <AppFooter />
</template>

<style scoped></style>

<style lang="scss" scoped>
.layout-sidebar {
  width: 180px;
  height: calc(100vh - 106px);
  border-right: 1px solid #e0e0e0;
}
</style>
