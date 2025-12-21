<script setup lang="ts">
import type { INavBarProps, INavBarItem } from '../model';

const props = defineProps<INavBarProps>();

const expandedItems = ref<string[]>([]);

const hasChildren = (item: INavBarItem): boolean => {
  return Boolean(item.children?.length);
};

const isExpanded = (title: string): boolean => {
  return expandedItems.value.includes(title);
};

const toggleExpand = (title: string): void => {
  if (isExpanded(title)) {
    expandedItems.value = expandedItems.value.filter(t => t !== title);
  } else {
    expandedItems.value.push(title);
  }
};
</script>

<template>
  <nav class="nav-bar">
    <VList class="nav-bar__list">
      <template
        v-for="item in props.items"
        :key="item.title"
      >
        <VListItem
          v-if="!hasChildren(item)"
          :to="item.route"
          active-class="text-secondary"
          class="nav-bar__item"
          link
        >
          <div class="nav-bar__item-content">
            <div
              v-if="item.icon"
              class="nav-bar__icon"
              :class="{ 'nav-bar__icon--background': item.iconBackground }"
            >
              <VIcon :icon="item.icon" />
            </div>
            <span class="nav-bar__title">{{ item.title }}</span>
          </div>
        </VListItem>

        <VListGroup
          v-else
          :value="item.title"
        >
          <template #activator="{ props: activatorProps }">
            <VListItem
              v-bind="activatorProps"
              class="nav-bar__item nav-bar__item--parent"
            >
              <div class="nav-bar__item-content">
                <div
                  v-if="item.icon"
                  class="nav-bar__icon"
                  :class="{ 'nav-bar__icon--background': item.iconBackground }"
                >
                  <VIcon :icon="item.icon" />
                </div>
                <span class="nav-bar__title">{{ item.title }}</span>
              </div>
            </VListItem>
          </template>

          <VListItem
            v-for="child in item.children"
            :key="child.title"
            :to="child.route"
            active-class="text-secondary"
            class="nav-bar__item nav-bar__item--child"
            link
          >
            <div class="nav-bar__item-content">
              <div
                v-if="child.icon"
                class="nav-bar__icon"
                :class="{ 'nav-bar__icon--background': child.iconBackground }"
              >
                <VIcon :icon="child.icon" />
              </div>
              <span class="nav-bar__title">{{ child.title }}</span>
            </div>
          </VListItem>
        </VListGroup>
      </template>
    </VList>
  </nav>
</template>

<style lang="scss" scoped>
.nav-bar {
  &__list {
    padding: 8px;
  }

  &__item {
    padding: 8px 12px;
    border-radius: 8px;
    margin-bottom: 4px;

    &--child {
      padding-left: 24px;
    }
  }

  &__item-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;

    &--background {
      width: 36px;
      height: 36px;
      background-color: rgba(var(--v-theme-secondary), 0.12);
      border-radius: 8px;
    }
  }

  &__title {
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
