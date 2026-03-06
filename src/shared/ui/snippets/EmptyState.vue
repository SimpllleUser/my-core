<script setup lang="ts">
import { Colors, Variants, Icons } from '../../model'
import type { ColorType, VariantType, IconType, IHeroCta } from './types'

interface Props {
  title?: string
  subtitle?: string
  icon?: IconType
  image?: string
  ctas?: IHeroCta[]

  // Layout
  centered?: boolean
  height?: string | number

  // Card
  cardVariant?: VariantType
  cardColor?: ColorType | string
  elevation?: number | string
  cardClass?: string
  contentClass?: string

  // Icon
  iconColor?: ColorType | string
  iconBgColor?: ColorType | string
  iconSize?: number | string
  iconContainerSize?: number | string
  iconRounded?: string
  iconClass?: string

  // Text
  titleClass?: string
  subtitleClass?: string
}

withDefaults(defineProps<Props>(), {
  centered: true,
  cardVariant: Variants.Flat,
  elevation: 0,
  contentClass: 'pa-8',
  iconColor: Colors.Primary,
  iconSize: 48,
  iconContainerSize: 96,
  iconRounded: 'circle',
  iconClass: 'mb-6',
  titleClass: 'text-h6 font-weight-medium',
  subtitleClass: 'text-body-2 text-medium-emphasis',
})

defineEmits<{ 'cta-click': [cta: IHeroCta, index: number] }>()
</script>
<template>
  <VCard :variant="cardVariant" :color="cardColor" :elevation="elevation" :height="height" :class="cardClass">
    <VCardText :class="[contentClass, { 'text-center': centered }]">
      <div :class="['d-flex flex-column align-center', { 'align-center': centered }]">
        <!-- Image or Icon -->
        <slot name="illustration" :image="image" :icon="icon">
          <VImg v-if="image" :src="image" max-width="240" :class="iconClass" />
          <VAvatar
            v-else-if="icon"
            :color="iconBgColor"
            :size="iconContainerSize"
            :rounded="iconRounded"
            :class="iconClass"
          >
            <VIcon :color="iconColor" :size="iconSize">{{ icon }}</VIcon>
          </VAvatar>
        </slot>

        <!-- Title -->
        <slot name="title" :title="title">
          <h3 v-if="title" :class="[titleClass, 'mb-2']">{{ title }}</h3>
        </slot>

        <!-- Subtitle -->
        <slot name="subtitle" :subtitle="subtitle">
          <p v-if="subtitle" :class="[subtitleClass, 'mb-6', centered ? 'text-center' : '']" style="max-width: 360px">
            {{ subtitle }}
          </p>
        </slot>

        <!-- CTAs -->
        <slot name="ctas" :ctas="ctas">
          <div v-if="ctas?.length" class="d-flex flex-wrap gap-3 justify-center">
            <VBtn
              v-for="(cta, i) in ctas"
              :key="i"
              :color="cta.color"
              :variant="cta.variant"
              :prepend-icon="cta.iconPosition !== 'end' ? cta.icon : undefined"
              :append-icon="cta.iconPosition === 'end' ? cta.icon : undefined"
              :to="cta.to"
              :href="cta.href"
              @click="$emit('cta-click', cta, i)"
            >
              {{ cta.text }}
            </VBtn>
          </div>
        </slot>

        <slot />
      </div>
    </VCardText>
  </VCard>
</template>
