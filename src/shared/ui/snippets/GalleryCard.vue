<script setup lang="ts">
import { ref } from 'vue'
import { Colors, Variants, Icons } from '../../model'
import type { ColorType, VariantType, IconType } from './types'

interface Props {
  src: string
  alt?: string
  title?: string
  subtitle?: string
  category?: string
  aspectRatio?: string | number

  // Layout
  overlay?: 'always' | 'hover' | 'never'
  overlayOpacity?: number | string

  // Card
  cardVariant?: VariantType
  cardColor?: ColorType | string
  elevation?: number | string
  cardClass?: string
  rounded?: string

  // Actions
  showLike?: boolean
  liked?: boolean
  showZoom?: boolean
  showShare?: boolean
  likeIcon?: IconType
  likeActiveIcon?: IconType
  zoomIcon?: IconType
  shareIcon?: IconType

  // Chip/Category
  categoryColor?: ColorType | string
  categoryVariant?: VariantType
  chipClass?: string

  // Text
  titleClass?: string
  subtitleClass?: string
  overlayColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  aspectRatio: '4/3',
  overlay: 'hover',
  overlayOpacity: 0.5,
  cardVariant: Variants.Flat,
  elevation: 2,
  rounded: 'lg',
  showLike: false,
  liked: false,
  showZoom: true,
  showShare: false,
  likeIcon: Icons.HeartOutline,
  likeActiveIcon: Icons.Heart,
  zoomIcon: Icons.ArrowExpand,
  shareIcon: Icons.Share,
  categoryColor: Colors.Primary,
  categoryVariant: Variants.Elevated,
  titleClass: 'text-body-1 font-weight-medium',
  subtitleClass: 'text-caption',
  overlayColor: 'rgba(0,0,0,0.5)',
})

const emit = defineEmits<{
  like: [liked: boolean]
  zoom: []
  share: []
  click: []
}>()

const isLiked = ref(props.liked)
const isHovered = ref(false)

function toggleLike() {
  isLiked.value = !isLiked.value
  emit('like', isLiked.value)
}

const showOverlay = (hovered: boolean) => {
  if (props.overlay === 'always') return true
  if (props.overlay === 'never') return false
  return hovered
}
</script>
<template>
  <VCard
    :variant="cardVariant"
    :color="cardColor"
    :elevation="elevation"
    :rounded="rounded"
    :class="['gallery-card', cardClass]"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="$emit('click')"
  >
    <div class="gallery-image-wrapper" style="position: relative; overflow: hidden;">
      <VImg
        :src="src"
        :alt="alt"
        :aspect-ratio="aspectRatio"
        cover
      />

      <!-- Overlay -->
      <Transition name="overlay-fade">
        <div
          v-if="showOverlay(isHovered)"
          class="gallery-overlay d-flex flex-column justify-space-between pa-3"
          :style="`background: ${overlayColor}`"
        >
          <!-- Top: Category + Actions -->
          <div class="d-flex justify-space-between align-start">
            <slot name="category" :category="category">
              <VChip
                v-if="category"
                :color="categoryColor"
                :variant="categoryVariant"
                size="small"
                :class="chipClass"
              >
                {{ category }}
              </VChip>
              <div v-else />
            </slot>

            <div class="d-flex gap-1">
              <VBtn
                v-if="showLike"
                icon
                size="small"
                variant="text"
                :color="isLiked ? 'red' : 'white'"
                @click.stop="toggleLike"
              >
                <VIcon size="18">{{ isLiked ? likeActiveIcon : likeIcon }}</VIcon>
              </VBtn>
              <VBtn
                v-if="showShare"
                icon
                size="small"
                variant="text"
                color="white"
                @click.stop="$emit('share')"
              >
                <VIcon size="18">{{ shareIcon }}</VIcon>
              </VBtn>
              <VBtn
                v-if="showZoom"
                icon
                size="small"
                variant="text"
                color="white"
                @click.stop="$emit('zoom')"
              >
                <VIcon size="18">{{ zoomIcon }}</VIcon>
              </VBtn>
            </div>
          </div>

          <!-- Bottom: Title + Subtitle -->
          <div v-if="title || subtitle">
            <slot name="caption" :title="title" :subtitle="subtitle">
              <p v-if="title" :class="[titleClass, 'text-white mb-0']">{{ title }}</p>
              <p v-if="subtitle" :class="[subtitleClass, 'text-white-70 mb-0']">{{ subtitle }}</p>
            </slot>
          </div>
        </div>
      </Transition>
    </div>

    <slot />
  </VCard>
</template>
<style scoped>
.gallery-card {
  cursor: pointer;
}
.gallery-image-wrapper {
  position: relative;
}
.gallery-overlay {
  position: absolute;
  inset: 0;
}
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.2s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}
</style>
