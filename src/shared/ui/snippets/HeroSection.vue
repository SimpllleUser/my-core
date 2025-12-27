<template>
  <section :class="['hero-section', sectionClass]" :style="sectionStyle">
    <VContainer>
      <!-- Centered Layout -->
      <template v-if="layout === 'centered'">
        <VRow justify="center" class="text-center">
          <VCol :cols="12" :md="contentColsMd" :lg="contentColsLg">
            <!-- Badge/Chip -->
            <slot name="badge">
              <VChip
                v-if="badge"
                :color="badgeColor"
                :variant="badgeVariant"
                class="mb-4"
              >
                <VIcon v-if="badgeIcon" start :size="badgeIconSize">{{ badgeIcon }}</VIcon>
                {{ badge }}
              </VChip>
            </slot>

            <!-- Title -->
            <slot name="title">
              <h1 :class="[titleClass, 'font-weight-bold mb-4']">
                {{ title }}
                <span v-if="titleHighlight" :class="titleHighlightClass">{{ titleHighlight }}</span>
              </h1>
            </slot>

            <!-- Subtitle -->
            <slot name="subtitle">
              <p
                v-if="subtitle"
                :class="[subtitleClass, 'mx-auto mb-8']"
                :style="{ maxWidth: subtitleMaxWidth }"
              >
                {{ subtitle }}
              </p>
            </slot>

            <!-- CTAs -->
            <slot name="ctas">
              <div v-if="ctas?.length" class="d-flex flex-wrap justify-center ga-4">
                <VBtn
                  v-for="(cta, index) in ctas"
                  :key="index"
                  :color="cta.color"
                  :variant="cta.variant"
                  :size="ctaSize"
                  :rounded="ctaRounded"
                  :to="cta.to"
                  :href="cta.href"
                >
                  <VIcon v-if="cta.icon && cta.iconPosition === 'start'" start>{{ cta.icon }}</VIcon>
                  {{ cta.text }}
                  <VIcon v-if="cta.icon && cta.iconPosition !== 'start'" end>{{ cta.icon }}</VIcon>
                </VBtn>
              </div>
            </slot>

            <!-- Features list -->
            <slot name="features">
              <p v-if="features?.length" :class="[featuresClass, 'mt-4']">
                <template v-for="(feature, index) in features" :key="index">
                  <VIcon v-if="feature.icon" :size="featureIconSize" :color="featureIconColor">
                    {{ feature.icon }}
                  </VIcon>
                  {{ feature.text }}
                  <span v-if="index < features.length - 1" class="mx-2">{{ featureSeparator }}</span>
                </template>
              </p>
            </slot>

            <slot />
          </VCol>
        </VRow>

        <!-- Image below -->
        <slot name="image">
          <VRow v-if="image" justify="center" class="mt-8">
            <VCol :cols="12" :lg="imageColsLg">
              <VCard :class="imageCardClass" :elevation="imageElevation">
                <VImg :src="image" :aspect-ratio="imageAspectRatio" cover :class="imageBgClass">
                  <template #placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <VProgressCircular indeterminate color="primary" />
                    </div>
                  </template>
                </VImg>
              </VCard>
            </VCol>
          </VRow>
        </slot>
      </template>

      <!-- Split Layout -->
      <template v-else-if="layout === 'split'">
        <VRow align="center">
          <VCol cols="12" :md="6" :order-md="imagePosition === 'left' ? 2 : 1">
            <!-- Badge/Chip -->
            <slot name="badge">
              <VChip
                v-if="badge"
                :color="badgeColor"
                :variant="badgeVariant"
                class="mb-4"
              >
                <VIcon v-if="badgeIcon" start :size="badgeIconSize">{{ badgeIcon }}</VIcon>
                {{ badge }}
              </VChip>
            </slot>

            <!-- Title -->
            <slot name="title">
              <h1 :class="[splitTitleClass, 'font-weight-bold mb-4']">
                {{ title }}
              </h1>
            </slot>

            <!-- Subtitle -->
            <slot name="subtitle">
              <p v-if="subtitle" :class="[subtitleClass, 'mb-6']">
                {{ subtitle }}
              </p>
            </slot>

            <!-- Features list -->
            <slot name="features">
              <VList v-if="features?.length" density="compact" class="bg-transparent mb-6">
                <VListItem
                  v-for="(feature, index) in features"
                  :key="index"
                  class="px-0"
                >
                  <template #prepend>
                    <VIcon :color="featureIconColor" size="small" class="mr-2">
                      {{ feature.icon || featureDefaultIcon }}
                    </VIcon>
                  </template>
                  <VListItemTitle>{{ feature.text }}</VListItemTitle>
                </VListItem>
              </VList>
            </slot>

            <!-- CTAs -->
            <slot name="ctas">
              <div v-if="ctas?.length" class="d-flex flex-wrap ga-3">
                <VBtn
                  v-for="(cta, index) in ctas"
                  :key="index"
                  :color="cta.color"
                  :variant="cta.variant"
                  :size="splitCtaSize"
                >
                  <VIcon v-if="cta.icon && cta.iconPosition === 'start'" start>{{ cta.icon }}</VIcon>
                  {{ cta.text }}
                  <VIcon v-if="cta.icon && cta.iconPosition !== 'start'" end>{{ cta.icon }}</VIcon>
                </VBtn>
              </div>
            </slot>

            <slot />
          </VCol>

          <VCol cols="12" :md="6" :order-md="imagePosition === 'left' ? 1 : 2">
            <slot name="image">
              <VImg
                v-if="image"
                :src="image"
                :class="splitImageClass"
                cover
              />
            </slot>
          </VCol>
        </VRow>
      </template>
    </VContainer>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Colors, Variants, Sizes, Icons } from '@/shared/model'
import type { ColorType, VariantType, SizeType, IconType, IHeroFeature, IHeroCta } from './types'

type LayoutType = 'centered' | 'split'

interface Props {
  // Content
  title: string
  titleHighlight?: string
  subtitle?: string
  badge?: string
  badgeIcon?: IconType
  features?: IHeroFeature[]
  ctas?: IHeroCta[]
  image?: string

  // Layout
  layout?: LayoutType
  imagePosition?: 'left' | 'right'
  sectionClass?: string
  sectionPadding?: string
  backgroundGradient?: string

  // Content columns
  contentColsMd?: number
  contentColsLg?: number

  // Badge styling
  badgeColor?: ColorType
  badgeVariant?: VariantType
  badgeIconSize?: SizeType | number

  // Title styling
  titleClass?: string
  splitTitleClass?: string
  titleHighlightClass?: string

  // Subtitle styling
  subtitleClass?: string
  subtitleMaxWidth?: string

  // CTA styling
  ctaSize?: SizeType
  splitCtaSize?: SizeType
  ctaRounded?: string | boolean

  // Features styling
  featuresClass?: string
  featureIconSize?: SizeType | number
  featureIconColor?: ColorType
  featureDefaultIcon?: IconType
  featureSeparator?: string

  // Image styling
  imageColsLg?: number
  imageCardClass?: string
  imageElevation?: number | string
  imageAspectRatio?: number | string
  imageBgClass?: string
  splitImageClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'centered',
  imagePosition: 'right',
  sectionPadding: 'py-16',
  contentColsMd: 10,
  contentColsLg: 8,
  badgeColor: Colors.Primary,
  badgeVariant: Variants.Tonal,
  badgeIconSize: Sizes.Small,
  titleClass: 'text-h2 text-md-h1',
  splitTitleClass: 'text-h3 text-md-h2',
  titleHighlightClass: 'text-primary',
  subtitleClass: 'text-h6 text-medium-emphasis',
  subtitleMaxWidth: '600px',
  ctaSize: Sizes.XLarge,
  splitCtaSize: Sizes.Large,
  ctaRounded: 'pill',
  featuresClass: 'text-body-2 text-medium-emphasis',
  featureIconSize: Sizes.Small,
  featureIconColor: Colors.Success,
  featureDefaultIcon: Icons.CheckCircle,
  featureSeparator: '•',
  imageColsLg: 10,
  imageCardClass: 'elevation-12 rounded-xl overflow-hidden',
  imageElevation: 12,
  imageAspectRatio: 2,
  imageBgClass: 'bg-grey-lighten-3',
  splitImageClass: 'rounded-xl elevation-8',
})

const sectionStyle = computed(() => {
  const styles: Record<string, string> = {}
  if (props.backgroundGradient) {
    styles.background = props.backgroundGradient
  }
  return styles
})
</script>

<style scoped>
.hero-section {
  padding-top: 4rem;
  padding-bottom: 4rem;
}
</style>
