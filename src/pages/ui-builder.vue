<script setup lang="ts">
import { ref, computed, h, defineComponent } from 'vue';
import { VueDraggableNext as Draggable } from 'vue-draggable-next';
import { VBtn, VChip, VAlert, VRow, VCol } from 'vuetify/components';

type CompCtor = any;
type CompName = 'VBtn' | 'VChip' | 'VAlert' | 'VRow' | 'VCol';

interface PaletteItem {
  id: number;
  type: CompCtor;
  name: CompName;
  props: Record<string, any>;
  children?: PaletteItem[];
}

const palette = ref<PaletteItem[]>([
  { id: 1, type: VBtn, name: 'VBtn', props: { text: 'Кнопка', color: 'primary', variant: 'flat', disabled: false } },
  { id: 2, type: VChip, name: 'VChip', props: { text: 'Chip', color: 'secondary', label: true } },
  { id: 3, type: VAlert, name: 'VAlert', props: { text: 'Інформаційний алерт', type: 'info', variant: 'tonal' } },
  { id: 4, type: VRow, name: 'VRow', props: {}, children: [] },
  { id: 5, type: VCol, name: 'VCol', props: { cols: 12 }, children: [] }
]);

const canvas = ref<PaletteItem[]>([]);
const selectedId = ref<number | null>(null);

const groupPalette = { name: 'vuetify', pull: 'clone', put: false };
const groupCanvas = { name: 'vuetify', pull: true, put: true };

const clonePaletteItem = (orig: PaletteItem): PaletteItem => ({
  id: Date.now() + Math.floor(Math.random() * 1e6),
  type: orig.type,
  name: orig.name,
  props: JSON.parse(JSON.stringify(orig.props)),
  children: Array.isArray(orig.children) ? [] : undefined
});

const findById = (list: PaletteItem[], id: number | null): PaletteItem | null => {
  if (id == null) return null;
  for (const n of list) {
    if (n.id === id) return n;
    if (n.children?.length) {
      const f = findById(n.children, id);
      if (f) return f;
    }
  }
  return null;
};

const selectedComp = computed(() => findById(canvas.value, selectedId.value));

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
  ],
  VRow: [],
  VCol: [
    {
      key: 'cols',
      label: 'Cols',
      input: 'select',
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    }
  ]
};

const Node = defineComponent({
  name: 'Node',
  props: { node: { type: Object as () => PaletteItem, required: true }, selectedId: { type: Number, default: null } },
  emits: ['update:selectedId'],
  setup(_, { emit }) {
    const isContainer = (n: PaletteItem) => n.name === 'VRow' || n.name === 'VCol';
    const select = (id: number) => emit('update:selectedId', id);
    return { isContainer, select, groupCanvas };
  },
  render() {
    const n = this.node as PaletteItem;

    if (n.name === 'VRow') {
      if (!n.children) n.children = [];
      return h(
        Draggable as any,
        {
          modelValue: n.children,
          'onUpdate:modelValue': (v: PaletteItem[]) => (n.children = v),
          itemKey: 'id',
          group: this.groupCanvas,
          tag: VRow,
          class: ['row-decor', 'bg-blue-lighten-4', 'pa-3', 'rounded-lg', this.selectedId === n.id ? 'selected' : ''],
          onClick: (e: Event) => {
            e.stopPropagation();
            this.select(n.id);
          }
        },
        {
          default: () => [
            h('div', { class: 'box-label position-absolute text-caption' }, 'VRow'),
            ...(n.children!.length
              ? n.children!.map(child =>
                  h(Node as any, {
                    node: child,
                    selectedId: this.selectedId,
                    'onUpdate:selectedId': (id: number) => this.$emit('update:selectedId', id),
                    key: child.id
                  })
                )
              : [
                  h(
                    VCol as any,
                    { cols: 12, class: 'text-grey-darken-1 text-caption py-6', key: 'placeholder' },
                    'Перетягніть сюди компонент'
                  )
                ])
          ]
        }
      );
    }

    if (n.name === 'VCol') {
      if (!n.children) n.children = [];
      return h(
        VCol as any,
        {
          ...n.props,
          class: ['col-decor', 'bg-green-lighten-4', 'pa-3', 'rounded-lg', this.selectedId === n.id ? 'selected' : ''],
          onClick: (e: Event) => {
            e.stopPropagation();
            this.select(n.id);
          }
        },
        {
          default: () => [
            h('div', { class: 'box-label position-absolute text-caption' }, `VCol (cols: ${n.props?.cols ?? ''})`),
            h(
              Draggable as any,
              {
                modelValue: n.children,
                'onUpdate:modelValue': (v: PaletteItem[]) => (n.children = v),
                itemKey: 'id',
                group: this.groupCanvas,
                tag: 'div',
                class: ['inner-list', 'bg-green-lighten-5', 'pa-3', 'rounded-lg']
              },
              {
                default: () =>
                  n.children!.length
                    ? n.children!.map(child =>
                        h(Node as any, {
                          node: child,
                          selectedId: this.selectedId,
                          'onUpdate:selectedId': (id: number) => this.$emit('update:selectedId', id),
                          key: child.id
                        })
                      )
                    : [h('div', { class: 'inner-placeholder text-caption' }, 'Put here')]
              }
            )
          ]
        }
      );
    }

    const Comp = n.type as any;
    return h(
      'div',
      {
        class: ['leaf', this.selectedId === n.id ? 'selected' : ''],
        onClick: (e: Event) => {
          e.stopPropagation();
          this.select(n.id);
        }
      },
      [h(Comp, n.props, { default: () => n.props?.text })]
    );
  }
});
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
            >
              <Node
                :node="comp"
                v-model:selectedId="selectedId"
              />
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

<style scoped lang="scss">
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
}

.row-decor {
  position: relative;
  border: 2px dashed #90caf9;
  border-radius: 10px;
}
.col-decor {
  position: relative;
  border: 2px dashed #a5d6a7;
  border-radius: 10px;
}

.box-label {
  position: absolute;
  top: -10px;
  left: 12px;
  background: #fff;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  letter-spacing: 0.2px;
  color: #455a64;
  border: 1px solid #cfd8dc;
  pointer-events: none;
}

.inner-list {
  border: 1px dashed #cfd8dc;
  min-height: 48px;
  margin-top: 6px;
}
.inner-placeholder {
  color: #9e9e9e;
  font-style: italic;
  text-align: center;
  padding: 12px 0;
}

.leaf.selected,
.row-decor.selected,
.col-decor.selected {
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
