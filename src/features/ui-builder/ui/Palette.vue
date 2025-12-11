<script setup lang="ts">
import { ref } from 'vue';
import { VBtn, VChip, VAlert, VRow, VCol } from 'vuetify/components';
import { VueDraggableNext as Draggable } from 'vue-draggable-next';
import { useDnDGroups } from '../model/useDnDGroups';
import { useClone } from '../model/useClone';
import type { PaletteItem } from '../types';

const { groupPalette } = useDnDGroups();
const { clonePaletteItem } = useClone();

const palette = ref<PaletteItem[]>([
  { id: 1, type: VBtn, name: 'VBtn', props: { text: 'Кнопка', color: 'primary', variant: 'flat', disabled: false } },
  { id: 2, type: VChip, name: 'VChip', props: { text: 'Chip', color: 'secondary', label: true } },
  { id: 3, type: VAlert, name: 'VAlert', props: { text: 'Інформаційний алерт', type: 'info', variant: 'tonal' } },
  { id: 4, type: VRow, name: 'VRow', props: {}, children: [] },
  { id: 5, type: VCol, name: 'VCol', props: { cols: 12 }, children: [] }
]);
</script>

<template>
  <div class="column">
    <h3>🎨 Components</h3>
    <Draggable
      v-model="palette"
      item-key="id"
      :group="groupPalette"
      :clone="clonePaletteItem"
      class="list palette"
    >
      <div
        v-for="item in palette"
        :key="item.id"
        :data-type="item.name"
        class="item"
      >
        {{ item.name }}
      </div>
    </Draggable>
  </div>
</template>
