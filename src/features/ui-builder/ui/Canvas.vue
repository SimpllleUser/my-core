<script setup lang="ts">
import { VueDraggableNext as Draggable } from 'vue-draggable-next';
import { useCanvas } from '../model/useCanvas';
import { useDnDGroups } from '../model/useDnDGroups';
import { useTree } from '../model/useTree';
import Node from './Node.vue';

const { canvas, selectedId } = useCanvas();
const { groupCanvas } = useDnDGroups();
const { removeById } = useTree();

const onRemove = (id: number) => {
  removeById(canvas.value, id);
  if (selectedId.value === id) selectedId.value = null;
};
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
        @remove="onRemove"
      />
    </div>
  </Draggable>
</template>
