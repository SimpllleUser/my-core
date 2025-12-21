<script setup lang="ts">
import type { IExpandableHeaderProps } from '../model';

const props = withDefaults(defineProps<IExpandableHeaderProps>(), {
  coverHeight: 120,
  coverGradient: false,
  avatarSize: 80,
  avatarBorderColor: 'white',
  flat: false,
  rounded: 'lg',
  elevation: 0,
  dense: false,
  centered: false,
  loading: false,
});

const slots = defineSlots<{
  /** Custom cover content */
  cover?: () => any;
  /** Custom avatar content */
  avatar?: () => any;
  /** Content next to avatar (actions, buttons) */
  'avatar-append'?: () => any;
  /** Content before title */
  'title-prepend'?: () => any;
  /** Custom title content */
  title?: () => any;
  /** Content after title */
  'title-append'?: () => any;
  /** Custom subtitle content */
  subtitle?: () => any;
  /** Actions section (top right of cover or below content) */
  actions?: () => any;
  /** Main content area */
  default?: () => any;
  /** Footer content */
  footer?: () => any;
}>();

const coverHeightValue = computed(() => {
  if (typeof props.coverHeight === 'number') {
    return `${props.coverHeight}px`;
  }
  return props.coverHeight;
});

const avatarSizeValue = computed(() => {
  if (typeof props.avatarSize === 'number') {
    return props.avatarSize;
  }
  const sizeMap: Record<string, number> = {
    'x-small': 32,
    'small': 48,
    'default': 64,
    'large': 80,
    'x-large': 96,
  };
  return sizeMap[props.avatarSize] || 64;
});

const avatarOffset = computed(() => {
  return avatarSizeValue.value / 2;
});

const hasCover = computed(() => {
  return props.coverImage || slots.cover;
});

const hasAvatar = computed(() => {
  return props.avatarImage || slots.avatar;
});

const hasTitle = computed(() => {
  return props.title || slots.title;
});

const hasSubtitle = computed(() => {
  return props.subtitle || slots.subtitle;
});

const hasHeader = computed(() => {
  return hasAvatar.value || hasTitle.value || hasSubtitle.value;
});
</script>

<template>
  <VCard
    class="expandable-header"
    :class="{
      'expandable-header--dense': props.dense,
      'expandable-header--centered': props.centered,
      'expandable-header--with-cover': hasCover,
      'expandable-header--with-avatar': hasAvatar,
    }"
    :flat="props.flat"
    :rounded="props.rounded"
    :elevation="props.elevation"
    :color="props.color"
    :loading="props.loading"
  >
    <!-- Cover Section -->
    <div
      v-if="hasCover"
      class="expandable-header__cover"
      :style="{ height: coverHeightValue }"
    >
      <slot name="cover">
        <VImg
          v-if="props.coverImage"
          :src="props.coverImage"
          class="expandable-header__cover-image"
          cover
        >
          <div
            v-if="props.coverGradient"
            class="expandable-header__cover-gradient"
          />
        </VImg>
      </slot>

      <!-- Actions on cover (absolute positioned) -->
      <div
        v-if="slots.actions && hasCover"
        class="expandable-header__cover-actions"
      >
        <slot name="actions" />
      </div>
    </div>

    <!-- Header Content Section -->
    <div
      v-if="hasHeader || slots['avatar-append']"
      class="expandable-header__header"
      :style="hasCover && hasAvatar ? { marginTop: `-${avatarOffset}px` } : undefined"
    >
      <!-- Avatar Section -->
      <div
        v-if="hasAvatar || slots['avatar-append']"
        class="expandable-header__avatar-section"
      >
        <div
          v-if="hasAvatar"
          class="expandable-header__avatar-wrapper"
        >
          <slot name="avatar">
            <VAvatar
              :size="avatarSizeValue"
              class="expandable-header__avatar"
              :style="{ borderColor: props.avatarBorderColor }"
            >
              <VImg
                v-if="props.avatarImage"
                :src="props.avatarImage"
                cover
              />
            </VAvatar>
          </slot>
        </div>

        <div
          v-if="slots['avatar-append']"
          class="expandable-header__avatar-append"
        >
          <slot name="avatar-append" />
        </div>
      </div>

      <!-- Title Section -->
      <div
        v-if="hasTitle || hasSubtitle"
        class="expandable-header__title-section"
      >
        <div
          v-if="hasTitle"
          class="expandable-header__title-row"
        >
          <slot name="title-prepend" />
          <slot name="title">
            <h2 class="expandable-header__title">
              {{ props.title }}
            </h2>
          </slot>
          <slot name="title-append" />
        </div>

        <div
          v-if="hasSubtitle"
          class="expandable-header__subtitle-row"
        >
          <slot name="subtitle">
            <p class="expandable-header__subtitle">
              {{ props.subtitle }}
            </p>
          </slot>
        </div>
      </div>
    </div>

    <!-- Actions without cover (below header) -->
    <div
      v-if="slots.actions && !hasCover"
      class="expandable-header__actions"
    >
      <slot name="actions" />
    </div>

    <!-- Main Content -->
    <div
      v-if="slots.default"
      class="expandable-header__content"
    >
      <slot />
    </div>

    <!-- Footer -->
    <div
      v-if="slots.footer"
      class="expandable-header__footer"
    >
      <slot name="footer" />
    </div>
  </VCard>
</template>

<style lang="scss" scoped>
.expandable-header {
  overflow: visible;

  &__cover {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: inherit;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  &__cover-image {
    width: 100%;
    height: 100%;
  }

  &__cover-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
  }

  &__cover-actions {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    gap: 8px;
    z-index: 1;
  }

  &__header {
    padding: 16px;
    position: relative;
    z-index: 2;
  }

  &__avatar-section {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  &__avatar-wrapper {
    flex-shrink: 0;
  }

  &__avatar {
    border: 3px solid;
    border-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &__avatar-append {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  &__title-section {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__title-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.3;
    color: rgba(var(--v-theme-on-surface), 1);
  }

  &__subtitle-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__subtitle {
    margin: 0;
    font-size: 0.875rem;
    color: rgba(var(--v-theme-on-surface), 0.7);
    line-height: 1.5;
  }

  &__actions {
    padding: 0 16px 16px;
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }

  &__content {
    padding: 0 16px 16px;
  }

  &__footer {
    padding: 12px 16px;
    border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  }

  // Modifiers
  &--dense {
    .expandable-header__header {
      padding: 12px;
    }

    .expandable-header__avatar-section {
      margin-bottom: 8px;
    }

    .expandable-header__content {
      padding: 0 12px 12px;
    }

    .expandable-header__actions {
      padding: 0 12px 12px;
    }

    .expandable-header__footer {
      padding: 8px 12px;
    }
  }

  &--centered {
    text-align: center;

    .expandable-header__avatar-section {
      flex-direction: column;
      align-items: center;
    }

    .expandable-header__avatar-append {
      margin-top: 12px;
    }

    .expandable-header__title-row {
      justify-content: center;
    }

    .expandable-header__subtitle-row {
      justify-content: center;
    }

    .expandable-header__actions {
      justify-content: center;
    }
  }

  &--with-cover {
    .expandable-header__header {
      background: rgba(var(--v-theme-surface), 1);
    }
  }

  &--with-avatar {
    &.expandable-header--with-cover {
      .expandable-header__avatar-section {
        align-items: flex-end;
      }
    }
  }
}
</style>
