<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUiTreeStore } from '../../../entities/ui-node/model/store'
import { Icons } from '@/shared/model/icons' //

const store = useUiTreeStore()
const { selectedNodeId } = storeToRefs(store)

const selectedNode = computed(() => {
  if (!selectedNodeId.value) return null
  return store.findNodeById(selectedNodeId.value)
})

const isRoot = computed(() => selectedNode.value?.id === 'root-canvas')

// --- Логіка валідації секцій ---
const type = computed(() => selectedNode.value?.type || '')
const isTextNode = computed(() => type.value === 'TEXT')
const hasTypography = computed(() => ['VBtn', 'VCardTitle', 'VCardText', 'VListItem', 'TEXT'].includes(type.value))
const hasAppearance = computed(() => ['VBtn', 'VCard', 'VTextField', 'VList', 'VListItem'].includes(type.value))
const hasPadding = computed(() => ['VCard', 'VCol', 'VList', 'VListItem', 'root-canvas'].includes(type.value))
const hasIcons = computed(() => ['VBtn', 'VListItem', 'VTextField'].includes(type.value))

// --- Опції для Vuetify ---
const variants = ['elevated', 'flat', 'tonal', 'outlined', 'text']
const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'white', 'transparent']
const justifyOptions = ['start', 'center', 'end', 'space-around', 'space-between']
const alignOptions = ['start', 'center', 'end']

// --- Spacing (Margin/Padding) ---
const activeSpacingType = ref<'m' | 'p'>('m')
const spacingSides = [
  { label: 'All', value: 'a' }, { label: 'Top', value: 't' },
  { label: 'Bottom', value: 'b' }, { label: 'Left', value: 'l' },
  { label: 'Right', value: 'r' }, { label: 'X (Horiz)', value: 'x' },
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

// --- Icons List (з твого Enum) ---
const allIcons = Object.entries(Icons).map(([name, value]) => ({ name, value }))

// --- Typography Options ---
const fontWeights = [
  { title: 'Thin', value: 'font-weight-thin' },
  { title: 'Regular', value: 'font-weight-regular' },
  { title: 'Bold', value: 'font-weight-bold' },
  { title: 'Black', value: 'font-weight-black' }
]
</script>

<template>
  <VNavigationDrawer location="right" permanent width="320" border="s">
    <div v-if="selectedNode" :key="selectedNode.id" class="pa-4 d-flex flex-column h-100">

      <div class="d-flex align-center justify-space-between mb-1">
        <div class="text-subtitle-1 font-weight-bold">{{ selectedNode.type }}</div>
        <VBtn
          v-if="!isRoot"
          :icon="Icons.DeleteOutline"
          variant="text"
          color="error"
          size="small"
          @click="store.deleteNode(selectedNode.id)"
        />
      </div>
      <div class="text-caption text-medium-emphasis mb-4">ID: {{ selectedNode.id }}</div>

      <VDivider class="mb-4" />

      <div class="flex-grow-1 overflow-y-auto pr-1">

        <div v-if="isTextNode" class="mb-6">
          <div class="text-overline mb-2 text-primary font-weight-bold">Text Content</div>
          <VTextarea
            v-model="selectedNode.name"
            label="Text Content"
            variant="outlined"
            density="compact"
            auto-grow
            rows="2"
            hide-details
          />
        </div>

        <div v-if="hasIcons" class="mb-6">
          <div class="text-overline mb-2 text-primary font-weight-bold">Icons</div>

          <VAutocomplete
            v-model="selectedNode.props.prependIcon"
            :items="allIcons"
            item-title="name"
            item-value="value"
            label="Prepend Icon"
            variant="outlined"
            density="compact"
            class="mb-3"
            hide-details
            clearable
          >
            <template #item="{ props, item }">
              <VListItem v-bind="props" :prepend-icon="item.raw.value" :title="item.raw.name" />
            </template>
          </VAutocomplete>

          <VAutocomplete
            v-model="selectedNode.props.appendIcon"
            :items="allIcons"
            item-title="name"
            item-value="value"
            label="Append Icon"
            variant="outlined"
            density="compact"
            hide-details
            clearable
          >
            <template #item="{ props, item }">
              <VListItem v-bind="props" :prepend-icon="item.raw.value" :title="item.raw.name" />
            </template>
          </VAutocomplete>
        </div>

        <div v-if="type === 'VCol'" class="mb-6">
          <div class="text-overline mb-2 text-primary font-weight-bold">Grid Column</div>
          <div class="text-caption mb-1">Width: {{ selectedNode.props.cols || 12 }}/12</div>
          <VSlider v-model="selectedNode.props.cols" :min="1" :max="12" :step="1" thumb-label color="primary" />
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
            variant="outlined"
            :model-value="selectedNode.classes.find(c => ['text-left', 'text-center', 'text-right'].includes(c))"
            @update:model-value="(val) => {
              selectedNode.classes = selectedNode.classes.filter(c => !['text-left', 'text-center', 'text-right'].includes(c))
              if(val) selectedNode.classes.push(val)
            }"
          >
            <VBtn :value="'text-left'" :icon="Icons.FormatAlignLeft" size="small" />
            <VBtn :value="'text-center'" :icon="Icons.FormatAlignCenter" size="small" />
            <VBtn :value="'text-right'" :icon="Icons.FormatAlignRight" size="small" />
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

        <div class="pb-10">
          <div class="text-overline mb-2 text-primary font-weight-bold">Custom Classes</div>
          <VCombobox
            v-model="selectedNode.classes"
            multiple
            chips
            variant="outlined"
            density="compact"
            placeholder="e.g. elevation-4"
            hide-details
          />
        </div>
      </div>

      <VSpacer />
      <div class="text-center pt-4 opacity-50 text-caption">FSD UI Builder v0.1</div>
    </div>

    <div v-else class="pa-10 text-center text-medium-emphasis mt-10">
      <VIcon :icon="Icons.CursorClick" size="x-large" class="mb-4 opacity-20" />
      <div class="text-body-2">Select an element to edit properties</div>
    </div>
  </VNavigationDrawer>
</template>
