<script setup>
defineOptions({
  name: 'UiBuilderCanvas'
})

defineProps({
  component: {
    type: Object,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  }
})

defineEmits(['select', 'remove', 'drag-over', 'drop'])

const handleRowDragOver = (e) => {
  e.preventDefault()
  e.stopPropagation()
  e.currentTarget.classList.add('drag-over')
}

const handleRowDrop = (e) => {
  e.preventDefault()
  e.stopPropagation()
  e.currentTarget.classList.remove('drag-over')
}

const handleColDragOver = (e) => {
  e.preventDefault()
  e.stopPropagation()
  e.currentTarget.classList.add('drag-over')
}

const handleColDrop = (e) => {
  e.preventDefault()
  e.stopPropagation()
  e.currentTarget.classList.remove('drag-over')
}
</script>


<template>
  <div
    :class="['canvas-component', { selected }]"
    @click="$emit('select', component.id)"
    @dragover="$emit('drag-over', component.id)"
    @drop="$emit('drop', component.id)"
  >
    <div v-if="selected" class="component-actions">
      <button class="delete-btn" @click.stop="$emit('remove', component.id)">
        <i class="mdi mdi-delete"></i> Видалити
      </button>
    </div>

    <!-- Row -->
    <template v-if="component.type === 'row'">
      <div
        class="v-row"
        @dragover.prevent.stop="handleRowDragOver"
        @drop.prevent.stop="handleRowDrop"
      >
        <span class="v-row-label">v-row</span>
        <div v-if="component.props.children.length === 0" class="drop-zone-hint">
          Перетягніть Col або компоненти сюди
        </div>
        <CanvasComponent
          v-for="child in component.props.children"
          :key="child.id"
          :component="child"
          :selected="false"
          @select="$emit('select', $event)"
          @remove="$emit('remove', $event)"
          @drag-over="$emit('drag-over', $event)"
          @drop="$emit('drop', $event)"
        />
      </div>
    </template>

    <!-- Col -->
    <template v-else-if="component.type === 'col'">
      <div
        :class="['v-col']"
        :style="{ flex: parseInt(component.props.cols) / 12 || 1 }"
        @dragover.prevent.stop="handleColDragOver"
        @drop.prevent.stop="handleColDrop"
      >
        <span class="v-col-label">v-col ({{ component.props.cols }})</span>
        <div v-if="component.props.children.length === 0" class="drop-zone-hint">
          Перетягніть компоненти сюди
        </div>
        <CanvasComponent
          v-for="child in component.props.children"
          :key="child.id"
          :component="child"
          :selected="false"
          @select="$emit('select', $event)"
          @remove="$emit('remove', $event)"
          @drag-over="$emit('drag-over', $event)"
          @drop="$emit('drop', $event)"
        />
      </div>
    </template>

    <!-- Button -->
    <template v-else-if="component.type === 'button'">
      <button :class="['v-btn', component.props.color]">
        {{ component.props.text }}
      </button>
    </template>

    <!-- Text Field -->
    <template v-else-if="component.type === 'textfield'">
      <div class="v-text-field">
        <label>{{ component.props.label }}</label>
        <input
          type="text"
          :placeholder="component.props.placeholder"
        />
      </div>
    </template>

    <!-- Card -->
    <template v-else-if="component.type === 'card'">
      <div class="v-card">
        <div class="v-card-title">{{ component.props.title }}</div>
        <div class="v-card-text">{{ component.props.text }}</div>
      </div>
    </template>

    <!-- Alert -->
    <template v-else-if="component.type === 'alert'">
      <div :class="['v-alert', component.props.type]">
        <div class="v-alert-title">{{ component.props.title }}</div>
        <div>{{ component.props.text }}</div>
      </div>
    </template>

    <!-- Checkbox -->
    <template v-else-if="component.type === 'checkbox'">
      <label class="v-checkbox">
        <input type="checkbox" />
        <span>{{ component.props.label }}</span>
      </label>
    </template>

    <!-- Switch -->
    <template v-else-if="component.type === 'switch'">
      <label class="v-switch">
        <input type="checkbox" />
        <span>{{ component.props.label }}</span>
      </label>
    </template>

    <!-- Slider -->
    <template v-else-if="component.type === 'slider'">
      <div class="v-slider">
        <label>{{ component.props.label }}</label>
        <input
          type="range"
          :min="component.props.min"
          :max="component.props.max"
        />
      </div>
    </template>

    <!-- Divider -->
    <template v-else-if="component.type === 'divider'">
      <div class="v-divider"></div>
    </template>
  </div>
</template>


<style scoped>
.canvas-component { position: relative; margin: 10px 0; padding: 8px; border: 2px dashed transparent; transition: border-color 0.2s; border-radius: 4px; }
.canvas-component:hover { border-color: #1976d2; }
.canvas-component.selected { border-color: #1976d2; background: #e3f2fd; }
.canvas-component.drag-over { border-color: #4caf50; background: #e8f5e9; }
.component-actions { position: absolute; top: -30px; right: 0; display: block; z-index: 10; }
.delete-btn { background: #f44336; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px; }
.delete-btn:hover { background: #d32f2f; }
.v-row { display: flex; gap: 12px; margin: 12px 0; background: rgba(25, 118, 210, 0.05); padding: 12px; border-radius: 4px; border: 1px dashed #1976d2; min-height: 60px; position: relative; }
.v-row.drag-over { background: rgba(76, 175, 80, 0.1); border-color: #4caf50; }
.v-row-label { position: absolute; top: -10px; left: 8px; background: white; padding: 2px 8px; font-size: 10px; color: #1976d2; border-radius: 3px; }
.v-col { flex: 1; background: rgba(255, 255, 255, 0.8); padding: 12px; border-radius: 4px; border: 1px dashed #999; min-height: 50px; position: relative; }
.v-col.drag-over { background: rgba(76, 175, 80, 0.1); border-color: #4caf50; }
.v-col-label { position: absolute; top: -10px; left: 8px; background: white; padding: 2px 8px; font-size: 10px; color: #666; border-radius: 3px; }
.v-btn { display: inline-flex; align-items: center; justify-content: center; padding: 8px 16px; border-radius: 4px; font-weight: 500; cursor: pointer; border: none; transition: all 0.2s; }
.v-btn.primary { background: #1976d2; color: white; }
.v-btn.primary:hover { background: #1565c0; }
.v-btn.secondary { background: #424242; color: white; }
.v-btn.success { background: #4caf50; color: white; }
.v-btn.error { background: #f44336; color: white; }
.v-text-field { margin: 8px 0; }
.v-text-field input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; }
.v-text-field input:focus { outline: none; border-color: #1976d2; }
.v-text-field label { display: block; font-size: 12px; color: #666; margin-bottom: 4px; }
.v-card { border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.v-card-title { font-size: 18px; font-weight: 500; margin-bottom: 8px; }
.v-card-text { color: #666; }
.v-alert { padding: 12px 16px; border-radius: 4px; margin: 8px 0; }
.v-alert.info { background: #e3f2fd; color: #1976d2; border-left: 4px solid #1976d2; }
.v-alert.success { background: #e8f5e9; color: #4caf50; border-left: 4px solid #4caf50; }
.v-alert.warning { background: #fff3e0; color: #ff9800; border-left: 4px solid #ff9800; }
.v-alert.error { background: #ffebee; color: #f44336; border-left: 4px solid #f44336; }
.v-alert-title { font-weight: 500; margin-bottom: 4px; }
.v-checkbox, .v-switch { display: flex; align-items: center; margin: 8px 0; cursor: pointer; }
.v-checkbox input, .v-switch input { margin-right: 8px; width: 18px; height: 18px; cursor: pointer; }
.v-slider { margin: 16px 0; }
.v-slider label { display: block; font-size: 12px; color: #666; margin-bottom: 8px; }
.v-slider input { width: 100%; }
.v-divider { height: 1px; background: #e0e0e0; margin: 16px 0; }
.drop-zone-hint { text-align: center; color: #999; font-size: 12px; padding: 8px; }
</style>
