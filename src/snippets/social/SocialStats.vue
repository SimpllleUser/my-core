<!--
  Snippet: Social Stats
  Description: Social media analytics and engagement statistics
  Components: StatCard, SectionHeader
  Variants: Overview cards, detailed analytics, engagement metrics
-->
<template>
  <div>
    <!-- Style 1: Overview Stats Cards -->
    <section class="py-8">
      <VContainer>
        <SectionHeader
          title="Your Analytics"
          subtitle="Track your social media performance and growth"
          chip="Analytics"
          chip-color="primary"
        />

        <VRow>
          <VCol v-for="stat in overviewStats" :key="stat.label" cols="6" md="3">
            <StatCard
              :value="stat.value"
              :label="stat.label"
              :icon="stat.icon"
              :icon-bg-color="stat.color"
              :trend="stat.trend"
              trend-label="vs last week"
            />
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 2: Engagement Analytics -->
    <section class="py-8 bg-grey-lighten-5">
      <VContainer>
        <VRow>
          <!-- Main Chart Area -->
          <VCol cols="12" lg="8">
            <VCard variant="outlined">
              <VCardTitle class="d-flex justify-space-between align-center pa-4">
                <span class="text-h6 font-weight-bold">Engagement Overview</span>
                <VBtnToggle v-model="timePeriod" mandatory variant="outlined" density="compact">
                  <VBtn value="7d">7D</VBtn>
                  <VBtn value="30d">30D</VBtn>
                  <VBtn value="90d">90D</VBtn>
                </VBtnToggle>
              </VCardTitle>
              <VDivider />
              <VCardText class="pa-4">
                <VRow class="mb-4">
                  <VCol v-for="metric in engagementMetrics" :key="metric.label" cols="4">
                    <div class="text-center">
                      <div :class="['text-h5 font-weight-bold', `text-${metric.color}`]">
                        {{ metric.value }}
                      </div>
                      <div class="text-body-2 text-medium-emphasis">{{ metric.label }}</div>
                      <VChip :color="metric.trend > 0 ? 'success' : 'error'" size="x-small" variant="tonal" class="mt-1">
                        {{ metric.trend > 0 ? '+' : '' }}{{ metric.trend }}%
                      </VChip>
                    </div>
                  </VCol>
                </VRow>

                <!-- Chart Placeholder -->
                <div class="chart-placeholder d-flex align-center justify-center" style="height: 250px; background: #f5f5f5; border-radius: 8px;">
                  <div class="text-center text-medium-emphasis">
                    <VIcon size="48" class="mb-2">{{ Icons.ChartLine }}</VIcon>
                    <div>Engagement Chart</div>
                  </div>
                </div>
              </VCardText>
            </VCard>
          </VCol>

          <!-- Side Stats -->
          <VCol cols="12" lg="4">
            <VCard variant="outlined" class="mb-4">
              <VCardTitle class="text-subtitle-1 font-weight-bold pb-0">Top Performing Post</VCardTitle>
              <VCardText class="pa-4">
                <VImg src="https://picsum.photos/seed/top/300/200" height="120" cover rounded="lg" class="mb-3" />
                <p class="text-body-2 mb-2 line-clamp-2">
                  "Excited to announce our new product launch! 🚀 #startup #innovation"
                </p>
                <VRow dense>
                  <VCol cols="4" class="text-center">
                    <div class="font-weight-bold">12.5K</div>
                    <div class="text-caption text-medium-emphasis">Likes</div>
                  </VCol>
                  <VCol cols="4" class="text-center">
                    <div class="font-weight-bold">856</div>
                    <div class="text-caption text-medium-emphasis">Comments</div>
                  </VCol>
                  <VCol cols="4" class="text-center">
                    <div class="font-weight-bold">2.3K</div>
                    <div class="text-caption text-medium-emphasis">Shares</div>
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>

            <VCard variant="outlined">
              <VCardTitle class="text-subtitle-1 font-weight-bold pb-0">Audience Insights</VCardTitle>
              <VCardText class="pa-4">
                <div v-for="insight in audienceInsights" :key="insight.label" class="mb-3">
                  <div class="d-flex justify-space-between mb-1">
                    <span class="text-body-2">{{ insight.label }}</span>
                    <span class="text-body-2 font-weight-medium">{{ insight.value }}</span>
                  </div>
                  <VProgressLinear :model-value="insight.percentage" :color="insight.color" height="6" rounded />
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 3: Detailed Metrics Grid -->
    <section class="py-8">
      <VContainer>
        <div class="d-flex justify-space-between align-center mb-6">
          <h3 class="text-h5 font-weight-bold">Content Performance</h3>
          <VSelect
            v-model="contentType"
            :items="contentTypes"
            density="compact"
            variant="outlined"
            hide-details
            style="max-width: 150px"
          />
        </div>

        <VRow>
          <VCol v-for="content in contentPerformance" :key="content.id" cols="12" sm="6" md="4">
            <VCard variant="outlined">
              <VImg :src="content.thumbnail" height="150" cover />
              <VCardText class="pa-4">
                <div class="d-flex align-center justify-space-between mb-2">
                  <VChip :color="content.typeColor" size="small" variant="tonal">
                    {{ content.type }}
                  </VChip>
                  <span class="text-caption text-medium-emphasis">{{ content.date }}</span>
                </div>
                <p class="text-body-2 mb-3 line-clamp-2">{{ content.caption }}</p>

                <VRow dense>
                  <VCol cols="3" class="text-center">
                    <VIcon size="16" color="error" class="mb-1">{{ Icons.Heart }}</VIcon>
                    <div class="text-caption font-weight-medium">{{ formatNumber(content.likes) }}</div>
                  </VCol>
                  <VCol cols="3" class="text-center">
                    <VIcon size="16" color="primary" class="mb-1">{{ Icons.Comment }}</VIcon>
                    <div class="text-caption font-weight-medium">{{ formatNumber(content.comments) }}</div>
                  </VCol>
                  <VCol cols="3" class="text-center">
                    <VIcon size="16" color="success" class="mb-1">{{ Icons.Share }}</VIcon>
                    <div class="text-caption font-weight-medium">{{ formatNumber(content.shares) }}</div>
                  </VCol>
                  <VCol cols="3" class="text-center">
                    <VIcon size="16" color="warning" class="mb-1">{{ Icons.Eye }}</VIcon>
                    <div class="text-caption font-weight-medium">{{ formatNumber(content.views) }}</div>
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 4: Growth Stats -->
    <section class="py-8 bg-grey-lighten-5">
      <VContainer>
        <h3 class="text-h5 font-weight-bold mb-6">Growth Metrics</h3>

        <VRow>
          <VCol v-for="growth in growthMetrics" :key="growth.metric" cols="12" md="6" lg="3">
            <VCard variant="flat" class="h-100">
              <VCardText class="pa-4">
                <div class="d-flex align-center justify-space-between mb-4">
                  <div class="d-flex align-center">
                    <VAvatar :color="growth.color" size="40" rounded="lg" class="mr-3">
                      <VIcon color="white" size="20">{{ growth.icon }}</VIcon>
                    </VAvatar>
                    <span class="text-subtitle-2 font-weight-medium">{{ growth.metric }}</span>
                  </div>
                  <VChip :color="growth.change > 0 ? 'success' : 'error'" size="small" variant="tonal">
                    {{ growth.change > 0 ? '+' : '' }}{{ growth.change }}%
                  </VChip>
                </div>

                <div class="text-h4 font-weight-bold mb-2">{{ growth.current }}</div>

                <div class="d-flex align-center text-caption text-medium-emphasis">
                  <span>{{ growth.previous }} last month</span>
                  <VIcon size="14" :color="growth.change > 0 ? 'success' : 'error'" class="ml-2">
                    {{ growth.change > 0 ? Icons.TrendingUp : Icons.TrendingDown }}
                  </VIcon>
                </div>

                <VProgressLinear
                  :model-value="growth.progress"
                  :color="growth.color"
                  height="6"
                  rounded
                  class="mt-3"
                />
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
import { Icons } from '@/shared/model'
import { SectionHeader, StatCard } from '@/shared/ui/snippets'
import type { IStat } from '@/shared/ui/snippets'

const timePeriod = ref('7d')
const contentType = ref('All')
const contentTypes = ['All', 'Photos', 'Videos', 'Stories', 'Reels']

const overviewStats: (IStat & { trend?: number })[] = [
  { value: '125.4K', label: 'Followers', icon: Icons.AccountGroup, color: 'primary', trend: 12.5 },
  { value: '2.8M', label: 'Impressions', icon: Icons.Eye, color: 'info', trend: 8.3 },
  { value: '156K', label: 'Engagement', icon: Icons.Heart, color: 'error', trend: 15.2 },
  { value: '4.2%', label: 'Engagement Rate', icon: Icons.ChartLine, color: 'success', trend: 2.1 },
]

const engagementMetrics = [
  { label: 'Likes', value: '45.2K', color: 'error', trend: 12 },
  { label: 'Comments', value: '8.9K', color: 'primary', trend: -3 },
  { label: 'Shares', value: '2.4K', color: 'success', trend: 25 },
]

const audienceInsights = [
  { label: '18-24 years', value: '35%', percentage: 35, color: 'primary' },
  { label: '25-34 years', value: '42%', percentage: 42, color: 'success' },
  { label: '35-44 years', value: '15%', percentage: 15, color: 'info' },
  { label: '45+ years', value: '8%', percentage: 8, color: 'warning' },
]

const contentPerformance = [
  { id: 1, type: 'Photo', typeColor: 'primary', thumbnail: 'https://picsum.photos/seed/c1/300/200', caption: 'Beautiful sunset at the beach! 🌅 #photography', date: 'Dec 25', likes: 12500, comments: 456, shares: 234, views: 45600 },
  { id: 2, type: 'Video', typeColor: 'error', thumbnail: 'https://picsum.photos/seed/c2/300/200', caption: 'Behind the scenes of our latest project 🎬', date: 'Dec 24', likes: 8900, comments: 312, shares: 567, views: 89200 },
  { id: 3, type: 'Reel', typeColor: 'warning', thumbnail: 'https://picsum.photos/seed/c3/300/200', caption: 'Quick tutorial on productivity tips! ⚡', date: 'Dec 23', likes: 25600, comments: 890, shares: 1200, views: 156000 },
  { id: 4, type: 'Story', typeColor: 'success', thumbnail: 'https://picsum.photos/seed/c4/300/200', caption: 'Day in my life working from home 🏠', date: 'Dec 22', likes: 5600, comments: 123, shares: 89, views: 23400 },
  { id: 5, type: 'Photo', typeColor: 'primary', thumbnail: 'https://picsum.photos/seed/c5/300/200', caption: 'New office setup! What do you think? 💻', date: 'Dec 21', likes: 15800, comments: 567, shares: 345, views: 67800 },
  { id: 6, type: 'Video', typeColor: 'error', thumbnail: 'https://picsum.photos/seed/c6/300/200', caption: 'Answering your questions about tech 🎤', date: 'Dec 20', likes: 7800, comments: 456, shares: 234, views: 45600 },
]

const growthMetrics = [
  { metric: 'Followers', current: '125.4K', previous: '112K', change: 12, progress: 75, icon: Icons.AccountGroup, color: 'primary' },
  { metric: 'Reach', current: '2.8M', previous: '2.4M', change: 16, progress: 82, icon: Icons.Earth, color: 'info' },
  { metric: 'Profile Views', current: '45.6K', previous: '42K', change: 8, progress: 68, icon: Icons.Eye, color: 'success' },
  { metric: 'Link Clicks', current: '8.9K', previous: '9.2K', change: -3, progress: 45, icon: Icons.Link, color: 'warning' },
]

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
