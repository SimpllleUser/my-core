<!--
  Snippet: Gallery Showcase
  Description: Image gallery with hover overlays, likes, zoom, and filters
  Components: GalleryCard, VRow, VCol, VChipGroup
  Variants: Grid, Masonry-like, Filtered
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icons } from '../../shared/model'
import { GalleryCard } from '../../shared/ui/snippets'

const selectedCategory = ref('All')

const categories = ['All', 'Nature', 'Architecture', 'People', 'Abstract']

const items = [
  { id: 1, src: 'https://picsum.photos/seed/nature1/600/400', alt: 'Forest path', title: 'Forest Path', subtitle: 'Oregon, USA', category: 'Nature' },
  { id: 2, src: 'https://picsum.photos/seed/arch1/600/400', alt: 'City skyline', title: 'City Skyline', subtitle: 'New York', category: 'Architecture' },
  { id: 3, src: 'https://picsum.photos/seed/people1/600/400', alt: 'Portrait', title: 'Street Portrait', subtitle: 'Tokyo, Japan', category: 'People' },
  { id: 4, src: 'https://picsum.photos/seed/abstract1/600/400', alt: 'Abstract', title: 'Color Waves', subtitle: 'Digital Art', category: 'Abstract' },
  { id: 5, src: 'https://picsum.photos/seed/nature2/600/400', alt: 'Mountain lake', title: 'Mountain Lake', subtitle: 'Swiss Alps', category: 'Nature' },
  { id: 6, src: 'https://picsum.photos/seed/arch2/600/400', alt: 'Bridge', title: 'Iron Bridge', subtitle: 'London, UK', category: 'Architecture' },
  { id: 7, src: 'https://picsum.photos/seed/abstract2/600/400', alt: 'Geometry', title: 'Sacred Geometry', subtitle: 'Digital', category: 'Abstract' },
  { id: 8, src: 'https://picsum.photos/seed/nature3/600/400', alt: 'Waterfall', title: 'Hidden Falls', subtitle: 'Iceland', category: 'Nature' },
]

const filteredItems = computed(() =>
  selectedCategory.value === 'All'
    ? items
    : items.filter(i => i.category === selectedCategory.value)
)

const likedItems = ref<Set<number>>(new Set())

function toggleLike(id: number, liked: boolean) {
  if (liked) likedItems.value.add(id)
  else likedItems.value.delete(id)
}
</script>
<template>
  <VContainer>
    <!-- Basic Grid Gallery -->
    <VRow class="mb-6">
      <VCol cols="12">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Basic Grid (hover overlay)</h3>
        <VRow>
          <VCol v-for="item in items.slice(0, 4)" :key="item.id" cols="12" sm="6" md="3">
            <GalleryCard
              :src="item.src"
              :alt="item.alt"
              :title="item.title"
              :subtitle="item.subtitle"
              :category="item.category"
              :show-like="true"
              :liked="likedItems.has(item.id)"
              aspect-ratio="1"
              @like="liked => toggleLike(item.id, liked)"
              @zoom="() => {}"
            />
          </VCol>
        </VRow>
      </VCol>
    </VRow>

    <!-- Filtered Gallery -->
    <VRow class="mb-6">
      <VCol cols="12">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Filtered Gallery</h3>
        <VChipGroup v-model="selectedCategory" mandatory selected-class="text-primary" class="mb-4">
          <VChip v-for="cat in categories" :key="cat" :value="cat" variant="outlined" filter>
            {{ cat }}
          </VChip>
        </VChipGroup>
        <VRow>
          <VCol
            v-for="item in filteredItems"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
          >
            <GalleryCard
              :src="item.src"
              :alt="item.alt"
              :title="item.title"
              :subtitle="item.subtitle"
              :category="item.category"
              aspect-ratio="4/3"
              :show-like="true"
              :show-share="true"
              :liked="likedItems.has(item.id)"
              @like="liked => toggleLike(item.id, liked)"
            />
          </VCol>
        </VRow>
      </VCol>
    </VRow>

    <!-- Always Visible Overlay -->
    <VRow>
      <VCol cols="12">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Always-visible overlay</h3>
        <VRow>
          <VCol v-for="item in items.slice(4, 8)" :key="item.id" cols="12" sm="6" md="3">
            <GalleryCard
              :src="item.src"
              :alt="item.alt"
              :title="item.title"
              :subtitle="item.subtitle"
              :category="item.category"
              overlay="always"
              aspect-ratio="3/4"
              overlay-color="rgba(0,0,0,0.4)"
              elevation="4"
            />
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </VContainer>
</template>
