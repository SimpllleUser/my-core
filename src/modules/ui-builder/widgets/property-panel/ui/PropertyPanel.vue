<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUiTreeStore } from '../../../entities/ui-node/model/store'
import { getComponentDef, type PropField } from '../../../entities/ui-node/model/componentDefinitions'
import { Icons } from '@/shared/model/icons'

const store = useUiTreeStore()
const { selectedNodeId } = storeToRefs(store)

const selectedNode = computed(() => {
  if (!selectedNodeId.value) return null
  return store.findNodeById(selectedNodeId.value)
})

const isRoot = computed(() => selectedNode.value?.id === 'root-canvas')

const activeSections = computed(() => {
  if (!selectedNode.value) return []
  return getComponentDef(selectedNode.value.type)?.propertySections ?? []
})

// ─── Spacing ─────────────────────────────────────────────────────────────────

const activeSpacingType = ref<'m' | 'p'>('m')
watch(selectedNodeId, () => { activeSpacingType.value = 'm' })

const spacingSides = [
  { label: 'All',      value: 'a' }, { label: 'Top',      value: 't' },
  { label: 'Bottom',   value: 'b' }, { label: 'Left',      value: 'l' },
  { label: 'Right',    value: 'r' }, { label: 'X (Horiz)', value: 'x' },
  { label: 'Y (Vert)', value: 'y' },
]
const spacingSizes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16]

const updateSpacing = (stype: 'm' | 'p', side: string, size: number) => {
  if (!selectedNode.value) return
  const prefix = `${stype}${side}-`
  selectedNode.value.classes = selectedNode.value.classes.filter((c: string) => !c.startsWith(prefix))
  if (size > 0) selectedNode.value.classes.push(`${prefix}${size}`)
}

const getSpacingValue = (stype: 'm' | 'p', side: string) => {
  const prefix = `${stype}${side}-`
  const cls = selectedNode.value?.classes.find((c: string) => c.startsWith(prefix))
  return cls ? parseInt(cls.split('-')[1]) : 0
}

// ─── Icon picker ──────────────────────────────────────────────────────────────

const allIcons = Object.entries(Icons).map(([name, value]) => ({ name, value }))

// ─── Flex layout ─────────────────────────────────────────────────────────────

const flexOptions = [
  { title: 'Block',       value: 'd-block' },
  { title: 'Flex Row',    value: 'd-flex flex-row' },
  { title: 'Flex Column', value: 'd-flex flex-column' },
]

const getFlexValue = () =>
  selectedNode.value?.classes.find((c: string) => c.startsWith('d-')) ?? null

const setFlexValue = (val: string) => {
  if (!selectedNode.value) return
  selectedNode.value.classes = selectedNode.value.classes
    .filter((c: string) => !c.startsWith('d-') && !c.startsWith('flex-'))
  if (val) selectedNode.value.classes.push(...val.split(' '))
}

const getJustifyValue = () =>
  selectedNode.value?.classes.find((c: string) => c.startsWith('justify-')) ?? null

const setJustifyValue = (val: string) => {
  if (!selectedNode.value) return
  selectedNode.value.classes = selectedNode.value.classes
    .filter((c: string) => !c.startsWith('justify-'))
  selectedNode.value.classes.push(val)
}

// ─── Typography ───────────────────────────────────────────────────────────────

const fontWeights = [
  { title: 'Thin',    value: 'font-weight-thin' },
  { title: 'Regular', value: 'font-weight-regular' },
  { title: 'Bold',    value: 'font-weight-bold' },
  { title: 'Black',   value: 'font-weight-black' },
]

const getFontWeight = () =>
  selectedNode.value?.classes.find((c: string) => c.startsWith('font-weight-')) ?? null

const setFontWeight = (val: string) => {
  if (!selectedNode.value) return
  selectedNode.value.classes = selectedNode.value.classes
    .filter((c: string) => !c.startsWith('font-weight-'))
  if (val) selectedNode.value.classes.push(val)
}

const getTextAlign = () =>
  selectedNode.value?.classes.find((c: string) =>
    ['text-left', 'text-center', 'text-right'].includes(c)
  ) ?? null

const setTextAlign = (val: string) => {
  if (!selectedNode.value) return
  selectedNode.value.classes = selectedNode.value.classes
    .filter((c: string) => !['text-left', 'text-center', 'text-right'].includes(c))
  if (val) selectedNode.value.classes.push(val)
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fieldKey = (field: PropField) =>
  field.kind + ('prop' in field ? (field as any).prop : '')
</script>

<template>
  <VNavigationDrawer location="right" permanent width="320" border="s">
    <div v-if="selectedNode" :key="selectedNode.id" class="pa-4 d-flex flex-column h-100">

      <!-- Header -->
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

      <!-- Generic sections -->
      <div class="flex-grow-1 overflow-y-auto pr-1">
        <template v-for="section in activeSections" :key="section.title">
          <div class="mb-6">
            <div class="text-overline mb-2 text-primary font-weight-bold">{{ section.title }}</div>

            <template v-for="field in section.fields" :key="fieldKey(field)">

              <!-- text -->
              <VTextField
                v-if="field.kind === 'text'"
                v-model="selectedNode.props[field.prop]"
                :label="field.label"
                :placeholder="field.placeholder"
                :clearable="field.clearable"
                variant="outlined"
                density="compact"
                class="mb-3"
                hide-details
              />

              <!-- textarea (edits node.name) -->
              <VTextarea
                v-else-if="field.kind === 'textarea'"
                v-model="selectedNode.name"
                :label="field.label"
                variant="outlined"
                density="compact"
                auto-grow
                rows="2"
                hide-details
              />

              <!-- select -->
              <VSelect
                v-else-if="field.kind === 'select'"
                v-model="selectedNode.props[field.prop]"
                :label="field.label"
                :items="field.options"
                variant="outlined"
                density="compact"
                class="mb-3"
                hide-details
              />

              <!-- switch -->
              <VSwitch
                v-else-if="field.kind === 'switch'"
                v-model="selectedNode.props[field.prop]"
                :label="field.label"
                density="compact"
                color="primary"
                hide-details
                class="mb-1"
              />

              <!-- icon-picker -->
              <VAutocomplete
                v-else-if="field.kind === 'icon-picker'"
                v-model="selectedNode.props[field.prop]"
                :items="allIcons"
                item-title="name"
                item-value="value"
                :label="field.label"
                variant="outlined"
                density="compact"
                class="mb-3"
                hide-details
                clearable
              >
                <template #item="{ props: ip, item }">
                  <VListItem v-bind="ip" :prepend-icon="item.raw.value" :title="item.raw.name" />
                </template>
                <template #prepend-inner>
                  <VIcon
                    v-if="selectedNode.props[field.prop]"
                    :icon="selectedNode.props[field.prop]"
                    size="18"
                    class="mr-1"
                  />
                </template>
              </VAutocomplete>

              <!-- slider -->
              <template v-else-if="field.kind === 'slider'">
                <div class="text-caption mb-1">
                  {{ field.label }}: {{ selectedNode.props[field.prop] ?? field.min }}
                </div>
                <VSlider
                  v-model="selectedNode.props[field.prop]"
                  :min="field.min"
                  :max="field.max"
                  :step="field.step ?? 1"
                  thumb-label
                  color="primary"
                  class="mb-3"
                />
              </template>

              <!-- row (two fields side by side) -->
              <div v-else-if="field.kind === 'row'" class="d-flex gap-2 mb-3">
                <VTextField
                  v-for="f in field.fields"
                  :key="f.prop"
                  v-model="selectedNode.props[f.prop]"
                  :label="f.label"
                  :placeholder="f.placeholder"
                  variant="outlined"
                  density="compact"
                  hide-details
                />
              </div>

              <!-- icon-slots (prepend/append icon pickers) -->
              <template v-else-if="field.kind === 'icon-slots'">
                <VAutocomplete
                  v-for="s in field.slots"
                  :key="s.prop"
                  v-model="selectedNode.props[s.prop]"
                  :items="allIcons"
                  item-title="name"
                  item-value="value"
                  :label="s.label"
                  variant="outlined"
                  density="compact"
                  class="mb-3"
                  hide-details
                  clearable
                >
                  <template #item="{ props: ip, item }">
                    <VListItem v-bind="ip" :prepend-icon="item.raw.value" :title="item.raw.name" />
                  </template>
                </VAutocomplete>
              </template>

              <!-- flex-layout -->
              <template v-else-if="field.kind === 'flex-layout'">
                <VSelect
                  label="Display Type"
                  :items="flexOptions"
                  :model-value="getFlexValue()"
                  density="compact"
                  variant="outlined"
                  class="mb-3"
                  hide-details
                  @update:model-value="setFlexValue"
                />
                <template v-if="selectedNode.classes.includes('d-flex')">
                  <div class="text-caption mb-1">Justify</div>
                  <VSelect
                    :items="['justify-start', 'justify-center', 'justify-space-between', 'justify-end']"
                    label="Justify"
                    density="compact"
                    variant="outlined"
                    class="mb-3"
                    hide-details
                    :model-value="getJustifyValue()"
                    @update:model-value="setJustifyValue"
                  />
                </template>
              </template>

              <!-- typography -->
              <template v-else-if="field.kind === 'typography'">
                <VSelect
                  label="Weight"
                  :items="fontWeights"
                  :model-value="getFontWeight()"
                  density="compact"
                  variant="outlined"
                  class="mb-3"
                  hide-details
                  @update:model-value="setFontWeight"
                />
                <VBtnToggle
                  density="compact"
                  color="primary"
                  variant="outlined"
                  class="mb-3"
                  :model-value="getTextAlign()"
                  @update:model-value="setTextAlign"
                >
                  <VBtn :value="'text-left'"   :icon="Icons.FormatAlignLeft"   size="small" />
                  <VBtn :value="'text-center'"  :icon="Icons.FormatAlignCenter" size="small" />
                  <VBtn :value="'text-right'"   :icon="Icons.FormatAlignRight"  size="small" />
                </VBtnToggle>
              </template>

              <!-- spacing -->
              <template v-else-if="field.kind === 'spacing'">
                <div class="d-flex justify-center mb-4">
                  <VBtnToggle v-model="activeSpacingType" mandatory density="compact" color="primary" variant="outlined">
                    <VBtn value="m" size="small" class="px-4">Margin</VBtn>
                    <VBtn v-if="field.withPadding" value="p" size="small" class="px-4">Padding</VBtn>
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
                      @update:model-value="val => updateSpacing(activeSpacingType, side.value, val)"
                    />
                  </VCol>
                </VRow>
              </template>

              <!-- custom-classes -->
              <VCombobox
                v-else-if="field.kind === 'custom-classes'"
                v-model="selectedNode.classes"
                multiple
                chips
                variant="outlined"
                density="compact"
                placeholder="e.g. elevation-4"
                hide-details
              />

            </template>
          </div>
        </template>
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
