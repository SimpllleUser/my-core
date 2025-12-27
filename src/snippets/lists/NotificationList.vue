<!--
  Snippet: Notification List
  Description: Notification/activity feed list
  Components: VList, VListItem, VAvatar, VChip, VBtn, VMenu
  Variants: Simple, With Actions, Grouped by Date
-->
<template>
  <VContainer>
    <VRow>
      <!-- Notification Dropdown -->
      <VCol cols="12" md="4">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Dropdown Menu</h3>
        <VMenu max-width="380">
          <template #activator="{ props }">
            <VBtn v-bind="props" color="primary">
              <VBadge content="5" color="error">
                <VIcon>mdi-bell</VIcon>
              </VBadge>
              <span class="ml-2">Notifications</span>
            </VBtn>
          </template>
          <VCard>
            <VCardTitle class="d-flex justify-space-between align-center py-2">
              <span class="text-body-1 font-weight-medium">Notifications</span>
              <VBtn variant="text" size="small" color="primary">Mark all as read</VBtn>
            </VCardTitle>
            <VDivider />
            <VList max-height="400" class="overflow-y-auto">
              <VListItem
                v-for="notification in notifications.slice(0, 5)"
                :key="notification.id"
                :class="{ 'bg-blue-lighten-5': !notification.read }"
              >
                <template #prepend>
                  <VAvatar :color="notification.color" size="40">
                    <VIcon color="white" size="20">{{ notification.icon }}</VIcon>
                  </VAvatar>
                </template>
                <VListItemTitle class="text-body-2">{{ notification.title }}</VListItemTitle>
                <VListItemSubtitle class="text-caption">{{ notification.time }}</VListItemSubtitle>
              </VListItem>
            </VList>
            <VDivider />
            <VCardActions class="justify-center">
              <VBtn variant="text" color="primary">View All Notifications</VBtn>
            </VCardActions>
          </VCard>
        </VMenu>
      </VCol>

      <!-- Full Notification List -->
      <VCol cols="12" md="8">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Full List</h3>
        <VCard>
          <VCardTitle class="d-flex justify-space-between align-center">
            <span>All Notifications</span>
            <div>
              <VBtn variant="text" size="small">Mark all as read</VBtn>
              <VBtn variant="text" size="small" color="error">Clear all</VBtn>
            </div>
          </VCardTitle>

          <VTabs v-model="tab" color="primary">
            <VTab value="all">All</VTab>
            <VTab value="unread">
              Unread
              <VBadge content="3" color="error" inline class="ml-1" />
            </VTab>
            <VTab value="mentions">Mentions</VTab>
          </VTabs>

          <VDivider />

          <VList lines="two">
            <template v-for="(notification, index) in filteredNotifications" :key="notification.id">
              <VListItem
                :class="{ 'bg-blue-lighten-5': !notification.read }"
              >
                <template #prepend>
                  <VAvatar :color="notification.color" size="48">
                    <VImg v-if="notification.avatar" :src="notification.avatar" />
                    <VIcon v-else color="white">{{ notification.icon }}</VIcon>
                  </VAvatar>
                </template>

                <VListItemTitle class="font-weight-medium">
                  {{ notification.title }}
                </VListItemTitle>
                <VListItemSubtitle>
                  {{ notification.description }}
                </VListItemSubtitle>

                <template #append>
                  <div class="text-right">
                    <p class="text-caption text-medium-emphasis mb-1">{{ notification.time }}</p>
                    <VChip v-if="notification.type" :color="getTypeColor(notification.type)" size="x-small">
                      {{ notification.type }}
                    </VChip>
                  </div>
                </template>
              </VListItem>

              <VDivider v-if="index < filteredNotifications.length - 1" />
            </template>
          </VList>

          <VCardActions class="justify-center">
            <VBtn variant="text" color="primary">Load More</VBtn>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>

    <!-- Activity Feed -->
    <VRow class="mt-6">
      <VCol cols="12">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Activity Feed (Timeline)</h3>
        <VCard>
          <VCardTitle>Recent Activity</VCardTitle>
          <VCardText>
            <VTimeline density="compact" side="end">
              <VTimelineItem
                v-for="activity in activities"
                :key="activity.id"
                :dot-color="activity.color"
                size="small"
              >
                <template #icon>
                  <VIcon size="16" color="white">{{ activity.icon }}</VIcon>
                </template>
                <div class="d-flex justify-space-between align-start">
                  <div>
                    <p class="text-body-2 font-weight-medium mb-1">{{ activity.title }}</p>
                    <p class="text-caption text-medium-emphasis mb-0">{{ activity.description }}</p>
                  </div>
                  <span class="text-caption text-medium-emphasis">{{ activity.time }}</span>
                </div>
              </VTimelineItem>
            </VTimeline>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const tab = ref('all')

const notifications = [
  { id: 1, title: 'New order received', description: 'Order #12345 from John Doe', time: '2 min ago', icon: 'mdi-cart', color: 'success', read: false, type: 'order' },
  { id: 2, title: 'Payment confirmed', description: '$450.00 payment received', time: '15 min ago', icon: 'mdi-cash-check', color: 'primary', read: false, type: 'payment' },
  { id: 3, title: 'New user registered', description: 'Sarah Johnson joined', time: '1 hour ago', icon: 'mdi-account-plus', color: 'info', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', read: false, type: 'user' },
  { id: 4, title: 'Server alert', description: 'High CPU usage detected', time: '2 hours ago', icon: 'mdi-alert', color: 'warning', read: true, type: 'alert' },
  { id: 5, title: 'Comment on your post', description: '@mike mentioned you in a comment', time: '3 hours ago', icon: 'mdi-comment', color: 'secondary', read: true, type: 'mention' },
  { id: 6, title: 'Task completed', description: 'Project Alpha deployment finished', time: '5 hours ago', icon: 'mdi-check-circle', color: 'success', read: true, type: 'task' },
  { id: 7, title: 'New follower', description: 'Emma Wilson started following you', time: '1 day ago', icon: 'mdi-account-plus', color: 'primary', avatar: 'https://randomuser.me/api/portraits/women/28.jpg', read: true, type: 'social' },
]

const activities = [
  { id: 1, title: 'John Doe created a new project', description: 'Project "Dashboard Redesign" was created', time: '10 min ago', icon: 'mdi-folder-plus', color: 'primary' },
  { id: 2, title: 'New team member added', description: 'Sarah Johnson joined the team', time: '1 hour ago', icon: 'mdi-account-plus', color: 'success' },
  { id: 3, title: 'Task status updated', description: 'Task "Fix login bug" moved to Done', time: '2 hours ago', icon: 'mdi-check', color: 'success' },
  { id: 4, title: 'Comment added', description: 'Mike commented on "API Integration"', time: '3 hours ago', icon: 'mdi-comment', color: 'info' },
  { id: 5, title: 'File uploaded', description: 'design-mockup.fig uploaded to Assets', time: '5 hours ago', icon: 'mdi-file-upload', color: 'warning' },
]

const filteredNotifications = computed(() => {
  if (tab.value === 'unread') return notifications.filter(n => !n.read)
  if (tab.value === 'mentions') return notifications.filter(n => n.type === 'mention')
  return notifications
})

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    order: 'success',
    payment: 'primary',
    user: 'info',
    alert: 'warning',
    mention: 'secondary',
    task: 'success',
    social: 'primary',
  }
  return colors[type] || 'grey'
}
</script>
