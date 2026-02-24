// src/modules/ui-builder/widgets/sidebar-tree/ui/SidebarTree.vue

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUiTreeStore } from '../../../entities/ui-node/model/store'
import { WRAP_CONTAINER_TYPES as WRAP_ALLOWED_TYPES, getComponentDef } from '../../../entities/ui-node/model/componentDefinitions'
import SidebarTreeNode from './SidebarTreeNode.vue'

const store = useUiTreeStore()
const { rootNode, selectedNodeIds } = storeToRefs(store)

const canWrap = computed(() =>
  selectedNodeIds.value.length >= 2 && store.areNodesSiblings(selectedNodeIds.value)
)

const canUnwrap = computed(() => {
  if (selectedNodeIds.value.length !== 1) return false
  const id = selectedNodeIds.value[0]
  if (id === 'root-canvas') return false
  const node = store.findNodeById(id)
  return !!node && (node.children?.length > 0) && !!getComponentDef(node.type)?.isWrapContainer
})
</script>

<template>
  <VNavigationDrawer permanent width="300" border="e" class="sidebar-drawer">
    <div class="pa-2">
      <div class="text-h6 px-2 mb-4 mt-2">UI Tree</div>

      <VList density="compact" nav class="pa-0">
        <SidebarTreeNode :node="rootNode" :depth="0" />
      </VList>
    </div>

    <VSlideYReverseTransition>
      <div v-if="canWrap || canUnwrap" class="wrap-toolbar">
        <template v-if="canWrap">
          <span class="wrap-label">Wrap {{ selectedNodeIds.length }} items:</span>
          <div class="wrap-chips">
            <button
              v-for="wt in WRAP_ALLOWED_TYPES"
              :key="wt.type"
              class="wrap-chip"
              @click="store.wrapNodes(selectedNodeIds, wt.type)"
            >
              <VIcon :icon="wt.icon" size="12" class="mr-1" />
              {{ wt.label }}
            </button>
          </div>
        </template>

        <template v-else-if="canUnwrap">
          <span class="wrap-label">Unwrap:</span>
          <div class="wrap-chips">
            <button
              class="wrap-chip wrap-chip--unwrap"
              @click="store.unwrapNode(selectedNodeIds[0])"
            >
              <VIcon icon="mdi-arrow-expand-all" size="12" class="mr-1" />
              Lift children up
            </button>
          </div>
        </template>
      </div>
    </VSlideYReverseTransition>
  </VNavigationDrawer>
</template>

<style scoped>
.sidebar-drawer {
  display: flex;
  flex-direction: column;
}

.wrap-toolbar {
  position: sticky;
  bottom: 0;
  padding: 8px 10px;
  background: rgb(var(--v-theme-surface-variant));
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.wrap-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  opacity: 0.7;
  text-transform: uppercase;
}

.wrap-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.wrap-chip {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.2);
  background: rgba(var(--v-theme-surface), 0.9);
  color: rgb(var(--v-theme-on-surface));
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}

.wrap-chip:hover {
  background: rgba(var(--v-theme-primary), 0.12);
  border-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-primary));
}

.wrap-chip--unwrap:hover {
  background: rgba(var(--v-theme-warning), 0.12);
  border-color: rgb(var(--v-theme-warning));
  color: rgb(var(--v-theme-warning));
}
</style>
