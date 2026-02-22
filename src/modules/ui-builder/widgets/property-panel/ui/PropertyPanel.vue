<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUiTreeStore } from '../../../entities/ui-node/model/store'

const store = useUiTreeStore()
const { selectedNodeId } = storeToRefs(store)

const selectedNode = computed(() => {
  if (!selectedNodeId.value) return null
  return store.findNodeById(selectedNodeId.value)
})

const isRoot = computed(() => selectedNode.value?.id === 'root-canvas')

// --- Логіка валідації секцій ---
const type = computed(() => selectedNode.value?.type || '')

const hasInnerText = computed(() => ['VBtn', 'VCardTitle', 'VCardText', 'VListItem'].includes(type.value))
const hasTypography = computed(() => ['VBtn', 'VCardTitle', 'VCardText', 'VListItem'].includes(type.value))
const hasAppearance = computed(() => ['VBtn', 'VCard', 'VTextField', 'VList', 'VListItem'].includes(type.value))
const hasPadding = computed(() => ['VCard', 'VCol', 'VList', 'VListItem', 'root-canvas'].includes(type.value))
const isTextField = computed(() => type.value === 'VTextField')
const isRow = computed(() => type.value === 'VRow')
const isCol = computed(() => type.value === 'VCol')

// --- Опції ---
const variants = ['elevated', 'flat', 'tonal', 'outlined', 'text']
const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'white', 'transparent']
const justifyOptions = ['start', 'center', 'end', 'space-around', 'space-between']
const alignOptions = ['start', 'center', 'end']

// --- Spacing Logic ---
const activeSpacingType = ref<'m' | 'p'>('m')
const spacingSides = [
  { label: 'All', value: 'a' },
  { label: 'Top', value: 't' },
  { label: 'Bottom', value: 'b' },
  { label: 'Left', value: 'l' },
  { label: 'Right', value: 'r' },
  { label: 'X (Horiz)', value: 'x' },
  { label: 'Y (Vert)', value: 'y' }
]
const spacingSizes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16]

const updateSpacing = (stype: 'm' | 'p', side: string, size: number) => {
  if (!selectedNode.value) return
  const prefix = `${stype}${side}-`
  selectedNode.value.classes = selectedNode.value.classes.filter(c => !c.startsWith(prefix))
  if (size > 0) selectedNode.value.classes.push(`${prefix}${size}`)
}

const getSpacingValue = (stype: 'm' | 'p', side: string) => {
  const prefix = `${stype}${side}-`
  const cls = selectedNode.value?.classes.find(c => c.startsWith(prefix))
  return cls ? parseInt(cls.split('-')[1]) : 0
}

const fontWeights = [
  { title: 'Thin', value: 'font-weight-thin' },
  { title: 'Light', value: 'font-weight-light' },
  { title: 'Regular', value: 'font-weight-regular' },
  { title: 'Medium', value: 'font-weight-medium' },
  { title: 'Bold', value: 'font-weight-bold' },
  { title: 'Black', value: 'font-weight-black' }
]
</script>

<template>
  <VNavigationDrawer location="right" permanent width="320" border="s">
    <div v-if="selectedNode" :key="selectedNode.id" class="pa-4 d-flex flex-column h-100">

      <div class="d-flex align-center justify-space-between mb-1">
        <div class="text-h6 font-weight-bold">{{ selectedNode.type }}</div>
        <VBtn
          v-if="!isRoot"
          icon="mdi-delete-outline"
          variant="text"
          color="error"
          size="small"
          @click="store.deleteNode(selectedNode.id)"
        />
      </div>
      <div class="text-caption text-medium-emphasis mb-4">ID: {{ selectedNode.id }}</div>

      <VDivider class="mb-4" />

      <div class="flex-grow-1 overflow-y-auto pr-1">

        <div v-if="hasInnerText" class="mb-6">
          <div class="text-overline mb-2 text-primary font-weight-bold">Content</div>
          <VTextField
            v-model="selectedNode.props.innerText"
            label="Inner Text"
            variant="outlined"
            density="compact"
            hide-details
          />
        </div>

        <div v-if="isTextField" class="mb-6">
          <div class="text-overline mb-2 text-primary font-weight-bold">Field Settings</div>
          <VTextField v-model="selectedNode.props.label" label="Label" variant="outlined" density="compact" hide-details class="mb-3" />
          <VTextField v-model="selectedNode.props.placeholder" label="Placeholder" variant="outlined" density="compact" hide-details />
        </div>

        <div v-if="isRow" class="mb-6">
          <div class="text-overline mb-2 text-primary font-weight-bold">Row Layout</div>
          <VSelect v-model="selectedNode.props.justify" :items="justifyOptions" label="Justify" variant="outlined" density="compact" class="mb-3" hide-details />
          <VSelect v-model="selectedNode.props.align" :items="alignOptions" label="Align Items" variant="outlined" density="compact" hide-details />
        </div>

        <div v-if="isCol" class="mb-6">
          <div class="text-overline mb-2 text-primary font-weight-bold">Column Sizing</div>
          <div class="text-caption mb-1">Width ({{ selectedNode.props.cols || 12 }}/12)</div>
          <VSlider v-model="selectedNode.props.cols" :min="1" :max="12" :step="1" thumb-label color="primary" density="compact" class="mb-2" />
          <VTextField v-model="selectedNode.props.offset" type="number" label="Offset" variant="outlined" density="compact" hide-details />
        </div>

        <VDivider v-if="hasAppearance || hasTypography" class="mb-4" />

        <div v-if="hasAppearance" class="mb-6">
          <div class="text-overline mb-2 text-primary font-weight-bold">Appearance</div>
          <VSelect v-model="selectedNode.props.variant" :items="variants" label="Variant" variant="outlined" density="compact" class="mb-3" hide-details />
          <VSelect v-model="selectedNode.props.color" :items="colors" label="Color" variant="outlined" density="compact" hide-details />
        </div>

        <div v-if="hasTypography" class="mb-6">
          <div class="text-overline mb-2 text-primary font-weight-bold">Typography</div>
          <VSelect
            label="Weight"
            :items="fontWeights"
            :model-value="selectedNode.classes.find(c => c.startsWith('font-weight-'))"
            density="compact"
            variant="outlined"
            class="mb-3"
            hide-details
            @update:model-value="(val) => {
              selectedNode.classes = selectedNode.classes.filter(c => !c.startsWith('font-weight-'))
              if(val) selectedNode.classes.push(val)
            }"
          />
          <VBtnToggle
            density="compact"
            color="primary"
            :model-value="selectedNode.classes.find(c => ['text-left', 'text-center', 'text-right'].includes(c))"
            @update:model-value="(val) => {
              selectedNode.classes = selectedNode.classes.filter(c => !['text-left', 'text-center', 'text-right'].includes(c))
              if(val) selectedNode.classes.push(val)
            }"
          >
            <VBtn value="text-left" icon="mdi-format-align-left" size="small" />
            <VBtn value="text-center" icon="mdi-format-align-center" size="small" />
            <VBtn value="text-right" icon="mdi-format-align-right" size="small" />
          </VBtnToggle>
        </div>

        <VDivider class="mb-4" />

        <div class="mb-6">
          <div class="text-overline mb-2 text-primary font-weight-bold">Spacing</div>
          <div class="d-flex justify-center mb-4">
            <VBtnToggle v-model="activeSpacingType" mandatory density="compact" color="primary" variant="outlined">
              <VBtn value="m" size="small" class="px-4">Margin</VBtn>
              <VBtn v-if="hasPadding" value="p" size="small" class="px-4">Padding</VBtn>
            </VBtnToggle>
          </div>

          <VRow dense>
            <VCol v-for="side in spacingSides" :key="side.value" cols="6">
              <VSelect
                :label="side.label"
                :items="spacingSizes"
                :model-value="getSpacingValue(activeSpacingType, side.value)"
                density="compact"
                variant="outlined"
                hide-details
                @update:model-value="(val) => updateSpacing(activeSpacingType, side.value, val)"
              />
            </VCol>
          </VRow>
        </div>

        <div>
          <div class="text-overline mb-2 text-primary font-weight-bold">Custom Styles</div>
          <VCombobox
            v-model="selectedNode.classes"
            multiple
            chips
            label="Add CSS Classes"
            variant="outlined"
            density="compact"
            placeholder="e.g. elevation-4, rounded-xl"
            hide-details
          />
        </div>
      </div>

      <VSpacer />
      <div class="text-center pt-4 opacity-50 text-caption">FSD UI Builder v0.1</div>
    </div>

    <div v-else class="pa-10 text-center text-medium-emphasis mt-10">
      <VIcon icon="mdi-cursor-default-click-outline" size="x-large" class="mb-4 opacity-20" />
      <div class="text-body-2">Виберіть елемент для налаштування</div>
    </div>
  </VNavigationDrawer>
</template>
