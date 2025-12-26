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
          <VIcon icon="mdi-format-list-bulleted" size="large" color="amber" class="mr-2" />
          Lists
        </h1>
        <p class="text-h6 text-medium-emphasis">
          Notifications, chat interfaces, and activity feeds
        </p>
      </VCol>
    </VRow>

    <!-- Notification List -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-bell" class="mr-2" />
            Notification List
            <VSpacer />
            <VChip color="amber" size="small">VList, VAvatar, VChip, VTimeline</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Notification/activity feed with timeline</p>
            <NotificationList />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Chat List -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-message-text" class="mr-2" />
            Chat List
            <VSpacer />
            <VChip color="amber" size="small">VList, VTextField, VAvatar</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Chat/messaging interface with message list</p>
            <ChatList />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import {
  NotificationList,
  ChatList
} from '@/snippets'
</script>
