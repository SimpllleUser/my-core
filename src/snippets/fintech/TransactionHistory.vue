<!--
  Snippet: Transaction History
  Description: Transaction list with filters, search, and different display styles
  Components: TransactionItem
  Variants: List view, grouped by date, with filters
-->
<template>
  <div>
    <!-- Style 1: Simple Transaction List -->
    <section class="py-8">
      <VContainer>
        <div class="d-flex justify-space-between align-center mb-6">
          <h3 class="text-h5 font-weight-bold">Recent Transactions</h3>
          <VBtn color="primary" variant="text">View All</VBtn>
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
                <VListItemSubtitle>{{ tx.description }} · {{ tx.date }}</VListItemSubtitle>

                <template #append>
                  <div class="text-right">
                    <div :class="['font-weight-bold', getAmountClass(tx.type)]">
                      {{ getAmountPrefix(tx.type) }}{{ formatCurrency(tx.amount) }}
                    </div>
                    <VChip :color="getStatusColor(tx.status)" size="x-small" variant="tonal">
                      {{ tx.status }}
                    </VChip>
                  </div>
                </template>
              </VListItem>
              <VDivider v-if="idx < recentTransactions.length - 1" inset />
            </template>
          </VList>
        </VCard>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 2: Grouped by Date with Filters -->
    <section class="py-8 bg-grey-lighten-5">
      <VContainer>
        <div class="d-flex flex-wrap justify-space-between align-center mb-6 ga-4">
          <h3 class="text-h5 font-weight-bold">Transaction History</h3>
          <div class="d-flex ga-2">
            <VTextField
              v-model="searchQuery"
              :prepend-inner-icon="Icons.Search"
              placeholder="Search transactions..."
              density="compact"
              variant="outlined"
              hide-details
              style="max-width: 250px"
            />
            <VSelect
              v-model="typeFilter"
              :items="typeFilters"
              density="compact"
              variant="outlined"
              hide-details
              style="max-width: 150px"
            />
            <VBtn icon variant="outlined">
              <VIcon>{{ Icons.Filter }}</VIcon>
            </VBtn>
          </div>
        </div>

        <VCard variant="flat">
          <template v-for="group in groupedTransactions" :key="group.date">
            <div class="px-4 py-2 bg-grey-lighten-4">
              <span class="text-subtitle-2 text-medium-emphasis">{{ group.date }}</span>
              <span class="text-caption text-medium-emphasis ml-2">
                ({{ formatCurrency(group.total) }})
              </span>
            </div>
            <VList lines="two">
              <template v-for="(tx, idx) in group.transactions" :key="tx.id">
                <VListItem>
                  <template #prepend>
                    <VAvatar :color="getTypeColor(tx.type)" size="40" rounded="lg">
                      <VIcon color="white" size="20">{{ tx.icon }}</VIcon>
                    </VAvatar>
                  </template>

                  <VListItemTitle class="text-body-2 font-weight-medium">
                    {{ tx.title }}
                  </VListItemTitle>
                  <VListItemSubtitle class="text-caption">
                    {{ tx.category }} · {{ tx.time }}
                  </VListItemSubtitle>

                  <template #append>
                    <span :class="['text-subtitle-2 font-weight-bold', getAmountClass(tx.type)]">
                      {{ getAmountPrefix(tx.type) }}{{ formatCurrency(tx.amount) }}
                    </span>
                  </template>
                </VListItem>
                <VDivider v-if="idx < group.transactions.length - 1" inset />
              </template>
            </VList>
          </template>
        </VCard>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 3: Card-based Transaction View -->
    <section class="py-8">
      <VContainer>
        <div class="d-flex justify-space-between align-center mb-6">
          <div>
            <h3 class="text-h5 font-weight-bold">Activity</h3>
            <p class="text-body-2 text-medium-emphasis mb-0">Your financial activity this month</p>
          </div>
          <VBtnToggle v-model="viewMode" mandatory variant="outlined" density="compact">
            <VBtn value="list" icon><VIcon>{{ Icons.ViewList }}</VIcon></VBtn>
            <VBtn value="grid" icon><VIcon>{{ Icons.ViewGrid }}</VIcon></VBtn>
          </VBtnToggle>
        </div>

        <VRow>
          <VCol v-for="tx in cardTransactions" :key="tx.id" cols="12" sm="6" md="4">
            <VCard variant="outlined" hover>
              <VCardText class="pa-4">
                <div class="d-flex align-center mb-3">
                  <VAvatar :color="getTypeColor(tx.type)" size="48" rounded="lg" class="mr-3">
                    <VIcon color="white">{{ tx.icon }}</VIcon>
                  </VAvatar>
                  <div class="flex-grow-1">
                    <div class="text-subtitle-1 font-weight-bold">{{ tx.title }}</div>
                    <div class="text-caption text-medium-emphasis">{{ tx.category }}</div>
                  </div>
                  <VChip :color="getStatusColor(tx.status)" size="small" variant="tonal">
                    {{ tx.status }}
                  </VChip>
                </div>
                <VDivider class="mb-3" />
                <div class="d-flex justify-space-between align-center">
                  <div>
                    <div class="text-caption text-medium-emphasis">Amount</div>
                    <div :class="['text-h6 font-weight-bold', getAmountClass(tx.type)]">
                      {{ getAmountPrefix(tx.type) }}{{ formatCurrency(tx.amount) }}
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-caption text-medium-emphasis">Date</div>
                    <div class="text-body-2">{{ tx.date }}</div>
                  </div>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icons, Colors } from '@/shared/model'
import type { ITransaction, TransactionType, TransactionStatus } from '@/shared/ui/snippets'

const searchQuery = ref('')
const typeFilter = ref('all')
const viewMode = ref('list')

const typeFilters = ['all', 'income', 'expense', 'transfer']

interface TransactionItem extends ITransaction {
  time?: string
}

const recentTransactions: TransactionItem[] = [
  { id: 1, type: 'income', status: 'completed', title: 'Salary Deposit', description: 'Monthly salary', amount: 5200, date: 'Dec 25, 2024', icon: Icons.Bank },
  { id: 2, type: 'expense', status: 'completed', title: 'Netflix', description: 'Subscription', amount: 15.99, date: 'Dec 24, 2024', icon: Icons.Television },
  { id: 3, type: 'expense', status: 'pending', title: 'Amazon', description: 'Online shopping', amount: 89.50, date: 'Dec 24, 2024', icon: Icons.Cart },
  { id: 4, type: 'transfer', status: 'completed', title: 'To Savings', description: 'Monthly savings', amount: 500, date: 'Dec 23, 2024', icon: Icons.SwapHorizontal },
  { id: 5, type: 'expense', status: 'failed', title: 'Utility Bill', description: 'Electricity', amount: 120, date: 'Dec 22, 2024', icon: Icons.Bolt },
]

const groupedTransactions = [
  {
    date: 'Today, Dec 25',
    total: 5184.01,
    transactions: [
      { id: 1, type: 'income' as TransactionType, status: 'completed' as TransactionStatus, title: 'Salary Deposit', category: 'Income', amount: 5200, time: '09:30 AM', icon: Icons.Bank },
      { id: 2, type: 'expense' as TransactionType, status: 'completed' as TransactionStatus, title: 'Coffee Shop', category: 'Food & Drinks', amount: 15.99, time: '11:45 AM', icon: Icons.Coffee || Icons.Store },
    ],
  },
  {
    date: 'Yesterday, Dec 24',
    total: -105.49,
    transactions: [
      { id: 3, type: 'expense' as TransactionType, status: 'completed' as TransactionStatus, title: 'Uber Ride', category: 'Transport', amount: 24.50, time: '08:15 PM', icon: Icons.Car },
      { id: 4, type: 'expense' as TransactionType, status: 'completed' as TransactionStatus, title: 'Grocery Store', category: 'Shopping', amount: 80.99, time: '06:30 PM', icon: Icons.Cart },
    ],
  },
]

const cardTransactions: TransactionItem[] = [
  { id: 1, type: 'income', status: 'completed', title: 'Freelance Payment', category: 'Work', amount: 1500, date: 'Dec 25', icon: Icons.Briefcase },
  { id: 2, type: 'expense', status: 'completed', title: 'Rent Payment', category: 'Housing', amount: 1200, date: 'Dec 24', icon: Icons.Home },
  { id: 3, type: 'transfer', status: 'pending', title: 'Investment', category: 'Finance', amount: 500, date: 'Dec 23', icon: Icons.ChartLine },
  { id: 4, type: 'expense', status: 'completed', title: 'Insurance', category: 'Bills', amount: 250, date: 'Dec 22', icon: Icons.Shield },
  { id: 5, type: 'income', status: 'completed', title: 'Refund', category: 'Shopping', amount: 45.99, date: 'Dec 21', icon: Icons.CashRefund },
  { id: 6, type: 'expense', status: 'failed', title: 'Subscription', category: 'Entertainment', amount: 9.99, date: 'Dec 20', icon: Icons.Play },
]

const getTypeColor = (type: TransactionType) => {
  const colors = { income: Colors.Success, expense: Colors.Error, transfer: Colors.Info }
  return colors[type]
}

const getStatusColor = (status: TransactionStatus) => {
  const colors = { completed: Colors.Success, pending: Colors.Warning, failed: Colors.Error }
  return colors[status]
}

const getAmountClass = (type: TransactionType) => {
  if (type === 'income') return 'text-success'
  if (type === 'expense') return 'text-error'
  return ''
}

const getAmountPrefix = (type: TransactionType) => {
  if (type === 'income') return '+'
  if (type === 'expense') return '-'
  return ''
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}
</script>
