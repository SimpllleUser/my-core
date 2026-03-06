<script setup lang="ts">
import { computed } from 'vue'
import { Colors, Variants, Icons } from '../../model'
import type { ColorType, VariantType, IconType, NotificationType } from './types'

interface Props {
  type?: NotificationType
  title: string
  message?: string
  icon?: IconType
  avatar?: string
  createdAt?: string
  read?: boolean
  action?: string

  // Card
  cardVariant?: VariantType
  cardColor?: ColorType | string
  elevation?: number | string
  cardClass?: string
  contentClass?: string

  // Icon/Avatar
  iconSize?: number | string
  iconContainerSize?: number | string
  iconRounded?: string

  // Dot indicator (unread)
  showDot?: boolean
  dotColor?: ColorType | string
  dotSize?: number | string

  // Text
  titleClass?: string
  messageClass?: string
  timeClass?: string
  actionClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  read: false,
  cardVariant: Variants.Flat,
  elevation: 0,
  contentClass: 'pa-4',
  iconSize: 20,
  iconContainerSize: 40,
  iconRounded: 'circle',
  showDot: true,
  dotSize: 8,
  titleClass: 'text-body-2 font-weight-medium',
  messageClass: 'text-caption text-medium-emphasis',
  timeClass: 'text-caption text-medium-emphasis',
  actionClass: 'text-caption text-primary font-weight-medium',
})

const emit = defineEmits<{
  click: []
  'action-click': []
  dismiss: []
}>()

const typeConfig = computed((): { icon: string; color: string } => {
  const configs: Record<NotificationType, { icon: string; color: string }> = {
    info: { icon: Icons.Info, color: Colors.Info },
    success: { icon: Icons.Check, color: Colors.Success },
    warning: { icon: Icons.Warning, color: Colors.Warning },
    error: { icon: Icons.Error, color: Colors.Error },
    message: { icon: Icons.Message, color: Colors.Primary },
    system: { icon: Icons.Settings, color: 'grey' },
  }
  return configs[props.type ?? 'info']
})

const resolvedIcon = computed(() => props.icon ?? typeConfig.value.icon)
const dotColor = computed(() => props.dotColor ?? typeConfig.value.color)
</script>
<template>
  <VCard
    :variant="cardVariant"
    :color="cardColor"
    :elevation="elevation"
    :class="['notification-item', { 'notification-unread': !read }, cardClass]"
    @click="$emit('click')"
  >
    <VCardText :class="contentClass">
      <div class="d-flex align-start gap-3">
        <!-- Icon or Avatar -->
        <slot name="icon" :icon="resolvedIcon" :avatar="avatar" :typeConfig="typeConfig">
          <VAvatar v-if="avatar" :size="iconContainerSize" :rounded="iconRounded">
            <VImg :src="avatar" />
          </VAvatar>
          <VAvatar
            v-else
            :color="`${typeConfig.color}-lighten-4`"
            :size="iconContainerSize"
            :rounded="iconRounded"
          >
            <VIcon :color="typeConfig.color" :size="iconSize">{{ resolvedIcon }}</VIcon>
          </VAvatar>
        </slot>

        <!-- Content -->
        <div class="flex-grow-1 min-width-0">
          <div class="d-flex align-start justify-space-between gap-2">
            <slot name="title" :title="title">
              <span :class="[titleClass, 'text-truncate']">{{ title }}</span>
            </slot>

            <div class="d-flex align-center gap-2 flex-shrink-0">
              <slot name="time" :createdAt="createdAt">
                <span v-if="createdAt" :class="timeClass">{{ createdAt }}</span>
              </slot>

              <!-- Unread dot -->
              <div
                v-if="showDot && !read"
                :class="`rounded-circle bg-${dotColor}`"
                :style="`width: ${dotSize}px; height: ${dotSize}px; flex-shrink: 0`"
              />
            </div>
          </div>

          <slot name="message" :message="message">
            <p v-if="message" :class="[messageClass, 'mb-0 mt-1']">{{ message }}</p>
          </slot>

          <slot name="action" :action="action">
            <a
              v-if="action"
              href="#"
              :class="[actionClass, 'mt-2 d-inline-block']"
              @click.prevent.stop="$emit('action-click')"
            >
              {{ action }}
            </a>
          </slot>
        </div>

        <!-- Dismiss -->
        <slot name="dismiss">
          <VBtn
            icon
            variant="text"
            size="x-small"
            class="flex-shrink-0 mt-n1"
            @click.stop="$emit('dismiss')"
          >
            <VIcon size="16">{{ Icons.Close }}</VIcon>
          </VBtn>
        </slot>
      </div>
    </VCardText>
  </VCard>
</template>
<style scoped>
.notification-item {
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.notification-unread {
  background-color: rgb(var(--v-theme-primary), 0.04) !important;
}
</style>
