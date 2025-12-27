<!--
  Snippet: Social Feed
  Description: Social media feed with posts, stories, and suggestions
  Components: SocialPostCard
  Variants: Standard feed, compact, with sidebar
-->
<template>
  <div>
    <!-- Style 1: Standard Social Feed -->
    <section class="py-8 bg-grey-lighten-5">
      <VContainer>
        <VRow justify="center">
          <VCol cols="12" md="8" lg="6">
            <!-- Create Post -->
            <VCard variant="outlined" class="mb-4">
              <VCardText class="pa-4">
                <div class="d-flex ga-3">
                  <VAvatar size="44">
                    <VImg src="https://randomuser.me/api/portraits/men/1.jpg" />
                  </VAvatar>
                  <VTextField
                    placeholder="What's on your mind?"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    rounded="pill"
                  />
                </div>
                <VDivider class="my-3" />
                <div class="d-flex justify-space-around">
                  <VBtn variant="text" color="error">
                    <VIcon start>{{ Icons.Video }}</VIcon>
                    Live Video
                  </VBtn>
                  <VBtn variant="text" color="success">
                    <VIcon start>{{ Icons.Image }}</VIcon>
                    Photo
                  </VBtn>
                  <VBtn variant="text" color="warning">
                    <VIcon start>{{ Icons.EmoticonHappy }}</VIcon>
                    Feeling
                  </VBtn>
                </div>
              </VCardText>
            </VCard>

            <!-- Feed Posts -->
            <SocialPostCard
              v-for="post in feedPosts"
              :key="post.id"
              :author="post.author"
              :content="post.content"
              :images="post.images"
              :created-at="post.createdAt"
              :likes="post.likes"
              :comments="post.comments"
              :shares="post.shares"
              :is-liked="post.isLiked"
              class="mb-4"
            />

            <VBtn variant="tonal" color="primary" block size="large">
              Load More Posts
            </VBtn>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 2: Feed with Sidebar -->
    <section class="py-8">
      <VContainer>
        <VRow>
          <!-- Main Feed -->
          <VCol cols="12" lg="8">
            <!-- Stories -->
            <VCard variant="outlined" class="mb-4">
              <VCardText class="pa-4">
                <div class="d-flex ga-3 overflow-x-auto pb-2">
                  <!-- Create Story -->
                  <div class="text-center flex-shrink-0" style="width: 80px;">
                    <VAvatar size="64" color="primary" class="mb-1">
                      <VIcon color="white">{{ Icons.Plus }}</VIcon>
                    </VAvatar>
                    <div class="text-caption">Add Story</div>
                  </div>
                  <!-- Stories -->
                  <div
                    v-for="story in stories"
                    :key="story.id"
                    class="text-center flex-shrink-0 cursor-pointer"
                    style="width: 80px;"
                  >
                    <VAvatar
                      size="64"
                      :class="{ 'story-ring': !story.viewed, 'story-ring-viewed': story.viewed }"
                    >
                      <VImg :src="story.user.avatar" />
                    </VAvatar>
                    <div class="text-caption text-truncate">{{ story.user.name.split(' ')[0] }}</div>
                  </div>
                </div>
              </VCardText>
            </VCard>

            <!-- Posts -->
            <VCard v-for="post in sidebarFeedPosts" :key="post.id" variant="outlined" class="mb-4">
              <VCardText class="pa-4">
                <!-- Post Header -->
                <div class="d-flex align-center justify-space-between mb-3">
                  <div class="d-flex align-center">
                    <VAvatar size="44" class="mr-3">
                      <VImg :src="post.author.avatar" />
                    </VAvatar>
                    <div>
                      <div class="d-flex align-center">
                        <span class="font-weight-bold">{{ post.author.name }}</span>
                        <VIcon v-if="post.author.verified" color="primary" size="16" class="ml-1">
                          {{ Icons.CheckCircle }}
                        </VIcon>
                      </div>
                      <div class="text-caption text-medium-emphasis">
                        @{{ post.author.username }} · {{ formatTime(post.createdAt) }}
                      </div>
                    </div>
                  </div>
                  <VBtn icon variant="text" size="small">
                    <VIcon>{{ Icons.DotsHorizontal }}</VIcon>
                  </VBtn>
                </div>

                <!-- Post Content -->
                <p class="text-body-1 mb-3">{{ post.content }}</p>

                <!-- Post Image -->
                <VImg
                  v-if="post.images?.length"
                  :src="post.images[0]"
                  height="300"
                  cover
                  rounded="lg"
                  class="mb-3"
                />

                <!-- Post Actions -->
                <div class="d-flex align-center justify-space-between">
                  <div class="d-flex align-center ga-1">
                    <VBtn :color="post.isLiked ? 'error' : undefined" variant="text" size="small">
                      <VIcon start>{{ post.isLiked ? Icons.Heart : Icons.HeartOutline }}</VIcon>
                      {{ formatNumber(post.likes) }}
                    </VBtn>
                    <VBtn variant="text" size="small">
                      <VIcon start>{{ Icons.CommentOutline }}</VIcon>
                      {{ formatNumber(post.comments) }}
                    </VBtn>
                    <VBtn variant="text" size="small">
                      <VIcon start>{{ Icons.Share }}</VIcon>
                      {{ formatNumber(post.shares) }}
                    </VBtn>
                  </div>
                  <VBtn :color="post.isBookmarked ? 'primary' : undefined" icon variant="text" size="small">
                    <VIcon>{{ post.isBookmarked ? Icons.Bookmark : Icons.BookmarkOutline }}</VIcon>
                  </VBtn>
                </div>
              </VCardText>
            </VCard>
          </VCol>

          <!-- Sidebar -->
          <VCol cols="12" lg="4" class="d-none d-lg-block">
            <!-- User Profile Mini -->
            <VCard variant="outlined" class="mb-4">
              <VCardText class="pa-4">
                <div class="d-flex align-center mb-3">
                  <VAvatar size="56" class="mr-3">
                    <VImg src="https://randomuser.me/api/portraits/men/1.jpg" />
                  </VAvatar>
                  <div>
                    <div class="font-weight-bold">John Doe</div>
                    <div class="text-caption text-medium-emphasis">@johndoe</div>
                  </div>
                </div>
                <div class="d-flex justify-space-around text-center">
                  <div>
                    <div class="font-weight-bold">245</div>
                    <div class="text-caption text-medium-emphasis">Posts</div>
                  </div>
                  <div>
                    <div class="font-weight-bold">12.5K</div>
                    <div class="text-caption text-medium-emphasis">Followers</div>
                  </div>
                  <div>
                    <div class="font-weight-bold">892</div>
                    <div class="text-caption text-medium-emphasis">Following</div>
                  </div>
                </div>
              </VCardText>
            </VCard>

            <!-- Suggestions -->
            <VCard variant="outlined" class="mb-4">
              <VCardTitle class="text-subtitle-1 font-weight-bold pb-0">
                Suggested for you
              </VCardTitle>
              <VCardText class="pa-4">
                <div v-for="user in suggestions" :key="user.id" class="d-flex align-center justify-space-between mb-3">
                  <div class="d-flex align-center">
                    <VAvatar size="40" class="mr-3">
                      <VImg :src="user.avatar" />
                    </VAvatar>
                    <div>
                      <div class="d-flex align-center">
                        <span class="text-subtitle-2 font-weight-medium">{{ user.name }}</span>
                        <VIcon v-if="user.verified" color="primary" size="14" class="ml-1">
                          {{ Icons.CheckCircle }}
                        </VIcon>
                      </div>
                      <div class="text-caption text-medium-emphasis">@{{ user.username }}</div>
                    </div>
                  </div>
                  <VBtn size="small" color="primary" variant="tonal">Follow</VBtn>
                </div>
                <VBtn variant="text" color="primary" block class="mt-2">See All</VBtn>
              </VCardText>
            </VCard>

            <!-- Trending -->
            <VCard variant="outlined">
              <VCardTitle class="text-subtitle-1 font-weight-bold pb-0">
                Trending Topics
              </VCardTitle>
              <VCardText class="pa-4">
                <div v-for="topic in trendingTopics" :key="topic.tag" class="mb-3">
                  <div class="text-caption text-medium-emphasis">{{ topic.category }}</div>
                  <div class="font-weight-bold">{{ topic.tag }}</div>
                  <div class="text-caption text-medium-emphasis">{{ topic.posts }} posts</div>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/shared/model'
import { SocialPostCard } from '@/shared/ui/snippets'
import type { ISocialPost, ISocialUser, ISocialStory } from '@/shared/ui/snippets'

const user1: ISocialUser = {
  id: 1,
  name: 'Sarah Johnson',
  username: 'sarahjohnson',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  verified: true,
}

const user2: ISocialUser = {
  id: 2,
  name: 'Mike Chen',
  username: 'mikechen',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  verified: false,
}

const feedPosts: ISocialPost[] = [
  { id: 1, author: user1, content: 'Just launched our new product! 🚀 Super excited to share this with everyone. Check out the link in my bio for early access. #startup #launch', images: ['https://picsum.photos/seed/launch/600/400'], createdAt: '2024-12-27T10:30:00Z', likes: 1250, comments: 89, shares: 45, isLiked: true },
  { id: 2, author: user2, content: 'Beautiful sunset today at the beach. Sometimes you just need to disconnect and enjoy nature. 🌅', images: ['https://picsum.photos/seed/sunset/600/400'], createdAt: '2024-12-27T08:15:00Z', likes: 890, comments: 56, shares: 12, isLiked: false },
  { id: 3, author: user1, content: 'Great meeting with the team today! Exciting things are coming. Stay tuned for more updates! 💪', createdAt: '2024-12-26T16:45:00Z', likes: 456, comments: 23, shares: 8, isLiked: false },
]

const sidebarFeedPosts: (ISocialPost & { isBookmarked?: boolean })[] = [
  { id: 1, author: user1, content: 'Working on something special for 2025! Can\'t wait to share more details soon. 🎉', images: ['https://picsum.photos/seed/work/600/400'], createdAt: '2024-12-27T09:00:00Z', likes: 2340, comments: 156, shares: 78, isLiked: true, isBookmarked: true },
  { id: 2, author: user2, content: 'Just finished reading an amazing book on productivity. Highly recommend "Atomic Habits" by James Clear! 📚', createdAt: '2024-12-27T07:30:00Z', likes: 567, comments: 34, shares: 23, isLiked: false, isBookmarked: false },
]

const stories: ISocialStory[] = [
  { id: 1, user: { name: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' }, image: '', viewed: false },
  { id: 2, user: { name: 'Mike Chen', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' }, image: '', viewed: false },
  { id: 3, user: { name: 'Emily Davis', avatar: 'https://randomuser.me/api/portraits/women/28.jpg' }, image: '', viewed: true },
  { id: 4, user: { name: 'Alex Thompson', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' }, image: '', viewed: true },
  { id: 5, user: { name: 'Lisa Park', avatar: 'https://randomuser.me/api/portraits/women/35.jpg' }, image: '', viewed: false },
]

const suggestions: ISocialUser[] = [
  { id: 1, name: 'Emma Wilson', username: 'emmawilson', avatar: 'https://randomuser.me/api/portraits/women/52.jpg', verified: true },
  { id: 2, name: 'James Brown', username: 'jamesbrown', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', verified: false },
  { id: 3, name: 'Olivia Taylor', username: 'oliviataylor', avatar: 'https://randomuser.me/api/portraits/women/55.jpg', verified: true },
]

const trendingTopics = [
  { category: 'Technology', tag: '#AI2025', posts: '125K' },
  { category: 'Business', tag: '#StartupLife', posts: '89K' },
  { category: 'Entertainment', tag: '#NewYearGoals', posts: '256K' },
  { category: 'Sports', tag: '#WorldCup', posts: '1.2M' },
]

const formatTime = (dateStr: string) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 1) return 'Just now'
  if (hours < 24) return `${hours}h`
  return `${Math.floor(hours / 24)}d`
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}
</script>

<style scoped>
.story-ring {
  border: 3px solid #e91e63;
  padding: 2px;
}

.story-ring-viewed {
  border: 3px solid #9e9e9e;
  padding: 2px;
}
</style>
