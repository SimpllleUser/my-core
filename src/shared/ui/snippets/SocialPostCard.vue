<!--
  Component: SocialPostCard
  Description: Social media post card with author, content, images, and engagement
  Props: author, content, images, createdAt, likes, comments, shares, isLiked, isBookmarked
-->
<script setup lang="ts">
import { computed } from 'vue'
import { Colors, Variants, Sizes, Icons } from '../../model'
import type { ColorType, VariantType, SizeType, IconType, ISocialUser } from './types'

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
  hover?: boolean

  // Header
  headerClass?: string

  // Avatar
  avatarSize?: number
  avatarClass?: string

  // Author
  nameClass?: string
  usernameClass?: string
  verifiedColor?: ColorType
  verifiedIcon?: IconType
  verifiedIconSize?: number

  // Time
  showTimeAgo?: boolean

  // Menu
  showMenu?: boolean
  menuIcon?: IconType
  menuButtonVariant?: VariantType
  menuButtonSize?: SizeType

  // Content
  postContentClass?: string

  // Images
  imagesContainerClass?: string
  singleImageHeight?: number
  gridImageHeight?: number
  maxDisplayImages?: number
  imageRounded?: string
  imageClass?: string
  overlayBackground?: string
  remainingImagesClass?: string

  // Actions
  actionsClass?: string
  actionButtonVariant?: VariantType
  actionButtonSize?: SizeType

  // Like
  showLikeAction?: boolean
  likeActiveColor?: ColorType
  likeIconActive?: IconType
  likeIconInactive?: IconType

  // Comment
  showCommentAction?: boolean
  commentIcon?: IconType

  // Share
  showShareAction?: boolean
  shareIcon?: IconType

  // Bookmark
  showBookmarkAction?: boolean
  bookmarkActiveColor?: ColorType
  bookmarkIconActive?: IconType
  bookmarkIconInactive?: IconType
}

const props = withDefaults(defineProps<Props>(), {
  isLiked: false,
  isBookmarked: false,
  cardVariant: Variants.Outlined,
  elevation: 0,
  contentClass: 'pa-4',
  hover: false,
  headerClass: 'mb-3',
  avatarSize: 48,
  avatarClass: 'mr-3',
  nameClass: 'text-subtitle-1 font-weight-bold',
  usernameClass: 'text-caption text-medium-emphasis',
  verifiedColor: Colors.Primary,
  verifiedIcon: Icons.CheckCircle,
  verifiedIconSize: 16,
  showTimeAgo: true,
  showMenu: true,
  menuIcon: Icons.DotsHorizontal,
  menuButtonVariant: Variants.Text,
  menuButtonSize: Sizes.Small,
  postContentClass: 'text-body-1 mb-3',
  singleImageHeight: 300,
  gridImageHeight: 150,
  maxDisplayImages: 4,
  imageRounded: 'lg',
  overlayBackground: 'rgba(0,0,0,0.5)',
  remainingImagesClass: 'text-h5 text-white',
  actionButtonVariant: Variants.Text,
  actionButtonSize: Sizes.Small,
  showLikeAction: true,
  likeActiveColor: Colors.Error,
  likeIconActive: Icons.Heart,
  likeIconInactive: Icons.HeartOutline,
  showCommentAction: true,
  commentIcon: Icons.CommentOutline,
  showShareAction: true,
  shareIcon: Icons.Share,
  showBookmarkAction: true,
  bookmarkActiveColor: Colors.Primary,
  bookmarkIconActive: Icons.Bookmark,
  bookmarkIconInactive: Icons.BookmarkOutline,
})

defineEmits<{
  like: []
  comment: []
  share: []
  bookmark: []
  menu: []
  'image-click': [index: number]
}>()

const displayImages = computed(() => props.images?.slice(0, props.maxDisplayImages) || [])
const remainingImages = computed(() => (props.images?.length || 0) - props.maxDisplayImages)

const overlayStyle = computed(() => ({
  background: props.overlayBackground,
}))

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
<template>
  <VCard :variant="cardVariant" :elevation="elevation" :class="['social-post-card', cardClass]" :hover="hover">
    <VCardText :class="contentClass">
      <!-- Header -->
      <slot name="header" :author="author" :timeAgo="timeAgo">
        <div :class="['d-flex align-start', headerClass]">
          <slot name="avatar" :author="author">
            <VAvatar :size="avatarSize" :class="avatarClass">
              <VImg :src="author.avatar" :alt="author.name" />
            </VAvatar>
          </slot>

          <div class="flex-grow-1">
            <slot name="author-info" :author="author" :timeAgo="timeAgo">
              <div class="d-flex align-center">
                <span :class="nameClass">{{ author.name }}</span>
                <slot name="verified-badge" :verified="author.verified">
                  <VIcon v-if="author.verified" :color="verifiedColor" :size="verifiedIconSize" class="ml-1">
                    {{ verifiedIcon }}
                  </VIcon>
                </slot>
              </div>
              <div :class="usernameClass">
                @{{ author.username }}
                <template v-if="showTimeAgo"> · {{ timeAgo }}</template>
              </div>
            </slot>
          </div>

          <slot name="menu">
            <VBtn v-if="showMenu" :icon="menuIcon" :variant="menuButtonVariant" :size="menuButtonSize" @click="$emit('menu')" />
          </slot>
        </div>
      </slot>

      <!-- Content -->
      <slot name="content" :content="content">
        <p :class="postContentClass">{{ content }}</p>
      </slot>

      <!-- Images -->
      <slot name="images" :images="images" :displayImages="displayImages" :remainingImages="remainingImages">
        <div v-if="images?.length" :class="['mb-3', imagesContainerClass]">
          <template v-if="images.length === 1">
            <slot name="single-image" :image="images[0]">
              <VImg
                :src="images[0]"
                :height="singleImageHeight"
                cover
                :rounded="imageRounded"
                :class="imageClass"
                @click="$emit('image-click', 0)"
              />
            </slot>
          </template>
          <template v-else>
            <VRow dense>
              <VCol
                v-for="(img, idx) in displayImages"
                :key="idx"
                :cols="images.length === 2 ? 6 : idx === 0 ? 12 : 6"
              >
                <slot name="grid-image" :image="img" :index="idx" :remainingImages="remainingImages">
                  <VImg
                    :src="img"
                    :height="gridImageHeight"
                    cover
                    :rounded="imageRounded"
                    :class="imageClass"
                    @click="$emit('image-click', idx)"
                  >
                    <div
                      v-if="idx === displayImages.length - 1 && remainingImages > 0"
                      class="d-flex align-center justify-center fill-height"
                      :style="overlayStyle"
                    >
                      <span :class="remainingImagesClass">+{{ remainingImages }}</span>
                    </div>
                  </VImg>
                </slot>
              </VCol>
            </VRow>
          </template>
        </div>
      </slot>

      <!-- Actions -->
      <slot name="actions" :likes="likes" :comments="comments" :shares="shares" :isLiked="isLiked" :isBookmarked="isBookmarked">
        <div :class="['d-flex align-center justify-space-between', actionsClass]">
          <div class="d-flex align-center ga-1">
            <!-- Like -->
            <slot name="like-action" :likes="likes" :isLiked="isLiked">
              <VBtn
                v-if="showLikeAction"
                :color="isLiked ? likeActiveColor : undefined"
                :variant="actionButtonVariant"
                :size="actionButtonSize"
                @click="$emit('like')"
              >
                <VIcon start>{{ isLiked ? likeIconActive : likeIconInactive }}</VIcon>
                {{ formatNumber(likes) }}
              </VBtn>
            </slot>

            <!-- Comment -->
            <slot name="comment-action" :comments="comments">
              <VBtn
                v-if="showCommentAction"
                :variant="actionButtonVariant"
                :size="actionButtonSize"
                @click="$emit('comment')"
              >
                <VIcon start>{{ commentIcon }}</VIcon>
                {{ formatNumber(comments) }}
              </VBtn>
            </slot>

            <!-- Share -->
            <slot name="share-action" :shares="shares">
              <VBtn
                v-if="showShareAction"
                :variant="actionButtonVariant"
                :size="actionButtonSize"
                @click="$emit('share')"
              >
                <VIcon start>{{ shareIcon }}</VIcon>
                {{ formatNumber(shares) }}
              </VBtn>
            </slot>
          </div>

          <!-- Bookmark -->
          <slot name="bookmark-action" :isBookmarked="isBookmarked">
            <VBtn
              v-if="showBookmarkAction"
              :color="isBookmarked ? bookmarkActiveColor : undefined"
              icon
              :variant="actionButtonVariant"
              :size="actionButtonSize"
              @click="$emit('bookmark')"
            >
              <VIcon>{{ isBookmarked ? bookmarkIconActive : bookmarkIconInactive }}</VIcon>
            </VBtn>
          </slot>
        </div>
      </slot>

      <!-- Additional content -->
      <slot />
    </VCardText>
  </VCard>
</template>
<style scoped>
.social-post-card {
  height: 100%;
}
</style>
