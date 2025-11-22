<script lang="ts" setup>
import { NavBar, Icons } from "../shared";

const navigationItems = [
  { title: "Home", route: "/", icon: Icons.Home },
  { title: "About", route: "/about", icon: Icons.Account },
];
</script>

<style scoped></style>

<template>
  <v-main>
    <VToolbar title="Core" class="text-secondary" />
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

<style lang="scss" scoped>
.layout-sidebar {
  width: 180px;
  height: calc(100vh - 106px);
  border-right: 1px solid #e0e0e0;
}
</style>
