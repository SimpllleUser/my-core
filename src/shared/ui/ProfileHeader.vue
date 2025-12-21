<script setup lang="ts">
import type { IProfileHeaderProps } from '../model';

const props = withDefaults(defineProps<IProfileHeaderProps>(), {
  avatarSize: 56
});

const emit = defineEmits<{
  'action-click': [index: number];
}>();

const handleActionClick = (index: number, action: IProfileHeaderProps['actions'][number]): void => {
  action.onClick?.();
  emit('action-click', index);
};
</script>

<template>
  <div class="profile-header">
    <div class="profile-header__main">
      <slot name="avatar">
        <VAvatar
          v-if="props.avatar"
          :image="props.avatar"
          :size="props.avatarSize"
          class="profile-header__avatar"
        />
        <VAvatar
          v-else
          :size="props.avatarSize"
          class="profile-header__avatar"
          color="grey-lighten-2"
        >
          <VIcon icon="mdi-account" />
        </VAvatar>
      </slot>

      <div class="profile-header__info">
        <div class="profile-header__title-row">
          <slot name="title">
            <span class="profile-header__title">{{ props.title }}</span>
          </slot>

          <slot name="badge">
            <VIcon
              v-if="props.badge"
              :icon="props.badge.icon"
              :color="props.badge.color"
              size="small"
              class="profile-header__badge"
            />
          </slot>

          <slot name="title-append" />
        </div>

        <slot name="subtitle">
          <span
            v-if="props.subtitle"
            class="profile-header__subtitle"
          >
            {{ props.subtitle }}
          </span>
        </slot>

        <slot name="stats">
          <div
            v-if="props.stats?.length"
            class="profile-header__stats"
          >
            <div
              v-for="(stat, index) in props.stats"
              :key="index"
              class="profile-header__stat"
            >
              <span class="profile-header__stat-value">{{ stat.value }}</span>
              <span class="profile-header__stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </slot>

        <slot name="content" />
      </div>
    </div>

    <div class="profile-header__actions">
      <slot name="actions">
        <VBtn
          v-for="(action, index) in props.actions"
          :key="index"
          :icon="action.icon"
          :color="action.bgColor"
          variant="flat"
          size="small"
          @click="handleActionClick(index, action)"
        >
          <VIcon
            :icon="action.icon"
            :color="action.color"
          />
        </VBtn>
      </slot>

      <slot name="actions-append" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background-color: rgb(var(--v-theme-surface));
  border-radius: 12px;

  &__main {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__avatar {
    flex-shrink: 0;
  }

  &__info {
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
    font-size: 18px;
    font-weight: 600;
    color: rgb(var(--v-theme-on-surface));
  }

  &__badge {
    margin-left: 4px;
  }

  &__subtitle {
    font-size: 14px;
    color: rgb(var(--v-theme-on-surface-variant));
  }

  &__stats {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-top: 4px;
  }

  &__stat {
    display: flex;
    align-items: baseline;
    gap: 6px;
  }

  &__stat-value {
    font-size: 14px;
    font-weight: 600;
    color: rgb(var(--v-theme-on-surface));
  }

  &__stat-label {
    font-size: 13px;
    color: rgb(var(--v-theme-on-surface-variant));
    text-transform: uppercase;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>
