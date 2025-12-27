<!--
  Snippet: Chat Full App (Complex)
  Description: Complete chat application with sidebar, conversation, and details panel
  Components: All major Vuetify components
  Complexity: Complex
-->
<template>
  <VCard height="700" class="d-flex">
    <!-- Sidebar -->
    <div class="border-e" style="width: 320px; min-width: 320px;">
      <!-- Header -->
      <div class="d-flex align-center pa-3 border-b">
        <VAvatar size="40" class="mr-3">
          <VImg src="https://randomuser.me/api/portraits/men/1.jpg" />
        </VAvatar>
        <span class="font-weight-medium">John Doe</span>
        <VSpacer />
        <VBtn icon variant="text" size="small">
          <VIcon>{{ Icons.DotsVertical }}</VIcon>
        </VBtn>
      </div>

      <!-- Search -->
      <div class="pa-3">
        <VTextField
          v-model="search"
          placeholder="Search..."
          variant="solo-filled"
          density="compact"
          hide-details
          :prepend-inner-icon="Icons.Search"
          rounded="pill"
        />
      </div>

      <!-- Chat List -->
      <VList lines="two" class="overflow-y-auto" style="max-height: 550px;">
        <VListItem
          v-for="chat in chats"
          :key="chat.id"
          :active="selectedChat?.id === chat.id"
          color="primary"
          class="py-2"
          @click="selectedChat = chat"
        >
          <template #prepend>
            <VBadge
              :model-value="chat.online"
              color="success"
              dot
              location="bottom end"
              offset-x="3"
              offset-y="3"
            >
              <VAvatar size="44">
                <VImg :src="chat.avatar" />
              </VAvatar>
            </VBadge>
          </template>

          <VListItemTitle class="font-weight-medium">{{ chat.name }}</VListItemTitle>
          <VListItemSubtitle>{{ chat.lastMessage }}</VListItemSubtitle>

          <template #append>
            <div class="d-flex flex-column align-end">
              <span class="text-caption text-medium-emphasis">{{ chat.time }}</span>
              <VBadge
                v-if="chat.unread"
                :content="chat.unread"
                color="primary"
                inline
                class="mt-1"
              />
            </div>
          </template>
        </VListItem>
      </VList>
    </div>

    <!-- Main Chat Area -->
    <div class="flex-grow-1 d-flex flex-column" v-if="selectedChat">
      <!-- Chat Header -->
      <div class="d-flex align-center pa-3 border-b">
        <VAvatar size="40" class="mr-3">
          <VImg :src="selectedChat.avatar" />
        </VAvatar>
        <div class="flex-grow-1">
          <p class="font-weight-medium mb-0">{{ selectedChat.name }}</p>
          <p class="text-caption text-success mb-0" v-if="selectedChat.online">
            <VIcon size="8" color="success" class="mr-1">{{ Icons.Circle }}</VIcon>
            Online
          </p>
          <p class="text-caption text-medium-emphasis mb-0" v-else>
            Last seen {{ selectedChat.lastSeen }}
          </p>
        </div>
        <VBtn icon variant="text">
          <VIcon>{{ Icons.Phone }}</VIcon>
        </VBtn>
        <VBtn icon variant="text">
          <VIcon>{{ Icons.Video }}</VIcon>
        </VBtn>
        <VBtn icon variant="text" @click="showDetails = !showDetails">
          <VIcon>{{ Icons.Info }}</VIcon>
        </VBtn>
      </div>

      <!-- Messages -->
      <div class="flex-grow-1 overflow-y-auto pa-4" ref="messagesContainer">
        <template v-for="(msg, index) in messages" :key="index">
          <div v-if="msg.sent" class="d-flex justify-end mb-3">
            <div class="d-flex flex-column align-end" style="max-width: 65%;">
              <VCard color="primary" class="pa-3 rounded-xl rounded-te-0">
                <p class="text-body-2 text-white mb-0">{{ msg.text }}</p>
              </VCard>
              <span class="text-caption text-medium-emphasis mt-1">{{ msg.time }}</span>
            </div>
          </div>
          <div v-else class="d-flex mb-3">
            <VAvatar size="32" class="mr-2 mt-1">
              <VImg :src="selectedChat.avatar" />
            </VAvatar>
            <div class="d-flex flex-column" style="max-width: 65%;">
              <VCard color="grey-lighten-4" class="pa-3 rounded-xl rounded-ts-0">
                <p class="text-body-2 mb-0">{{ msg.text }}</p>
              </VCard>
              <span class="text-caption text-medium-emphasis mt-1">{{ msg.time }}</span>
            </div>
          </div>
        </template>
      </div>

      <!-- Input -->
      <div class="pa-3 border-t">
        <div class="d-flex align-center">
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
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="flex-grow-1 d-flex align-center justify-center">
      <div class="text-center">
        <VIcon size="64" color="grey-lighten-1" class="mb-4">{{ Icons.ChatOutline }}</VIcon>
        <h3 class="text-h6 font-weight-medium text-grey">Select a conversation</h3>
        <p class="text-body-2 text-medium-emphasis">Choose from your existing chats or start a new one</p>
      </div>
    </div>

    <!-- Details Panel -->
    <VNavigationDrawer
      v-model="showDetails"
      location="right"
      temporary
      width="300"
    >
      <template v-if="selectedChat">
        <div class="text-center pa-6">
          <VAvatar size="80" class="mb-4">
            <VImg :src="selectedChat.avatar" />
          </VAvatar>
          <h3 class="text-h6 font-weight-bold mb-1">{{ selectedChat.name }}</h3>
          <p class="text-body-2 text-medium-emphasis mb-4">{{ selectedChat.email }}</p>
          <div class="d-flex justify-center ga-2">
            <VBtn icon variant="tonal" color="primary">
              <VIcon>{{ Icons.Phone }}</VIcon>
            </VBtn>
            <VBtn icon variant="tonal" color="primary">
              <VIcon>{{ Icons.Video }}</VIcon>
            </VBtn>
            <VBtn icon variant="tonal" color="primary">
              <VIcon>{{ Icons.Email }}</VIcon>
            </VBtn>
          </div>
        </div>

        <VDivider />

        <VList density="compact">
          <VListSubheader>About</VListSubheader>
          <VListItem>
            <template #prepend>
              <VIcon color="grey">{{ Icons.Briefcase }}</VIcon>
            </template>
            <VListItemTitle>{{ selectedChat.role }}</VListItemTitle>
            <VListItemSubtitle>Role</VListItemSubtitle>
          </VListItem>
          <VListItem>
            <template #prepend>
              <VIcon color="grey">{{ Icons.MapMarker }}</VIcon>
            </template>
            <VListItemTitle>{{ selectedChat.location }}</VListItemTitle>
            <VListItemSubtitle>Location</VListItemSubtitle>
          </VListItem>
          <VListItem>
            <template #prepend>
              <VIcon color="grey">{{ Icons.Clock }}</VIcon>
            </template>
            <VListItemTitle>{{ selectedChat.timezone }}</VListItemTitle>
            <VListItemSubtitle>Local Time</VListItemSubtitle>
          </VListItem>
        </VList>

        <VDivider />

        <VList density="compact">
          <VListSubheader>Media & Files</VListSubheader>
          <VListItem :prepend-icon="Icons.Image">
            <VListItemTitle>Photos</VListItemTitle>
            <template #append>
              <VChip size="small">12</VChip>
            </template>
          </VListItem>
          <VListItem :prepend-icon="Icons.FileDocument">
            <VListItemTitle>Documents</VListItemTitle>
            <template #append>
              <VChip size="small">5</VChip>
            </template>
          </VListItem>
          <VListItem :prepend-icon="Icons.Link">
            <VListItemTitle>Links</VListItemTitle>
            <template #append>
              <VChip size="small">8</VChip>
            </template>
          </VListItem>
        </VList>

        <VDivider />

        <VList density="compact">
          <VListItem :prepend-icon="Icons.BellOff" class="text-grey-darken-1">
            <VListItemTitle>Mute notifications</VListItemTitle>
          </VListItem>
          <VListItem :prepend-icon="Icons.Delete" class="text-error">
            <VListItemTitle>Delete conversation</VListItemTitle>
          </VListItem>
        </VList>
      </template>
    </VNavigationDrawer>
  </VCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icons } from '@/shared/model'

const search = ref('')
const newMessage = ref('')
const showDetails = ref(false)

const chats = ref([
  {
    id: 1,
    name: 'Emily Chen',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: 'Perfect! Talk to you then!',
    time: '10:37 AM',
    online: true,
    unread: 0,
    email: 'emily.chen@example.com',
    role: 'Product Designer',
    location: 'San Francisco, CA',
    timezone: '10:37 AM (PST)',
    lastSeen: '10 min ago',
  },
  {
    id: 2,
    name: 'Michael Brown',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: 'Sounds good, let me know!',
    time: '9:15 AM',
    online: false,
    unread: 2,
    email: 'michael.b@example.com',
    role: 'Software Engineer',
    location: 'New York, NY',
    timezone: '1:37 PM (EST)',
    lastSeen: '1 hour ago',
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    lastMessage: 'I reviewed the proposal',
    time: 'Yesterday',
    online: true,
    unread: 0,
    email: 'sarah.j@example.com',
    role: 'Project Manager',
    location: 'Austin, TX',
    timezone: '11:37 AM (CST)',
    lastSeen: '5 min ago',
  },
  {
    id: 4,
    name: 'David Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    lastMessage: 'Thanks for the update!',
    time: 'Yesterday',
    online: false,
    unread: 5,
    email: 'david.w@example.com',
    role: 'CTO',
    location: 'Seattle, WA',
    timezone: '10:37 AM (PST)',
    lastSeen: '2 hours ago',
  },
])

const selectedChat = ref(chats.value[0])

const messages = ref([
  { text: 'Hey! How are you doing?', sent: true, time: '10:30 AM' },
  { text: "Hi! I'm good, thanks! How about you?", sent: false, time: '10:32 AM' },
  { text: "I'm great! Did you review the proposal?", sent: true, time: '10:33 AM' },
  { text: 'Yes! I have some feedback. Can we schedule a call?', sent: false, time: '10:35 AM' },
  { text: "Sure! I'm free at 2 PM. Does that work?", sent: true, time: '10:36 AM' },
  { text: 'Perfect! Talk to you then!', sent: false, time: '10:37 AM' },
])

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  messages.value.push({
    text: newMessage.value,
    sent: true,
    time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
  })
  newMessage.value = ''
}
</script>
