<!--
  Snippet: Chat Bubble (Simple)
  Description: Individual chat message bubbles for different message types
  Components: ChatMessage
  Complexity: Simple
-->
<template>
  <div class="pa-4">
    <!-- Sent Message -->
    <ChatMessage
      type="sent"
      text="Hey! How are you doing today? Did you get a chance to review the proposal I sent?"
      time="10:32 AM"
    />

    <!-- Received Message -->
    <ChatMessage
      type="received"
      text="Hi! I'm good, thanks for asking. Yes, I reviewed it and I have some feedback. Can we schedule a quick call?"
      time="10:35 AM"
      avatar="https://randomuser.me/api/portraits/women/44.jpg"
    />

    <!-- Sent with Read Receipt -->
    <ChatMessage
      type="sent"
      text="Sure! I'm free at 2 PM. Does that work for you?"
      time="10:36 AM"
      :is-read="true"
    />

    <!-- Received with Emoji Reaction -->
    <ChatMessage
      type="received"
      text="Perfect! 2 PM works great. Talk to you then!"
      time="10:37 AM"
      avatar="https://randomuser.me/api/portraits/women/44.jpg"
      reaction="👍 1"
    />

    <!-- System Message -->
    <ChatMessage
      type="system"
      text="Messages are end-to-end encrypted"
      :system-icon="Icons.Lock"
    />

    <!-- Typing Indicator -->
    <ChatMessage
      type="typing"
      avatar="https://randomuser.me/api/portraits/women/44.jpg"
    />
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/shared/model'
import { ChatMessage } from '@/shared/ui/snippets'
</script>
