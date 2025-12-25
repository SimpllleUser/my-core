<!--
  Snippet: Sidebar Navigation
  Description: Collapsible sidebar with nested menu items
  Components: VNavigationDrawer, VList, VListItem, VListGroup, VIcon
  Variants: Permanent, Mini, With Header
-->
<template>
  <v-layout style="min-height: 600px;">
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
    >
      <!-- Header -->
      <v-list-item
        class="px-2"
        nav
      >
        <template #prepend>
          <v-avatar color="primary" size="40" rounded="lg">
            <v-icon>mdi-hexagon</v-icon>
          </v-avatar>
        </template>
        <v-list-item-title class="text-h6 font-weight-bold">
          Dashboard
        </v-list-item-title>
        <v-list-item-subtitle>v1.0.0</v-list-item-subtitle>
        <template #append>
          <v-btn
            variant="text"
            :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
            @click.stop="rail = !rail"
          />
        </template>
      </v-list-item>

      <v-divider class="my-2" />

      <!-- Main Navigation -->
      <v-list density="compact" nav>
        <v-list-item
          v-for="item in mainNavItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.title"
          :active="activeItem === item.title"
          rounded="lg"
          @click="activeItem = item.title"
        >
          <template v-if="item.badge" #append>
            <v-badge :content="item.badge" :color="item.badgeColor" inline />
          </template>
        </v-list-item>

        <v-list-group value="Pages">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-file-document"
              title="Pages"
              rounded="lg"
            />
          </template>
          <v-list-item
            v-for="page in pagesItems"
            :key="page"
            :title="page"
            :value="page"
            rounded="lg"
            @click="activeItem = page"
          />
        </v-list-group>

        <v-list-group value="Components">
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-puzzle"
              title="Components"
              rounded="lg"
            />
          </template>
          <v-list-item
            v-for="component in componentItems"
            :key="component"
            :title="component"
            :value="component"
            rounded="lg"
            @click="activeItem = component"
          />
        </v-list-group>
      </v-list>

      <v-divider class="my-2" />

      <!-- Secondary Navigation -->
      <v-list density="compact" nav>
        <v-list-subheader v-if="!rail">SETTINGS</v-list-subheader>
        <v-list-item
          v-for="item in settingsItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.title"
          rounded="lg"
          @click="activeItem = item.title"
        />
      </v-list>

      <!-- Footer -->
      <template #append>
        <v-divider />
        <v-list-item class="pa-4">
          <template #prepend>
            <v-avatar size="40">
              <v-img src="https://randomuser.me/api/portraits/women/44.jpg" />
            </v-avatar>
          </template>
          <v-list-item-title>Sarah Johnson</v-list-item-title>
          <v-list-item-subtitle>Admin</v-list-item-subtitle>
          <template #append>
            <v-btn icon="mdi-logout" variant="text" size="small" />
          </template>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-6">
        <h1 class="text-h4 font-weight-bold mb-2">{{ activeItem }}</h1>
        <p class="text-medium-emphasis">
          Selected menu item: {{ activeItem }}
        </p>

        <v-card class="mt-6 pa-6">
          <p>Toggle the sidebar using the chevron button to see the rail (mini) mode.</p>
        </v-card>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(true)
const rail = ref(false)
const activeItem = ref('Dashboard')

const mainNavItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard' },
  { title: 'Analytics', icon: 'mdi-chart-bar' },
  { title: 'Users', icon: 'mdi-account-group', badge: '24', badgeColor: 'primary' },
  { title: 'Products', icon: 'mdi-package-variant' },
  { title: 'Orders', icon: 'mdi-cart', badge: '5', badgeColor: 'warning' },
  { title: 'Messages', icon: 'mdi-email', badge: '12', badgeColor: 'error' },
]

const pagesItems = ['Profile', 'Settings', 'Pricing', 'FAQ', 'Blank Page']
const componentItems = ['Buttons', 'Cards', 'Tables', 'Forms', 'Charts']
const settingsItems = [
  { title: 'Settings', icon: 'mdi-cog' },
  { title: 'Help', icon: 'mdi-help-circle' },
]
</script>
