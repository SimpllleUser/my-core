<template>
  <VListItem :class="['feature-item', itemClass]" :density="density" v-bind="$attrs">
    <template #prepend>
      <slot name="prepend" :icon="computedIcon" :iconColor="computedIconColor" :included="included">
        <VIcon
          :color="computedIconColor"
          :size="iconSize"
          :class="iconClass"
        >
          {{ computedIcon }}
        </VIcon>
      </slot>
    </template>

    <slot name="title" :text="text" :included="included">
      <VListItemTitle :class="computedTextClass">
        <slot>{{ text }}</slot>
      </VListItemTitle>
    </slot>

    <slot name="subtitle">
      <VListItemSubtitle v-if="subtitle" :class="subtitleTextClass">
        {{ subtitle }}
      </VListItemSubtitle>
    </slot>

    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
  </VListItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Colors, Sizes, Icons } from '@/shared/model'
import type { ColorType, SizeType, IconType } from './types'

interface Props {
  text?: string
  subtitle?: string
  icon?: IconType
  iconIncluded?: IconType
  iconExcluded?: IconType
  iconColor?: ColorType
  iconColorIncluded?: ColorType
  iconColorExcluded?: ColorType
  iconSize?: SizeType | number
  iconClass?: string
  included?: boolean
  textClass?: string
  subtitleTextClass?: string
  itemClass?: string
  disabledClass?: string
  density?: 'default' | 'comfortable' | 'compact'
}

const props = withDefaults(defineProps<Props>(), {
  iconIncluded: Icons.CheckCircle,
  iconExcluded: Icons.CloseCircle,
  iconColorIncluded: Colors.Success,
  iconColorExcluded: 'grey-lighten-1',
  iconSize: Sizes.Small,
  iconClass: 'mr-2',
  included: true,
  textClass: 'text-body-2',
  subtitleTextClass: 'text-caption text-medium-emphasis',
  itemClass: 'px-0',
  disabledClass: 'text-medium-emphasis',
  density: 'compact',
})

const computedIcon = computed(() => {
  if (props.icon) return props.icon
  return props.included ? props.iconIncluded : props.iconExcluded
})

const computedIconColor = computed(() => {
  if (props.iconColor) return props.iconColor
  return props.included ? props.iconColorIncluded : props.iconColorExcluded
})

const computedTextClass = computed(() => {
  return [props.textClass, { [props.disabledClass]: !props.included }]
})
</script>

<style scoped>
.feature-item {
  min-height: auto;
}
</style>
