<!--
  Snippet: Admin Panel Dashboard
  Description: Full admin dashboard layout with sidebar navigation, stats, and data tables
  Components: VNavigationDrawer, VAppBar, VMain, VCard, VDataTable, VList, VBtn
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <v-layout>
    <!-- Sidebar Navigation -->
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
    >
      <v-list-item
        :prepend-avatar="rail ? undefined : undefined"
        :prepend-icon="rail ? 'mdi-shield-crown' : undefined"
        title="Admin Panel"
        subtitle="v1.0.0"
        nav
      >
        <template #prepend>
          <v-avatar v-if="!rail" color="primary" size="40">
            <v-icon>mdi-shield-crown</v-icon>
          </v-avatar>
        </template>
        <template #append>
          <v-btn
            variant="text"
            :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
            @click.stop="rail = !rail"
          />
        </template>
      </v-list-item>

      <v-divider />

      <v-list density="compact" nav>
        <v-list-item
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
            <v-badge :content="item.badge" :color="item.badgeColor" inline />
          </template>
        </v-list-item>
      </v-list>

      <template #append>
        <v-divider />
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-cog"
            title="Settings"
            rounded="lg"
          />
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            rounded="lg"
          />
        </v-list>
      </template>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <!-- Top App Bar -->
      <v-app-bar flat border="b">
        <v-app-bar-nav-icon @click="drawer = !drawer" />

        <v-text-field
          density="compact"
          variant="solo-filled"
          flat
          hide-details
          prepend-inner-icon="mdi-magnify"
          placeholder="Search..."
          class="mx-4"
          style="max-width: 400px;"
        />

        <v-spacer />

        <v-btn icon>
          <v-badge content="3" color="error">
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>

        <v-btn icon class="mx-2">
          <v-badge content="5" color="primary">
            <v-icon>mdi-email</v-icon>
          </v-badge>
        </v-btn>

        <v-menu>
          <template #activator="{ props }">
            <v-btn v-bind="props" variant="text" class="ml-2">
              <v-avatar size="32" class="mr-2">
                <v-img src="https://randomuser.me/api/portraits/men/1.jpg" />
              </v-avatar>
              <span class="d-none d-sm-inline">Admin User</span>
              <v-icon end>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item prepend-icon="mdi-account" title="Profile" />
            <v-list-item prepend-icon="mdi-cog" title="Settings" />
            <v-divider />
            <v-list-item prepend-icon="mdi-logout" title="Logout" />
          </v-list>
        </v-menu>
      </v-app-bar>

      <!-- Dashboard Content -->
      <v-container fluid class="pa-6">
        <!-- Welcome Section -->
        <v-row class="mb-6">
          <v-col>
            <h1 class="text-h4 font-weight-bold">Welcome back, Admin!</h1>
            <p class="text-medium-emphasis">Here's an overview of your system performance.</p>
          </v-col>
        </v-row>

        <!-- Quick Stats -->
        <v-row class="mb-6">
          <v-col v-for="stat in quickStats" :key="stat.title" cols="12" sm="6" lg="3">
            <v-card :color="stat.color" variant="tonal">
              <v-card-text>
                <div class="d-flex justify-space-between align-center">
                  <div>
                    <p class="text-body-2 mb-1">{{ stat.title }}</p>
                    <h3 class="text-h4 font-weight-bold">{{ stat.value }}</h3>
                    <p class="text-caption mt-1">
                      <v-icon size="small" :color="stat.trendUp ? 'success' : 'error'">
                        {{ stat.trendUp ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
                      </v-icon>
                      {{ stat.trend }} from yesterday
                    </p>
                  </div>
                  <v-icon size="48" :color="stat.color">{{ stat.icon }}</v-icon>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <!-- Recent Users -->
          <v-col cols="12" lg="8">
            <v-card>
              <v-card-title class="d-flex justify-space-between align-center">
                <span>Recent Users</span>
                <v-btn variant="text" color="primary" size="small">View All</v-btn>
              </v-card-title>
              <v-data-table
                :headers="userHeaders"
                :items="recentUsers"
                :items-per-page="5"
                class="elevation-0"
              >
                <template #item.user="{ item }">
                  <div class="d-flex align-center py-2">
                    <v-avatar size="36" class="mr-3">
                      <v-img :src="item.avatar" />
                    </v-avatar>
                    <div>
                      <div class="font-weight-medium">{{ item.name }}</div>
                      <div class="text-caption text-medium-emphasis">{{ item.email }}</div>
                    </div>
                  </div>
                </template>
                <template #item.status="{ item }">
                  <v-chip :color="item.status === 'Active' ? 'success' : 'error'" size="small">
                    {{ item.status }}
                  </v-chip>
                </template>
                <template #item.actions>
                  <v-btn icon="mdi-dots-vertical" variant="text" size="small" />
                </template>
              </v-data-table>
            </v-card>
          </v-col>

          <!-- Quick Actions & System Status -->
          <v-col cols="12" lg="4">
            <v-card class="mb-4">
              <v-card-title>Quick Actions</v-card-title>
              <v-card-text>
                <v-btn color="primary" block class="mb-2" prepend-icon="mdi-account-plus">
                  Add New User
                </v-btn>
                <v-btn color="secondary" block class="mb-2" prepend-icon="mdi-file-document-plus">
                  Create Report
                </v-btn>
                <v-btn color="info" block prepend-icon="mdi-email">
                  Send Newsletter
                </v-btn>
              </v-card-text>
            </v-card>

            <v-card>
              <v-card-title>System Status</v-card-title>
              <v-card-text>
                <v-list density="compact">
                  <v-list-item
                    v-for="status in systemStatus"
                    :key="status.name"
                  >
                    <template #prepend>
                      <v-icon :color="status.color" size="small">mdi-circle</v-icon>
                    </template>
                    <v-list-item-title>{{ status.name }}</v-list-item-title>
                    <template #append>
                      <span class="text-caption">{{ status.value }}</span>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
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
