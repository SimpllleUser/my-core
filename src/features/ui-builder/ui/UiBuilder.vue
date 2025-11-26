<script setup lang="ts">
import '../styles.scss';
import { computed, onMounted, onBeforeUnmount } from 'vue';
import Palette from './Palette.vue';
import Canvas from './Canvas.vue';
import { useCanvas } from '../model/useCanvas';
import { useTree } from '../model/useTree';
import { useSchema } from '../model/useSchema';
import { useHistory } from '../model/useHistory';

const { canvas, selectedId } = useCanvas();
const { findById } = useTree();
const { schema } = useSchema();
const { undo, redo, canUndo, canRedo, commit } = useHistory(canvas);

const selectedComp = computed(() => findById(canvas.value, selectedId.value));

const onKey = (e: KeyboardEvent) => {
  const mod = e.metaKey || e.ctrlKey;
  if (!mod) return;
  const key = e.key.toLowerCase();
  if (key === 'z' && !e.shiftKey) {
    e.preventDefault();
    undo();
  } else if ((key === 'z' && e.shiftKey) || key === 'y') {
    e.preventDefault();
    redo();
  }
};

const closeDrawer = () => {
  selectedId.value = null;
};

let t: number | undefined;
const commitSoon = () => {
  if (t) clearTimeout(t);
  t = window.setTimeout(() => commit(), 150);
};

onMounted(() => window.addEventListener('keydown', onKey));
onBeforeUnmount(() => window.removeEventListener('keydown', onKey));
</script>

<template>
  <VRow
    class="wrapper"
    no-gutters
  >
    <VCol cols="3">
      <Palette />
    </VCol>

    <VCol cols="9">
      <div class="d-flex align-center justify-space-between mb-2">
        <h3 class="ma-0">🖌️ Canvas</h3>
        <div>
          <VBtn
            icon="mdi-undo"
            variant="tonal"
            class="mr-2"
            :disabled="!canUndo"
            @click="undo"
          />
          <VBtn
            icon="mdi-redo"
            variant="tonal"
            :disabled="!canRedo"
            @click="redo"
          />
        </div>
      </div>

      <Canvas />
    </VCol>
  </VRow>

  <VNavigationDrawer
    :model-value="!!selectedComp"
    location="end"
    temporary
    width="420"
    scrim
    @update:model-value="
      val => {
        if (!val) closeDrawer();
      }
    "
  >
    <div class="panel">
      <div class="d-flex align-center justify-space-between mb-3">
        <h3 class="ma-0">⚙️ Властивості</h3>
        <VBtn
          size="small"
          variant="text"
          icon="mdi-close"
          @click="closeDrawer"
        />
      </div>

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
            @input="commitSoon"
            @change="commitSoon"
          />

          <select
            v-else-if="field.input === 'select'"
            v-model="selectedComp.props[field.key]"
            class="prop-input"
            @input="commitSoon"
            @change="commitSoon"
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
            @change="commitSoon"
          />
        </div>
      </template>
    </div>
  </VNavigationDrawer>
</template>
