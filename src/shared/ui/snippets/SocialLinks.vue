<template>
  <div :class="['social-links d-flex flex-wrap', { 'justify-center': centered }, gapClass]">
    <slot :links="links">
      <VBtn
        v-for="link in links"
        :key="link.platform"
        :icon="iconOnly"
        :variant="buttonVariant"
        :size="buttonSize"
        :color="buttonColor"
        :rounded="rounded"
        :href="link.url"
        :target="link.url ? '_blank' : undefined"
        :rel="link.url ? 'noopener noreferrer' : undefined"
        @click="$emit('click', link)"
      >
        <VIcon :start="showLabel && !iconOnly" :size="iconSize">{{ link.icon }}</VIcon>
        <template v-if="showLabel && !iconOnly">
          {{ link.platform }}
        </template>
      </VBtn>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Variants, Sizes } from '@/shared/model'
import type { VariantType, SizeType, ISocialLink } from './types'

interface Props {
  links: ISocialLink[]
  buttonVariant?: VariantType
  buttonSize?: SizeType
  buttonColor?: string
  iconSize?: SizeType | number
  iconOnly?: boolean
  showLabel?: boolean
  centered?: boolean
  rounded?: boolean | string
  gap?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  buttonVariant: Variants.Text,
  buttonSize: Sizes.Small,
  buttonColor: 'grey-darken-1',
  iconSize: 18,
  iconOnly: false,
  showLabel: false,
  centered: false,
  rounded: false,
  gap: 1,
})

defineEmits<{
  click: [link: ISocialLink]
}>()

const gapClass = computed(() => `ga-${props.gap}`)
</script>

<style scoped>
.social-links {
  flex-wrap: wrap;
}
</style>
