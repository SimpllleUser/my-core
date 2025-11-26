<script setup lang="ts">
import '../styles.scss';
import { computed } from 'vue';
import Palette from './Palette.vue';
import Canvas from './Canvas.vue';
import { useCanvas } from '../model/useCanvas';
import { useTree } from '../model/useTree';
import { useSchema } from '../model/useSchema';

const { canvas, selectedId } = useCanvas();
const { findById } = useTree();
const { schema } = useSchema();

const selectedComp = computed(() => findById(canvas.value, selectedId.value));
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
      <VRow>
        <VCol cols="7">
          <h3>🖌️ Canvas</h3>
          <Canvas />
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
