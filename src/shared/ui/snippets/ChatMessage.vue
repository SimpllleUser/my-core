<template>
  <!-- System Message -->
  <div v-if="type === 'system'" :class="['text-center', systemContainerClass]">
    <slot name="system">
      <VChip :size="systemChipSize" :variant="systemChipVariant" :color="systemChipColor">
        <VIcon v-if="systemIcon" start :size="systemIconSize">{{ systemIcon }}</VIcon>
        <slot>{{ text }}</slot>
      </VChip>
    </slot>
  </div>

  <!-- Typing Indicator -->
  <div v-else-if="type === 'typing'" class="d-flex mb-4">
    <slot name="avatar">
      <VAvatar v-if="avatar" :size="avatarSize" class="mr-2 mt-1">
        <VImg :src="avatar" :alt="name" />
      </VAvatar>
    </slot>
    <VCard :color="receivedBubbleColor" :class="['pa-3', bubbleClass, receivedBubbleClass]">
      <div class="d-flex align-center ga-1">
        <div class="typing-dot" />
        <div class="typing-dot" style="animation-delay: 0.2s" />
        <div class="typing-dot" style="animation-delay: 0.4s" />
      </div>
    </VCard>
  </div>

  <!-- Sent/Received Message -->
  <div
    v-else
    :class="[
      'd-flex mb-4',
      { 'justify-end': type === 'sent' }
    ]"
  >
    <!-- Avatar for received messages -->
    <slot v-if="type === 'received'" name="avatar">
      <VAvatar v-if="avatar" :size="avatarSize" class="mr-2 mt-1">
        <VImg :src="avatar" :alt="name" />
      </VAvatar>
    </slot>

    <div
      :class="[
        'd-flex flex-column',
        { 'align-end': type === 'sent' }
      ]"
      :style="{ maxWidth: maxWidth }"
    >
      <!-- Sender name for received messages -->
      <slot v-if="type === 'received' && showName && name" name="name">
        <span :class="[nameClass, 'mb-1']">{{ name }}</span>
      </slot>

      <!-- Message bubble with optional reaction -->
      <div :class="{ 'position-relative': reaction }">
        <VCard
          :color="type === 'sent' ? sentBubbleColor : receivedBubbleColor"
          :class="[
            'pa-3',
            bubbleClass,
            type === 'sent' ? sentBubbleClass : receivedBubbleClass
          ]"
        >
          <slot>
            <p :class="[textClass, { 'text-white': type === 'sent' }, 'mb-0']">
              {{ text }}
            </p>
          </slot>
        </VCard>

        <!-- Reaction chip -->
        <slot v-if="reaction" name="reaction">
          <VChip
            :size="reactionSize"
            :variant="reactionVariant"
            class="position-absolute"
            :style="reactionStyle"
          >
            {{ reaction }}
          </VChip>
        </slot>
      </div>

      <!-- Time and read status -->
      <div :class="['d-flex align-center', timeContainerClass]">
        <slot name="time">
          <span :class="timeClass">{{ time }}</span>
        </slot>
        <slot v-if="type === 'sent' && showReadStatus" name="read-status">
          <VIcon
            v-if="isRead !== undefined"
            :size="readStatusIconSize"
            :color="isRead ? readStatusReadColor : readStatusUnreadColor"
          >
            {{ isRead ? readStatusIconRead : readStatusIconUnread }}
          </VIcon>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Colors, Variants, Sizes, Icons } from '@/shared/model'
import type { ColorType, VariantType, SizeType, IconType, ChatMessageType } from './types'

interface Props {
  // Message data
  type: ChatMessageType | 'typing'
  text?: string
  time?: string
  avatar?: string
  name?: string
  isRead?: boolean
  reaction?: string

  // Layout
  maxWidth?: string

  // Avatar
  avatarSize?: SizeType | number

  // Bubble styling
  bubbleClass?: string
  sentBubbleColor?: ColorType
  sentBubbleClass?: string
  receivedBubbleColor?: ColorType | string
  receivedBubbleClass?: string

  // Text
  textClass?: string
  nameClass?: string
  showName?: boolean

  // Time
  timeClass?: string
  timeContainerClass?: string

  // Read status
  showReadStatus?: boolean
  readStatusIconRead?: IconType
  readStatusIconUnread?: IconType
  readStatusIconSize?: SizeType | number
  readStatusReadColor?: ColorType
  readStatusUnreadColor?: ColorType | string

  // Reaction
  reactionSize?: SizeType
  reactionVariant?: VariantType
  reactionPosition?: { bottom: string; right: string }

  // System message
  systemIcon?: IconType
  systemIconSize?: SizeType | number
  systemChipSize?: SizeType
  systemChipVariant?: VariantType
  systemChipColor?: ColorType | string
  systemContainerClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: '70%',
  avatarSize: 36,
  bubbleClass: 'rounded-xl',
  sentBubbleColor: Colors.Primary,
  sentBubbleClass: 'rounded-te-0',
  receivedBubbleColor: 'grey-lighten-4',
  receivedBubbleClass: 'rounded-ts-0',
  textClass: 'text-body-2',
  nameClass: 'text-caption font-weight-medium',
  showName: false,
  timeClass: 'text-caption text-medium-emphasis',
  timeContainerClass: 'mt-1',
  showReadStatus: true,
  readStatusIconRead: Icons.CheckAll,
  readStatusIconUnread: Icons.Check,
  readStatusIconSize: 14,
  readStatusReadColor: Colors.Primary,
  readStatusUnreadColor: 'grey',
  reactionSize: Sizes.XSmall,
  reactionVariant: Variants.Flat,
  reactionPosition: { bottom: '-8px', right: '8px' },
  systemIconSize: 14,
  systemChipSize: Sizes.Small,
  systemChipVariant: Variants.Outlined,
  systemChipColor: 'grey',
  systemContainerClass: 'my-6',
})

const reactionStyle = computed(() => ({
  bottom: props.reactionPosition.bottom,
  right: props.reactionPosition.right,
}))
</script>

<style scoped>
.typing-dot {
  width: 8px;
  height: 8px;
  background-color: #9e9e9e;
  border-radius: 50%;
  animation: typing 1s infinite;
}

@keyframes typing {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
</style>
