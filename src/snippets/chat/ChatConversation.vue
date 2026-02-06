<!--
  Snippet: Chat Conversation (Medium)
  Description: Full chat conversation with messages, input, and header
  Components: VCard, VAvatar, VTextField, VBtn, VList
  Complexity: Medium
-->
<template>
  <VCard class="d-flex flex-column" height="600" variant="outlined">
    <!-- Chat Header -->
    <VCardTitle class="d-flex align-center py-3 border-b">
      <VAvatar size="40" class="mr-3">
        <VImg src="https://randomuser.me/api/portraits/women/44.jpg" />
      </VAvatar>
      <div class="flex-grow-1">
        <p class="text-subtitle-1 font-weight-medium mb-0">Emily Chen</p>
        <p class="text-caption text-success mb-0">
          <VIcon size="8" color="success" class="mr-1">{{ Icons.Circle }}</VIcon>
          Online
        </p>
      </div>
      <VBtn icon variant="text">
        <VIcon>{{ Icons.Phone }}</VIcon>
      </VBtn>
      <VBtn icon variant="text">
        <VIcon>{{ Icons.Video }}</VIcon>
      </VBtn>
      <VBtn icon variant="text">
        <VIcon>{{ Icons.DotsVertical }}</VIcon>
      </VBtn>
    </VCardTitle>

    <!-- Messages Area -->
    <VCardText class="flex-grow-1 overflow-y-auto pa-4" ref="messagesContainer">
      <!-- Date Separator -->
      <div class="text-center my-4">
        <VChip size="small" variant="outlined" color="grey">Today</VChip>
      </div>

      <!-- Messages -->
      <template v-for="(msg, index) in messages" :key="index">
        <!-- Sent Message -->
        <div v-if="msg.sent" class="d-flex justify-end mb-3">
          <div class="d-flex flex-column align-end" style="max-width: 75%;">
            <VCard color="primary" class="pa-3 rounded-xl rounded-te-0">
              <p class="text-body-2 text-white mb-0">{{ msg.text }}</p>
            </VCard>
            <div class="d-flex align-center mt-1">
              <span class="text-caption text-medium-emphasis mr-1">{{ msg.time }}</span>
              <VIcon v-if="msg.read" size="14" color="primary">{{ Icons.CheckAll }}</VIcon>
              <VIcon v-else size="14" color="grey">{{ Icons.Check }}</VIcon>
            </div>
          </div>
        </div>

        <!-- Received Message -->
        <div v-else class="d-flex mb-3">
          <VAvatar size="32" class="mr-2 mt-1">
            <VImg src="https://randomuser.me/api/portraits/women/44.jpg" />
          </VAvatar>
          <div class="d-flex flex-column" style="max-width: 75%;">
            <VCard color="grey-lighten-4" class="pa-3 rounded-xl rounded-ts-0">
              <p class="text-body-2 mb-0">{{ msg.text }}</p>
            </VCard>
            <span class="text-caption text-medium-emphasis mt-1">{{ msg.time }}</span>
          </div>
        </div>
      </template>

      <!-- Typing Indicator -->
      <div v-if="isTyping" class="d-flex mb-3">
        <VAvatar size="32" class="mr-2 mt-1">
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
    </VCardText>

    <!-- Input Area -->
    <VCardActions class="pa-3 border-t">
      <VBtn icon variant="text" color="grey-darken-1">
        <VIcon>{{ Icons.Paperclip }}</VIcon>
      </VBtn>
      <VTextField
        v-model="newMessage"
        placeholder="Type a message..."
        variant="solo-filled"
        density="comfortable"
        hide-details
        rounded="pill"
        class="mx-2"
        @keyup.enter="sendMessage"
      />
      <VBtn icon variant="text" color="grey-darken-1">
        <VIcon>{{ Icons.EmoticonOutline }}</VIcon>
      </VBtn>
      <VBtn
        icon
        color="primary"
        :disabled="!newMessage.trim()"
        @click="sendMessage"
      >
        <VIcon>{{ Icons.Send }}</VIcon>
      </VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icons } from '@/shared/model'

const newMessage = ref('')
const isTyping = ref(false)

const messages = ref([
  { text: 'Hey! How are you doing?', sent: true, time: '10:30 AM', read: true },
  { text: "Hi! I'm good, thanks! How about you?", sent: false, time: '10:32 AM' },
  { text: "I'm great! Did you get a chance to review the proposal?", sent: true, time: '10:33 AM', read: true },
  { text: "Yes, I did! I have some feedback. Can we schedule a call to discuss?", sent: false, time: '10:35 AM' },
  { text: "Sure! I'm free at 2 PM. Does that work?", sent: true, time: '10:36 AM', read: true },
  { text: 'Perfect! 2 PM works great. Talk to you then!', sent: false, time: '10:37 AM' },
])

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  messages.value.push({
    text: newMessage.value,
    sent: true,
    time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    read: false,
  })
  newMessage.value = ''

  // Simulate typing response
  isTyping.value = true
  setTimeout(() => {
    isTyping.value = false
    messages.value.push({
      text: 'Thanks for your message! I\'ll get back to you soon.',
      sent: false,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    })
  }, 2000)
}
</script>

<style scoped>
.typing-dot {
  width: 6px;
  height: 6px;
  background-color: #9e9e9e;
  border-radius: 50%;
  animation: typing 1s infinite;
}

@keyframes typing {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
</style>
