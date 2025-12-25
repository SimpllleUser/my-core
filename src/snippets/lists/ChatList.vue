<!--
  Snippet: Chat List
  Description: Chat/messaging interface with conversations and messages
  Components: VList, VListItem, VAvatar, VTextField, VBtn
  Variants: Chat sidebar, Message bubbles
-->
<template>
  <v-card style="height: 600px;">
    <v-row no-gutters style="height: 100%;">
      <!-- Conversations Sidebar -->
      <v-col cols="4" class="border-e d-flex flex-column">
        <!-- Header -->
        <div class="pa-4 border-b">
          <div class="d-flex align-center justify-space-between mb-4">
            <h3 class="text-h6 font-weight-bold">Messages</h3>
            <v-btn icon="mdi-pencil-plus" variant="text" size="small" />
          </div>
          <v-text-field
            v-model="search"
            density="compact"
            variant="solo-filled"
            flat
            hide-details
            placeholder="Search conversations..."
            prepend-inner-icon="mdi-magnify"
          />
        </div>

        <!-- Conversations List -->
        <v-list class="overflow-y-auto flex-grow-1">
          <v-list-item
            v-for="conversation in filteredConversations"
            :key="conversation.id"
            :class="{ 'bg-primary-lighten-5': activeConversation?.id === conversation.id }"
            @click="selectConversation(conversation)"
          >
            <template #prepend>
              <v-badge
                :color="conversation.online ? 'success' : 'grey'"
                dot
                location="bottom right"
                offset-x="3"
                offset-y="3"
              >
                <v-avatar size="48">
                  <v-img :src="conversation.avatar" />
                </v-avatar>
              </v-badge>
            </template>

            <v-list-item-title class="font-weight-medium">
              {{ conversation.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-truncate">
              {{ conversation.lastMessage }}
            </v-list-item-subtitle>

            <template #append>
              <div class="text-right">
                <p class="text-caption text-medium-emphasis mb-1">{{ conversation.time }}</p>
                <v-badge v-if="conversation.unread" :content="conversation.unread" color="primary" inline />
              </div>
            </template>
          </v-list-item>
        </v-list>
      </v-col>

      <!-- Chat Area -->
      <v-col cols="8" class="d-flex flex-column">
        <template v-if="activeConversation">
          <!-- Chat Header -->
          <div class="pa-4 border-b d-flex align-center">
            <v-avatar size="40" class="mr-3">
              <v-img :src="activeConversation.avatar" />
            </v-avatar>
            <div class="flex-grow-1">
              <p class="font-weight-medium mb-0">{{ activeConversation.name }}</p>
              <p class="text-caption text-medium-emphasis mb-0">
                {{ activeConversation.online ? 'Online' : 'Offline' }}
              </p>
            </div>
            <v-btn icon="mdi-phone" variant="text" />
            <v-btn icon="mdi-video" variant="text" />
            <v-btn icon="mdi-dots-vertical" variant="text" />
          </div>

          <!-- Messages -->
          <div class="flex-grow-1 overflow-y-auto pa-4" ref="messagesContainer">
            <div
              v-for="message in messages"
              :key="message.id"
              :class="['d-flex mb-4', message.sent ? 'justify-end' : 'justify-start']"
            >
              <v-avatar v-if="!message.sent" size="32" class="mr-2 align-self-end">
                <v-img :src="activeConversation.avatar" />
              </v-avatar>

              <div :class="['message-bubble', message.sent ? 'sent' : 'received']">
                <p class="mb-1">{{ message.text }}</p>
                <div class="d-flex align-center justify-end">
                  <span class="text-caption" :class="message.sent ? 'text-white-darken-1' : 'text-medium-emphasis'">
                    {{ message.time }}
                  </span>
                  <v-icon v-if="message.sent" size="16" class="ml-1" :color="message.read ? 'info' : 'white'">
                    {{ message.read ? 'mdi-check-all' : 'mdi-check' }}
                  </v-icon>
                </div>
              </div>
            </div>
          </div>

          <!-- Message Input -->
          <div class="pa-4 border-t">
            <v-text-field
              v-model="newMessage"
              variant="solo-filled"
              flat
              hide-details
              placeholder="Type a message..."
              @keyup.enter="sendMessage"
            >
              <template #prepend-inner>
                <v-btn icon="mdi-emoticon-outline" variant="text" size="small" />
                <v-btn icon="mdi-paperclip" variant="text" size="small" />
              </template>
              <template #append-inner>
                <v-btn
                  icon="mdi-send"
                  color="primary"
                  variant="flat"
                  size="small"
                  :disabled="!newMessage.trim()"
                  @click="sendMessage"
                />
              </template>
            </v-text-field>
          </div>
        </template>

        <!-- No Conversation Selected -->
        <div v-else class="d-flex flex-column align-center justify-center h-100">
          <v-icon size="80" color="grey-lighten-1" class="mb-4">mdi-chat-outline</v-icon>
          <p class="text-h6 text-medium-emphasis mb-2">Select a conversation</p>
          <p class="text-body-2 text-medium-emphasis">Choose a conversation to start messaging</p>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'

const search = ref('')
const newMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

interface Conversation {
  id: number
  name: string
  avatar: string
  lastMessage: string
  time: string
  online: boolean
  unread: number
}

const conversations: Conversation[] = [
  { id: 1, name: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', lastMessage: 'That sounds great! Let me know when...', time: '2 min', online: true, unread: 3 },
  { id: 2, name: 'Mike Chen', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', lastMessage: 'The project is almost done', time: '1 hour', online: true, unread: 0 },
  { id: 3, name: 'Emily Davis', avatar: 'https://randomuser.me/api/portraits/women/28.jpg', lastMessage: 'Can we schedule a call tomorrow?', time: '3 hours', online: false, unread: 1 },
  { id: 4, name: 'John Smith', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', lastMessage: 'Thanks for the update!', time: 'Yesterday', online: false, unread: 0 },
  { id: 5, name: 'Lisa Anderson', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', lastMessage: 'See you at the meeting', time: 'Yesterday', online: true, unread: 0 },
]

const activeConversation = ref<Conversation | null>(null)

const messages = ref([
  { id: 1, text: 'Hey! How are you doing?', time: '10:30 AM', sent: false, read: true },
  { id: 2, text: "Hi Sarah! I'm doing great, thanks for asking. How about you?", time: '10:32 AM', sent: true, read: true },
  { id: 3, text: "I'm good too! Just finished the design mockups for the new project.", time: '10:33 AM', sent: false, read: true },
  { id: 4, text: "That's awesome! Can't wait to see them. When can you share?", time: '10:35 AM', sent: true, read: true },
  { id: 5, text: 'I can share them now if you have time to review?', time: '10:36 AM', sent: false, read: true },
  { id: 6, text: 'Perfect! Send them over. 👍', time: '10:37 AM', sent: true, read: false },
])

const filteredConversations = computed(() => {
  if (!search.value) return conversations
  return conversations.filter(c =>
    c.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

const selectConversation = (conversation: Conversation) => {
  activeConversation.value = conversation
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  messages.value.push({
    id: messages.value.length + 1,
    text: newMessage.value,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    sent: true,
    read: false,
  })

  newMessage.value = ''

  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}
</script>

<style scoped>
.message-bubble {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 16px;
}

.message-bubble.sent {
  background-color: rgb(var(--v-theme-primary));
  color: white;
  border-bottom-right-radius: 4px;
}

.message-bubble.received {
  background-color: rgb(var(--v-theme-surface-variant));
  border-bottom-left-radius: 4px;
}
</style>
