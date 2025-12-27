<!--
  Component: BlogCard
  Description: Blog post card with image, title, excerpt, author, and metadata
  Props: title, excerpt, image, author, publishedAt, readTime, category, tags, likes, comments
-->
<template>
  <VCard :variant="cardVariant" :elevation="elevation" :class="cardClass" :hover="hover">
    <!-- Image -->
    <slot name="image">
      <VImg
        v-if="image"
        :src="image"
        :height="imageHeight"
        :cover="imageCover"
        :class="imageClass"
      >
        <template #placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <VProgressCircular indeterminate color="grey-lighten-4" />
          </div>
        </template>
        <VChip
          v-if="category"
          :color="categoryColor"
          size="small"
          class="position-absolute ma-3"
          style="top: 0; left: 0;"
        >
          {{ category }}
        </VChip>
      </VImg>
    </slot>

    <VCardText :class="contentClass">
      <!-- Author & Date -->
      <div v-if="showMeta" class="d-flex align-center mb-3">
        <VAvatar v-if="author?.avatar" :size="authorAvatarSize" class="mr-2">
          <VImg :src="author.avatar" :alt="author.name" />
        </VAvatar>
        <div>
          <div :class="authorNameClass">{{ author?.name }}</div>
          <div :class="dateClass">
            {{ formattedDate }}
            <span v-if="readTime"> · {{ readTime }} min read</span>
          </div>
        </div>
      </div>

      <!-- Title -->
      <slot name="title">
        <component :is="titleTag" :class="titleClass">{{ title }}</component>
      </slot>

      <!-- Excerpt -->
      <slot name="excerpt">
        <p v-if="excerpt" :class="excerptClass">{{ excerpt }}</p>
      </slot>

      <!-- Tags -->
      <div v-if="tags?.length" class="d-flex flex-wrap ga-2 mb-3">
        <VChip v-for="tag in tags" :key="tag" size="small" variant="tonal" :color="tagColor">
          {{ tag }}
        </VChip>
      </div>

      <!-- Actions -->
      <div v-if="showActions" class="d-flex align-center justify-space-between">
        <div class="d-flex align-center ga-4">
          <div class="d-flex align-center text-medium-emphasis">
            <VIcon size="18" class="mr-1">{{ Icons.Heart }}</VIcon>
            {{ formatNumber(likes || 0) }}
          </div>
          <div class="d-flex align-center text-medium-emphasis">
            <VIcon size="18" class="mr-1">{{ Icons.Comment }}</VIcon>
            {{ formatNumber(comments || 0) }}
          </div>
        </div>
        <slot name="actions">
          <VBtn variant="text" size="small" :color="readMoreColor">
            Read More
            <VIcon end size="16">{{ Icons.ArrowRight }}</VIcon>
          </VBtn>
        </slot>
      </div>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Colors, Variants, Icons } from '@/shared/model'
import type { ColorType, VariantType, IBlogAuthor } from './types'

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

  // Styling
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  titleClass?: string
  excerptClass?: string
  authorNameClass?: string
  authorAvatarSize?: number
  dateClass?: string
  categoryColor?: ColorType
  tagColor?: ColorType
  readMoreColor?: ColorType

  // Options
  showMeta?: boolean
  showActions?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  cardVariant: Variants.Outlined,
  elevation: 0,
  contentClass: 'pa-4',
  hover: true,
  imageHeight: 200,
  imageCover: true,
  titleTag: 'h3',
  titleClass: 'text-h6 font-weight-bold mb-2',
  excerptClass: 'text-body-2 text-medium-emphasis mb-3',
  authorNameClass: 'text-subtitle-2 font-weight-medium',
  authorAvatarSize: 32,
  dateClass: 'text-caption text-medium-emphasis',
  categoryColor: Colors.Primary,
  tagColor: Colors.Secondary,
  readMoreColor: Colors.Primary,
  showMeta: true,
  showActions: true,
})

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
