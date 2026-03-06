<!--
  Snippet: Notification Examples
  Description: Notification items for feeds, dropdowns, and full-page lists
  Components: NotificationItem, VCard, VList
  Variants: Dropdown, Feed, Grouped
-->
<script setup lang="ts">
import { ref } from 'vue'
import { Icons } from '../../shared/model'
import { NotificationItem } from '../../shared/ui/snippets'
import type { NotificationType } from '../../shared/ui/snippets'

interface Notification {
  id: number
  type: NotificationType
  title: string
  message: string
  createdAt: string
  read: boolean
  action?: string
  avatar?: string
}

const notifications = ref<Notification[]>([
  { id: 1, type: 'success', title: 'Deployment successful', message: 'v2.5.0 is now live in production.', createdAt: '2 min ago', read: false, action: 'View details' },
  { id: 2, type: 'message', title: 'New message from Alex', message: 'Hey, can we sync up at 3pm today?', createdAt: '15 min ago', read: false, avatar: 'https://randomuser.me/api/portraits/men/32.jpg', action: 'Reply' },
  { id: 3, type: 'warning', title: 'Storage 80% full', message: 'Free up space to avoid interruptions.', createdAt: '1 hour ago', read: false, action: 'Manage storage' },
  { id: 4, type: 'info', title: 'Weekly report ready', message: 'Your analytics report for last week is ready to view.', createdAt: '3 hours ago', read: true },
  { id: 5, type: 'error', title: 'Payment failed', message: 'Your subscription renewal could not be processed.', createdAt: '5 hours ago', read: true, action: 'Update payment' },
  { id: 6, type: 'system', title: 'Scheduled maintenance', message: 'Downtime on Sunday 2–4 AM UTC.', createdAt: '1 day ago', read: true },
])

function dismiss(id: number) {
  notifications.value = notifications.value.filter(n => n.id !== id)
}

function markRead(id: number) {
  const n = notifications.value.find(n => n.id === id)
  if (n) n.read = true
}

const unreadCount = () => notifications.value.filter(n => !n.read).length
</script>
<template>
  <VContainer>
    <VRow>
      <!-- Dropdown style -->
      <VCol cols="12" md="5">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Dropdown panel</h3>
        <VCard variant="outlined" max-width="400">
          <VCardTitle class="d-flex align-center justify-space-between py-3">
            <span class="text-body-1 font-weight-semibold">Notifications</span>
            <VChip color="error" size="small">{{ unreadCount() }} new</VChip>
          </VCardTitle>
          <VDivider />
          <div class="overflow-y-auto" style="max-height: 420px">
            <NotificationItem
              v-for="n in notifications"
              :key="n.id"
              :type="n.type"
              :title="n.title"
              :message="n.message"
              :created-at="n.createdAt"
              :read="n.read"
              :action="n.action"
              :avatar="n.avatar"
              card-variant="flat"
              @click="markRead(n.id)"
              @dismiss="dismiss(n.id)"
            />
          </div>
          <VDivider />
          <VCardActions class="justify-center">
            <VBtn variant="text" color="primary" size="small">View all notifications</VBtn>
          </VCardActions>
        </VCard>
      </VCol>

      <!-- Full-page feed -->
      <VCol cols="12" md="7">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Full-page feed</h3>
        <VCard variant="outlined">
          <VCardTitle class="d-flex align-center justify-space-between">
            <span>All Notifications</span>
            <VBtn variant="text" size="small" color="primary">Mark all read</VBtn>
          </VCardTitle>
          <VDivider />
          <template v-for="(n, i) in notifications" :key="n.id">
            <NotificationItem
              :type="n.type"
              :title="n.title"
              :message="n.message"
              :created-at="n.createdAt"
              :read="n.read"
              :action="n.action"
              :avatar="n.avatar"
              card-variant="flat"
              icon-container-size="44"
              @click="markRead(n.id)"
              @dismiss="dismiss(n.id)"
            />
            <VDivider v-if="i < notifications.length - 1" />
          </template>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
