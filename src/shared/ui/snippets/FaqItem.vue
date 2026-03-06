<script setup lang="ts">
import { Colors, Variants, Icons } from '../../model'
import type { ColorType, VariantType, IconType } from './types'

interface Props {
  question: string
  answer: string
  icon?: IconType

  // Card
  cardVariant?: VariantType
  cardColor?: ColorType | string
  elevation?: number | string
  cardClass?: string

  // Expansion panel
  expandIcon?: IconType
  collapseIcon?: IconType
  iconColor?: ColorType | string
  iconBgColor?: ColorType | string
  iconSize?: number | string
  iconContainerSize?: number | string
  iconRounded?: string

  // Text
  questionClass?: string
  answerClass?: string
  contentClass?: string

  // Divider
  showDivider?: boolean
}

withDefaults(defineProps<Props>(), {
  cardVariant: Variants.Flat,
  elevation: 0,
  expandIcon: Icons.ChevronDown,
  collapseIcon: Icons.ChevronUp,
  iconSize: 20,
  iconContainerSize: 40,
  iconRounded: 'lg',
  questionClass: 'text-body-1 font-weight-medium',
  answerClass: 'text-body-2 text-medium-emphasis',
  contentClass: 'pa-4',
  showDivider: false,
})
</script>
<template>
  <VCard :variant="cardVariant" :color="cardColor" :elevation="elevation" :class="cardClass">
    <VExpansionPanels variant="accordion" :elevation="0">
      <VExpansionPanel :elevation="0" style="background: transparent">
        <VExpansionPanelTitle :class="contentClass" hide-actions>
          <template #default="{ expanded }">
            <div class="d-flex align-center gap-3 w-100">
              <slot name="icon" :icon="icon">
                <VAvatar
                  v-if="icon"
                  :color="iconBgColor"
                  :size="iconContainerSize"
                  :rounded="iconRounded"
                >
                  <VIcon :color="iconColor" :size="iconSize">{{ icon }}</VIcon>
                </VAvatar>
              </slot>

              <slot name="question" :question="question">
                <span :class="questionClass">{{ question }}</span>
              </slot>

              <VSpacer />

              <slot name="toggle" :expanded="expanded">
                <VIcon :color="iconColor" size="20">
                  {{ expanded ? collapseIcon : expandIcon }}
                </VIcon>
              </slot>
            </div>
          </template>
        </VExpansionPanelTitle>

        <VDivider v-if="showDivider" />

        <VExpansionPanelText>
          <slot name="answer" :answer="answer">
            <p :class="[answerClass, 'mb-0']">{{ answer }}</p>
          </slot>
          <slot />
        </VExpansionPanelText>
      </VExpansionPanel>
    </VExpansionPanels>
  </VCard>
</template>
