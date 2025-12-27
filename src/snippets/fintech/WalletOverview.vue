<!--
  Snippet: Wallet Overview
  Description: Digital wallet overview with balance, quick actions, and recent transactions
  Components: StatCard, TransactionItem, SectionHeader
  Variants: Multiple wallet card styles included
-->
<template>
  <div>
    <!-- Style 1: Simple Wallet Card -->
    <section class="py-8">
      <VContainer>
        <SectionHeader
          title="My Wallet"
          subtitle="Manage your digital assets and track spending"
          chip="FinTech"
          chip-color="success"
        />

        <VRow>
          <VCol cols="12" md="6" lg="4">
            <VCard class="wallet-card" color="primary" variant="flat">
              <VCardText class="pa-6 text-white">
                <div class="d-flex justify-space-between align-center mb-4">
                  <span class="text-body-2 text-white-darken-1">Total Balance</span>
                  <VIcon>{{ Icons.Eye }}</VIcon>
                </div>
                <h2 class="text-h3 font-weight-bold mb-6">$24,562.80</h2>
                <div class="d-flex ga-2">
                  <VBtn color="white" variant="flat" size="small">
                    <VIcon start>{{ Icons.Plus }}</VIcon>
                    Add Money
                  </VBtn>
                  <VBtn color="white" variant="outlined" size="small">
                    <VIcon start>{{ Icons.Send }}</VIcon>
                    Send
                  </VBtn>
                </div>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12" md="6" lg="8">
            <VRow>
              <VCol v-for="stat in quickStats" :key="stat.label" cols="6" lg="3">
                <StatCard
                  :value="stat.value"
                  :label="stat.label"
                  :icon="stat.icon"
                  :icon-bg-color="stat.color"
                  :trend="stat.trend"
                  :centered="false"
                  value-class="text-h5 text-primary"
                />
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 2: Multi-Currency Wallet -->
    <section class="py-8 bg-grey-lighten-5">
      <VContainer>
        <div class="d-flex justify-space-between align-center mb-6">
          <h3 class="text-h5 font-weight-bold">Currency Accounts</h3>
          <VBtn color="primary" variant="text">
            <VIcon start>{{ Icons.Plus }}</VIcon>
            Add Account
          </VBtn>
        </div>

        <VRow>
          <VCol v-for="account in accounts" :key="account.id" cols="12" sm="6" lg="3">
            <VCard variant="outlined" class="h-100">
              <VCardText class="pa-4">
                <div class="d-flex align-center mb-4">
                  <VAvatar :color="account.color" size="44" rounded="lg" class="mr-3">
                    <VIcon color="white">{{ account.icon }}</VIcon>
                  </VAvatar>
                  <div>
                    <div class="text-subtitle-1 font-weight-bold">{{ account.name }}</div>
                    <div class="text-caption text-medium-emphasis">{{ account.type }}</div>
                  </div>
                </div>
                <div class="text-h5 font-weight-bold mb-1">
                  {{ formatCurrency(account.balance, account.currency) }}
                </div>
                <div class="text-caption text-medium-emphasis">
                  **** {{ account.lastFour }}
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 3: Wallet with Quick Actions -->
    <section class="py-8">
      <VContainer>
        <VCard variant="flat" class="bg-gradient pa-6 text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
          <VRow align="center">
            <VCol cols="12" md="6">
              <div class="text-overline mb-2">Available Balance</div>
              <h2 class="text-h2 font-weight-bold mb-2">$12,450.00</h2>
              <div class="d-flex align-center">
                <VIcon color="success" size="20" class="mr-1">{{ Icons.TrendingUp }}</VIcon>
                <span class="text-success">+12.5%</span>
                <span class="text-white-darken-1 ml-2">vs last month</span>
              </div>
            </VCol>
            <VCol cols="12" md="6">
              <VRow>
                <VCol v-for="action in quickActions" :key="action.label" cols="4">
                  <VCard variant="flat" color="rgba(255,255,255,0.15)" class="text-center pa-4 cursor-pointer" hover>
                    <VIcon size="32" color="white" class="mb-2">{{ action.icon }}</VIcon>
                    <div class="text-caption text-white">{{ action.label }}</div>
                  </VCard>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
        </VCard>
      </VContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/shared/model'
import { SectionHeader, StatCard } from '@/shared/ui/snippets'
import type { IStat, IBankAccount } from '@/shared/ui/snippets'

const quickStats: (IStat & { trend?: number })[] = [
  { value: '$8,420', label: 'Income', icon: Icons.ArrowDown, color: 'success', trend: 12.5 },
  { value: '$3,250', label: 'Expenses', icon: Icons.ArrowUp, color: 'error', trend: -5.2 },
  { value: '$2,150', label: 'Savings', icon: Icons.Wallet, color: 'info', trend: 8.3 },
  { value: '12', label: 'Transactions', icon: Icons.SwapHorizontal, color: 'warning' },
]

const accounts: IBankAccount[] = [
  { id: 1, name: 'US Dollar', type: 'checking', balance: 15420.50, currency: 'USD', lastFour: '4521', icon: Icons.CurrencyUsd, color: 'success' },
  { id: 2, name: 'Euro', type: 'savings', balance: 8250.00, currency: 'EUR', lastFour: '7832', icon: Icons.CurrencyEur, color: 'primary' },
  { id: 3, name: 'Savings', type: 'savings', balance: 25000.00, currency: 'USD', lastFour: '1290', icon: Icons.Bank, color: 'info' },
  { id: 4, name: 'Investment', type: 'investment', balance: 45780.25, currency: 'USD', lastFour: '5567', icon: Icons.ChartLine, color: 'warning' },
]

const quickActions = [
  { icon: Icons.Send, label: 'Send' },
  { icon: Icons.Download, label: 'Receive' },
  { icon: Icons.SwapHorizontal, label: 'Exchange' },
  { icon: Icons.CreditCard, label: 'Card' },
  { icon: Icons.Receipt, label: 'Bills' },
  { icon: Icons.ChartLine, label: 'Invest' },
]

const formatCurrency = (amount: number, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}
</script>

<style scoped>
.wallet-card {
  background: linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%) !important;
}

.bg-gradient {
  border-radius: 16px;
}
</style>
