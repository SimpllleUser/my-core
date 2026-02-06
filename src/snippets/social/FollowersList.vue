<!--
  Snippet: Followers List
  Description: List of followers/following with search and actions
  Components: None (standalone)
  Variants: Grid view, list view, with suggestions
-->
<template>
  <div>
    <!-- Style 1: Simple Followers List -->
    <section class="py-8">
      <VContainer>
        <VRow justify="center">
          <VCol cols="12" md="8" lg="6">
            <div class="d-flex justify-space-between align-center mb-4">
              <h3 class="text-h5 font-weight-bold">Followers ({{ followers.length }})</h3>
              <VTextField
                v-model="searchQuery"
                :prepend-inner-icon="Icons.Search"
                placeholder="Search followers..."
                density="compact"
                variant="outlined"
                hide-details
                style="max-width: 250px"
              />
            </div>

            <VCard variant="outlined">
              <VList lines="two">
                <template v-for="(follower, idx) in followers" :key="follower.id">
                  <VListItem>
                    <template #prepend>
                      <VAvatar size="48">
                        <VImg :src="follower.avatar" />
                      </VAvatar>
                    </template>

                    <VListItemTitle class="font-weight-bold">
                      {{ follower.name }}
                      <VIcon v-if="follower.verified" color="primary" size="16" class="ml-1">
                        {{ Icons.CheckCircle }}
                      </VIcon>
                    </VListItemTitle>
                    <VListItemSubtitle>@{{ follower.username }}</VListItemSubtitle>

                    <template #append>
                      <VBtn
                        :color="follower.isFollowing ? undefined : 'primary'"
                        :variant="follower.isFollowing ? 'outlined' : 'flat'"
                        size="small"
                      >
                        {{ follower.isFollowing ? 'Following' : 'Follow' }}
                      </VBtn>
                    </template>
                  </VListItem>
                  <VDivider v-if="idx < followers.length - 1" inset />
                </template>
              </VList>
            </VCard>

            <VBtn variant="outlined" block size="large" class="mt-4">Load More</VBtn>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 2: Tabs with Following/Followers -->
    <section class="py-8 bg-grey-lighten-5">
      <VContainer>
        <VRow justify="center">
          <VCol cols="12" md="8" lg="6">
            <VCard variant="outlined">
              <VTabs v-model="activeTab" color="primary" grow>
                <VTab value="followers">
                  <span class="font-weight-bold mr-1">{{ formatNumber(12500) }}</span>
                  Followers
                </VTab>
                <VTab value="following">
                  <span class="font-weight-bold mr-1">{{ formatNumber(892) }}</span>
                  Following
                </VTab>
              </VTabs>

              <VDivider />

              <VCardText class="pa-4">
                <VTextField
                  v-model="tabSearch"
                  :prepend-inner-icon="Icons.Search"
                  :placeholder="`Search ${activeTab}...`"
                  density="compact"
                  variant="outlined"
                  hide-details
                  class="mb-4"
                />

                <div v-for="user in tabUsers" :key="user.id" class="d-flex align-center justify-space-between mb-4">
                  <div class="d-flex align-center">
                    <VAvatar size="52" class="mr-3">
                      <VImg :src="user.avatar" />
                    </VAvatar>
                    <div>
                      <div class="d-flex align-center">
                        <span class="font-weight-bold">{{ user.name }}</span>
                        <VIcon v-if="user.verified" color="primary" size="14" class="ml-1">
                          {{ Icons.CheckCircle }}
                        </VIcon>
                      </div>
                      <div class="text-body-2 text-medium-emphasis">@{{ user.username }}</div>
                      <div class="text-caption text-medium-emphasis">{{ user.bio }}</div>
                    </div>
                  </div>
                  <div class="d-flex ga-2">
                    <VBtn
                      :color="user.isFollowing ? undefined : 'primary'"
                      :variant="user.isFollowing ? 'outlined' : 'flat'"
                      size="small"
                    >
                      {{ user.isFollowing ? 'Following' : 'Follow' }}
                    </VBtn>
                    <VBtn icon variant="text" size="small">
                      <VIcon>{{ Icons.DotsVertical }}</VIcon>
                    </VBtn>
                  </div>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 3: Grid View with Categories -->
    <section class="py-8">
      <VContainer>
        <h3 class="text-h5 font-weight-bold mb-2">People You May Know</h3>
        <p class="text-body-2 text-medium-emphasis mb-6">Based on your connections and interests</p>

        <VChipGroup v-model="selectedCategory" mandatory class="mb-6">
          <VChip v-for="cat in categories" :key="cat" filter variant="outlined">
            {{ cat }}
          </VChip>
        </VChipGroup>

        <VRow>
          <VCol v-for="user in gridUsers" :key="user.id" cols="6" sm="4" md="3" lg="2">
            <VCard variant="outlined" class="text-center pa-4" hover>
              <VAvatar size="72" class="mb-3">
                <VImg :src="user.avatar" />
              </VAvatar>
              <div class="d-flex align-center justify-center mb-1">
                <span class="text-subtitle-2 font-weight-bold">{{ user.name }}</span>
                <VIcon v-if="user.verified" color="primary" size="14" class="ml-1">
                  {{ Icons.CheckCircle }}
                </VIcon>
              </div>
              <div class="text-caption text-medium-emphasis mb-2">@{{ user.username }}</div>
              <div class="text-caption text-medium-emphasis mb-3">
                {{ formatNumber(user.followers || 0) }} followers
              </div>
              <VBtn color="primary" size="small" block>Follow</VBtn>
            </VCard>
          </VCol>
        </VRow>

        <VBtn variant="text" color="primary" block class="mt-4">See More Suggestions</VBtn>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 4: Mutual Followers -->
    <section class="py-8 bg-grey-lighten-5">
      <VContainer>
        <VRow justify="center">
          <VCol cols="12" md="8" lg="6">
            <h3 class="text-h5 font-weight-bold mb-6">Mutual Followers</h3>

            <VCard variant="outlined">
              <VList lines="three">
                <template v-for="(user, idx) in mutualFollowers" :key="user.id">
                  <VListItem>
                    <template #prepend>
                      <VAvatar size="56">
                        <VImg :src="user.avatar" />
                      </VAvatar>
                    </template>

                    <VListItemTitle class="font-weight-bold mb-1">
                      {{ user.name }}
                      <VIcon v-if="user.verified" color="primary" size="14" class="ml-1">
                        {{ Icons.CheckCircle }}
                      </VIcon>
                    </VListItemTitle>
                    <VListItemSubtitle class="text-body-2">
                      @{{ user.username }}
                    </VListItemSubtitle>
                    <VListItemSubtitle>
                      <div class="d-flex align-center mt-1">
                        <VAvatarGroup max="3" size="20">
                          <VAvatar v-for="m in user.mutuals" :key="m.id" size="20">
                            <VImg :src="m.avatar" />
                          </VAvatar>
                        </VAvatarGroup>
                        <span class="text-caption text-medium-emphasis ml-2">
                          Followed by {{ user.mutuals[0].name }} and {{ user.mutualCount - 1 }} others
                        </span>
                      </div>
                    </VListItemSubtitle>

                    <template #append>
                      <VBtn color="primary" size="small">Follow</VBtn>
                    </template>
                  </VListItem>
                  <VDivider v-if="idx < mutualFollowers.length - 1" inset />
                </template>
              </VList>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icons } from '@/shared/model'
import type { ISocialUser } from '@/shared/ui/snippets'

const searchQuery = ref('')
const tabSearch = ref('')
const activeTab = ref('followers')
const selectedCategory = ref(0)

const categories = ['All', 'Suggested', 'Recent', 'Popular', 'Verified']

const followers: ISocialUser[] = [
  { id: 1, name: 'Alex Thompson', username: 'alexthompson', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', verified: true, isFollowing: true },
  { id: 2, name: 'Emily Davis', username: 'emilydavis', avatar: 'https://randomuser.me/api/portraits/women/28.jpg', verified: false, isFollowing: false },
  { id: 3, name: 'James Wilson', username: 'jameswilson', avatar: 'https://randomuser.me/api/portraits/men/35.jpg', verified: true, isFollowing: true },
  { id: 4, name: 'Lisa Park', username: 'lisapark', avatar: 'https://randomuser.me/api/portraits/women/35.jpg', verified: false, isFollowing: false },
  { id: 5, name: 'Michael Brown', username: 'michaelbrown', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', verified: false, isFollowing: true },
]

const tabUsers: (ISocialUser & { bio?: string })[] = [
  { id: 1, name: 'Sarah Miller', username: 'sarahmiller', avatar: 'https://randomuser.me/api/portraits/women/42.jpg', bio: 'Designer & Creative Director', verified: true, isFollowing: true },
  { id: 2, name: 'David Kim', username: 'davidkim', avatar: 'https://randomuser.me/api/portraits/men/52.jpg', bio: 'Software Engineer at Tech Co', verified: false, isFollowing: false },
  { id: 3, name: 'Emma Wilson', username: 'emmawilson', avatar: 'https://randomuser.me/api/portraits/women/52.jpg', bio: 'Travel & Lifestyle Blogger', verified: true, isFollowing: true },
  { id: 4, name: 'John Smith', username: 'johnsmith', avatar: 'https://randomuser.me/api/portraits/men/55.jpg', bio: 'Photographer & Videographer', verified: false, isFollowing: false },
]

const gridUsers: ISocialUser[] = [
  { id: 1, name: 'Olivia Taylor', username: 'oliviataylor', avatar: 'https://randomuser.me/api/portraits/women/55.jpg', verified: true, followers: 45600 },
  { id: 2, name: 'Noah Johnson', username: 'noahjohnson', avatar: 'https://randomuser.me/api/portraits/men/58.jpg', verified: false, followers: 23400 },
  { id: 3, name: 'Sophia Lee', username: 'sophialee', avatar: 'https://randomuser.me/api/portraits/women/58.jpg', verified: true, followers: 89200 },
  { id: 4, name: 'Liam Brown', username: 'liambrown', avatar: 'https://randomuser.me/api/portraits/men/62.jpg', verified: false, followers: 12300 },
  { id: 5, name: 'Ava Martinez', username: 'avamartinez', avatar: 'https://randomuser.me/api/portraits/women/62.jpg', verified: true, followers: 156000 },
  { id: 6, name: 'Ethan Garcia', username: 'ethangarcia', avatar: 'https://randomuser.me/api/portraits/men/65.jpg', verified: false, followers: 8900 },
]

interface MutualUser extends ISocialUser {
  mutuals: { id: number; name: string; avatar: string }[]
  mutualCount: number
}

const mutualFollowers: MutualUser[] = [
  {
    id: 1,
    name: 'Jessica Thompson',
    username: 'jessicathompson',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    verified: true,
    mutuals: [
      { id: 1, name: 'Alex Thompson', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
      { id: 2, name: 'Emily Davis', avatar: 'https://randomuser.me/api/portraits/women/28.jpg' },
      { id: 3, name: 'James Wilson', avatar: 'https://randomuser.me/api/portraits/men/35.jpg' },
    ],
    mutualCount: 12,
  },
  {
    id: 2,
    name: 'Ryan Cooper',
    username: 'ryancooper',
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
    verified: false,
    mutuals: [
      { id: 1, name: 'Lisa Park', avatar: 'https://randomuser.me/api/portraits/women/35.jpg' },
      { id: 2, name: 'Michael Brown', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
    ],
    mutualCount: 5,
  },
  {
    id: 3,
    name: 'Amanda White',
    username: 'amandawhite',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    verified: true,
    mutuals: [
      { id: 1, name: 'Sarah Miller', avatar: 'https://randomuser.me/api/portraits/women/42.jpg' },
      { id: 2, name: 'David Kim', avatar: 'https://randomuser.me/api/portraits/men/52.jpg' },
      { id: 3, name: 'Emma Wilson', avatar: 'https://randomuser.me/api/portraits/women/52.jpg' },
    ],
    mutualCount: 8,
  },
]

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}
</script>
