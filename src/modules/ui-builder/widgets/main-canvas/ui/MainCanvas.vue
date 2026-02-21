<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUiTreeStore } from '../../../entities/ui-node/model/store'
import NodeRenderer from '../../../entities/ui-node/ui/NodeRenderer'

const store = useUiTreeStore()
const { rootNode } = storeToRefs(store)
</script>

<template>
  <div class="main-canvas-wrapper w-100 h-100 bg-grey-lighten-4 pa-10" @click="store.selectNode(null)">
    <NodeRenderer :node="rootNode" />
  </div>
</template>

<style>
.ui-builder-element {
  outline: 1px dashed rgba(0, 0, 0, 0.1);
  min-height: 20px;
  position: relative;
}
.ui-builder-element.is-selected {
  outline: 2px solid rgb(var(--v-theme-primary)) !important;
}
.v-card.ui-builder-element { min-height: 80px; margin-bottom: 10px; }
.v-card-title.ui-builder-element, .v-card-text.ui-builder-element { min-height: 30px; }

.v-row.ui-builder-element {
  min-height: 80px;
  background-color: rgba(var(--v-theme-primary), 0.02);
  outline: 1px solid rgba(var(--v-theme-primary), 0.1);
  margin: 4px 0 !important;
}

.v-col.ui-builder-element {
  min-height: 60px;
  background-color: rgba(var(--v-theme-primary), 0.05);
  outline: 1px dashed rgba(var(--v-theme-primary), 0.2);
  transition: all 0.2s;
}

.v-col.ui-builder-element:hover {
  background-color: rgba(var(--v-theme-primary), 0.08);
}
</style>
