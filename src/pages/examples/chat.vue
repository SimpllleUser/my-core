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
          <VIcon icon="mdi-message-text" size="large" color="light-blue" class="mr-2" />
          Chat & Messaging
        </h1>
        <p class="text-h6 text-medium-emphasis">
          Chat bubbles, conversations, message types, and full chat applications
        </p>
      </VCol>
    </VRow>

    <!-- Chat Bubble -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-message" class="mr-2" />
            Chat Bubble
            <VSpacer />
            <VChip color="light-blue" size="small">VCard, VAvatar, VChip</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Individual chat message bubbles with various styles</p>
            <ChatBubble />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Chat Input -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-keyboard" class="mr-2" />
            Chat Input
            <VSpacer />
            <VChip color="light-blue" size="small">VTextField, VBtn, VMenu</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Message input components with emoji and attachment features</p>
            <ChatInput />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Chat Conversation -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-forum" class="mr-2" />
            Chat Conversation
            <VSpacer />
            <VChip color="light-blue" size="small">VCard, VAvatar, VTextField</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Full chat conversation with messages and input</p>
            <ChatConversation />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Chat List View -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-message-text-outline" class="mr-2" />
            Chat List View
            <VSpacer />
            <VChip color="light-blue" size="small">VCard, VList, VBadge</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">List of chat conversations with search</p>
            <ChatListView />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Message Types -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-message-image" class="mr-2" />
            Message Types
            <VSpacer />
            <VChip color="light-blue" size="small">VCard, VAvatar, VImg</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Various message types including text, images, files, and voice</p>
            <MessageTypes />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Chat Full App -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-chat" class="mr-2" />
            Chat Full App
            <VSpacer />
            <VChip color="light-blue" size="small">All major components</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Complete chat application with sidebar and details panel</p>
            <ChatFullApp />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import {
  ChatBubble,
  ChatInput,
  ChatConversation,
  ChatListView,
  MessageTypes,
  ChatFullApp
} from '@/snippets'
</script>
