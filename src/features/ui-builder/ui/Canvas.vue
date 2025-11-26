<script setup lang="ts">
import { VueDraggableNext as Draggable } from 'vue-draggable-next';
import { useCanvas } from '../model/useCanvas';
import { useDnDGroups } from '../model/useDnDGroups';
import Node from './Node.vue';

const { canvas, selectedId } = useCanvas();
const { groupCanvas } = useDnDGroups();
</script>

<template>
  <Draggable
    v-model="canvas"
    item-key="id"
    :group="groupCanvas"
    class="list canvas"
  >
    <div
      v-if="!canvas.length"
      class="placeholder"
    >
      Перетягніть компонент із палітри →
    </div>
    <div
      v-for="comp in canvas"
      :key="comp.id"
      class="canvas-item"
    >
      <Node
        :node="comp"
        v-model:selectedId="selectedId"
      />
    </div>
  </Draggable>
</template>
