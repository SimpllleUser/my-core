<script setup lang="ts">
import { Colors, Variants, Icons } from '../../model'
import type { ColorType, VariantType, IconType, IHeroCta } from './types'

interface Props {
  title: string
  subtitle?: string
  ctas?: IHeroCta[]

  // Layout
  centered?: boolean
  inline?: boolean // title + button on same row

  // Card
  cardVariant?: VariantType
  cardColor?: ColorType | string
  elevation?: number | string
  cardClass?: string
  contentClass?: string

  // Background gradient
  gradient?: string

  // Badge/Chip
  chip?: string
  chipColor?: ColorType | string
  chipVariant?: VariantType
  chipIcon?: IconType

  // Image/Illustration
  image?: string
  imagePosition?: 'left' | 'right' | 'background'
  imageHeight?: string | number

  // Text
  titleClass?: string
  subtitleClass?: string
  chipClass?: string
}

withDefaults(defineProps<Props>(), {
  centered: true,
  inline: false,
  cardVariant: Variants.Flat,
  elevation: 0,
  contentClass: 'pa-8 pa-md-12',
  imagePosition: 'right',
  titleClass: 'text-h4 font-weight-bold',
  subtitleClass: 'text-body-1 text-medium-emphasis',
  chipVariant: Variants.Tonal,
  chipColor: Colors.Primary,
  chipClass: 'mb-4',
})

defineEmits<{ 'cta-click': [cta: IHeroCta, index: number] }>()
</script>
<template>
  <VCard
    :variant="cardVariant"
    :color="cardColor"
    :elevation="elevation"
    :class="['cta-banner', cardClass]"
    :style="gradient ? { background: gradient } : undefined"
  >
    <VCardText :class="contentClass">
      <VRow :align="'center'" :justify="centered ? 'center' : 'start'">
        <!-- Content -->
        <VCol
          :cols="12"
          :md="image && imagePosition !== 'background' ? 6 : 12"
          :order="image && imagePosition === 'left' ? 2 : 1"
        >
          <div :class="{ 'text-center': centered, 'd-flex align-center justify-space-between': inline }">
            <div :class="{ 'flex-grow-1': inline }">
              <!-- Chip -->
              <slot name="chip">
                <VChip
                  v-if="chip"
                  :color="chipColor"
                  :variant="chipVariant"
                  :class="chipClass"
                  :prepend-icon="chipIcon"
                >
                  {{ chip }}
                </VChip>
              </slot>

              <!-- Title -->
              <slot name="title" :title="title">
                <h2 :class="[titleClass, 'mb-3']">{{ title }}</h2>
              </slot>

              <!-- Subtitle -->
              <slot name="subtitle" :subtitle="subtitle">
                <p v-if="subtitle && !inline" :class="[subtitleClass, 'mb-6']">{{ subtitle }}</p>
              </slot>
            </div>

            <!-- CTAs -->
            <slot name="ctas" :ctas="ctas">
              <div
                v-if="ctas?.length"
                :class="['d-flex flex-wrap gap-3', { 'justify-center': centered && !inline }, { 'ml-6': inline }]"
              >
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
          </div>
        </VCol>

        <!-- Image -->
        <VCol
          v-if="image && imagePosition !== 'background'"
          cols="12"
          md="6"
          :order="imagePosition === 'left' ? 1 : 2"
        >
          <slot name="image" :image="image">
            <VImg :src="image" :height="imageHeight" cover />
          </slot>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
<style scoped>
.cta-banner {
  overflow: hidden;
  position: relative;
}
</style>
