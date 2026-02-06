<!--
  Snippet: Admin Panel Dashboard
  Description: Full admin dashboard layout with sidebar navigation, stats, and data tables
  Components: VNavigationDrawer, VAppBar, VMain, VCard, VDataTable, VList, VBtn
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <VLayout>
    <!-- Sidebar Navigation -->
    <VNavigationDrawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
    >
      <VListItem
        :prepend-avatar="rail ? undefined : undefined"
        :prepend-icon="rail ? 'mdi-shield-crown' : undefined"
        title="Admin Panel"
        subtitle="v1.0.0"
        nav
      >
        <template #prepend>
          <VAvatar v-if="!rail" color="primary" size="40">
            <VIcon>mdi-shield-crown</VIcon>
          </VAvatar>
        </template>
        <template #append>
          <VBtn
            variant="text"
            :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
            @click.stop="rail = !rail"
          />
        </template>
      </VListItem>

      <VDivider />

      <VList density="compact" nav>
        <VListItem
          v-for="item in menuItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.title"
          :active="activeMenu === item.title"
          rounded="lg"
          @click="activeMenu = item.title"
        >
          <template v-if="item.badge" #append>
            <VBadge :content="item.badge" :color="item.badgeColor" inline />
          </template>
        </VListItem>
      </VList>

      <template #append>
        <VDivider />
        <VList density="compact" nav>
          <VListItem
            prepend-icon="mdi-cog"
            title="Settings"
            rounded="lg"
          />
          <VListItem
            prepend-icon="mdi-logout"
            title="Logout"
            rounded="lg"
          />
        </VList>
      </template>
    </VNavigationDrawer>

    <!-- Main Content -->
    <VMain>
      <!-- Top App Bar -->
      <VAppBar flat border="b">
        <VAppBarNavIcon @click="drawer = !drawer" />

        <VTextField
          density="compact"
          variant="solo-filled"
          flat
          hide-details
          prepend-inner-icon="mdi-magnify"
          placeholder="Search..."
          class="mx-4"
          style="max-width: 400px;"
        />

        <VSpacer />

        <VBtn icon>
          <VBadge content="3" color="error">
            <VIcon>mdi-bell</VIcon>
          </VBadge>
        </VBtn>

        <VBtn icon class="mx-2">
          <VBadge content="5" color="primary">
            <VIcon>mdi-email</VIcon>
          </VBadge>
        </VBtn>

        <VMenu>
          <template #activator="{ props }">
            <VBtn v-bind="props" variant="text" class="ml-2">
              <VAvatar size="32" class="mr-2">
                <VImg src="https://randomuser.me/api/portraits/men/1.jpg" />
              </VAvatar>
              <span class="d-none d-sm-inline">Admin User</span>
              <VIcon end>mdi-chevron-down</VIcon>
            </VBtn>
          </template>
          <VList>
            <VListItem prepend-icon="mdi-account" title="Profile" />
            <VListItem prepend-icon="mdi-cog" title="Settings" />
            <VDivider />
            <VListItem prepend-icon="mdi-logout" title="Logout" />
          </VList>
        </VMenu>
      </VAppBar>

      <!-- Dashboard Content -->
      <VContainer fluid class="pa-6">
        <!-- Welcome Section -->
        <VRow class="mb-6">
          <VCol>
            <h1 class="text-h4 font-weight-bold">Welcome back, Admin!</h1>
            <p class="text-medium-emphasis">Here's an overview of your system performance.</p>
          </VCol>
        </VRow>

        <!-- Quick Stats -->
        <VRow class="mb-6">
          <VCol v-for="stat in quickStats" :key="stat.title" cols="12" sm="6" lg="3">
            <VCard :color="stat.color" variant="tonal">
              <VCardText>
                <div class="d-flex justify-space-between align-center">
                  <div>
                    <p class="text-body-2 mb-1">{{ stat.title }}</p>
                    <h3 class="text-h4 font-weight-bold">{{ stat.value }}</h3>
                    <p class="text-caption mt-1">
                      <VIcon size="small" :color="stat.trendUp ? 'success' : 'error'">
                        {{ stat.trendUp ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
                      </VIcon>
                      {{ stat.trend }} from yesterday
                    </p>
                  </div>
                  <VIcon size="48" :color="stat.color">{{ stat.icon }}</VIcon>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>

        <VRow>
          <!-- Recent Users -->
          <VCol cols="12" lg="8">
            <VCard>
              <VCardTitle class="d-flex justify-space-between align-center">
                <span>Recent Users</span>
                <VBtn variant="text" color="primary" size="small">View All</VBtn>
              </VCardTitle>
              <VDataTable
                :headers="userHeaders"
                :items="recentUsers"
                :items-per-page="5"
                class="elevation-0"
              >
                <template #item.user="{ item }">
                  <div class="d-flex align-center py-2">
                    <VAvatar size="36" class="mr-3">
                      <VImg :src="item.avatar" />
                    </VAvatar>
                    <div>
                      <div class="font-weight-medium">{{ item.name }}</div>
                      <div class="text-caption text-medium-emphasis">{{ item.email }}</div>
                    </div>
                  </div>
                </template>
                <template #item.status="{ item }">
                  <VChip :color="item.status === 'Active' ? 'success' : 'error'" size="small">
                    {{ item.status }}
                  </VChip>
                </template>
                <template #item.actions>
                  <VBtn icon="mdi-dots-vertical" variant="text" size="small" />
                </template>
              </VDataTable>
            </VCard>
          </VCol>

          <!-- Quick Actions & System Status -->
          <VCol cols="12" lg="4">
            <VCard class="mb-4">
              <VCardTitle>Quick Actions</VCardTitle>
              <VCardText>
                <VBtn color="primary" block class="mb-2" prepend-icon="mdi-account-plus">
                  Add New User
                </VBtn>
                <VBtn color="secondary" block class="mb-2" prepend-icon="mdi-file-document-plus">
                  Create Report
                </VBtn>
                <VBtn color="info" block prepend-icon="mdi-email">
                  Send Newsletter
                </VBtn>
              </VCardText>
            </VCard>

            <VCard>
              <VCardTitle>System Status</VCardTitle>
              <VCardText>
                <VList density="compact">
                  <VListItem
                    v-for="status in systemStatus"
                    :key="status.name"
                  >
                    <template #prepend>
                      <VIcon :color="status.color" size="small">mdi-circle</VIcon>
                    </template>
                    <VListItemTitle>{{ status.name }}</VListItemTitle>
                    <template #append>
                      <span class="text-caption">{{ status.value }}</span>
                    </template>
                  </VListItem>
                </VList>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </VMain>
  </VLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(true)
const rail = ref(false)
const activeMenu = ref('Dashboard')

const menuItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard' },
  { title: 'Users', icon: 'mdi-account-group', badge: '24', badgeColor: 'primary' },
  { title: 'Products', icon: 'mdi-package-variant' },
  { title: 'Orders', icon: 'mdi-cart', badge: '5', badgeColor: 'warning' },
  { title: 'Analytics', icon: 'mdi-chart-bar' },
  { title: 'Reports', icon: 'mdi-file-document' },
  { title: 'Messages', icon: 'mdi-email', badge: '12', badgeColor: 'error' },
]

const quickStats = [
  { title: 'Total Users', value: '8,249', trend: '+12%', trendUp: true, icon: 'mdi-account-group', color: 'primary' },
  { title: 'Revenue', value: '$45,678', trend: '+8%', trendUp: true, icon: 'mdi-currency-usd', color: 'success' },
  { title: 'Orders', value: '1,234', trend: '+23%', trendUp: true, icon: 'mdi-cart', color: 'warning' },
  { title: 'Tickets', value: '45', trend: '-5%', trendUp: false, icon: 'mdi-ticket', color: 'error' },
]

const userHeaders = [
  { title: 'User', key: 'user', sortable: false },
  { title: 'Role', key: 'role' },
  { title: 'Status', key: 'status' },
  { title: 'Joined', key: 'joined' },
  { title: '', key: 'actions', sortable: false },
]

const recentUsers = [
  { name: 'John Doe', email: 'john@example.com', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', role: 'Admin', status: 'Active', joined: 'Jan 15, 2024' },
  { name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', role: 'Editor', status: 'Active', joined: 'Jan 12, 2024' },
  { name: 'Bob Wilson', email: 'bob@example.com', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', role: 'User', status: 'Inactive', joined: 'Jan 10, 2024' },
  { name: 'Alice Brown', email: 'alice@example.com', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', role: 'Editor', status: 'Active', joined: 'Jan 8, 2024' },
  { name: 'Charlie Davis', email: 'charlie@example.com', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', role: 'User', status: 'Active', joined: 'Jan 5, 2024' },
]

const systemStatus = [
  { name: 'Server Status', value: 'Online', color: 'success' },
  { name: 'Database', value: '98% healthy', color: 'success' },
  { name: 'API Response', value: '124ms', color: 'success' },
  { name: 'Memory Usage', value: '67%', color: 'warning' },
  { name: 'Disk Space', value: '45% used', color: 'success' },
]
</script>
