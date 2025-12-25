<!--
  Snippet: Data Table
  Description: Full-featured data table with sorting, filtering, pagination, and actions
  Components: VDataTable, VTextField, VSelect, VBtn, VChip, VMenu
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="d-flex align-center">
        <span class="text-h6">Users Management</span>
        <v-spacer />
        <v-btn color="primary" prepend-icon="mdi-plus">Add User</v-btn>
      </v-card-title>

      <!-- Filters -->
      <v-card-text class="pb-0">
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="search"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              hide-details
              clearable
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-select
              v-model="statusFilter"
              :items="statusOptions"
              label="Status"
              variant="outlined"
              density="compact"
              hide-details
              clearable
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-select
              v-model="roleFilter"
              :items="roleOptions"
              label="Role"
              variant="outlined"
              density="compact"
              hide-details
              clearable
            />
          </v-col>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <v-btn variant="outlined" @click="resetFilters">Reset</v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <!-- Data Table -->
      <v-data-table
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :headers="headers"
        :items="filteredUsers"
        :search="search"
        :loading="loading"
        item-value="id"
        show-select
        class="elevation-0"
      >
        <!-- User Column -->
        <template #item.user="{ item }">
          <div class="d-flex align-center py-2">
            <v-avatar size="40" class="mr-3">
              <v-img :src="item.avatar" />
            </v-avatar>
            <div>
              <div class="font-weight-medium">{{ item.name }}</div>
              <div class="text-caption text-medium-emphasis">{{ item.email }}</div>
            </div>
          </div>
        </template>

        <!-- Role Column -->
        <template #item.role="{ item }">
          <v-chip :color="getRoleColor(item.role)" size="small" variant="tonal">
            {{ item.role }}
          </v-chip>
        </template>

        <!-- Status Column -->
        <template #item.status="{ item }">
          <v-chip :color="item.status === 'Active' ? 'success' : 'error'" size="small">
            <v-icon start size="x-small">
              {{ item.status === 'Active' ? 'mdi-check-circle' : 'mdi-close-circle' }}
            </v-icon>
            {{ item.status }}
          </v-chip>
        </template>

        <!-- Last Active Column -->
        <template #item.lastActive="{ item }">
          <span class="text-medium-emphasis">{{ item.lastActive }}</span>
        </template>

        <!-- Actions Column -->
        <template #item.actions="{ item }">
          <div class="d-flex ga-1">
            <v-btn icon="mdi-eye" variant="text" size="small" @click="viewUser(item)" />
            <v-btn icon="mdi-pencil" variant="text" size="small" @click="editUser(item)" />
            <v-menu>
              <template #activator="{ props }">
                <v-btn icon="mdi-dots-vertical" variant="text" size="small" v-bind="props" />
              </template>
              <v-list density="compact">
                <v-list-item prepend-icon="mdi-account-key" @click="changeRole(item)">
                  <v-list-item-title>Change Role</v-list-item-title>
                </v-list-item>
                <v-list-item prepend-icon="mdi-lock-reset" @click="resetPassword(item)">
                  <v-list-item-title>Reset Password</v-list-item-title>
                </v-list-item>
                <v-divider />
                <v-list-item prepend-icon="mdi-delete" class="text-error" @click="deleteUser(item)">
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </template>

        <!-- No Data -->
        <template #no-data>
          <div class="text-center pa-6">
            <v-icon size="48" color="grey-lighten-1" class="mb-2">mdi-account-off</v-icon>
            <p class="text-medium-emphasis">No users found</p>
            <v-btn color="primary" @click="resetFilters">Reset Filters</v-btn>
          </div>
        </template>

        <!-- Loading -->
        <template #loading>
          <v-skeleton-loader type="table-row@5" />
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const search = ref('')
const statusFilter = ref('')
const roleFilter = ref('')
const loading = ref(false)
const page = ref(1)
const itemsPerPage = ref(10)

const statusOptions = ['Active', 'Inactive']
const roleOptions = ['Admin', 'Editor', 'Viewer', 'Guest']

const headers = [
  { title: 'User', key: 'user', sortable: true },
  { title: 'Role', key: 'role', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Department', key: 'department', sortable: true },
  { title: 'Last Active', key: 'lastActive', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false, align: 'center' as const },
]

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', role: 'Admin', status: 'Active', department: 'Engineering', lastActive: '2 min ago' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', role: 'Editor', status: 'Active', department: 'Marketing', lastActive: '1 hour ago' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', role: 'Viewer', status: 'Inactive', department: 'Sales', lastActive: '2 days ago' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', role: 'Editor', status: 'Active', department: 'Design', lastActive: '5 min ago' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', role: 'Guest', status: 'Active', department: 'Support', lastActive: '3 hours ago' },
  { id: 6, name: 'Diana Evans', email: 'diana@example.com', avatar: 'https://randomuser.me/api/portraits/women/6.jpg', role: 'Admin', status: 'Active', department: 'Engineering', lastActive: 'Just now' },
  { id: 7, name: 'Edward Foster', email: 'edward@example.com', avatar: 'https://randomuser.me/api/portraits/men/7.jpg', role: 'Viewer', status: 'Inactive', department: 'HR', lastActive: '1 week ago' },
  { id: 8, name: 'Fiona Green', email: 'fiona@example.com', avatar: 'https://randomuser.me/api/portraits/women/8.jpg', role: 'Editor', status: 'Active', department: 'Marketing', lastActive: '30 min ago' },
]

const filteredUsers = computed(() => {
  return users.filter(user => {
    const matchesStatus = !statusFilter.value || user.status === statusFilter.value
    const matchesRole = !roleFilter.value || user.role === roleFilter.value
    return matchesStatus && matchesRole
  })
})

const getRoleColor = (role: string) => {
  const colors: Record<string, string> = {
    Admin: 'error',
    Editor: 'primary',
    Viewer: 'info',
    Guest: 'grey',
  }
  return colors[role] || 'grey'
}

const resetFilters = () => {
  search.value = ''
  statusFilter.value = ''
  roleFilter.value = ''
}

const viewUser = (user: typeof users[0]) => console.log('View:', user.name)
const editUser = (user: typeof users[0]) => console.log('Edit:', user.name)
const changeRole = (user: typeof users[0]) => console.log('Change role:', user.name)
const resetPassword = (user: typeof users[0]) => console.log('Reset password:', user.name)
const deleteUser = (user: typeof users[0]) => console.log('Delete:', user.name)
</script>
