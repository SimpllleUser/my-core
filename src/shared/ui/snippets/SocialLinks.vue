<script setup lang="ts">
import { computed } from 'vue'
import { Variants, Sizes } from '../../model'
import type { VariantType, SizeType, ISocialLink } from './types'

interface Props {
  links: ISocialLink[]
  buttonVariant?: VariantType
  buttonSize?: SizeType
  buttonColor?: string
  buttonClass?: string
  iconSize?: SizeType | number
  iconOnly?: boolean
  showLabel?: boolean
  centered?: boolean
  rounded?: boolean | string
  gap?: number | string
  containerClass?: string
  linkTarget?: string
  linkRel?: string
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
  linkTarget: '_blank',
  linkRel: 'noopener noreferrer',
})

defineEmits<{
  click: [link: ISocialLink]
}>()

const gapClass = computed(() => `ga-${props.gap}`)
</script>
<template>
  <div :class="['social-links d-flex flex-wrap', { 'justify-center': centered }, containerClass, gapClass]">
    <slot :links="links">
      <template v-for="link in links" :key="link.platform">
        <slot name="item" :link="link">
          <VBtn
            :icon="iconOnly"
            :variant="buttonVariant"
            :size="buttonSize"
            :color="link.color || buttonColor"
            :rounded="rounded"
            :class="buttonClass"
            :href="link.url"
            :target="link.url ? linkTarget : undefined"
            :rel="link.url ? linkRel : undefined"
            @click="$emit('click', link)"
          >
            <slot name="item-icon" :link="link">
              <VIcon :start="showLabel && !iconOnly" :size="iconSize">{{ link.icon }}</VIcon>
            </slot>
            <template v-if="showLabel && !iconOnly">
              <slot name="item-label" :link="link">
                {{ link.platform }}
              </slot>
            </template>
          </VBtn>
        </slot>
      </template>
    </slot>
  </div>
</template>
<style scoped>
.social-links {
  flex-wrap: wrap;
}
</style>
