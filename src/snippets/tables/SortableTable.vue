<!--
  Snippet: Sortable Table
  Description: Simple sortable table with custom styling
  Components: VTable, VBtn, VChip, VIcon
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <VContainer fluid>
    <VCard>
      <VCardTitle>Orders List</VCardTitle>
      <VTable hover>
        <thead>
          <tr>
            <th
              v-for="header in headers"
              :key="header.key"
              :class="{ 'cursor-pointer': header.sortable }"
              @click="header.sortable && sortBy(header.key)"
            >
              <div class="d-flex align-center">
                {{ header.title }}
                <VIcon v-if="header.sortable" size="small" class="ml-1">
                  {{ getSortIcon(header.key) }}
                </VIcon>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in sortedOrders" :key="order.id">
            <td class="font-weight-medium">{{ order.id }}</td>
            <td>
              <div class="d-flex align-center">
                <VAvatar size="32" class="mr-2">
                  <VImg :src="order.customer.avatar" />
                </VAvatar>
                {{ order.customer.name }}
              </div>
            </td>
            <td>{{ order.product }}</td>
            <td class="font-weight-medium">${{ order.amount.toFixed(2) }}</td>
            <td>
              <VChip :color="getStatusColor(order.status)" size="small">
                {{ order.status }}
              </VChip>
            </td>
            <td>{{ order.date }}</td>
            <td>
              <VBtn icon="mdi-eye" variant="text" size="small" />
              <VBtn icon="mdi-pencil" variant="text" size="small" />
            </td>
          </tr>
        </tbody>
      </VTable>

      <!-- Simple Pagination -->
      <VDivider />
      <VCardText class="d-flex justify-space-between align-center">
        <span class="text-body-2 text-medium-emphasis">
          Showing 1-{{ orders.length }} of {{ orders.length }} orders
        </span>
        <VPagination
          v-model="currentPage"
          :length="3"
          :total-visible="5"
          density="compact"
        />
      </VCardText>
    </VCard>
  </VContainer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const currentPage = ref(1)
const sortKey = ref('date')
const sortOrder = ref<'asc' | 'desc'>('desc')

const headers = [
  { title: 'Order ID', key: 'id', sortable: true },
  { title: 'Customer', key: 'customer', sortable: true },
  { title: 'Product', key: 'product', sortable: true },
  { title: 'Amount', key: 'amount', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Date', key: 'date', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false },
]

const orders = [
  { id: '#12345', customer: { name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' }, product: 'iPhone 15 Pro', amount: 1299.00, status: 'Delivered', date: 'Jan 15, 2024' },
  { id: '#12344', customer: { name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' }, product: 'MacBook Air M2', amount: 1199.00, status: 'Processing', date: 'Jan 14, 2024' },
  { id: '#12343', customer: { name: 'Bob Wilson', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' }, product: 'AirPods Pro', amount: 249.00, status: 'Shipped', date: 'Jan 14, 2024' },
  { id: '#12342', customer: { name: 'Alice Brown', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' }, product: 'iPad Pro 12.9"', amount: 1099.00, status: 'Pending', date: 'Jan 13, 2024' },
  { id: '#12341', customer: { name: 'Charlie Davis', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' }, product: 'Apple Watch Ultra', amount: 799.00, status: 'Cancelled', date: 'Jan 12, 2024' },
  { id: '#12340', customer: { name: 'Diana Evans', avatar: 'https://randomuser.me/api/portraits/women/6.jpg' }, product: 'Magic Keyboard', amount: 299.00, status: 'Delivered', date: 'Jan 11, 2024' },
]

const sortedOrders = computed(() => {
  return [...orders].sort((a, b) => {
    let aVal = a[sortKey.value as keyof typeof a]
    let bVal = b[sortKey.value as keyof typeof b]

    if (sortKey.value === 'customer') {
      aVal = (aVal as typeof a.customer).name
      bVal = (bVal as typeof b.customer).name
    }

    if (typeof aVal === 'string') {
      const comparison = aVal.localeCompare(bVal as string)
      return sortOrder.value === 'asc' ? comparison : -comparison
    }

    if (typeof aVal === 'number') {
      return sortOrder.value === 'asc' ? aVal - (bVal as number) : (bVal as number) - aVal
    }

    return 0
  })
})

const sortBy = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

const getSortIcon = (key: string) => {
  if (sortKey.value !== key) return 'mdi-unfold-more-horizontal'
  return sortOrder.value === 'asc' ? 'mdi-chevron-up' : 'mdi-chevron-down'
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    Delivered: 'success',
    Processing: 'info',
    Shipped: 'primary',
    Pending: 'warning',
    Cancelled: 'error',
  }
  return colors[status] || 'grey'
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
