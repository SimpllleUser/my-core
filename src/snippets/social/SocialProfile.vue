<!--
  Snippet: Social Profile
  Description: Social media profile page with header, stats, and posts
  Components: SocialPostCard, StatCard
  Variants: Standard profile, influencer, minimal
-->
<template>
  <div>
    <!-- Style 1: Standard Profile -->
    <section>
      <!-- Cover Photo -->
      <div class="cover-photo" style="height: 300px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <VImg
          src="https://picsum.photos/seed/cover/1200/400"
          height="300"
          cover
        />
      </div>

      <VContainer>
        <!-- Profile Header -->
        <div class="profile-header">
          <VAvatar size="150" class="profile-avatar elevation-4">
            <VImg :src="profile.avatar" />
          </VAvatar>

          <div class="profile-info">
            <div class="d-flex align-center flex-wrap ga-2 mb-2">
              <h1 class="text-h4 font-weight-bold">{{ profile.name }}</h1>
              <VIcon v-if="profile.verified" color="primary" size="24">{{ Icons.CheckCircle }}</VIcon>
            </div>
            <div class="text-body-1 text-medium-emphasis mb-2">@{{ profile.username }}</div>
            <p class="text-body-1 mb-3">{{ profile.bio }}</p>

            <div class="d-flex flex-wrap ga-4 text-body-2 text-medium-emphasis mb-4">
              <span class="d-flex align-center">
                <VIcon size="18" class="mr-1">{{ Icons.MapMarker }}</VIcon>
                San Francisco, CA
              </span>
              <span class="d-flex align-center">
                <VIcon size="18" class="mr-1">{{ Icons.Link }}</VIcon>
                example.com
              </span>
              <span class="d-flex align-center">
                <VIcon size="18" class="mr-1">{{ Icons.Calendar }}</VIcon>
                Joined March 2020
              </span>
            </div>

            <div class="d-flex ga-4 mb-4">
              <div>
                <span class="font-weight-bold">{{ formatNumber(profile.following || 0) }}</span>
                <span class="text-medium-emphasis ml-1">Following</span>
              </div>
              <div>
                <span class="font-weight-bold">{{ formatNumber(profile.followers || 0) }}</span>
                <span class="text-medium-emphasis ml-1">Followers</span>
              </div>
            </div>
          </div>

          <div class="profile-actions">
            <VBtn v-if="profile.isFollowing" variant="outlined" color="primary">Following</VBtn>
            <VBtn v-else color="primary">Follow</VBtn>
            <VBtn variant="outlined" icon><VIcon>{{ Icons.MessageOutline }}</VIcon></VBtn>
            <VBtn variant="outlined" icon><VIcon>{{ Icons.DotsHorizontal }}</VIcon></VBtn>
          </div>
        </div>

        <!-- Tabs -->
        <VTabs v-model="activeTab" color="primary" class="mb-4">
          <VTab value="posts">Posts</VTab>
          <VTab value="replies">Replies</VTab>
          <VTab value="media">Media</VTab>
          <VTab value="likes">Likes</VTab>
        </VTabs>

        <!-- Posts Grid -->
        <VRow>
          <VCol cols="12" md="8">
            <SocialPostCard
              v-for="post in profilePosts"
              :key="post.id"
              :author="profile"
              :content="post.content"
              :images="post.images"
              :created-at="post.createdAt"
              :likes="post.likes"
              :comments="post.comments"
              :shares="post.shares"
              class="mb-4"
            />
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider class="my-8" />

    <!-- Style 2: Influencer Profile -->
    <section class="py-8 bg-grey-lighten-5">
      <VContainer>
        <VRow>
          <VCol cols="12" md="4">
            <VCard variant="outlined" class="text-center pa-6">
              <VAvatar size="120" class="mb-4">
                <VImg :src="influencer.avatar" />
              </VAvatar>
              <div class="d-flex align-center justify-center mb-2">
                <h2 class="text-h5 font-weight-bold">{{ influencer.name }}</h2>
                <VIcon v-if="influencer.verified" color="primary" size="20" class="ml-1">
                  {{ Icons.CheckCircle }}
                </VIcon>
              </div>
              <div class="text-body-2 text-medium-emphasis mb-4">@{{ influencer.username }}</div>
              <p class="text-body-2 mb-4">{{ influencer.bio }}</p>

              <VRow class="mb-4">
                <VCol cols="4">
                  <div class="text-h6 font-weight-bold">{{ formatNumber(influencer.posts || 0) }}</div>
                  <div class="text-caption text-medium-emphasis">Posts</div>
                </VCol>
                <VCol cols="4">
                  <div class="text-h6 font-weight-bold">{{ formatNumber(influencer.followers || 0) }}</div>
                  <div class="text-caption text-medium-emphasis">Followers</div>
                </VCol>
                <VCol cols="4">
                  <div class="text-h6 font-weight-bold">{{ formatNumber(influencer.following || 0) }}</div>
                  <div class="text-caption text-medium-emphasis">Following</div>
                </VCol>
              </VRow>

              <VBtn color="primary" block size="large" class="mb-2">Follow</VBtn>
              <VBtn variant="outlined" block>Message</VBtn>

              <VDivider class="my-4" />

              <div class="d-flex justify-center ga-2">
                <VBtn icon variant="tonal"><VIcon>{{ Icons.Instagram }}</VIcon></VBtn>
                <VBtn icon variant="tonal"><VIcon>{{ Icons.Twitter }}</VIcon></VBtn>
                <VBtn icon variant="tonal"><VIcon>{{ Icons.Youtube }}</VIcon></VBtn>
                <VBtn icon variant="tonal"><VIcon>{{ Icons.Telegram }}</VIcon></VBtn>
              </div>
            </VCard>
          </VCol>

          <VCol cols="12" md="8">
            <!-- Photo Grid -->
            <div class="d-flex justify-space-between align-center mb-4">
              <VBtnToggle v-model="gridView" mandatory variant="outlined" density="compact">
                <VBtn value="grid" icon><VIcon>{{ Icons.ViewGrid }}</VIcon></VBtn>
                <VBtn value="list" icon><VIcon>{{ Icons.ViewList }}</VIcon></VBtn>
              </VBtnToggle>
            </div>

            <VRow dense>
              <VCol v-for="media in mediaGrid" :key="media.id" cols="4">
                <VCard class="media-card cursor-pointer" hover>
                  <VImg :src="media.image" aspect-ratio="1" cover />
                  <div class="media-overlay">
                    <div class="d-flex align-center ga-3 text-white">
                      <span class="d-flex align-center">
                        <VIcon size="18" class="mr-1">{{ Icons.Heart }}</VIcon>
                        {{ formatNumber(media.likes) }}
                      </span>
                      <span class="d-flex align-center">
                        <VIcon size="18" class="mr-1">{{ Icons.Comment }}</VIcon>
                        {{ formatNumber(media.comments) }}
                      </span>
                    </div>
                  </div>
                </VCard>
              </VCol>
            </VRow>

            <VBtn variant="outlined" block size="large" class="mt-4">Load More</VBtn>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 3: Minimal Profile Card -->
    <section class="py-8">
      <VContainer>
        <VRow justify="center">
          <VCol cols="12" sm="8" md="6" lg="4">
            <VCard variant="outlined">
              <div class="text-center pa-6 pb-0">
                <VAvatar size="100" class="mb-3">
                  <VImg :src="minimalProfile.avatar" />
                </VAvatar>
                <div class="d-flex align-center justify-center mb-1">
                  <h3 class="text-h6 font-weight-bold">{{ minimalProfile.name }}</h3>
                  <VIcon v-if="minimalProfile.verified" color="primary" size="18" class="ml-1">
                    {{ Icons.CheckCircle }}
                  </VIcon>
                </div>
                <div class="text-body-2 text-medium-emphasis">@{{ minimalProfile.username }}</div>
              </div>

              <VCardText class="px-6">
                <div class="d-flex justify-space-around text-center py-4">
                  <div>
                    <div class="text-h6 font-weight-bold">{{ formatNumber(minimalProfile.posts || 0) }}</div>
                    <div class="text-caption text-medium-emphasis">Posts</div>
                  </div>
                  <VDivider vertical />
                  <div>
                    <div class="text-h6 font-weight-bold">{{ formatNumber(minimalProfile.followers || 0) }}</div>
                    <div class="text-caption text-medium-emphasis">Followers</div>
                  </div>
                  <VDivider vertical />
                  <div>
                    <div class="text-h6 font-weight-bold">{{ formatNumber(minimalProfile.following || 0) }}</div>
                    <div class="text-caption text-medium-emphasis">Following</div>
                  </div>
                </div>
              </VCardText>

              <VCardActions class="px-6 pb-6">
                <VBtn color="primary" block>Follow</VBtn>
              </VCardActions>
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
import { SocialPostCard } from '@/shared/ui/snippets'
import type { ISocialUser, ISocialPost } from '@/shared/ui/snippets'

const activeTab = ref('posts')
const gridView = ref('grid')

const profile: ISocialUser = {
  id: 1,
  name: 'Sarah Johnson',
  username: 'sarahjohnson',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  bio: 'Product Designer at @TechCorp | Building beautiful digital experiences | Coffee enthusiast ☕',
  verified: true,
  followers: 125400,
  following: 892,
  posts: 342,
  isFollowing: false,
}

const influencer: ISocialUser = {
  id: 2,
  name: 'Alex Creative',
  username: 'alexcreative',
  avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
  bio: 'Content Creator | Photography | Travel | Inspiring millions to chase their dreams ✨',
  verified: true,
  followers: 2500000,
  following: 245,
  posts: 1234,
}

const minimalProfile: ISocialUser = {
  id: 3,
  name: 'Emily Davis',
  username: 'emilydavis',
  avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
  verified: true,
  followers: 45600,
  following: 512,
  posts: 189,
}

const profilePosts: Omit<ISocialPost, 'author'>[] = [
  { id: 1, content: 'Just wrapped up an amazing project! So proud of what our team achieved. 🎉', images: ['https://picsum.photos/seed/proj/600/400'], createdAt: '2024-12-27T10:00:00Z', likes: 1234, comments: 89, shares: 45 },
  { id: 2, content: 'Morning coffee and coding sessions are my favorite way to start the day! ☕💻', createdAt: '2024-12-26T08:30:00Z', likes: 856, comments: 42, shares: 12 },
  { id: 3, content: 'Excited to announce that I\'ll be speaking at the Design Conference next month! See you there! 🎤', images: ['https://picsum.photos/seed/conf/600/400'], createdAt: '2024-12-25T14:00:00Z', likes: 2341, comments: 156, shares: 234 },
]

const mediaGrid = [
  { id: 1, image: 'https://picsum.photos/seed/m1/400/400', likes: 5234, comments: 123 },
  { id: 2, image: 'https://picsum.photos/seed/m2/400/400', likes: 3421, comments: 89 },
  { id: 3, image: 'https://picsum.photos/seed/m3/400/400', likes: 7865, comments: 234 },
  { id: 4, image: 'https://picsum.photos/seed/m4/400/400', likes: 2156, comments: 67 },
  { id: 5, image: 'https://picsum.photos/seed/m5/400/400', likes: 4532, comments: 145 },
  { id: 6, image: 'https://picsum.photos/seed/m6/400/400', likes: 6789, comments: 189 },
]

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}
</script>

<style scoped>
.profile-header {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: -75px;
  padding-bottom: 24px;
}

.profile-avatar {
  border: 4px solid white;
  flex-shrink: 0;
}

.profile-info {
  flex: 1;
  min-width: 300px;
  padding-top: 80px;
}

.profile-actions {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  padding-top: 80px;
}

.media-card {
  position: relative;
  overflow: hidden;
}

.media-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.media-card:hover .media-overlay {
  opacity: 1;
}

@media (max-width: 600px) {
  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-info {
    padding-top: 16px;
  }

  .profile-actions {
    padding-top: 0;
    justify-content: center;
  }
}
</style>
