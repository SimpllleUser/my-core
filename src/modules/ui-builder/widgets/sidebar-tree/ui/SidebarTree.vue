// src/modules/ui-builder/widgets/sidebar-tree/ui/SidebarTree.vue

<script setup lang="ts">
import { useUiTreeStore } from '../../../entities/ui-node/model/store'
import SidebarTreeNode from './SidebarTreeNode.vue'

const { rootNode } = useUiTreeStore()
</script>

<template>
  <VNavigationDrawer permanent width="300" border="e">
    <div class="pa-2">
      <div class="text-h6 px-2 mb-4 mt-2">UI Tree</div>

      <VList density="compact" nav class="pa-0">
        <SidebarTreeNode :node="rootNode" :depth="0" />
      </VList>
    </div>
  </VNavigationDrawer>
</template>
