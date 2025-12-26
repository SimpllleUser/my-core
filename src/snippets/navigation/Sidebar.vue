<!--
  Snippet: Sidebar Navigation
  Description: Collapsible sidebar with nested menu items
  Components: VNavigationDrawer, VList, VListItem, VListGroup, VIcon
  Variants: Permanent, Mini, With Header
-->
<template>
  <v-layout style="min-height: 600px;">
    <VNavigationDrawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
    >
      <!-- Header -->
      <VListItem
        class="px-2"
        nav
      >
        <template #prepend>
          <VAvatar color="primary" size="40" rounded="lg">
            <VIcon>mdi-hexagon</VIcon>
          </VAvatar>
        </template>
        <VListItemTitle class="text-h6 font-weight-bold">
          Dashboard
        </VListItemTitle>
        <VListItemSubtitle>v1.0.0</VListItemSubtitle>
        <template #append>
          <VBtn
            variant="text"
            :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
            @click.stop="rail = !rail"
          />
        </template>
      </VListItem>

      <VDivider class="my-2" />

      <!-- Main Navigation -->
      <VList density="compact" nav>
        <VListItem
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
            <VBadge :content="item.badge" :color="item.badgeColor" inline />
          </template>
        </VListItem>

        <VList-group value="Pages">
          <template #activator="{ props }">
            <VListItem
              v-bind="props"
              prepend-icon="mdi-file-document"
              title="Pages"
              rounded="lg"
            />
          </template>
          <VListItem
            v-for="page in pagesItems"
            :key="page"
            :title="page"
            :value="page"
            rounded="lg"
            @click="activeItem = page"
          />
        </v-list-group>

        <VList-group value="Components">
          <template #activator="{ props }">
            <VListItem
              v-bind="props"
              prepend-icon="mdi-puzzle"
              title="Components"
              rounded="lg"
            />
          </template>
          <VListItem
            v-for="component in componentItems"
            :key="component"
            :title="component"
            :value="component"
            rounded="lg"
            @click="activeItem = component"
          />
        </v-list-group>
      </VList>

      <VDivider class="my-2" />

      <!-- Secondary Navigation -->
      <VList density="compact" nav>
        <VList-subheader v-if="!rail">SETTINGS</v-list-subheader>
        <VListItem
          v-for="item in settingsItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.title"
          rounded="lg"
          @click="activeItem = item.title"
        />
      </VList>

      <!-- Footer -->
      <template #append>
        <VDivider />
        <VListItem class="pa-4">
          <template #prepend>
            <VAvatar size="40">
              <VImg src="https://randomuser.me/api/portraits/women/44.jpg" />
            </VAvatar>
          </template>
          <VListItemTitle>Sarah Johnson</VListItemTitle>
          <VListItemSubtitle>Admin</VListItemSubtitle>
          <template #append>
            <VBtn icon="mdi-logout" variant="text" size="small" />
          </template>
        </VListItem>
      </template>
    </VNavigationDrawer>

    <!-- Main Content -->
    <VMain>
      <VContainer fluid class="pa-6">
        <h1 class="text-h4 font-weight-bold mb-2">{{ activeItem }}</h1>
        <p class="text-medium-emphasis">
          Selected menu item: {{ activeItem }}
        </p>

        <VCard class="mt-6 pa-6">
          <p>Toggle the sidebar using the chevron button to see the rail (mini) mode.</p>
        </VCard>
      </VContainer>
    </VMain>
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
