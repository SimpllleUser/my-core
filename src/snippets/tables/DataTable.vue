<!--
  Snippet: Data Table
  Description: Full-featured data table with sorting, filtering, pagination, and actions
  Components: VDataTable, VTextField, VSelect, VBtn, VChip, VMenu
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <VContainer fluid>
    <VCard>
      <VCardTitle class="d-flex align-center">
        <span class="text-h6">Users Management</span>
        <VSpacer />
        <VBtn color="primary" prepend-icon="mdi-plus">Add User</VBtn>
      </VCardTitle>

      <!-- Filters -->
      <VCardText class="pb-0">
        <VRow>
          <VCol cols="12" sm="4">
            <VTextField
              v-model="search"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              hide-details
              clearable
            />
          </VCol>
          <VCol cols="12" sm="3">
            <VSelect
              v-model="statusFilter"
              :items="statusOptions"
              label="Status"
              variant="outlined"
              density="compact"
              hide-details
              clearable
            />
          </VCol>
          <VCol cols="12" sm="3">
            <VSelect
              v-model="roleFilter"
              :items="roleOptions"
              label="Role"
              variant="outlined"
              density="compact"
              hide-details
              clearable
            />
          </VCol>
          <VCol cols="12" sm="2" class="d-flex align-center">
            <VBtn variant="outlined" @click="resetFilters">Reset</VBtn>
          </VCol>
        </VRow>
      </VCardText>

      <!-- Data Table -->
      <VDataTable
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
            <VAvatar size="40" class="mr-3">
              <VImg :src="item.avatar" />
            </VAvatar>
            <div>
              <div class="font-weight-medium">{{ item.name }}</div>
              <div class="text-caption text-medium-emphasis">{{ item.email }}</div>
            </div>
          </div>
        </template>

        <!-- Role Column -->
        <template #item.role="{ item }">
          <VChip :color="getRoleColor(item.role)" size="small" variant="tonal">
            {{ item.role }}
          </VChip>
        </template>

        <!-- Status Column -->
        <template #item.status="{ item }">
          <VChip :color="item.status === 'Active' ? 'success' : 'error'" size="small">
            <VIcon start size="x-small">
              {{ item.status === 'Active' ? 'mdi-check-circle' : 'mdi-close-circle' }}
            </VIcon>
            {{ item.status }}
          </VChip>
        </template>

        <!-- Last Active Column -->
        <template #item.lastActive="{ item }">
          <span class="text-medium-emphasis">{{ item.lastActive }}</span>
        </template>

        <!-- Actions Column -->
        <template #item.actions="{ item }">
          <div class="d-flex ga-1">
            <VBtn icon="mdi-eye" variant="text" size="small" @click="viewUser(item)" />
            <VBtn icon="mdi-pencil" variant="text" size="small" @click="editUser(item)" />
            <VMenu>
              <template #activator="{ props }">
                <VBtn icon="mdi-dots-vertical" variant="text" size="small" v-bind="props" />
              </template>
              <VList density="compact">
                <VListItem prepend-icon="mdi-account-key" @click="changeRole(item)">
                  <VListItemTitle>Change Role</VListItemTitle>
                </VListItem>
                <VListItem prepend-icon="mdi-lock-reset" @click="resetPassword(item)">
                  <VListItemTitle>Reset Password</VListItemTitle>
                </VListItem>
                <VDivider />
                <VListItem prepend-icon="mdi-delete" class="text-error" @click="deleteUser(item)">
                  <VListItemTitle>Delete</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </div>
        </template>

        <!-- No Data -->
        <template #no-data>
          <div class="text-center pa-6">
            <VIcon size="48" color="grey-lighten-1" class="mb-2">mdi-account-off</VIcon>
            <p class="text-medium-emphasis">No users found</p>
            <VBtn color="primary" @click="resetFilters">Reset Filters</VBtn>
          </div>
        </template>

        <!-- Loading -->
        <template #loading>
          <VSkeletonLoader type="table-row@5" />
        </template>
      </VDataTable>
    </VCard>
  </VContainer>
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
