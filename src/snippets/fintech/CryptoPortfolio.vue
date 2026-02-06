<!--
  Snippet: Crypto Portfolio
  Description: Cryptocurrency portfolio with assets, charts, and market data
  Components: CryptoCard, StatCard, SectionHeader
  Variants: Portfolio view, market cards, detailed list
-->
<template>
  <div>
    <!-- Style 1: Portfolio Overview -->
    <section class="py-8">
      <VContainer>
        <SectionHeader
          title="Crypto Portfolio"
          subtitle="Track your cryptocurrency investments in real-time"
          chip="Crypto"
          chip-color="warning"
        />

        <VRow class="mb-8">
          <VCol cols="12" md="4">
            <VCard variant="flat" color="warning" class="text-white">
              <VCardText class="pa-6">
                <div class="text-overline mb-2">Total Portfolio Value</div>
                <h2 class="text-h3 font-weight-bold mb-2">$47,825.42</h2>
                <div class="d-flex align-center">
                  <VIcon color="success" class="mr-1">{{ Icons.TrendingUp }}</VIcon>
                  <span class="text-success font-weight-medium">+$2,450.32 (5.4%)</span>
                  <span class="ml-2">24h</span>
                </div>
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="12" md="8">
            <VRow>
              <VCol v-for="stat in portfolioStats" :key="stat.label" cols="6" md="3">
                <StatCard
                  :value="stat.value"
                  :label="stat.label"
                  :icon="stat.icon"
                  :icon-bg-color="stat.color"
                  :trend="stat.trend"
                  value-class="text-h6"
                />
              </VCol>
            </VRow>
          </VCol>
        </VRow>

        <VRow>
          <VCol v-for="asset in cryptoAssets" :key="asset.id" cols="12" sm="6" lg="3">
            <CryptoCard
              :name="asset.name"
              :symbol="asset.symbol"
              :icon="asset.icon"
              :price="asset.price"
              :change24h="asset.change24h"
              :balance="asset.balance"
              :value="asset.value"
            />
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 2: Market Overview Cards -->
    <section class="py-8 bg-grey-lighten-5">
      <VContainer>
        <div class="d-flex justify-space-between align-center mb-6">
          <h3 class="text-h5 font-weight-bold">Market Overview</h3>
          <VBtn color="primary" variant="text">
            View All Markets
            <VIcon end>{{ Icons.ArrowRight }}</VIcon>
          </VBtn>
        </div>

        <VRow>
          <VCol v-for="coin in marketCoins" :key="coin.symbol" cols="12" sm="6" md="4" lg="2">
            <VCard variant="outlined" hover class="text-center">
              <VCardText class="pa-4">
                <VAvatar size="48" class="mb-2">
                  <VImg :src="coin.icon" :alt="coin.name" />
                </VAvatar>
                <div class="text-subtitle-2 font-weight-bold">{{ coin.symbol }}</div>
                <div class="text-h6 font-weight-bold my-1">{{ formatPrice(coin.price) }}</div>
                <VChip
                  :color="coin.change >= 0 ? 'success' : 'error'"
                  size="small"
                  variant="tonal"
                >
                  <VIcon start size="14">
                    {{ coin.change >= 0 ? Icons.TrendingUp : Icons.TrendingDown }}
                  </VIcon>
                  {{ Math.abs(coin.change).toFixed(2) }}%
                </VChip>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 3: Detailed Asset Table -->
    <section class="py-8">
      <VContainer>
        <div class="d-flex justify-space-between align-center mb-6">
          <h3 class="text-h5 font-weight-bold">Your Assets</h3>
          <div class="d-flex ga-2">
            <VTextField
              v-model="search"
              :prepend-inner-icon="Icons.Search"
              placeholder="Search assets..."
              density="compact"
              variant="outlined"
              hide-details
              style="max-width: 200px"
            />
            <VBtn color="primary">
              <VIcon start>{{ Icons.Plus }}</VIcon>
              Buy Crypto
            </VBtn>
          </div>
        </div>

        <VCard variant="outlined">
          <VTable>
            <thead>
              <tr>
                <th class="text-left">Asset</th>
                <th class="text-right">Price</th>
                <th class="text-right">24h Change</th>
                <th class="text-right">Holdings</th>
                <th class="text-right">Value</th>
                <th class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="asset in detailedAssets" :key="asset.symbol">
                <td>
                  <div class="d-flex align-center py-2">
                    <VAvatar size="36" class="mr-3">
                      <VImg :src="asset.icon" :alt="asset.name" />
                    </VAvatar>
                    <div>
                      <div class="font-weight-bold">{{ asset.name }}</div>
                      <div class="text-caption text-medium-emphasis">{{ asset.symbol }}</div>
                    </div>
                  </div>
                </td>
                <td class="text-right font-weight-medium">{{ formatPrice(asset.price) }}</td>
                <td class="text-right">
                  <VChip
                    :color="asset.change24h >= 0 ? 'success' : 'error'"
                    size="small"
                    variant="tonal"
                  >
                    {{ asset.change24h >= 0 ? '+' : '' }}{{ asset.change24h.toFixed(2) }}%
                  </VChip>
                </td>
                <td class="text-right">
                  <div class="font-weight-medium">{{ asset.balance }} {{ asset.symbol }}</div>
                </td>
                <td class="text-right font-weight-bold">{{ formatCurrency(asset.value) }}</td>
                <td class="text-right">
                  <VBtn size="small" color="success" variant="text" class="mr-1">Buy</VBtn>
                  <VBtn size="small" color="error" variant="text">Sell</VBtn>
                </td>
              </tr>
            </tbody>
          </VTable>
        </VCard>
      </VContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icons } from '@/shared/model'
import { SectionHeader, StatCard, CryptoCard } from '@/shared/ui/snippets'
import type { IStat, ICryptoAsset } from '@/shared/ui/snippets'

const search = ref('')

const portfolioStats: (IStat & { trend?: number })[] = [
  { value: '8', label: 'Assets', icon: Icons.Wallet, color: 'primary' },
  { value: '+$2.4K', label: 'Today P/L', icon: Icons.TrendingUp, color: 'success', trend: 5.4 },
  { value: '34%', label: 'BTC Dominance', icon: Icons.ChartPie, color: 'warning' },
  { value: '$12K', label: 'Available', icon: Icons.CashMultiple, color: 'info' },
]

const cryptoAssets: ICryptoAsset[] = [
  { id: 1, name: 'Bitcoin', symbol: 'BTC', icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', price: 43250.50, change24h: 2.45, balance: 0.5, value: 21625.25 },
  { id: 2, name: 'Ethereum', symbol: 'ETH', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', price: 2280.30, change24h: -1.23, balance: 5.2, value: 11857.56 },
  { id: 3, name: 'Solana', symbol: 'SOL', icon: 'https://cryptologos.cc/logos/solana-sol-logo.png', price: 98.45, change24h: 8.67, balance: 85, value: 8368.25 },
  { id: 4, name: 'Cardano', symbol: 'ADA', icon: 'https://cryptologos.cc/logos/cardano-ada-logo.png', price: 0.58, change24h: -0.45, balance: 10250, value: 5945.00 },
]

const marketCoins = [
  { name: 'Bitcoin', symbol: 'BTC', icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', price: 43250.50, change: 2.45 },
  { name: 'Ethereum', symbol: 'ETH', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', price: 2280.30, change: -1.23 },
  { name: 'BNB', symbol: 'BNB', icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png', price: 312.80, change: 0.85 },
  { name: 'Solana', symbol: 'SOL', icon: 'https://cryptologos.cc/logos/solana-sol-logo.png', price: 98.45, change: 8.67 },
  { name: 'XRP', symbol: 'XRP', icon: 'https://cryptologos.cc/logos/xrp-xrp-logo.png', price: 0.62, change: -2.15 },
  { name: 'Cardano', symbol: 'ADA', icon: 'https://cryptologos.cc/logos/cardano-ada-logo.png', price: 0.58, change: -0.45 },
]

const detailedAssets = [
  { name: 'Bitcoin', symbol: 'BTC', icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', price: 43250.50, change24h: 2.45, balance: 0.5, value: 21625.25 },
  { name: 'Ethereum', symbol: 'ETH', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', price: 2280.30, change24h: -1.23, balance: 5.2, value: 11857.56 },
  { name: 'Solana', symbol: 'SOL', icon: 'https://cryptologos.cc/logos/solana-sol-logo.png', price: 98.45, change24h: 8.67, balance: 85, value: 8368.25 },
  { name: 'Cardano', symbol: 'ADA', icon: 'https://cryptologos.cc/logos/cardano-ada-logo.png', price: 0.58, change24h: -0.45, balance: 10250, value: 5945.00 },
]

const formatPrice = (price: number) => {
  if (price >= 1) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
  }
  return `$${price.toFixed(4)}`
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}
</script>
