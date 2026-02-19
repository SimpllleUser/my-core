<!--
  Snippet: Sidebar Navigation
  Description: Collapsible sidebar with nested menu items
  Components: VNavigationDrawer, VList, VListItem, VListGroup, VIcon
  Variants: Permanent, Mini, With Header
-->
<template>
  <VLayout style="min-height: 600px;">
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
            <VIcon>{{ Icons.Hexagon }}</VIcon>
          </VAvatar>
        </template>
        <VListItemTitle class="text-h6 font-weight-bold">
          Dashboard
        </VListItemTitle>
        <VListItemSubtitle>v1.0.0</VListItemSubtitle>
        <template #append>
          <VBtn
            variant="text"
            :icon="rail ? Icons.ChevronRight : Icons.ChevronLeft"
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

        <VListGroup value="Pages">
          <template #activator="{ props }">
            <VListItem
              v-bind="props"
              :prepend-icon="Icons.FileDocument"
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
        </VListGroup>

        <VListGroup value="Components">
          <template #activator="{ props }">
            <VListItem
              v-bind="props"
              :prepend-icon="Icons.Puzzle"
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
        </VListGroup>
      </VList>

      <VDivider class="my-2" />

      <!-- Secondary Navigation -->
      <VList density="compact" nav>
        <VListSubheader v-if="!rail">SETTINGS</VListSubheader>
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
            <VBtn :icon="Icons.Logout" variant="text" size="small" />
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
  </VLayout>
</template>

<script setup lang="ts">
import { Icons } from '../../shared/model'
import { ref } from 'vue'

const drawer = ref(true)
const rail = ref(false)
const activeItem = ref('Dashboard')

const mainNavItems = [
  { title: 'Dashboard', icon: Icons.ViewDashboard },
  { title: 'Analytics', icon: Icons.ChartBar },
  { title: 'Users', icon: Icons.AccountGroup, badge: '24', badgeColor: 'primary' },
  { title: 'Products', icon: Icons.PackageVariant },
  { title: 'Orders', icon: Icons.Cart, badge: '5', badgeColor: 'warning' },
  { title: 'Messages', icon: Icons.Email, badge: '12', badgeColor: 'error' },
]

const pagesItems = ['Profile', 'Settings', 'Pricing', 'FAQ', 'Blank Page']
const componentItems = ['Buttons', 'Cards', 'Tables', 'Forms', 'Charts']
const settingsItems = [
  { title: 'Settings', icon: Icons.Settings },
  { title: 'Help', icon: Icons.HelpCircle },
]
</script>
