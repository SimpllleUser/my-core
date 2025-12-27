<!--
  Snippet: Chat Bubble (Simple)
  Description: Individual chat message bubbles for different message types
  Components: VCard, VAvatar, VChip
  Complexity: Simple
-->
<template>
  <div class="pa-4">
    <!-- Sent Message -->
    <div class="d-flex justify-end mb-4">
      <div class="d-flex flex-column align-end" style="max-width: 70%;">
        <VCard color="primary" class="pa-3 rounded-xl rounded-te-0">
          <p class="text-body-2 text-white mb-0">
            Hey! How are you doing today? Did you get a chance to review the proposal I sent?
          </p>
        </VCard>
        <span class="text-caption text-medium-emphasis mt-1">10:32 AM</span>
      </div>
    </div>

    <!-- Received Message -->
    <div class="d-flex mb-4">
      <VAvatar size="36" class="mr-2 mt-1">
        <VImg src="https://randomuser.me/api/portraits/women/44.jpg" />
      </VAvatar>
      <div class="d-flex flex-column" style="max-width: 70%;">
        <VCard color="grey-lighten-4" class="pa-3 rounded-xl rounded-ts-0">
          <p class="text-body-2 mb-0">
            Hi! I'm good, thanks for asking. Yes, I reviewed it and I have some feedback. Can we schedule a quick call?
          </p>
        </VCard>
        <span class="text-caption text-medium-emphasis mt-1">10:35 AM</span>
      </div>
    </div>

    <!-- Sent with Read Receipt -->
    <div class="d-flex justify-end mb-4">
      <div class="d-flex flex-column align-end" style="max-width: 70%;">
        <VCard color="primary" class="pa-3 rounded-xl rounded-te-0">
          <p class="text-body-2 text-white mb-0">
            Sure! I'm free at 2 PM. Does that work for you?
          </p>
        </VCard>
        <div class="d-flex align-center mt-1">
          <span class="text-caption text-medium-emphasis mr-1">10:36 AM</span>
          <VIcon size="14" color="primary">{{ Icons.CheckAll }}</VIcon>
        </div>
      </div>
    </div>

    <!-- Received with Emoji Reaction -->
    <div class="d-flex mb-4">
      <VAvatar size="36" class="mr-2 mt-1">
        <VImg src="https://randomuser.me/api/portraits/women/44.jpg" />
      </VAvatar>
      <div class="d-flex flex-column" style="max-width: 70%;">
        <div class="position-relative">
          <VCard color="grey-lighten-4" class="pa-3 rounded-xl rounded-ts-0">
            <p class="text-body-2 mb-0">
              Perfect! 2 PM works great. Talk to you then!
            </p>
          </VCard>
          <VChip
            size="x-small"
            class="position-absolute"
            style="bottom: -8px; right: 8px;"
            variant="flat"
          >
            👍 1
          </VChip>
        </div>
        <span class="text-caption text-medium-emphasis mt-2">10:37 AM</span>
      </div>
    </div>

    <!-- System Message -->
    <div class="text-center my-6">
      <VChip size="small" variant="outlined" color="grey">
        <VIcon start size="14">{{ Icons.Lock }}</VIcon>
        Messages are end-to-end encrypted
      </VChip>
    </div>

    <!-- Typing Indicator -->
    <div class="d-flex mb-4">
      <VAvatar size="36" class="mr-2 mt-1">
        <VImg src="https://randomuser.me/api/portraits/women/44.jpg" />
      </VAvatar>
      <VCard color="grey-lighten-4" class="pa-3 rounded-xl rounded-ts-0">
        <div class="d-flex align-center ga-1">
          <div class="typing-dot" />
          <div class="typing-dot" style="animation-delay: 0.2s" />
          <div class="typing-dot" style="animation-delay: 0.4s" />
        </div>
      </VCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/shared/model'
</script>

<style scoped>
.typing-dot {
  width: 8px;
  height: 8px;
  background-color: #9e9e9e;
  border-radius: 50%;
  animation: typing 1s infinite;
}

@keyframes typing {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
</style>
