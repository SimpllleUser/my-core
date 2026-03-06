<script setup lang="ts">
import { computed } from 'vue'
import { Colors, Variants, Icons } from '../../model'
import type { ColorType, VariantType, IconType } from './types'

interface Props {
  step: number | string
  title: string
  description?: string
  icon?: IconType
  completed?: boolean
  active?: boolean

  // Layout
  vertical?: boolean
  showConnector?: boolean
  isLast?: boolean

  // Colors
  activeColor?: ColorType | string
  completedColor?: ColorType | string
  inactiveColor?: ColorType | string
  iconColor?: ColorType | string

  // Dot/Badge
  dotSize?: number | string
  dotRounded?: string
  dotClass?: string

  // Card
  cardVariant?: VariantType
  cardClass?: string
  contentClass?: string

  // Text
  titleClass?: string
  descriptionClass?: string
  stepClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  completed: false,
  active: false,
  vertical: false,
  showConnector: true,
  isLast: false,
  activeColor: Colors.Primary,
  completedColor: Colors.Success,
  inactiveColor: 'grey-lighten-1',
  iconColor: 'white',
  dotSize: 48,
  dotRounded: 'circle',
  cardVariant: Variants.Flat,
  contentClass: 'pa-4',
  titleClass: 'text-body-1 font-weight-semibold',
  descriptionClass: 'text-body-2 text-medium-emphasis',
  stepClass: 'text-body-2 font-weight-bold',
})

const dotColor = computed(() => {
  if (props.completed) return props.completedColor
  if (props.active) return props.activeColor
  return props.inactiveColor
})

const stepIcon = computed(() => {
  if (props.completed) return Icons.Check
  return props.icon
})
</script>
<template>
  <div :class="['step-item d-flex', vertical ? 'flex-column' : 'align-start', 'gap-4']">
    <!-- Dot + Connector -->
    <div class="d-flex flex-column align-center">
      <slot name="dot" :step="step" :dotColor="dotColor" :completed="completed" :active="active">
        <VAvatar
          :color="dotColor"
          :size="dotSize"
          :rounded="dotRounded"
          :class="dotClass"
        >
          <VIcon v-if="stepIcon" :color="iconColor" size="20">{{ stepIcon }}</VIcon>
          <span v-else :class="[stepClass, `text-${iconColor}`]">{{ step }}</span>
        </VAvatar>
      </slot>

      <!-- Connector line -->
      <div
        v-if="showConnector && !isLast"
        :class="['step-connector', `bg-${completed ? completedColor : inactiveColor}`]"
      />
    </div>

    <!-- Content -->
    <VCard :variant="cardVariant" :class="['flex-grow-1', cardClass]" :elevation="0">
      <VCardText :class="contentClass">
        <slot name="title" :title="title">
          <p :class="[titleClass, 'mb-1']">{{ title }}</p>
        </slot>
        <slot name="description" :description="description">
          <p v-if="description" :class="[descriptionClass, 'mb-0']">{{ description }}</p>
        </slot>
        <slot />
      </VCardText>
    </VCard>
  </div>
</template>
<style scoped>
.step-connector {
  width: 2px;
  flex: 1;
  min-height: 24px;
  margin: 4px 0;
}
</style>
