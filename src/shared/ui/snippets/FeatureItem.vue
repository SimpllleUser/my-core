<template>
  <VListItem :class="['feature-item', itemClass]" v-bind="$attrs">
    <template #prepend>
      <slot name="prepend">
        <VIcon
          :color="computedIconColor"
          :size="iconSize"
          :class="iconClass"
        >
          {{ computedIcon }}
        </VIcon>
      </slot>
    </template>

    <VListItemTitle :class="computedTextClass">
      <slot>{{ text }}</slot>
    </VListItemTitle>

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
  itemClass?: string
  disabledClass?: string
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
  itemClass: 'px-0',
  disabledClass: 'text-medium-emphasis',
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
