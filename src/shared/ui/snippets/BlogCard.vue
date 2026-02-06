<!--
  Component: BlogCard
  Description: Blog post card with image, title, excerpt, author, and metadata
  Props: title, excerpt, image, author, publishedAt, readTime, category, tags, likes, comments
-->
<template>
  <VCard :variant="cardVariant" :elevation="elevation" :class="['blog-card', cardClass]" :hover="hover">
    <!-- Image -->
    <slot name="image" :image="image" :category="category">
      <VImg
        v-if="image"
        :src="image"
        :height="imageHeight"
        :cover="imageCover"
        :class="imageClass"
      >
        <template #placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <VProgressCircular indeterminate :color="placeholderColor" />
          </div>
        </template>

        <slot name="image-overlay" :category="category">
          <VChip
            v-if="category && showCategoryOnImage"
            :color="categoryColor"
            :size="categorySize"
            :variant="categoryVariant"
            class="position-absolute ma-3"
            style="top: 0; left: 0;"
          >
            {{ category }}
          </VChip>
        </slot>
      </VImg>
    </slot>

    <VCardText :class="contentClass">
      <!-- Author & Date -->
      <slot name="meta" :author="author" :formattedDate="formattedDate" :readTime="readTime">
        <div v-if="showMeta" :class="['d-flex align-center', metaClass]">
          <slot name="author-avatar" :author="author">
            <VAvatar v-if="author?.avatar" :size="authorAvatarSize" :class="authorAvatarClass">
              <VImg :src="author.avatar" :alt="author.name" />
            </VAvatar>
          </slot>
          <div>
            <slot name="author-name" :author="author">
              <div :class="authorNameClass">{{ author?.name }}</div>
            </slot>
            <slot name="date" :formattedDate="formattedDate" :readTime="readTime">
              <div :class="dateClass">
                {{ formattedDate }}
                <span v-if="readTime && showReadTime"> · {{ readTime }} {{ readTimeText }}</span>
              </div>
            </slot>
          </div>
        </div>
      </slot>

      <!-- Title -->
      <slot name="title" :title="title">
        <component :is="titleTag" :class="titleClass">{{ title }}</component>
      </slot>

      <!-- Excerpt -->
      <slot name="excerpt" :excerpt="excerpt">
        <p v-if="excerpt" :class="excerptClass">{{ excerpt }}</p>
      </slot>

      <!-- Tags -->
      <slot name="tags" :tags="tags">
        <div v-if="tags?.length && showTags" :class="['d-flex flex-wrap', tagsContainerClass]">
          <VChip
            v-for="tag in tags"
            :key="tag"
            :size="tagSize"
            :variant="tagVariant"
            :color="tagColor"
          >
            {{ tag }}
          </VChip>
        </div>
      </slot>

      <!-- Actions / Footer -->
      <slot name="footer" :likes="likes" :comments="comments">
        <div v-if="showActions" :class="['d-flex align-center justify-space-between', actionsClass]">
          <div v-if="showStats" class="d-flex align-center ga-4">
            <slot name="likes" :likes="likes">
              <div :class="['d-flex align-center', statsClass]">
                <VIcon :size="statsIconSize" class="mr-1">{{ likesIcon }}</VIcon>
                {{ formatNumber(likes || 0) }}
              </div>
            </slot>
            <slot name="comments-count" :comments="comments">
              <div :class="['d-flex align-center', statsClass]">
                <VIcon :size="statsIconSize" class="mr-1">{{ commentsIcon }}</VIcon>
                {{ formatNumber(comments || 0) }}
              </div>
            </slot>
          </div>
          <slot name="actions">
            <VBtn :variant="readMoreVariant" :size="readMoreSize" :color="readMoreColor" @click="$emit('read-more')">
              {{ readMoreText }}
              <VIcon v-if="readMoreIcon" end :size="readMoreIconSize">{{ readMoreIcon }}</VIcon>
            </VBtn>
          </slot>
        </div>
      </slot>

      <!-- Additional content -->
      <slot />
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Colors, Variants, Sizes, Icons } from '@/shared/model'
import type { ColorType, VariantType, SizeType, IconType, IBlogAuthor } from './types'

interface Props {
  // Data
  title: string
  excerpt?: string
  image?: string
  author?: IBlogAuthor
  publishedAt: string
  readTime?: number
  category?: string
  tags?: string[]
  likes?: number
  comments?: number

  // Card
  cardVariant?: VariantType
  elevation?: number | string
  cardClass?: string
  contentClass?: string
  hover?: boolean

  // Image
  imageHeight?: string | number
  imageCover?: boolean
  imageClass?: string
  placeholderColor?: ColorType | string

  // Category
  showCategoryOnImage?: boolean
  categoryColor?: ColorType
  categorySize?: SizeType
  categoryVariant?: VariantType

  // Meta
  showMeta?: boolean
  metaClass?: string

  // Author
  authorAvatarSize?: number
  authorAvatarClass?: string
  authorNameClass?: string

  // Date
  dateClass?: string
  showReadTime?: boolean
  readTimeText?: string

  // Title
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  titleClass?: string

  // Excerpt
  excerptClass?: string

  // Tags
  showTags?: boolean
  tagsContainerClass?: string
  tagSize?: SizeType
  tagVariant?: VariantType
  tagColor?: ColorType

  // Actions
  showActions?: boolean
  actionsClass?: string

  // Stats
  showStats?: boolean
  statsClass?: string
  statsIconSize?: number
  likesIcon?: IconType
  commentsIcon?: IconType

  // Read More
  readMoreText?: string
  readMoreColor?: ColorType
  readMoreVariant?: VariantType
  readMoreSize?: SizeType
  readMoreIcon?: IconType
  readMoreIconSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  cardVariant: Variants.Outlined,
  elevation: 0,
  contentClass: 'pa-4',
  hover: true,
  imageHeight: 200,
  imageCover: true,
  placeholderColor: 'grey-lighten-4',
  showCategoryOnImage: true,
  categoryColor: Colors.Primary,
  categorySize: Sizes.Small,
  categoryVariant: Variants.Flat,
  showMeta: true,
  metaClass: 'mb-3',
  authorAvatarSize: 32,
  authorAvatarClass: 'mr-2',
  authorNameClass: 'text-subtitle-2 font-weight-medium',
  dateClass: 'text-caption text-medium-emphasis',
  showReadTime: true,
  readTimeText: 'min read',
  titleTag: 'h3',
  titleClass: 'text-h6 font-weight-bold mb-2',
  excerptClass: 'text-body-2 text-medium-emphasis mb-3',
  showTags: true,
  tagsContainerClass: 'ga-2 mb-3',
  tagSize: Sizes.Small,
  tagVariant: Variants.Tonal,
  tagColor: Colors.Secondary,
  showActions: true,
  showStats: true,
  statsClass: 'text-medium-emphasis',
  statsIconSize: 18,
  likesIcon: Icons.Heart,
  commentsIcon: Icons.Comment,
  readMoreText: 'Read More',
  readMoreColor: Colors.Primary,
  readMoreVariant: Variants.Text,
  readMoreSize: Sizes.Small,
  readMoreIcon: Icons.ArrowRight,
  readMoreIconSize: 16,
})

defineEmits<{
  'read-more': []
}>()

const formattedDate = computed(() => {
  return new Date(props.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
})

const formatNumber = (num: number): string => {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
  return num.toString()
}
</script>

<style scoped>
.blog-card {
  height: 100%;
}
</style>
