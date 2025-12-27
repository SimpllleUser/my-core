<!--
  Snippet: Chat List View (Medium)
  Description: List of chat conversations with search and filters
  Components: VCard, VList, VAvatar, VTextField, VBadge, VChip
  Complexity: Medium
-->
<template>
  <VCard height="600" variant="outlined">
    <!-- Header -->
    <VCardTitle class="d-flex align-center py-3 border-b">
      <span class="text-h6 font-weight-bold">Messages</span>
      <VSpacer />
      <VBtn icon variant="text" size="small">
        <VIcon>{{ Icons.Edit }}</VIcon>
      </VBtn>
    </VCardTitle>

    <!-- Search -->
    <div class="px-4 py-3">
      <VTextField
        v-model="search"
        placeholder="Search messages..."
        variant="solo-filled"
        density="compact"
        hide-details
        :prepend-inner-icon="Icons.Search"
        rounded="pill"
      />
    </div>

    <!-- Filter Tabs -->
    <div class="px-4 pb-2">
      <VChipGroup v-model="filter" mandatory>
        <VChip
          v-for="tab in filters"
          :key="tab.value"
          :value="tab.value"
          size="small"
          filter
        >
          {{ tab.label }}
          <template v-if="tab.count" #append>
            <VBadge :content="tab.count" color="primary" inline />
          </template>
        </VChip>
      </VChipGroup>
    </div>

    <VDivider />

    <!-- Chat List -->
    <VList lines="three" class="overflow-y-auto" style="max-height: 420px;">
      <VListItem
        v-for="chat in filteredChats"
        :key="chat.id"
        :class="{ 'bg-primary-lighten-5': chat.active }"
        class="py-3"
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
            <VAvatar size="48">
              <VImg :src="chat.avatar" />
            </VAvatar>
          </VBadge>
        </template>

        <VListItemTitle class="font-weight-medium d-flex align-center">
          {{ chat.name }}
          <VIcon v-if="chat.verified" size="14" color="primary" class="ml-1">
            {{ Icons.CheckCircle }}
          </VIcon>
        </VListItemTitle>

        <VListItemSubtitle class="d-flex align-center">
          <VIcon v-if="chat.lastMessage.sent" size="14" class="mr-1">
            {{ chat.lastMessage.read ? Icons.CheckAll : Icons.Check }}
          </VIcon>
          <span :class="{ 'font-weight-medium': chat.unread }">
            {{ chat.lastMessage.text }}
          </span>
        </VListItemSubtitle>

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
            <VIcon v-else-if="chat.muted" size="16" color="grey" class="mt-1">
              {{ Icons.BellOff }}
            </VIcon>
          </div>
        </template>
      </VListItem>
    </VList>
  </VCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icons } from '@/shared/model'

const search = ref('')
const filter = ref('all')

const filters = [
  { label: 'All', value: 'all', count: 0 },
  { label: 'Unread', value: 'unread', count: 3 },
  { label: 'Groups', value: 'groups', count: 0 },
]

const chats = ref([
  {
    id: 1,
    name: 'Emily Chen',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: { text: 'Perfect! 2 PM works great.', sent: false, read: true },
    time: '10:37 AM',
    online: true,
    unread: 0,
    verified: true,
    active: true,
    isGroup: false,
  },
  {
    id: 2,
    name: 'Michael Brown',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: { text: 'Sounds good, let me know!', sent: true, read: true },
    time: '9:15 AM',
    online: false,
    unread: 2,
    verified: false,
    active: false,
    isGroup: false,
  },
  {
    id: 3,
    name: 'Design Team',
    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
    lastMessage: { text: 'Sarah: Updated the mockups', sent: false, read: false },
    time: 'Yesterday',
    online: false,
    unread: 5,
    verified: false,
    active: false,
    isGroup: true,
  },
  {
    id: 4,
    name: 'John Smith',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    lastMessage: { text: 'Thanks for the update!', sent: true, read: false },
    time: 'Yesterday',
    online: true,
    unread: 0,
    muted: true,
    verified: false,
    active: false,
    isGroup: false,
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    lastMessage: { text: "I'll review it today", sent: false, read: true },
    time: 'Mon',
    online: false,
    unread: 0,
    verified: true,
    active: false,
    isGroup: false,
  },
  {
    id: 6,
    name: 'Project Alpha',
    avatar: 'https://randomuser.me/api/portraits/lego/2.jpg',
    lastMessage: { text: 'Mike: Meeting at 3 PM', sent: false, read: true },
    time: 'Mon',
    online: false,
    unread: 0,
    verified: false,
    active: false,
    isGroup: true,
  },
])

const filteredChats = computed(() => {
  let result = chats.value

  if (search.value) {
    result = result.filter((chat) =>
      chat.name.toLowerCase().includes(search.value.toLowerCase())
    )
  }

  if (filter.value === 'unread') {
    result = result.filter((chat) => chat.unread > 0)
  } else if (filter.value === 'groups') {
    result = result.filter((chat) => chat.isGroup)
  }

  return result
})
</script>
