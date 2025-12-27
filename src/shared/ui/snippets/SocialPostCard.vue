<!--
  Component: SocialPostCard
  Description: Social media post card with author, content, images, and engagement
  Props: author, content, images, createdAt, likes, comments, shares, isLiked, isBookmarked
-->
<template>
  <VCard :variant="cardVariant" :elevation="elevation" :class="cardClass">
    <VCardText :class="contentClass">
      <!-- Header -->
      <div class="d-flex align-start mb-3">
        <VAvatar :size="avatarSize" class="mr-3">
          <VImg :src="author.avatar" :alt="author.name" />
        </VAvatar>
        <div class="flex-grow-1">
          <div class="d-flex align-center">
            <span :class="nameClass">{{ author.name }}</span>
            <VIcon v-if="author.verified" color="primary" size="16" class="ml-1">
              {{ Icons.CheckCircle }}
            </VIcon>
          </div>
          <div :class="usernameClass">
            @{{ author.username }} · {{ timeAgo }}
          </div>
        </div>
        <VBtn icon variant="text" size="small">
          <VIcon>{{ Icons.DotsHorizontal }}</VIcon>
        </VBtn>
      </div>

      <!-- Content -->
      <p :class="postContentClass">{{ content }}</p>

      <!-- Images -->
      <div v-if="images?.length" :class="['mb-3', imagesContainerClass]">
        <template v-if="images.length === 1">
          <VImg
            :src="images[0]"
            :height="singleImageHeight"
            cover
            rounded="lg"
            class="cursor-pointer"
          />
        </template>
        <template v-else>
          <VRow dense>
            <VCol
              v-for="(img, idx) in displayImages"
              :key="idx"
              :cols="images.length === 2 ? 6 : idx === 0 ? 12 : 6"
            >
              <VImg
                :src="img"
                :height="gridImageHeight"
                cover
                rounded="lg"
                class="cursor-pointer"
              >
                <div
                  v-if="idx === displayImages.length - 1 && remainingImages > 0"
                  class="d-flex align-center justify-center fill-height"
                  style="background: rgba(0,0,0,0.5)"
                >
                  <span class="text-h5 text-white">+{{ remainingImages }}</span>
                </div>
              </VImg>
            </VCol>
          </VRow>
        </template>
      </div>

      <!-- Actions -->
      <div class="d-flex align-center justify-space-between">
        <div class="d-flex align-center ga-1">
          <VBtn
            :color="isLiked ? 'error' : undefined"
            variant="text"
            size="small"
            @click="$emit('like')"
          >
            <VIcon start>{{ isLiked ? Icons.Heart : Icons.HeartOutline }}</VIcon>
            {{ formatNumber(likes) }}
          </VBtn>
          <VBtn variant="text" size="small" @click="$emit('comment')">
            <VIcon start>{{ Icons.CommentOutline }}</VIcon>
            {{ formatNumber(comments) }}
          </VBtn>
          <VBtn variant="text" size="small" @click="$emit('share')">
            <VIcon start>{{ Icons.Share }}</VIcon>
            {{ formatNumber(shares) }}
          </VBtn>
        </div>
        <VBtn
          :color="isBookmarked ? 'primary' : undefined"
          icon
          variant="text"
          size="small"
          @click="$emit('bookmark')"
        >
          <VIcon>{{ isBookmarked ? Icons.Bookmark : Icons.BookmarkOutline }}</VIcon>
        </VBtn>
      </div>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Colors, Variants, Icons } from '@/shared/model'
import type { ColorType, VariantType, ISocialUser } from './types'

interface Props {
  // Data
  author: ISocialUser
  content: string
  images?: string[]
  createdAt: string
  likes: number
  comments: number
  shares: number
  isLiked?: boolean
  isBookmarked?: boolean

  // Card
  cardVariant?: VariantType
  elevation?: number | string
  cardClass?: string
  contentClass?: string

  // Styling
  avatarSize?: number
  nameClass?: string
  usernameClass?: string
  postContentClass?: string
  imagesContainerClass?: string
  singleImageHeight?: number
  gridImageHeight?: number
  maxDisplayImages?: number
}

const props = withDefaults(defineProps<Props>(), {
  isLiked: false,
  isBookmarked: false,
  cardVariant: Variants.Outlined,
  elevation: 0,
  contentClass: 'pa-4',
  avatarSize: 48,
  nameClass: 'text-subtitle-1 font-weight-bold',
  usernameClass: 'text-caption text-medium-emphasis',
  postContentClass: 'text-body-1 mb-3',
  singleImageHeight: 300,
  gridImageHeight: 150,
  maxDisplayImages: 4,
})

defineEmits<{
  like: []
  comment: []
  share: []
  bookmark: []
}>()

const displayImages = computed(() => props.images?.slice(0, props.maxDisplayImages) || [])
const remainingImages = computed(() => (props.images?.length || 0) - props.maxDisplayImages)

const timeAgo = computed(() => {
  const date = new Date(props.createdAt)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m`
  if (hours < 24) return `${hours}h`
  if (days < 7) return `${days}d`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
})

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}
</script>
