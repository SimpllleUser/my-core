import NodeRenderer from '../modules/ui-builder/entities/ui-node/ui/NodeRenderer.ts'
<script setup lang="ts">
import MainCanvas from '../modules/ui-builder/widgets/main-canvas/ui/MainCanvas.vue'
import SidebarTree from '../modules/ui-builder/widgets/sidebar-tree/ui/SidebarTree.vue'
import PropertyPanel from '../modules/ui-builder/widgets/property-panel/ui/PropertyPanel.vue'
</script>

<template>
  <VApp>
    <SidebarTree />

    <VMain>
      <MainCanvas />
    </VMain>

    <PropertyPanel />
  </VApp>
</template>
