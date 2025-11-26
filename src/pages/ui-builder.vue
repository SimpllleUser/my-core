<script setup lang="ts">
import { ref, computed } from 'vue';
import { VueDraggableNext as Draggable } from 'vue-draggable-next';
import { VBtn, VChip, VAlert } from 'vuetify/components';

type CompCtor = any;
type CompName = 'VBtn' | 'VChip' | 'VAlert';

interface PaletteItem {
  id: number;
  type: CompCtor;
  name: CompName;
  props: Record<string, any>;
}

const palette = ref<PaletteItem[]>([
  { id: 1, type: VBtn, name: 'VBtn', props: { text: 'Кнопка', color: 'primary', variant: 'flat', disabled: false } },
  { id: 2, type: VChip, name: 'VChip', props: { text: 'Chip', color: 'secondary', label: true } },
  { id: 3, type: VAlert, name: 'VAlert', props: { text: 'Інформаційний алерт', type: 'info', variant: 'tonal' } }
]);

const canvas = ref<PaletteItem[]>([]);
const selectedId = ref<number | null>(null);

const groupPalette = { name: 'vuetify', pull: 'clone', put: false };
const groupCanvas = { name: 'vuetify', pull: true, put: true };

const clonePaletteItem = (orig: PaletteItem): PaletteItem => ({
  id: Date.now() + Math.floor(Math.random() * 1e6),
  type: orig.type,
  name: orig.name,
  props: JSON.parse(JSON.stringify(orig.props))
});

const selectedComp = computed(() => canvas.value.find(c => c.id === selectedId.value) || null);

const schema: Record<
  CompName,
  Array<{ key: string; label: string; input: 'text' | 'select' | 'switch'; options?: string[] }>
> = {
  VBtn: [
    { key: 'text', label: 'Text', input: 'text' },
    {
      key: 'color',
      label: 'Color',
      input: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error']
    },
    {
      key: 'variant',
      label: 'Variant',
      input: 'select',
      options: ['flat', 'elevated', 'tonal', 'outlined', 'text', 'plain']
    },
    { key: 'disabled', label: 'Disabled', input: 'switch' }
  ],
  VChip: [
    { key: 'text', label: 'Text', input: 'text' },
    {
      key: 'color',
      label: 'Color',
      input: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error']
    },
    { key: 'label', label: 'Label', input: 'switch' }
  ],
  VAlert: [
    { key: 'text', label: 'Text', input: 'text' },
    { key: 'type', label: 'Type', input: 'select', options: ['info', 'success', 'warning', 'error'] },
    {
      key: 'variant',
      label: 'Variant',
      input: 'select',
      options: ['flat', 'elevated', 'tonal', 'outlined', 'text', 'plain']
    }
  ]
};
</script>

<template>
  <VRow
    class="wrapper"
    no-gutters
  >
    <VCol
      cols="3"
      class="column"
    >
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
          class="item"
        >
          {{ item.name }}
        </div>
      </Draggable>
    </VCol>

    <VCol cols="9">
      <VRow>
        <VCol cols="7">
          <h3>🖌️ Canvas</h3>
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
              :class="{ selected: selectedId === comp.id }"
              @click="selectedId = comp.id"
            >
              <component
                :is="comp.type"
                v-bind="comp.props"
              >
                {{ comp.props.text }}
              </component>
            </div>
          </Draggable>
        </VCol>

        <VCol cols="5">
          <div class="panel">
            <h3>⚙️ Властивості</h3>
            <div
              v-if="!selectedComp"
              class="placeholder"
            >
              Виберіть компонент на Canvas
            </div>

            <template v-else>
              <div class="prop-line">
                <strong>{{ selectedComp.name }}</strong>
              </div>

              <div
                v-for="field in schema[selectedComp.name]"
                :key="field.key"
                class="prop-line"
              >
                <label class="prop-label">{{ field.label }}</label>

                <input
                  v-if="field.input === 'text'"
                  v-model="selectedComp.props[field.key]"
                  type="text"
                  class="prop-input"
                />

                <select
                  v-else-if="field.input === 'select'"
                  v-model="selectedComp.props[field.key]"
                  class="prop-input"
                >
                  <option
                    v-for="opt in field.options"
                    :key="opt"
                    :value="opt"
                  >
                    {{ opt }}
                  </option>
                </select>

                <input
                  v-else-if="field.input === 'switch'"
                  v-model="selectedComp.props[field.key]"
                  type="checkbox"
                />
              </div>
            </template>
          </div>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>

<style scoped>
.column {
  width: 260px;
}
.list {
  background: #fafafa;
  border: 1px dashed #bbb;
  border-radius: 8px;
  padding: 10px;
  min-height: 200px;
}
.item {
  background: #f5f5f5;
  padding: 8px 10px;
  border-radius: 6px;
  margin-bottom: 6px;
  border: 1px solid #ddd;
  cursor: grab;
  text-align: center;
  transition: 0.2s;
}
.item:hover {
  background: #e3f2fd;
}
.canvas-item {
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
  padding: 6px;
  border-radius: 6px;
}
.canvas-item.selected {
  outline: 2px solid #1976d2;
  background: #e3f2fd55;
}
.placeholder {
  color: #999;
  font-style: italic;
  text-align: center;
  padding: 24px 0;
}
.palette {
  background: #fff;
}
.canvas {
  background: #fdfdfd;
}
.panel {
  background: #fff;
  border: 1px solid #e3e3e3;
  border-radius: 8px;
  padding: 12px;
}
.prop-line {
  margin-bottom: 12px;
}
.prop-label {
  display: block;
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
}
.prop-input {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
</style>
