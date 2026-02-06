<template>
  <VCard
    :variant="cardVariant"
    :elevation="elevation"
    :hover="hover"
    :height="height"
    :class="['team-member-card', cardClass]"
  >
    <!-- Horizontal Layout -->
    <template v-if="layout === 'horizontal'">
      <VRow align="center" no-gutters>
        <VCol cols="auto" class="pa-4">
          <slot name="avatar">
            <VAvatar :size="avatarSize">
              <VImg :src="avatar" :alt="name" />
            </VAvatar>
          </slot>
        </VCol>
        <VCol class="pa-4">
          <slot name="info">
            <h4 :class="[nameClass, 'font-weight-bold mb-0']">{{ name }}</h4>
            <p :class="[roleClass, 'mb-0']">{{ role }}</p>
          </slot>
        </VCol>
        <VCol v-if="socials?.length || $slots.socials" cols="auto" class="pa-4">
          <slot name="socials" :socials="socials">
            <SocialLinks
              v-if="socials?.length"
              :links="socials"
              :button-variant="socialButtonVariant"
              :button-size="socialButtonSize"
              :icon-only="true"
            />
          </slot>
        </VCol>
      </VRow>
    </template>

    <!-- Default/Centered Layout -->
    <template v-else-if="layout === 'centered'">
      <VCardText :class="['text-center', contentClass]">
        <slot name="avatar">
          <VAvatar :size="avatarSize" class="mb-4">
            <VImg :src="avatar" :alt="name" />
          </VAvatar>
        </slot>

        <slot name="info">
          <h4 :class="[nameClass, 'font-weight-bold mb-1']">{{ name }}</h4>
          <p :class="[roleClass, 'mb-3']">{{ role }}</p>
        </slot>

        <slot name="socials" :socials="socials">
          <SocialLinks
            v-if="socials?.length"
            :links="socials"
            :button-variant="socialButtonVariant"
            :button-size="socialButtonSize"
            :button-color="socialButtonColor"
            :icon-only="true"
            centered
          />
        </slot>

        <slot />
      </VCardText>
    </template>

    <!-- Card with Bio Layout -->
    <template v-else>
      <VCardText :class="contentClass">
        <div :class="['d-flex', { 'align-start': bio, 'align-center': !bio }, 'mb-4']">
          <slot name="avatar">
            <VAvatar :size="avatarSize" class="mr-4">
              <VImg :src="avatar" :alt="name" />
            </VAvatar>
          </slot>

          <div>
            <slot name="info">
              <h4 :class="[nameClass, 'font-weight-bold mb-0']">{{ name }}</h4>
              <p :class="[roleClass, 'mb-1']">{{ role }}</p>
              <VChip v-if="department" size="x-small" variant="outlined">
                {{ department }}
              </VChip>
            </slot>
          </div>
        </div>

        <slot name="bio">
          <p v-if="bio" :class="[bioClass, 'mb-4']">{{ bio }}</p>
        </slot>

        <slot name="socials" :socials="socials">
          <SocialLinks
            v-if="socials?.length"
            :links="socials"
            :button-variant="socialButtonVariant"
            :button-size="socialButtonSize"
            :show-label="showSocialLabels"
          />
        </slot>

        <slot />
      </VCardText>
    </template>
  </VCard>
</template>

<script setup lang="ts">
import { Variants, Sizes } from '@/shared/model'
import type { VariantType, SizeType, ISocialLink } from './types'
import SocialLinks from './SocialLinks.vue'

type LayoutType = 'centered' | 'horizontal' | 'default'

interface Props {
  // Member data
  name: string
  role: string
  avatar: string
  department?: string
  bio?: string
  socials?: ISocialLink[]

  // Layout
  layout?: LayoutType

  // Card props
  cardVariant?: VariantType
  elevation?: number | string
  hover?: boolean
  height?: string | number
  cardClass?: string
  contentClass?: string

  // Avatar
  avatarSize?: SizeType | number

  // Text classes
  nameClass?: string
  roleClass?: string
  bioClass?: string

  // Social links
  socialButtonVariant?: VariantType
  socialButtonSize?: SizeType
  socialButtonColor?: string
  showSocialLabels?: boolean
}

withDefaults(defineProps<Props>(), {
  layout: 'default',
  cardVariant: Variants.Flat,
  elevation: 0,
  hover: true,
  contentClass: 'pa-6',
  avatarSize: 80,
  nameClass: 'text-h6',
  roleClass: 'text-body-2 text-primary',
  bioClass: 'text-body-2 text-medium-emphasis',
  socialButtonVariant: Variants.Tonal,
  socialButtonSize: Sizes.Small,
  socialButtonColor: 'grey-darken-1',
  showSocialLabels: false,
})
</script>

<style scoped>
.team-member-card {
  height: 100%;
}
</style>
