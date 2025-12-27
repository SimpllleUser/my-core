<template>
  <VContainer fluid class="pa-6">
    <!-- Header -->
    <VRow class="mb-6">
      <VCol cols="12">
        <VBtn
          to="/examples"
          variant="text"
          prepend-icon="mdi-arrow-left"
          class="mb-4"
        >
          Back to Examples
        </VBtn>
        <h1 class="text-h3 font-weight-bold mb-2">
          <VIcon icon="mdi-bank" size="large" color="teal" class="mr-2" />
          FinTech
        </h1>
        <p class="text-h6 text-medium-emphasis">
          Banking dashboards, crypto portfolios, wallets, and payment forms
        </p>
      </VCol>
    </VRow>

    <!-- Wallet Overview -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-wallet" class="mr-2" />
            Wallet Overview
            <VSpacer />
            <VChip color="teal" size="small">StatCard, SectionHeader, VCard</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Digital wallet overview with balance and quick actions</p>
            <WalletOverview />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Transaction History -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-history" class="mr-2" />
            Transaction History
            <VSpacer />
            <VChip color="teal" size="small">TransactionItem, VCard, VList</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Transaction list with filters and search functionality</p>
            <TransactionHistory />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Crypto Portfolio -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-bitcoin" class="mr-2" />
            Crypto Portfolio
            <VSpacer />
            <VChip color="teal" size="small">CryptoCard, StatCard, VTable</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Cryptocurrency portfolio with assets and market data</p>
            <CryptoPortfolio />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Payment Form -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-credit-card" class="mr-2" />
            Payment Form
            <VSpacer />
            <VChip color="teal" size="small">VCard, VTextField, VForm</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Payment forms with card input and checkout</p>
            <PaymentForm />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Banking Dashboard -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-bank-transfer" class="mr-2" />
            Banking Dashboard
            <VSpacer />
            <VChip color="teal" size="small">StatCard, VCard, VList, VTable</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Full banking dashboard with accounts and analytics</p>
            <BankingDashboard />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import {
  WalletOverview,
  TransactionHistory,
  CryptoPortfolio,
  PaymentForm,
  BankingDashboard
} from '@/snippets'
</script>
