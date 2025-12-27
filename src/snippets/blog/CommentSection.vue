<!--
  Snippet: Comment Section
  Description: Blog comments with replies, likes, and comment form
  Components: None (standalone)
  Variants: Simple list, threaded, with voting
-->
<template>
  <div>
    <!-- Style 1: Simple Comment List -->
    <section class="py-8">
      <VContainer>
        <VRow justify="center">
          <VCol cols="12" lg="8">
            <div class="d-flex justify-space-between align-center mb-6">
              <h3 class="text-h5 font-weight-bold">
                Comments ({{ simpleComments.length }})
              </h3>
              <VSelect
                v-model="sortOrder"
                :items="['Newest', 'Oldest', 'Most Liked']"
                density="compact"
                variant="outlined"
                hide-details
                style="max-width: 140px"
              />
            </div>

            <!-- Comment Form -->
            <VCard variant="outlined" class="mb-6">
              <VCardText class="pa-4">
                <div class="d-flex ga-3">
                  <VAvatar size="40">
                    <VImg src="https://randomuser.me/api/portraits/men/1.jpg" />
                  </VAvatar>
                  <div class="flex-grow-1">
                    <VTextarea
                      v-model="newComment"
                      placeholder="Write a comment..."
                      variant="outlined"
                      rows="3"
                      hide-details
                      class="mb-3"
                    />
                    <div class="d-flex justify-end">
                      <VBtn color="primary" :disabled="!newComment.trim()">
                        Post Comment
                      </VBtn>
                    </div>
                  </div>
                </div>
              </VCardText>
            </VCard>

            <!-- Comments List -->
            <VCard v-for="comment in simpleComments" :key="comment.id" variant="flat" class="mb-4">
              <VCardText class="pa-0">
                <div class="d-flex ga-3">
                  <VAvatar size="40">
                    <VImg :src="comment.author.avatar" />
                  </VAvatar>
                  <div class="flex-grow-1">
                    <div class="d-flex align-center mb-1">
                      <span class="font-weight-bold mr-2">{{ comment.author.name }}</span>
                      <span class="text-caption text-medium-emphasis">{{ comment.createdAt }}</span>
                    </div>
                    <p class="text-body-2 mb-2">{{ comment.content }}</p>
                    <div class="d-flex align-center ga-3">
                      <VBtn variant="text" size="small" color="primary">
                        <VIcon start size="16">{{ Icons.ThumbUp }}</VIcon>
                        {{ comment.likes }}
                      </VBtn>
                      <VBtn variant="text" size="small">Reply</VBtn>
                    </div>
                  </div>
                </div>
              </VCardText>
            </VCard>

            <VBtn variant="text" color="primary" block class="mt-4">
              Load More Comments
            </VBtn>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 2: Threaded Comments -->
    <section class="py-8 bg-grey-lighten-5">
      <VContainer>
        <VRow justify="center">
          <VCol cols="12" lg="8">
            <h3 class="text-h5 font-weight-bold mb-6">Discussion ({{ totalComments }})</h3>

            <!-- Threaded Comments -->
            <div v-for="comment in threadedComments" :key="comment.id" class="mb-4">
              <VCard variant="outlined">
                <VCardText class="pa-4">
                  <div class="d-flex ga-3">
                    <VAvatar size="44">
                      <VImg :src="comment.author.avatar" />
                    </VAvatar>
                    <div class="flex-grow-1">
                      <div class="d-flex align-center justify-space-between mb-2">
                        <div>
                          <span class="font-weight-bold">{{ comment.author.name }}</span>
                          <span class="text-caption text-medium-emphasis ml-2">{{ comment.createdAt }}</span>
                        </div>
                        <VBtn icon variant="text" size="small">
                          <VIcon>{{ Icons.DotsVertical }}</VIcon>
                        </VBtn>
                      </div>
                      <p class="text-body-1 mb-3">{{ comment.content }}</p>
                      <div class="d-flex align-center ga-2">
                        <VBtn variant="tonal" size="small" color="primary">
                          <VIcon start size="16">{{ Icons.ThumbUpOutline }}</VIcon>
                          {{ comment.likes }}
                        </VBtn>
                        <VBtn variant="text" size="small">
                          <VIcon start size="16">{{ Icons.MessageReply }}</VIcon>
                          Reply
                        </VBtn>
                      </div>
                    </div>
                  </div>
                </VCardText>

                <!-- Replies -->
                <div v-if="comment.replies?.length" class="bg-grey-lighten-4 pa-4 pt-0">
                  <div v-for="reply in comment.replies" :key="reply.id" class="pt-4">
                    <div class="d-flex ga-3">
                      <VAvatar size="36">
                        <VImg :src="reply.author.avatar" />
                      </VAvatar>
                      <div class="flex-grow-1">
                        <div class="d-flex align-center mb-1">
                          <span class="font-weight-medium text-body-2">{{ reply.author.name }}</span>
                          <span class="text-caption text-medium-emphasis ml-2">{{ reply.createdAt }}</span>
                        </div>
                        <p class="text-body-2 mb-2">{{ reply.content }}</p>
                        <div class="d-flex align-center ga-2">
                          <VBtn variant="text" size="x-small">
                            <VIcon start size="14">{{ Icons.ThumbUpOutline }}</VIcon>
                            {{ reply.likes }}
                          </VBtn>
                          <VBtn variant="text" size="x-small">Reply</VBtn>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </VCard>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 3: Comments with Voting -->
    <section class="py-8">
      <VContainer>
        <VRow justify="center">
          <VCol cols="12" lg="8">
            <VCard variant="outlined" class="mb-6">
              <VCardText class="pa-4">
                <VTabs v-model="activeTab" color="primary">
                  <VTab value="top">Top Comments</VTab>
                  <VTab value="newest">Newest</VTab>
                  <VTab value="controversial">Controversial</VTab>
                </VTabs>
              </VCardText>
            </VCard>

            <div v-for="comment in votingComments" :key="comment.id" class="mb-4">
              <VCard variant="outlined">
                <VCardText class="pa-0">
                  <div class="d-flex">
                    <!-- Voting -->
                    <div class="d-flex flex-column align-center pa-3 bg-grey-lighten-4">
                      <VBtn icon variant="text" size="small" color="primary">
                        <VIcon>{{ Icons.ChevronUp }}</VIcon>
                      </VBtn>
                      <span class="font-weight-bold my-1">{{ comment.votes }}</span>
                      <VBtn icon variant="text" size="small">
                        <VIcon>{{ Icons.ChevronDown }}</VIcon>
                      </VBtn>
                    </div>

                    <!-- Content -->
                    <div class="pa-4 flex-grow-1">
                      <div class="d-flex align-center mb-2">
                        <VAvatar size="32" class="mr-2">
                          <VImg :src="comment.author.avatar" />
                        </VAvatar>
                        <span class="font-weight-medium">{{ comment.author.name }}</span>
                        <VChip v-if="comment.isOP" size="x-small" color="primary" class="ml-2">OP</VChip>
                        <span class="text-caption text-medium-emphasis ml-2">{{ comment.createdAt }}</span>
                      </div>
                      <p class="text-body-1 mb-3">{{ comment.content }}</p>
                      <div class="d-flex align-center ga-3">
                        <VBtn variant="text" size="small">
                          <VIcon start size="16">{{ Icons.MessageReply }}</VIcon>
                          Reply
                        </VBtn>
                        <VBtn variant="text" size="small">
                          <VIcon start size="16">{{ Icons.Share }}</VIcon>
                          Share
                        </VBtn>
                        <VBtn variant="text" size="small">
                          <VIcon start size="16">{{ Icons.Bookmark }}</VIcon>
                          Save
                        </VBtn>
                        <VBtn variant="text" size="small">
                          <VIcon start size="16">{{ Icons.Flag }}</VIcon>
                          Report
                        </VBtn>
                      </div>
                    </div>
                  </div>
                </VCardText>
              </VCard>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icons } from '@/shared/model'
import type { IBlogComment } from '@/shared/ui/snippets'

const newComment = ref('')
const sortOrder = ref('Newest')
const activeTab = ref('top')

const simpleComments: IBlogComment[] = [
  { id: 1, author: { name: 'Alex Thompson', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' }, content: 'Great article! I\'ve been looking for a comprehensive guide like this. The examples are really helpful.', createdAt: '2 hours ago', likes: 24 },
  { id: 2, author: { name: 'Emily Davis', avatar: 'https://randomuser.me/api/portraits/women/28.jpg' }, content: 'This helped me understand the concept much better. Would love to see more content like this!', createdAt: '5 hours ago', likes: 18 },
  { id: 3, author: { name: 'James Wilson', avatar: 'https://randomuser.me/api/portraits/men/35.jpg' }, content: 'I have a question about the implementation. How would you handle edge cases?', createdAt: '1 day ago', likes: 7 },
]

const threadedComments: (IBlogComment & { replies?: IBlogComment[] })[] = [
  {
    id: 1,
    author: { name: 'Sarah Miller', avatar: 'https://randomuser.me/api/portraits/women/42.jpg' },
    content: 'This is exactly what I was looking for! The step-by-step approach makes it easy to follow. I implemented this in my project and it works perfectly.',
    createdAt: '3 hours ago',
    likes: 32,
    replies: [
      { id: 11, author: { name: 'Author', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' }, content: 'Thanks Sarah! Glad it helped. Feel free to reach out if you have any questions.', createdAt: '2 hours ago', likes: 8 },
      { id: 12, author: { name: 'Mike Chen', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' }, content: 'I had the same experience! Really well written article.', createdAt: '1 hour ago', likes: 3 },
    ],
  },
  {
    id: 2,
    author: { name: 'David Kim', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
    content: 'Could you elaborate more on the performance implications? I\'m curious about how this scales with larger datasets.',
    createdAt: '6 hours ago',
    likes: 15,
    replies: [
      { id: 21, author: { name: 'Author', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' }, content: 'Great question! I\'ll be covering performance optimization in my next article. Stay tuned!', createdAt: '4 hours ago', likes: 12 },
    ],
  },
]

interface VotingComment extends IBlogComment {
  votes: number
  isOP?: boolean
}

const votingComments: VotingComment[] = [
  { id: 1, author: { name: 'TechEnthusiast', avatar: 'https://randomuser.me/api/portraits/men/52.jpg' }, content: 'The best explanation I\'ve seen on this topic. Bookmarked for future reference!', createdAt: '4 hours ago', likes: 0, votes: 156, isOP: false },
  { id: 2, author: { name: 'DevPro2024', avatar: 'https://randomuser.me/api/portraits/women/55.jpg' }, content: 'I\'ve been using this approach for months and can confirm it works great in production.', createdAt: '8 hours ago', likes: 0, votes: 89, isOP: false },
  { id: 3, author: { name: 'CodeMaster', avatar: 'https://randomuser.me/api/portraits/men/58.jpg' }, content: 'Minor correction: in the third example, you might want to add error handling for edge cases.', createdAt: '1 day ago', likes: 0, votes: 45, isOP: true },
]

const totalComments = computed(() => {
  return threadedComments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0)
})
</script>
