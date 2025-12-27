<template>
  <div :class="['avatar-with-info d-flex', alignClass, containerClass]">
    <!-- Avatar -->
    <slot name="avatar">
      <VAvatar :size="avatarSize" :class="avatarClass">
        <VImg v-if="avatar" :src="avatar" :alt="name" />
        <span v-else-if="initials" :class="initialsClass">{{ initials }}</span>
        <VIcon v-else :size="placeholderIconSize">{{ placeholderIcon }}</VIcon>
      </VAvatar>
    </slot>

    <!-- Info -->
    <div :class="infoClass">
      <slot name="name">
        <component :is="nameTag" :class="[nameClass, 'mb-0']">
          {{ name }}
        </component>
      </slot>

      <slot name="subtitle">
        <p v-if="subtitle" :class="[subtitleClass, 'mb-0']">
          {{ subtitle }}
          <template v-if="company">
            <slot name="company-separator">{{ companySeparator }}</slot>
            {{ company }}
          </template>
        </p>
      </slot>

      <slot name="badge">
        <VChip
          v-if="badge"
          :size="badgeSize"
          :variant="badgeVariant"
          :color="badgeColor"
          :class="badgeClass"
        >
          {{ badge }}
        </VChip>
      </slot>

      <slot />
    </div>

    <!-- Append -->
    <slot name="append" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Colors, Variants, Sizes, Icons } from '@/shared/model'
import type { ColorType, VariantType, SizeType, IconType } from './types'

interface Props {
  // Data
  name: string
  avatar?: string
  initials?: string
  subtitle?: string
  company?: string
  badge?: string

  // Layout
  vertical?: boolean
  align?: 'start' | 'center' | 'end'
  containerClass?: string

  // Avatar
  avatarSize?: SizeType | number
  avatarClass?: string
  placeholderIcon?: IconType
  placeholderIconSize?: SizeType | number
  initialsClass?: string

  // Info
  infoClass?: string
  nameTag?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  nameClass?: string
  subtitleClass?: string
  companySeparator?: string

  // Badge
  badgeSize?: SizeType
  badgeVariant?: VariantType
  badgeColor?: ColorType
  badgeClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  vertical: false,
  align: 'center',
  avatarSize: 48,
  avatarClass: 'mr-3',
  placeholderIcon: Icons.Account,
  placeholderIconSize: Sizes.Large,
  initialsClass: 'text-h6 font-weight-bold',
  nameTag: 'p',
  nameClass: 'font-weight-medium',
  subtitleClass: 'text-caption text-medium-emphasis',
  companySeparator: ' at ',
  badgeSize: Sizes.XSmall,
  badgeVariant: Variants.Outlined,
  badgeClass: 'mt-1',
})

const alignClass = computed(() => {
  if (props.vertical) {
    return 'flex-column align-center text-center'
  }
  return `align-${props.align}`
})
</script>

<style scoped>
.avatar-with-info {
  gap: 0;
}
</style>
