<!--
  Snippet: Banking Dashboard
  Description: Full banking dashboard with accounts, cards, analytics, and quick actions
  Components: StatCard, SectionHeader, TransactionItem
  Variants: Overview, accounts, analytics
-->
<template>
  <div>
    <!-- Header with Welcome & Quick Stats -->
    <section class="py-8" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);">
      <VContainer>
        <VRow align="center" class="mb-8">
          <VCol cols="12" md="6">
            <div class="text-white">
              <div class="text-overline text-grey-lighten-1 mb-1">Good Morning</div>
              <h1 class="text-h3 font-weight-bold mb-2">Welcome back, John!</h1>
              <p class="text-body-1 text-grey-lighten-1 mb-0">
                Here's what's happening with your finances today.
              </p>
            </div>
          </VCol>
          <VCol cols="12" md="6" class="text-md-right">
            <VBtn color="primary" size="large" class="mr-2">
              <VIcon start>{{ Icons.Plus }}</VIcon>
              New Transfer
            </VBtn>
            <VBtn variant="outlined" color="white" size="large">
              <VIcon start>{{ Icons.Download }}</VIcon>
              Statement
            </VBtn>
          </VCol>
        </VRow>

        <VRow>
          <VCol v-for="stat in headerStats" :key="stat.label" cols="6" md="3">
            <VCard variant="flat" color="rgba(255,255,255,0.1)">
              <VCardText class="pa-4">
                <div class="d-flex align-center mb-2">
                  <VAvatar :color="stat.color" size="40" rounded="lg" class="mr-3">
                    <VIcon color="white" size="20">{{ stat.icon }}</VIcon>
                  </VAvatar>
                  <span class="text-caption text-grey-lighten-1">{{ stat.label }}</span>
                </div>
                <div class="text-h5 font-weight-bold text-white">{{ stat.value }}</div>
                <div v-if="stat.change" class="d-flex align-center mt-1">
                  <VIcon :color="stat.change > 0 ? 'success' : 'error'" size="16">
                    {{ stat.change > 0 ? Icons.TrendingUp : Icons.TrendingDown }}
                  </VIcon>
                  <span :class="stat.change > 0 ? 'text-success' : 'text-error'" class="text-caption ml-1">
                    {{ Math.abs(stat.change) }}%
                  </span>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <!-- Main Dashboard Content -->
    <section class="py-8">
      <VContainer>
        <VRow>
          <!-- Left Column: Accounts & Cards -->
          <VCol cols="12" lg="8">
            <!-- Accounts Overview -->
            <div class="mb-6">
              <div class="d-flex justify-space-between align-center mb-4">
                <h3 class="text-h6 font-weight-bold">Your Accounts</h3>
                <VBtn variant="text" color="primary">View All</VBtn>
              </div>
              <VRow>
                <VCol v-for="account in accounts" :key="account.id" cols="12" sm="6">
                  <VCard variant="outlined">
                    <VCardText class="pa-4">
                      <div class="d-flex justify-space-between align-center mb-3">
                        <div class="d-flex align-center">
                          <VAvatar :color="account.color" size="44" rounded="lg" class="mr-3">
                            <VIcon color="white">{{ account.icon }}</VIcon>
                          </VAvatar>
                          <div>
                            <div class="font-weight-bold">{{ account.name }}</div>
                            <div class="text-caption text-medium-emphasis">{{ account.number }}</div>
                          </div>
                        </div>
                        <VIcon>{{ Icons.ChevronRight }}</VIcon>
                      </div>
                      <div class="text-h5 font-weight-bold">{{ formatCurrency(account.balance) }}</div>
                      <div class="text-caption text-medium-emphasis">Available Balance</div>
                    </VCardText>
                  </VCard>
                </VCol>
              </VRow>
            </div>

            <!-- Recent Transactions -->
            <div class="mb-6">
              <div class="d-flex justify-space-between align-center mb-4">
                <h3 class="text-h6 font-weight-bold">Recent Transactions</h3>
                <VBtn variant="text" color="primary">See All</VBtn>
              </div>
              <VCard variant="outlined">
                <VList lines="two">
                  <template v-for="(tx, idx) in recentTransactions" :key="tx.id">
                    <VListItem>
                      <template #prepend>
                        <VAvatar :color="getTypeColor(tx.type)" size="44" rounded="lg">
                          <VIcon color="white">{{ tx.icon }}</VIcon>
                        </VAvatar>
                      </template>
                      <VListItemTitle class="font-weight-medium">{{ tx.title }}</VListItemTitle>
                      <VListItemSubtitle>{{ tx.category }} · {{ tx.date }}</VListItemSubtitle>
                      <template #append>
                        <span :class="['font-weight-bold', tx.type === 'income' ? 'text-success' : 'text-error']">
                          {{ tx.type === 'income' ? '+' : '-' }}{{ formatCurrency(tx.amount) }}
                        </span>
                      </template>
                    </VListItem>
                    <VDivider v-if="idx < recentTransactions.length - 1" inset />
                  </template>
                </VList>
              </VCard>
            </div>

            <!-- Spending Analytics -->
            <div>
              <div class="d-flex justify-space-between align-center mb-4">
                <h3 class="text-h6 font-weight-bold">Spending by Category</h3>
                <VSelect
                  v-model="selectedPeriod"
                  :items="periods"
                  density="compact"
                  variant="outlined"
                  hide-details
                  style="max-width: 150px"
                />
              </div>
              <VCard variant="outlined">
                <VCardText class="pa-4">
                  <VRow>
                    <VCol v-for="category in spendingCategories" :key="category.name" cols="6" md="4">
                      <div class="d-flex align-center mb-2">
                        <VAvatar :color="category.color" size="36" rounded="lg" class="mr-3">
                          <VIcon color="white" size="18">{{ category.icon }}</VIcon>
                        </VAvatar>
                        <div class="flex-grow-1">
                          <div class="d-flex justify-space-between">
                            <span class="text-body-2 font-weight-medium">{{ category.name }}</span>
                            <span class="text-body-2 font-weight-bold">{{ formatCurrency(category.amount) }}</span>
                          </div>
                          <VProgressLinear
                            :model-value="category.percentage"
                            :color="category.color"
                            height="4"
                            rounded
                            class="mt-1"
                          />
                        </div>
                      </div>
                    </VCol>
                  </VRow>
                </VCardText>
              </VCard>
            </div>
          </VCol>

          <!-- Right Column: Cards & Quick Actions -->
          <VCol cols="12" lg="4">
            <!-- Credit Cards -->
            <div class="mb-6">
              <div class="d-flex justify-space-between align-center mb-4">
                <h3 class="text-h6 font-weight-bold">Your Cards</h3>
                <VBtn icon variant="text" size="small">
                  <VIcon>{{ Icons.Plus }}</VIcon>
                </VBtn>
              </div>

              <VCard class="credit-card mb-4" variant="flat">
                <VCardText class="pa-5 text-white">
                  <div class="d-flex justify-space-between align-center mb-8">
                    <VIcon size="40">{{ Icons.CreditCard }}</VIcon>
                    <VIcon size="24">{{ Icons.Wifi }}</VIcon>
                  </div>
                  <div class="text-h5 font-weight-bold letter-spacing-2 mb-6">
                    •••• •••• •••• 4242
                  </div>
                  <div class="d-flex justify-space-between">
                    <div>
                      <div class="text-caption text-grey-lighten-1">Card Holder</div>
                      <div class="font-weight-medium">JOHN DOE</div>
                    </div>
                    <div class="text-right">
                      <div class="text-caption text-grey-lighten-1">Expires</div>
                      <div class="font-weight-medium">12/25</div>
                    </div>
                  </div>
                </VCardText>
              </VCard>

              <VRow dense>
                <VCol cols="6">
                  <VCard variant="outlined">
                    <VCardText class="pa-3 text-center">
                      <div class="text-caption text-medium-emphasis">Credit Limit</div>
                      <div class="text-subtitle-1 font-weight-bold">$10,000</div>
                    </VCardText>
                  </VCard>
                </VCol>
                <VCol cols="6">
                  <VCard variant="outlined">
                    <VCardText class="pa-3 text-center">
                      <div class="text-caption text-medium-emphasis">Available</div>
                      <div class="text-subtitle-1 font-weight-bold text-success">$7,450</div>
                    </VCardText>
                  </VCard>
                </VCol>
              </VRow>
            </div>

            <!-- Quick Actions -->
            <div class="mb-6">
              <h3 class="text-h6 font-weight-bold mb-4">Quick Actions</h3>
              <VCard variant="outlined">
                <VList>
                  <VListItem v-for="action in quickActions" :key="action.label" class="py-3">
                    <template #prepend>
                      <VAvatar :color="action.color" size="40" rounded="lg">
                        <VIcon color="white" size="20">{{ action.icon }}</VIcon>
                      </VAvatar>
                    </template>
                    <VListItemTitle class="font-weight-medium">{{ action.label }}</VListItemTitle>
                    <VListItemSubtitle>{{ action.description }}</VListItemSubtitle>
                    <template #append>
                      <VIcon>{{ Icons.ChevronRight }}</VIcon>
                    </template>
                  </VListItem>
                </VList>
              </VCard>
            </div>

            <!-- Upcoming Bills -->
            <div>
              <h3 class="text-h6 font-weight-bold mb-4">Upcoming Bills</h3>
              <VCard variant="outlined">
                <VList>
                  <VListItem v-for="bill in upcomingBills" :key="bill.name" class="py-3">
                    <template #prepend>
                      <VAvatar color="grey-lighten-2" size="40" rounded="lg">
                        <VIcon color="grey-darken-1" size="20">{{ bill.icon }}</VIcon>
                      </VAvatar>
                    </template>
                    <VListItemTitle class="font-weight-medium">{{ bill.name }}</VListItemTitle>
                    <VListItemSubtitle>Due {{ bill.dueDate }}</VListItemSubtitle>
                    <template #append>
                      <span class="font-weight-bold">{{ formatCurrency(bill.amount) }}</span>
                    </template>
                  </VListItem>
                </VList>
                <VCardActions class="pa-4 pt-0">
                  <VBtn color="primary" variant="tonal" block>Pay All Bills</VBtn>
                </VCardActions>
              </VCard>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icons, Colors } from '@/shared/model'
import type { TransactionType } from '@/shared/ui/snippets'

const selectedPeriod = ref('This Month')
const periods = ['This Week', 'This Month', 'This Year']

const headerStats = [
  { label: 'Total Balance', value: '$48,562.00', icon: Icons.Wallet, color: 'primary', change: 12.5 },
  { label: 'Total Income', value: '$12,450.00', icon: Icons.TrendingUp, color: 'success', change: 8.2 },
  { label: 'Total Expenses', value: '$4,280.00', icon: Icons.TrendingDown, color: 'error', change: -3.1 },
  { label: 'Savings Goal', value: '68%', icon: Icons.Target, color: 'warning' },
]

const accounts = [
  { id: 1, name: 'Checking Account', number: '****4521', balance: 24562.80, icon: Icons.Bank, color: 'primary' },
  { id: 2, name: 'Savings Account', number: '****7832', balance: 18450.00, icon: Icons.Wallet, color: 'success' },
  { id: 3, name: 'Investment', number: '****1290', balance: 45780.25, icon: Icons.ChartLine, color: 'warning' },
  { id: 4, name: 'Credit Card', number: '****4242', balance: -2550.00, icon: Icons.CreditCard, color: 'error' },
]

const recentTransactions = [
  { id: 1, type: 'expense' as TransactionType, title: 'Netflix', category: 'Entertainment', amount: 15.99, date: 'Today', icon: Icons.Television },
  { id: 2, type: 'income' as TransactionType, title: 'Salary', category: 'Income', amount: 5200, date: 'Yesterday', icon: Icons.Bank },
  { id: 3, type: 'expense' as TransactionType, title: 'Grocery', category: 'Shopping', amount: 89.50, date: 'Dec 24', icon: Icons.Cart },
  { id: 4, type: 'expense' as TransactionType, title: 'Uber', category: 'Transport', amount: 24.50, date: 'Dec 23', icon: Icons.Car },
]

const spendingCategories = [
  { name: 'Housing', amount: 1200, percentage: 35, icon: Icons.Home, color: 'primary' },
  { name: 'Food', amount: 650, percentage: 19, icon: Icons.Store, color: 'success' },
  { name: 'Transport', amount: 420, percentage: 12, icon: Icons.Car, color: 'warning' },
  { name: 'Shopping', amount: 380, percentage: 11, icon: Icons.Cart, color: 'info' },
  { name: 'Entertainment', amount: 250, percentage: 7, icon: Icons.Gamepad, color: 'error' },
  { name: 'Other', amount: 540, percentage: 16, icon: Icons.DotsHorizontal, color: 'secondary' },
]

const quickActions = [
  { label: 'Transfer Money', description: 'Send to friends or accounts', icon: Icons.Send, color: 'primary' },
  { label: 'Pay Bills', description: 'Manage your payments', icon: Icons.Receipt, color: 'success' },
  { label: 'Request Money', description: 'Get paid by others', icon: Icons.Download, color: 'info' },
  { label: 'Investments', description: 'Grow your wealth', icon: Icons.ChartLine, color: 'warning' },
]

const upcomingBills = [
  { name: 'Electricity', dueDate: 'Dec 28', amount: 120, icon: Icons.Bolt },
  { name: 'Internet', dueDate: 'Dec 30', amount: 65, icon: Icons.Wifi },
  { name: 'Insurance', dueDate: 'Jan 1', amount: 250, icon: Icons.Shield },
]

const getTypeColor = (type: TransactionType) => {
  return type === 'income' ? Colors.Success : Colors.Error
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(amount))
}
</script>

<style scoped>
.credit-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border-radius: 16px !important;
}

.letter-spacing-2 {
  letter-spacing: 2px;
}
</style>
