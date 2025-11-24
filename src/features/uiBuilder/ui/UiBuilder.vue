<script setup>
defineOptions({
  name: 'UiBuilder'
})
import { ref, computed } from 'vue'
import UiBuilderCanvas from './UiBuilderCanvas.vue'

const availableComponents = ref([
  { type: 'row', name: 'Row (Рядок)', icon: 'mdi-view-column' },
  { type: 'col', name: 'Col (Колонка)', icon: 'mdi-view-agenda' },
  { type: 'button', name: 'Кнопка', icon: 'mdi-gesture-tap-button' },
  { type: 'textfield', name: 'Текстове поле', icon: 'mdi-form-textbox' },
  { type: 'card', name: 'Картка', icon: 'mdi-card' },
  { type: 'alert', name: 'Алерт', icon: 'mdi-alert' },
  { type: 'checkbox', name: 'Чекбокс', icon: 'mdi-checkbox-marked' },
  { type: 'switch', name: 'Перемикач', icon: 'mdi-toggle-switch' },
  { type: 'slider', name: 'Слайдер', icon: 'mdi-slider' },
  { type: 'divider', name: 'Розділювач', icon: 'mdi-minus' }
])

const canvasComponents = ref([])
const selectedComponent = ref(null)
const nextId = ref(1)
const draggedComponent = ref(null)
const showExportModal = ref(false)
const exportedCode = ref('')

const selectedComponentData = computed(() => {
  if (selectedComponent.value === null) return null
  return findComponentById(canvasComponents.value, selectedComponent.value)
})

const editableProps = computed(() => {
  if (!selectedComponentData.value) return []
  return Object.keys(selectedComponentData.value.props).filter(key => key !== 'children')
})

const getDefaultProps = (type) => {
  const defaults = {
    row: { children: [] },
    col: { cols: '12', children: [] },
    button: { text: 'Кнопка', color: 'primary' },
    textfield: { label: 'Мітка', placeholder: 'Введіть текст' },
    card: { title: 'Заголовок картки', text: 'Текст картки' },
    alert: { type: 'info', title: 'Заголовок', text: 'Текст алерту' },
    checkbox: { label: 'Чекбокс' },
    switch: { label: 'Перемикач' },
    slider: { label: 'Слайдер', min: '0', max: '100' },
    divider: {}
  }
  return { ...defaults[type] }
}

const findComponentById = (components, id) => {
  for (let comp of components) {
    if (comp.id === id) return comp
    if (comp.props.children) {
      const found = findComponentById(comp.props.children, id)
      if (found) return found
    }
  }
  return null
}

const findComponentPath = (components, id, path = []) => {
  for (let i = 0; i < components.length; i++) {
    const comp = components[i]
    if (comp.id === id) return [...path, i]
    if (comp.props.children) {
      const childPath = findComponentPath(comp.props.children, id, [...path, i, 'children'])
      if (childPath) return childPath
    }
  }
  return null
}

const getComponentByPath = (components, path) => {
  let current = components
  for (let i = 0; i < path.length; i++) {
    if (path[i] === 'children') continue
    current = current[path[i]]
    if (i < path.length - 1 && path[i + 1] === 'children') {
      current = current.props.children
      i++
    }
  }
  return current
}

const handleDragStart = (e, type) => {
  draggedComponent.value = { type, isNew: true }
  e.target.classList.add('dragging')
  e.dataTransfer.effectAllowed = 'copy'
}

const handleDragEnd = (e) => {
  e.target.classList.remove('dragging')
}

const handleCanvasDragOver = (e) => {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'copy'
}

const handleCanvasDrop = (e) => {
  e.preventDefault()
  e.stopPropagation()

  if (draggedComponent.value?.isNew) {
    const newComp = {
      id: nextId.value++,
      type: draggedComponent.value.type,
      props: getDefaultProps(draggedComponent.value.type)
    }
    canvasComponents.value.push(newComp)
    draggedComponent.value = null
  }
}

const handleComponentDragOver = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

const handleComponentDrop = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

const selectComponentById = (id) => {
  selectedComponent.value = id
}

const updatePropertyById = (key, value) => {
  if (selectedComponentData.value) {
    selectedComponentData.value.props[key] = value
  }
}

const removeComponentById = (id) => {
  const removeFromArray = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        arr.splice(i, 1)
        return true
      }
      if (arr[i].props.children) {
        if (removeFromArray(arr[i].props.children)) return true
      }
    }
    return false
  }

  removeFromArray(canvasComponents.value)

  if (selectedComponent.value === id) {
    selectedComponent.value = null
  }
}

const clearCanvas = () => {
  if (confirm('Очистити всі компоненти?')) {
    canvasComponents.value = []
    selectedComponent.value = null
  }
}

const generateComponentsCode = (components, indentLevel) => {
  const indent = '  '.repeat(indentLevel)
  let code = ''

  components.forEach(comp => {
    code += generateComponentCode(comp, indentLevel)
  })

  return code
}

const generateComponentCode = (comp, indentLevel) => {
  const indent = '  '.repeat(indentLevel)
  let code = ''

  switch (comp.type) {
    case 'row':
      code = `${indent}<v-row>\n`
      code += generateComponentsCode(comp.props.children, indentLevel + 1)
      code += `${indent}</v-row>\n\n`
      break

    case 'col':
      code = `${indent}<v-col cols="${comp.props.cols}">\n`
      code += generateComponentsCode(comp.props.children, indentLevel + 1)
      code += `${indent}</v-col>\n`
      break

    case 'button':
      code = `${indent}<v-btn color="${comp.props.color}">${comp.props.text}</v-btn>\n`
      break

    case 'textfield':
      code = `${indent}<v-text-field label="${comp.props.label}" placeholder="${comp.props.placeholder}"></v-text-field>\n`
      break

    case 'card':
      code = `${indent}<v-card>\n${indent}  <v-card-title>${comp.props.title}</v-card-title>\n${indent}  <v-card-text>${comp.props.text}</v-card-text>\n${indent}</v-card>\n`
      break

    case 'alert':
      code = `${indent}<v-alert type="${comp.props.type}" title="${comp.props.title}" text="${comp.props.text}"></v-alert>\n`
      break

    case 'checkbox':
      code = `${indent}<v-checkbox label="${comp.props.label}"></v-checkbox>\n`
      break

    case 'switch':
      code = `${indent}<v-switch label="${comp.props.label}"></v-switch>\n`
      break

    case 'slider':
      code = `${indent}<v-slider label="${comp.props.label}" min="${comp.props.min}" max="${comp.props.max}"></v-slider>\n`
      break

    case 'divider':
      code = `${indent}<v-divider></v-divider>\n`
      break
  }

  return code
}

const exportCode = () => {
  let code = '<template>\n  <v-container>\n'
  code += generateComponentsCode(canvasComponents.value, 2)
  code += '  </v-container>\n</template>'

  exportedCode.value = code
  showExportModal.value = true
}

const copyCode = () => {
  navigator.clipboard.writeText(exportedCode.value).then(() => {
    alert('Код скопійовано!')
  })
}

const closeModal = () => {
  showExportModal.value = false
}
</script>


<template>
  <div class="builder-container">
    <!-- Toolbar -->
    <div class="toolbar">
      <div class="toolbar-title">
        <i class="mdi mdi-view-dashboard"></i>
        Vue Vuetify UI Builder (Drag & Drop)
      </div>
      <button class="toolbar-btn" @click="clearCanvas">
        <i class="mdi mdi-delete-sweep"></i> Очистити
      </button>
      <button class="toolbar-btn" @click="exportCode">
        <i class="mdi mdi-code-tags"></i> Експорт
      </button>
    </div>

    <div class="main-content">
      <!-- Панель компонентів -->
      <div class="components-panel">
        <div class="panel-title">КОМПОНЕНТИ (перетягніть)</div>
        <div id="components-list">
          <div
            v-for="comp in availableComponents"
            :key="comp.type"
            class="component-item"
            draggable="true"
            :data-type="comp.type"
            @dragstart="handleDragStart($event, comp.type)"
            @dragend="handleDragEnd"
          >
            <i :class="`mdi ${comp.icon}`"></i>
            <span>{{ comp.name }}</span>
          </div>
        </div>
      </div>

      <!-- Робоча область -->
      <div class="canvas-area">
        <div
          class="canvas-content"
          @dragover="handleCanvasDragOver"
          @drop="handleCanvasDrop"
        >
          <div v-if="canvasComponents.length === 0" class="empty-state">
            <i class="mdi mdi-cursor-default-click"></i>
            <p style="margin-top: 16px">Перетягніть компонент сюди</p>
          </div>
          <template v-else>
            <UiBuilderCanvas
              v-for="(comp, index) in canvasComponents"
              :key="comp.id"
              :component="comp"
              :selected="selectedComponent === comp.id"
              @select="selectComponentById"
              @remove="removeComponentById"
              @drag-over="handleComponentDragOver"
              @drop="handleComponentDrop"
            />
          </template>
        </div>
      </div>

      <!-- Панель властивостей -->
      <div
        v-if="selectedComponent !== null"
        class="properties-panel"
      >
        <div class="panel-title">ВЛАСТИВОСТІ</div>
        <div id="properties-content" style="padding: 16px">
          <div
            v-for="key in editableProps"
            :key="key"
            class="property-field"
          >
            <div class="property-label">{{ key }}</div>
            <input
              type="text"
              class="property-input"
              :value="selectedComponentData?.props[key]"
              @change="updatePropertyById(key, $event.target.value)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Modal для експорту -->
    <div v-if="showExportModal" class="modal show">
      <div class="modal-content">
        <div class="modal-header">Експорт коду</div>
        <div class="modal-body">
          <textarea
            class="code-textarea"
            :value="exportedCode"
            readonly
          ></textarea>
        </div>
        <div class="modal-footer">
          <button class="v-btn primary" @click="copyCode">Копіювати</button>
          <button class="v-btn secondary" @click="closeModal">Закрити</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* { box-sizing: border-box; }
body { margin: 0; overflow: hidden; font-family: 'Roboto', sans-serif; }
.builder-container { height: 100vh; display: flex; flex-direction: column; }
.toolbar { background: #1976d2; color: white; padding: 12px 16px; display: flex; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
.toolbar-title { font-size: 18px; font-weight: 500; flex: 1; }
.toolbar-title i { vertical-align: middle; margin-right: 8px; }
.toolbar-btn { background: rgba(255,255,255,0.1); border: none; color: white; padding: 8px 16px; margin-left: 8px; cursor: pointer; border-radius: 4px; transition: background 0.2s; }
.toolbar-btn:hover { background: rgba(255,255,255,0.2); }
.main-content { display: flex; flex: 1; overflow: hidden; }
.components-panel { width: 250px; border-right: 1px solid #e0e0e0; overflow-y: auto; background: white; }
.panel-title { padding: 16px; font-weight: 500; font-size: 14px; color: #666; border-bottom: 1px solid #e0e0e0; }
.canvas-area { flex: 1; overflow-y: auto; background: #f5f5f5; position: relative; }
.canvas-content { min-height: calc(100% - 40px); padding: 20px; background: white; margin: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.properties-panel { width: 300px; border-left: 1px solid #e0e0e0; overflow-y: auto; background: white; }
.component-item { cursor: move; padding: 12px 16px; margin: 8px; border: 1px solid #e0e0e0; border-radius: 4px; background: white; transition: all 0.2s; display: flex; align-items: center; user-select: none; }
.component-item:hover { background: #f5f5f5; transform: translateX(4px); }
.component-item.dragging { opacity: 0.5; }
.component-item i { margin-right: 8px; color: #1976d2; }
.empty-state { text-align: center; padding: 100px 20px; color: #999; }
.empty-state i { font-size: 64px; color: #ccc; }
.property-field { margin-bottom: 12px; }
.property-label { font-size: 12px; color: #666; margin-bottom: 4px; }
.property-input { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; }
.property-input:focus { outline: none; border-color: #1976d2; }
.v-btn { display: inline-flex; align-items: center; justify-content: center; padding: 8px 16px; border-radius: 4px; font-weight: 500; cursor: pointer; border: none; transition: all 0.2s; }
.v-btn.primary { background: #1976d2; color: white; }
.v-btn.primary:hover { background: #1565c0; }
.v-btn.secondary { background: #424242; color: white; }
.modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center; }
.modal.show { display: flex; }
.modal-content { background: white; border-radius: 8px; max-width: 800px; width: 90%; max-height: 80vh; overflow: hidden; display: flex; flex-direction: column; }
.modal-header { padding: 16px 24px; border-bottom: 1px solid #e0e0e0; font-weight: 500; }
.modal-body { padding: 24px; overflow-y: auto; flex: 1; }
.modal-footer { padding: 16px 24px; border-top: 1px solid #e0e0e0; display: flex; justify-content: flex-end; gap: 8px; }
.code-textarea { width: 100%; min-height: 400px; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-family: monospace; font-size: 12px; resize: vertical; }
</style>
