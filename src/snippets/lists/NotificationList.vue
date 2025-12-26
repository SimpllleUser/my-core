<!--
  Snippet: Notification List
  Description: Notification/activity feed list
  Components: VList, VListItem, VAvatar, VChip, VBtn, VMenu
  Variants: Simple, With Actions, Grouped by Date
-->
<template>
  <v-container>
    <v-row>
      <!-- Notification Dropdown -->
      <v-col cols="12" md="4">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Dropdown Menu</h3>
        <v-menu max-width="380">
          <template #activator="{ props }">
            <v-btn v-bind="props" color="primary">
              <v-badge content="5" color="error">
                <v-icon>mdi-bell</v-icon>
              </v-badge>
              <span class="ml-2">Notifications</span>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="d-flex justify-space-between align-center py-2">
              <span class="text-body-1 font-weight-medium">Notifications</span>
              <v-btn variant="text" size="small" color="primary">Mark all as read</v-btn>
            </v-card-title>
            <v-divider />
            <v-list max-height="400" class="overflow-y-auto">
              <v-list-item
                v-for="notification in notifications.slice(0, 5)"
                :key="notification.id"
                :class="{ 'bg-blue-lighten-5': !notification.read }"
              >
                <template #prepend>
                  <v-avatar :color="notification.color" size="40">
                    <v-icon color="white" size="20">{{ notification.icon }}</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="text-body-2">{{ notification.title }}</v-list-item-title>
                <v-list-item-subtitle class="text-caption">{{ notification.time }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
            <v-divider />
            <v-card-actions class="justify-center">
              <v-btn variant="text" color="primary">View All Notifications</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-col>

      <!-- Full Notification List -->
      <v-col cols="12" md="8">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Full List</h3>
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>All Notifications</span>
            <div>
              <v-btn variant="text" size="small">Mark all as read</v-btn>
              <v-btn variant="text" size="small" color="error">Clear all</v-btn>
            </div>
          </v-card-title>

          <v-tabs v-model="tab" color="primary">
            <v-tab value="all">All</v-tab>
            <v-tab value="unread">
              Unread
              <v-badge content="3" color="error" inline class="ml-1" />
            </v-tab>
            <v-tab value="mentions">Mentions</v-tab>
          </v-tabs>

          <v-divider />

          <v-list lines="two">
            <template v-for="(notification, index) in filteredNotifications" :key="notification.id">
              <v-list-item
                :class="{ 'bg-blue-lighten-5': !notification.read }"
              >
                <template #prepend>
                  <v-avatar :color="notification.color" size="48">
                    <v-img v-if="notification.avatar" :src="notification.avatar" />
                    <v-icon v-else color="white">{{ notification.icon }}</v-icon>
                  </v-avatar>
                </template>

                <v-list-item-title class="font-weight-medium">
                  {{ notification.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ notification.description }}
                </v-list-item-subtitle>

                <template #append>
                  <div class="text-right">
                    <p class="text-caption text-medium-emphasis mb-1">{{ notification.time }}</p>
                    <v-chip v-if="notification.type" :color="getTypeColor(notification.type)" size="x-small">
                      {{ notification.type }}
                    </v-chip>
                  </div>
                </template>
              </v-list-item>

              <v-divider v-if="index < filteredNotifications.length - 1" />
            </template>
          </v-list>

          <v-card-actions class="justify-center">
            <v-btn variant="text" color="primary">Load More</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Activity Feed -->
    <v-row class="mt-6">
      <v-col cols="12">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Activity Feed (Timeline)</h3>
        <v-card>
          <v-card-title>Recent Activity</v-card-title>
          <v-card-text>
            <v-timeline density="compact" side="end">
              <v-timeline-item
                v-for="activity in activities"
                :key="activity.id"
                :dot-color="activity.color"
                size="small"
              >
                <template #icon>
                  <v-icon size="16" color="white">{{ activity.icon }}</v-icon>
                </template>
                <div class="d-flex justify-space-between align-start">
                  <div>
                    <p class="text-body-2 font-weight-medium mb-1">{{ activity.title }}</p>
                    <p class="text-caption text-medium-emphasis mb-0">{{ activity.description }}</p>
                  </div>
                  <span class="text-caption text-medium-emphasis">{{ activity.time }}</span>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
