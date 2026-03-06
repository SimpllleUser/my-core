<!--
  Snippet: E-commerce Dashboard
  Description: E-commerce focused dashboard with sales metrics, orders, and product analytics
  Components: VCard, VRow, VCol, VDataTable, VList, VChip, VProgressLinear
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<script setup lang="ts">
import { Icons } from '../../shared/model'
import { ref } from 'vue'
import DashboardPageHeader from '../../shared/ui/snippets/DashboardPageHeader.vue'
import DashboardStatCard from '../../shared/ui/snippets/DashboardStatCard.vue'
import ProgressStatItem from '../../shared/ui/snippets/ProgressStatItem.vue'

const selectedPeriod = ref('Last 30 days')
const periods = ['Today', 'Last 7 days', 'Last 30 days', 'Last 90 days', 'This year']
const chartView = ref('weekly')

const revenueStats = [
  { title: 'Total Revenue', value: '$124,563', trend: 12.5, icon: Icons.CashMultiple, color: 'primary' },
  { title: 'Total Orders', value: '3,456', trend: 8.2, icon: Icons.CartCheck, color: 'success' },
  { title: 'Avg. Order Value', value: '$86.40', trend: -2.4, icon: Icons.Receipt, color: 'warning' },
  { title: 'Conversion Rate', value: '3.24%', trend: 0.5, icon: Icons.Percent, color: 'secondary' },
]

const topProducts = [
  { id: 1, name: 'Wireless Headphones', sales: 234, revenue: '12,345', trend: 12, image: 'https://picsum.photos/seed/p1/100' },
  { id: 2, name: 'Smart Watch Pro', sales: 189, revenue: '9,450', trend: 8, image: 'https://picsum.photos/seed/p2/100' },
  { id: 3, name: 'Laptop Stand', sales: 156, revenue: '4,680', trend: -3, image: 'https://picsum.photos/seed/p3/100' },
  { id: 4, name: 'USB-C Hub', sales: 134, revenue: '5,360', trend: 15, image: 'https://picsum.photos/seed/p4/100' },
  { id: 5, name: 'Mechanical Keyboard', sales: 98, revenue: '7,840', trend: 5, image: 'https://picsum.photos/seed/p5/100' },
]

const orderHeaders = [
  { title: 'Order ID', key: 'id' },
  { title: 'Customer', key: 'customer' },
  { title: 'Products', key: 'products' },
  { title: 'Total', key: 'total' },
  { title: 'Status', key: 'status' },
  { title: 'Date', key: 'date' },
]

const recentOrders = [
  { id: '#12345', customer: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', products: 3, total: '234.00', status: 'Delivered', date: 'Jan 15' },
  { id: '#12344', customer: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', products: 1, total: '89.00', status: 'Processing', date: 'Jan 15' },
  { id: '#12343', customer: 'Bob Wilson', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', products: 5, total: '456.00', status: 'Shipped', date: 'Jan 14' },
  { id: '#12342', customer: 'Alice Brown', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', products: 2, total: '178.00', status: 'Pending', date: 'Jan 14' },
  { id: '#12341', customer: 'Charlie Davis', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', products: 1, total: '45.00', status: 'Cancelled', date: 'Jan 13' },
]

const salesByCategory = [
  { name: 'Electronics', sales: 45600, percentage: 35, color: 'primary' },
  { name: 'Clothing', sales: 32400, percentage: 25, color: 'secondary' },
  { name: 'Home & Garden', sales: 25920, percentage: 20, color: 'success' },
  { name: 'Sports', sales: 15552, percentage: 12, color: 'warning' },
  { name: 'Other', sales: 10368, percentage: 8, color: 'info' },
]

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'Delivered': 'success',
    'Processing': 'info',
    'Shipped': 'primary',
    'Pending': 'warning',
    'Cancelled': 'error',
  }
  return colors[status] || 'grey'
}
</script>
<template>
  <VContainer fluid>
    <DashboardPageHeader
      title="E-Commerce Dashboard"
      subtitle="Overview of your store performance"
    >
      <div class="d-flex ga-2">
        <VSelect
          v-model="selectedPeriod"
          :items="periods"
          variant="outlined"
          density="compact"
          hide-details
          style="width: 150px;"
        />
        <VBtn color="primary" :prepend-icon="Icons.Download">
          Export
        </VBtn>
      </div>
    </DashboardPageHeader>

    <!-- Revenue Stats -->
    <VRow class="mb-6">
      <VCol v-for="stat in revenueStats" :key="stat.title" cols="12" sm="6" lg="3">
        <DashboardStatCard
          :title="stat.title"
          :value="stat.value"
          :trend="stat.trend"
          :icon="stat.icon"
          :color="stat.color"
        />
      </VCol>
    </VRow>

    <VRow>
      <!-- Sales Chart -->
      <VCol cols="12" lg="8">
        <VCard>
          <VCardTitle class="d-flex justify-space-between align-center">
            <span>Sales Overview</span>
            <VBtnToggle v-model="chartView" mandatory density="compact" variant="outlined">
              <VBtn value="daily">Daily</VBtn>
              <VBtn value="weekly">Weekly</VBtn>
              <VBtn value="monthly">Monthly</VBtn>
            </VBtnToggle>
          </VCardTitle>
          <VCardText>
            <!-- Chart Placeholder -->
            <div
              class="d-flex align-center justify-center rounded-lg"
              style="height: 300px; background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(34, 197, 94, 0.05) 100%);"
            >
              <div class="text-center">
                <VIcon size="64" color="primary" class="mb-2">{{ Icons.ChartAreaspline }}</VIcon>
                <p class="text-medium-emphasis">Sales chart goes here</p>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Top Products -->
      <VCol cols="12" lg="4">
        <VCard>
          <VCardTitle>Top Products</VCardTitle>
          <VCardText class="pa-0">
            <VList>
              <VListItem
                v-for="product in topProducts"
                :key="product.id"
              >
                <template #prepend>
                  <VAvatar rounded size="48" color="grey-lighten-3">
                    <VImg :src="product.image" />
                  </VAvatar>
                </template>
                <VListItemTitle class="font-weight-medium">
                  {{ product.name }}
                </VListItemTitle>
                <VListItemSubtitle>
                  {{ product.sales }} sales
                </VListItemSubtitle>
                <template #append>
                  <div class="text-right">
                    <div class="font-weight-medium">${{ product.revenue }}</div>
                    <div :class="product.trend > 0 ? 'text-success' : 'text-error'" class="text-caption">
                      {{ product.trend > 0 ? '+' : '' }}{{ product.trend }}%
                    </div>
                  </div>
                </template>
              </VListItem>
            </VList>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VRow class="mt-4">
      <!-- Recent Orders -->
      <VCol cols="12" lg="8">
        <VCard>
          <VCardTitle class="d-flex justify-space-between align-center">
            <span>Recent Orders</span>
            <VBtn variant="text" color="primary" size="small">View All</VBtn>
          </VCardTitle>
          <VDataTable
            :headers="orderHeaders"
            :items="recentOrders"
            :items-per-page="5"
            class="elevation-0"
          >
            <template #item.customer="{ item }">
              <div class="d-flex align-center py-2">
                <VAvatar size="32" class="mr-2">
                  <VImg :src="item.avatar" />
                </VAvatar>
                {{ item.customer }}
              </div>
            </template>
            <template #item.status="{ item }">
              <VChip :color="getStatusColor(item.status)" size="small">
                {{ item.status }}
              </VChip>
            </template>
            <template #item.total="{ item }">
              <span class="font-weight-medium">${{ item.total }}</span>
            </template>
          </VDataTable>
        </VCard>
      </VCol>

      <!-- Sales by Category -->
      <VCol cols="12" lg="4">
        <VCard>
          <VCardTitle>Sales by Category</VCardTitle>
          <VCardText>
            <ProgressStatItem
              v-for="category in salesByCategory"
              :key="category.name"
              :label="category.name"
              :percentage="category.percentage"
              :color="category.color"
              :value-text="`$${category.sales.toLocaleString()}`"
              :caption="`${category.percentage}% of total sales`"
              :height="8"
              class="mb-4"
            />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
