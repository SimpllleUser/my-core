<!--
  Snippet: Chat Input (Simple)
  Description: Message input components with various features
  Components: VTextField, VBtn, VMenu, VCard
  Complexity: Simple
-->
<template>
  <div class="pa-4">
    <!-- Simple Input -->
    <VCard class="pa-2 mb-8" variant="outlined">
      <div class="d-flex align-center">
        <VTextField
          v-model="message"
          placeholder="Type a message..."
          variant="plain"
          density="comfortable"
          hide-details
          class="flex-grow-1"
        />
        <VBtn icon color="primary" :disabled="!message.trim()">
          <VIcon>{{ Icons.Send }}</VIcon>
        </VBtn>
      </div>
    </VCard>

    <!-- Input with Attachments -->
    <VCard class="pa-2 mb-8" variant="outlined">
      <div class="d-flex align-center">
        <VBtn icon variant="text" color="grey-darken-1">
          <VIcon>{{ Icons.Paperclip }}</VIcon>
        </VBtn>
        <VTextField
          v-model="message"
          placeholder="Type a message..."
          variant="plain"
          density="comfortable"
          hide-details
          class="flex-grow-1"
        />
        <VBtn icon variant="text" color="grey-darken-1">
          <VIcon>{{ Icons.EmoticonOutline }}</VIcon>
        </VBtn>
        <VBtn icon color="primary" :disabled="!message.trim()">
          <VIcon>{{ Icons.Send }}</VIcon>
        </VBtn>
      </div>
    </VCard>

    <!-- Input with Emoji Picker Menu -->
    <VCard class="pa-2 mb-8" variant="outlined">
      <div class="d-flex align-center">
        <VMenu :close-on-content-click="false">
          <template #activator="{ props }">
            <VBtn icon variant="text" color="grey-darken-1" v-bind="props">
              <VIcon>{{ Icons.Plus }}</VIcon>
            </VBtn>
          </template>
          <VCard class="pa-2" width="200">
            <VRow dense>
              <VCol v-for="action in attachActions" :key="action.label" cols="6">
                <VBtn
                  variant="tonal"
                  :color="action.color"
                  block
                  class="flex-column py-3"
                  height="auto"
                >
                  <VIcon class="mb-1">{{ action.icon }}</VIcon>
                  <span class="text-caption">{{ action.label }}</span>
                </VBtn>
              </VCol>
            </VRow>
          </VCard>
        </VMenu>

        <VTextField
          v-model="message"
          placeholder="Type a message..."
          variant="plain"
          density="comfortable"
          hide-details
          class="flex-grow-1"
        />

        <VMenu :close-on-content-click="false">
          <template #activator="{ props }">
            <VBtn icon variant="text" color="grey-darken-1" v-bind="props">
              <VIcon>{{ Icons.EmoticonOutline }}</VIcon>
            </VBtn>
          </template>
          <VCard class="pa-3" width="280">
            <div class="d-flex flex-wrap ga-1">
              <VBtn
                v-for="emoji in emojis"
                :key="emoji"
                variant="text"
                size="small"
                class="text-h6"
                @click="message += emoji"
              >
                {{ emoji }}
              </VBtn>
            </div>
          </VCard>
        </VMenu>

        <VBtn icon color="primary" :disabled="!message.trim()">
          <VIcon>{{ Icons.Send }}</VIcon>
        </VBtn>
      </div>
    </VCard>

    <!-- Voice Message Input -->
    <VCard class="pa-2" variant="outlined">
      <div class="d-flex align-center">
        <VBtn icon variant="text" color="grey-darken-1">
          <VIcon>{{ Icons.Paperclip }}</VIcon>
        </VBtn>
        <VTextField
          v-model="message"
          placeholder="Type a message..."
          variant="plain"
          density="comfortable"
          hide-details
          class="flex-grow-1"
        />
        <VBtn v-if="!message.trim()" icon variant="text" color="grey-darken-1">
          <VIcon>{{ Icons.Microphone }}</VIcon>
        </VBtn>
        <VBtn v-else icon color="primary">
          <VIcon>{{ Icons.Send }}</VIcon>
        </VBtn>
      </div>
    </VCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icons } from '@/shared/model'

const message = ref('')

const attachActions = [
  { label: 'Photo', icon: Icons.Image, color: 'success' },
  { label: 'File', icon: Icons.FileDocument, color: 'primary' },
  { label: 'Camera', icon: Icons.Camera, color: 'info' },
  { label: 'Location', icon: Icons.MapMarker, color: 'error' },
]

const emojis = ['😀', '😂', '❤️', '👍', '🎉', '🔥', '😍', '🤔', '👋', '✨', '🙏', '💪']
</script>
