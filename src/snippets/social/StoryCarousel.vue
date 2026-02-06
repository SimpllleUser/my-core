<!--
  Snippet: Story Carousel
  Description: Social media stories carousel with viewer and creation
  Components: None (standalone)
  Variants: Horizontal scroll, fullscreen viewer, grid view
-->
<template>
  <div>
    <!-- Style 1: Horizontal Story Bar -->
    <section class="py-8">
      <VContainer>
        <h3 class="text-h6 font-weight-bold mb-4">Stories</h3>

        <div class="stories-container">
          <!-- Create Story -->
          <div class="story-item">
            <div class="story-avatar create-story">
              <VImg src="https://randomuser.me/api/portraits/men/1.jpg" class="user-bg" />
              <div class="add-icon">
                <VIcon color="white" size="20">{{ Icons.Plus }}</VIcon>
              </div>
            </div>
            <span class="story-name">Create Story</span>
          </div>

          <!-- User Stories -->
          <div
            v-for="story in horizontalStories"
            :key="story.id"
            class="story-item cursor-pointer"
            @click="openStory(story)"
          >
            <div
              class="story-avatar"
              :class="{ 'ring-active': !story.viewed, 'ring-viewed': story.viewed }"
            >
              <VImg :src="story.user.avatar" />
            </div>
            <span class="story-name">{{ story.user.name.split(' ')[0] }}</span>
          </div>
        </div>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 2: Story Cards -->
    <section class="py-8 bg-grey-lighten-5">
      <VContainer>
        <div class="d-flex justify-space-between align-center mb-4">
          <h3 class="text-h6 font-weight-bold">Stories</h3>
          <VBtn variant="text" color="primary">See All</VBtn>
        </div>

        <VRow>
          <!-- Create Story Card -->
          <VCol cols="6" sm="4" md="2">
            <VCard class="story-card cursor-pointer" hover>
              <VImg
                src="https://randomuser.me/api/portraits/men/1.jpg"
                height="200"
                cover
                class="story-card-bg"
              />
              <div class="story-card-overlay create">
                <VAvatar color="primary" size="40" class="create-btn">
                  <VIcon color="white">{{ Icons.Plus }}</VIcon>
                </VAvatar>
                <div class="text-subtitle-2 font-weight-bold text-white mt-2">Create Story</div>
              </div>
            </VCard>
          </VCol>

          <!-- Story Cards -->
          <VCol v-for="story in cardStories" :key="story.id" cols="6" sm="4" md="2">
            <VCard class="story-card cursor-pointer" hover>
              <VImg :src="story.image" height="200" cover />
              <div class="story-card-overlay">
                <VAvatar
                  size="36"
                  class="story-card-avatar"
                  :class="{ 'ring-small': !story.viewed }"
                >
                  <VImg :src="story.user.avatar" />
                </VAvatar>
                <div class="story-card-name">{{ story.user.name }}</div>
              </div>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 3: Story Viewer -->
    <section class="py-8">
      <VContainer>
        <h3 class="text-h6 font-weight-bold mb-4">Story Viewer Preview</h3>

        <VRow justify="center">
          <VCol cols="12" sm="8" md="6" lg="4">
            <VCard class="story-viewer" color="black">
              <!-- Story Content -->
              <VImg
                :src="activeStory.image"
                height="600"
                cover
                class="story-viewer-image"
              />

              <!-- Progress Bars -->
              <div class="story-progress">
                <div
                  v-for="(_, idx) in viewerStories"
                  :key="idx"
                  class="progress-bar"
                  :class="{ 'active': idx === currentIndex, 'completed': idx < currentIndex }"
                />
              </div>

              <!-- Header -->
              <div class="story-header">
                <div class="d-flex align-center">
                  <VAvatar size="36" class="mr-2">
                    <VImg :src="activeStory.user.avatar" />
                  </VAvatar>
                  <div>
                    <div class="text-subtitle-2 font-weight-bold text-white">
                      {{ activeStory.user.name }}
                    </div>
                    <div class="text-caption text-grey-lighten-1">{{ activeStory.createdAt }}</div>
                  </div>
                </div>
                <div class="d-flex ga-1">
                  <VBtn icon variant="text" color="white" size="small">
                    <VIcon>{{ Icons.Pause }}</VIcon>
                  </VBtn>
                  <VBtn icon variant="text" color="white" size="small">
                    <VIcon>{{ Icons.VolumeHigh }}</VIcon>
                  </VBtn>
                  <VBtn icon variant="text" color="white" size="small">
                    <VIcon>{{ Icons.DotsVertical }}</VIcon>
                  </VBtn>
                </div>
              </div>

              <!-- Navigation -->
              <div class="story-nav prev" @click="prevStory">
                <VIcon color="white" size="24">{{ Icons.ChevronLeft }}</VIcon>
              </div>
              <div class="story-nav next" @click="nextStory">
                <VIcon color="white" size="24">{{ Icons.ChevronRight }}</VIcon>
              </div>

              <!-- Footer -->
              <div class="story-footer">
                <VTextField
                  placeholder="Send a message..."
                  variant="outlined"
                  density="compact"
                  hide-details
                  rounded="pill"
                  bg-color="rgba(255,255,255,0.1)"
                  class="flex-grow-1 mr-2"
                />
                <VBtn icon variant="text" color="white">
                  <VIcon>{{ Icons.Heart }}</VIcon>
                </VBtn>
                <VBtn icon variant="text" color="white">
                  <VIcon>{{ Icons.Send }}</VIcon>
                </VBtn>
              </div>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 4: Story Highlights -->
    <section class="py-8 bg-grey-lighten-5">
      <VContainer>
        <h3 class="text-h6 font-weight-bold mb-4">Highlights</h3>

        <div class="highlights-container">
          <!-- Add Highlight -->
          <div class="highlight-item">
            <VAvatar size="72" color="grey-lighten-3" class="highlight-avatar">
              <VIcon size="28" color="grey">{{ Icons.Plus }}</VIcon>
            </VAvatar>
            <span class="highlight-name">New</span>
          </div>

          <!-- Highlights -->
          <div v-for="highlight in highlights" :key="highlight.id" class="highlight-item">
            <VAvatar size="72" class="highlight-avatar">
              <VImg :src="highlight.cover" />
            </VAvatar>
            <span class="highlight-name">{{ highlight.name }}</span>
          </div>
        </div>
      </VContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icons } from '@/shared/model'
import type { ISocialStory } from '@/shared/ui/snippets'

const currentIndex = ref(0)

const horizontalStories: ISocialStory[] = [
  { id: 1, user: { name: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' }, image: 'https://picsum.photos/seed/story1/400/700', viewed: false },
  { id: 2, user: { name: 'Mike Chen', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' }, image: 'https://picsum.photos/seed/story2/400/700', viewed: false },
  { id: 3, user: { name: 'Emily Davis', avatar: 'https://randomuser.me/api/portraits/women/28.jpg' }, image: 'https://picsum.photos/seed/story3/400/700', viewed: true },
  { id: 4, user: { name: 'Alex Thompson', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' }, image: 'https://picsum.photos/seed/story4/400/700', viewed: true },
  { id: 5, user: { name: 'Lisa Park', avatar: 'https://randomuser.me/api/portraits/women/35.jpg' }, image: 'https://picsum.photos/seed/story5/400/700', viewed: false },
  { id: 6, user: { name: 'James Wilson', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' }, image: 'https://picsum.photos/seed/story6/400/700', viewed: false },
  { id: 7, user: { name: 'Olivia Brown', avatar: 'https://randomuser.me/api/portraits/women/55.jpg' }, image: 'https://picsum.photos/seed/story7/400/700', viewed: true },
]

const cardStories: (ISocialStory & { image: string })[] = [
  { id: 1, user: { name: 'Sarah J.', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' }, image: 'https://picsum.photos/seed/card1/300/400', viewed: false },
  { id: 2, user: { name: 'Mike C.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' }, image: 'https://picsum.photos/seed/card2/300/400', viewed: false },
  { id: 3, user: { name: 'Emily D.', avatar: 'https://randomuser.me/api/portraits/women/28.jpg' }, image: 'https://picsum.photos/seed/card3/300/400', viewed: true },
  { id: 4, user: { name: 'Alex T.', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' }, image: 'https://picsum.photos/seed/card4/300/400', viewed: false },
  { id: 5, user: { name: 'Lisa P.', avatar: 'https://randomuser.me/api/portraits/women/35.jpg' }, image: 'https://picsum.photos/seed/card5/300/400', viewed: true },
]

interface ViewerStory extends ISocialStory {
  createdAt: string
}

const viewerStories: ViewerStory[] = [
  { id: 1, user: { name: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' }, image: 'https://picsum.photos/seed/view1/400/700', createdAt: '2h ago' },
  { id: 2, user: { name: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' }, image: 'https://picsum.photos/seed/view2/400/700', createdAt: '3h ago' },
  { id: 3, user: { name: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' }, image: 'https://picsum.photos/seed/view3/400/700', createdAt: '5h ago' },
]

const highlights = [
  { id: 1, name: 'Travel', cover: 'https://picsum.photos/seed/hl1/100/100' },
  { id: 2, name: 'Food', cover: 'https://picsum.photos/seed/hl2/100/100' },
  { id: 3, name: 'Work', cover: 'https://picsum.photos/seed/hl3/100/100' },
  { id: 4, name: 'Friends', cover: 'https://picsum.photos/seed/hl4/100/100' },
  { id: 5, name: 'Events', cover: 'https://picsum.photos/seed/hl5/100/100' },
]

const activeStory = computed(() => viewerStories[currentIndex.value])

const openStory = (story: ISocialStory) => {
  console.log('Opening story:', story.id)
}

const prevStory = () => {
  if (currentIndex.value > 0) currentIndex.value--
}

const nextStory = () => {
  if (currentIndex.value < viewerStories.length - 1) currentIndex.value++
}
</script>

<style scoped>
.stories-container {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.story-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.story-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  padding: 3px;
}

.story-avatar .v-img {
  border-radius: 50%;
}

.ring-active {
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
}

.ring-viewed {
  background: #9e9e9e;
}

.story-name {
  font-size: 12px;
  margin-top: 4px;
  max-width: 72px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.create-story {
  position: relative;
  background: none;
}

.create-story .user-bg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.create-story .add-icon {
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: 28px;
  height: 28px;
  background: #1976d2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
}

/* Story Cards */
.story-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.story-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 12px;
}

.story-card-overlay.create {
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.3);
}

.story-card-avatar {
  border: 3px solid #1976d2;
}

.ring-small {
  border-color: #e91e63;
}

.story-card-name {
  color: white;
  font-weight: 600;
  font-size: 13px;
  margin-top: 8px;
}

/* Story Viewer */
.story-viewer {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.story-progress {
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  display: flex;
  gap: 4px;
  z-index: 10;
}

.progress-bar {
  flex: 1;
  height: 3px;
  background: rgba(255,255,255,0.4);
  border-radius: 2px;
}

.progress-bar.active {
  background: white;
}

.progress-bar.completed {
  background: white;
}

.story-header {
  position: absolute;
  top: 20px;
  left: 12px;
  right: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
}

.story-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30%;
  height: 60%;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 5;
}

.story-nav.prev {
  left: 0;
  padding-left: 8px;
}

.story-nav.next {
  right: 0;
  justify-content: flex-end;
  padding-right: 8px;
}

.story-footer {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  z-index: 10;
}

/* Highlights */
.highlights-container {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.highlight-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.highlight-avatar {
  border: 2px solid #e0e0e0;
}

.highlight-name {
  font-size: 12px;
  margin-top: 6px;
  max-width: 72px;
  text-align: center;
}
</style>
