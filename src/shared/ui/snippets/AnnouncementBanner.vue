<script setup lang="ts">
import { ref } from 'vue'
import { Colors, Variants, Icons } from '../../model'
import type { ColorType, VariantType, IconType } from './types'

interface Props {
  text: string
  linkText?: string
  linkHref?: string
  linkTo?: string
  icon?: IconType
  dismissible?: boolean
  position?: 'top' | 'bottom' | 'inline'
  color?: ColorType | string
  variant?: VariantType
  rounded?: string | boolean
  elevation?: number | string
  bannerClass?: string
  contentClass?: string
  textClass?: string
  linkClass?: string
  chipText?: string
  chipColor?: ColorType | string
}

withDefaults(defineProps<Props>(), {
  dismissible: true,
  position: 'inline',
  color: Colors.Primary,
  variant: Variants.Tonal,
  rounded: 'lg',
  elevation: 0,
  contentClass: 'py-3 px-4',
  textClass: 'text-body-2',
  linkClass: 'text-body-2 font-weight-medium ml-2',
  chipColor: 'white',
})

const emit = defineEmits<{ dismiss: []; 'link-click': [] }>()
const visible = ref(true)
</script>
<template>
  <Transition name="banner-slide">
    <VAlert
      v-if="visible"
      :color="color"
      :variant="variant"
      :rounded="rounded"
      :elevation="elevation"
      :icon="false"
      :class="['announcement-banner', bannerClass]"
    >
      <template #default>
        <div :class="['d-flex align-center justify-center gap-2 flex-wrap', contentClass]">
          <!-- Icon -->
          <slot name="icon" :icon="icon">
            <VIcon v-if="icon" size="18">{{ icon }}</VIcon>
          </slot>

          <!-- Chip badge -->
          <slot name="chip" :chipText="chipText">
            <VChip v-if="chipText" :color="chipColor" size="small" variant="elevated" class="mr-1">
              {{ chipText }}
            </VChip>
          </slot>

          <!-- Text -->
          <slot name="text" :text="text">
            <span :class="textClass">{{ text }}</span>
          </slot>

          <!-- Link -->
          <slot name="link" :linkText="linkText">
            <a
              v-if="linkText"
              :href="linkHref ?? '#'"
              :class="[linkClass, 'text-decoration-none d-inline-flex align-center gap-1']"
              @click.prevent="$emit('link-click')"
            >
              {{ linkText }}
              <VIcon size="14">{{ Icons.ArrowRight }}</VIcon>
            </a>
          </slot>
        </div>
      </template>

      <template v-if="dismissible" #close>
        <VBtn
          icon
          variant="text"
          size="x-small"
          @click="visible = false; $emit('dismiss')"
        >
          <VIcon size="16">{{ Icons.Close }}</VIcon>
        </VBtn>
      </template>
    </VAlert>
  </Transition>
</template>
<style scoped>
.banner-slide-enter-active,
.banner-slide-leave-active {
  transition: all 0.3s ease;
}
.banner-slide-enter-from,
.banner-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
