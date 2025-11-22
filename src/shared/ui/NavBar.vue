<script setup lang="ts">
import type { INavBarProps } from '../model';

const props = defineProps<INavBarProps>();
</script>

<template>
  <div>
    <VList class="py-0">
      <VListItem
        v-for="item in props.items"
        :key="item.title"
        :to="item.route"
        active-class="text-secondary"
        link
      >
        <div class="d-flex align-center">
          <div
            class="nav-icon"
            v-if="item.icon"
          >
            <VIcon :icon="item.icon" />
          </div>
          <div class="nav-title ml-4">{{ item.title }}</div>
        </div>
      </VListItem>
    </VList>
  </div>
</template>
