<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Colors, Variants } from '../../model'
import type { ColorType, VariantType, IconType, IFilterField, FilterValues } from './types'
import ProductFilterField from './ProductFilterField.vue'

type Layout = 'sidebar' | 'drawer' | 'inline'

interface Props {
  filters: IFilterField[]
  modelValue?: FilterValues

  // Layout
  layout?: Layout

  // Drawer
  modelDrawer?: boolean
  drawerWidth?: number | string
  drawerLocation?: 'left' | 'right'
  drawerTemporary?: boolean

  // Card (sidebar)
  elevation?: number | string
  rounded?: string | boolean

  // Header
  title?: string
  titleIcon?: IconType
  showTitle?: boolean

  // Actions
  showActions?: boolean
  applyLabel?: string
  resetLabel?: string
  applyColor?: ColorType
  applyVariant?: VariantType
  resetColor?: ColorType
  resetVariant?: VariantType

  // Behavior
  immediate?: boolean
  collapsible?: boolean

  // Style
  cardClass?: string
  titleClass?: string
  filterLabelClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({}),
  layout: 'sidebar',
  drawerWidth: 300,
  drawerLocation: 'left',
  drawerTemporary: false,
  elevation: 1,
  title: 'Filters',
  showTitle: true,
  showActions: true,
  applyLabel: 'Apply',
  resetLabel: 'Reset',
  applyColor: Colors.Primary,
  applyVariant: Variants.Flat,
  resetColor: Colors.Primary,
  resetVariant: Variants.Text,
  immediate: false,
  collapsible: false,
  titleClass: 'text-subtitle-1 font-weight-bold',
  filterLabelClass: 'text-caption font-weight-medium text-medium-emphasis text-uppercase mb-2',
})

const emit = defineEmits<{
  'update:modelValue': [FilterValues]
  'update:modelDrawer': [boolean]
  apply: [FilterValues]
  reset: []
}>()

const draft = ref<FilterValues>({ ...props.modelValue })

watch(() => props.modelValue, val => { draft.value = { ...val } }, { deep: true })

function set(key: string, value: any) {
  draft.value = { ...draft.value, [key]: value }
  if (props.immediate) emit('update:modelValue', { ...draft.value })
}

function apply() {
  emit('update:modelValue', { ...draft.value })
  emit('apply', { ...draft.value })
}

function reset() {
  draft.value = {}
  emit('update:modelValue', {})
  emit('reset')
}

const hasChanges = computed(() =>
  JSON.stringify(draft.value) !== JSON.stringify(props.modelValue)
)

const activeCount = computed(() =>
  Object.values(draft.value).filter(v =>
    v !== undefined && v !== null && v !== '' &&
    !(Array.isArray(v) && v.length === 0)
  ).length
)
</script>

<template>
  <!-- ── DRAWER ──────────────────────────────────────────────────── -->
  <VNavigationDrawer
    v-if="layout === 'drawer'"
    :model-value="modelDrawer"
    :width="drawerWidth"
    :location="drawerLocation"
    :temporary="drawerTemporary"
    @update:model-value="$emit('update:modelDrawer', $event)"
  >
    <!-- Header -->
    <slot name="header">
      <VToolbar v-if="showTitle" flat density="compact">
        <VIcon v-if="titleIcon" class="ml-2 mr-1" size="20">{{ titleIcon }}</VIcon>
        <VToolbarTitle :class="titleClass">
          {{ title }}
          <VChip v-if="activeCount > 0" size="x-small" color="primary" class="ml-2">{{ activeCount }}</VChip>
        </VToolbarTitle>
        <VBtn icon density="compact" variant="text" @click="$emit('update:modelDrawer', false)">
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </VToolbar>
      <VDivider />
    </slot>

    <!-- Filter fields -->
    <div class="pa-4">
      <slot name="prepend" />

      <VExpansionPanels v-if="collapsible" multiple flat>
        <VExpansionPanel v-for="field in filters" :key="field.key" :value="field.key">
          <VExpansionPanelTitle density="compact" class="text-subtitle-2 px-0">
            <VIcon v-if="field.icon" size="16" class="mr-2">{{ field.icon }}</VIcon>
            {{ field.label }}
          </VExpansionPanelTitle>
          <VExpansionPanelText class="px-0">
            <slot :name="`filter-${field.key}`" :field="field" :value="draft[field.key]" :set="(v: any) => set(field.key, v)">
              <ProductFilterField :field="field" :value="draft[field.key]" @update="set(field.key, $event)" />
            </slot>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>

      <template v-else>
        <template v-for="(field, i) in filters" :key="field.key">
          <div class="filter-section">
            <p :class="filterLabelClass">
              <VIcon v-if="field.icon" size="14" class="mr-1">{{ field.icon }}</VIcon>
              {{ field.label }}
            </p>
            <slot :name="`filter-${field.key}`" :field="field" :value="draft[field.key]" :set="(v: any) => set(field.key, v)">
              <ProductFilterField :field="field" :value="draft[field.key]" @update="set(field.key, $event)" />
            </slot>
          </div>
          <VDivider v-if="i < filters.length - 1" class="my-4" />
        </template>
      </template>

      <slot name="append" />
    </div>

    <!-- Actions (sticky bottom) -->
    <template #append>
      <template v-if="showActions && !immediate">
        <VDivider />
        <div class="pa-3">
          <slot name="actions" :apply="apply" :reset="reset" :has-changes="hasChanges">
            <div class="d-flex ga-2">
              <VBtn :color="resetColor" :variant="resetVariant" @click="reset" class="flex-1-1">
                {{ resetLabel }}
              </VBtn>
              <VBtn :color="applyColor" :variant="applyVariant" :disabled="!hasChanges" @click="apply" class="flex-1-1">
                {{ applyLabel }}
              </VBtn>
            </div>
          </slot>
        </div>
      </template>
    </template>
  </VNavigationDrawer>

  <!-- ── SIDEBAR ─────────────────────────────────────────────────── -->
  <VCard
    v-else-if="layout === 'sidebar'"
    :class="['product-filter', cardClass]"
    :elevation="elevation"
    :rounded="rounded"
  >
    <!-- Header -->
    <slot name="header">
      <VCardItem v-if="showTitle" class="pb-2">
        <template v-if="titleIcon" #prepend>
          <VIcon>{{ titleIcon }}</VIcon>
        </template>
        <VCardTitle :class="titleClass">{{ title }}</VCardTitle>
        <template #append>
          <VBtn
            v-if="activeCount > 0"
            variant="text"
            size="small"
            :color="resetColor"
            @click="reset"
          >
            {{ resetLabel }} ({{ activeCount }})
          </VBtn>
        </template>
      </VCardItem>
      <VDivider v-if="showTitle" />
    </slot>

    <VCardText>
      <slot name="prepend" />

      <VExpansionPanels v-if="collapsible" multiple flat>
        <VExpansionPanel v-for="field in filters" :key="field.key" :value="field.key">
          <VExpansionPanelTitle density="compact" class="text-subtitle-2 px-0">
            <VIcon v-if="field.icon" size="16" class="mr-2">{{ field.icon }}</VIcon>
            {{ field.label }}
          </VExpansionPanelTitle>
          <VExpansionPanelText class="px-0">
            <slot :name="`filter-${field.key}`" :field="field" :value="draft[field.key]" :set="(v: any) => set(field.key, v)">
              <ProductFilterField :field="field" :value="draft[field.key]" @update="set(field.key, $event)" />
            </slot>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>

      <template v-else>
        <template v-for="(field, i) in filters" :key="field.key">
          <div class="filter-section">
            <p :class="filterLabelClass">
              <VIcon v-if="field.icon" size="14" class="mr-1">{{ field.icon }}</VIcon>
              {{ field.label }}
            </p>
            <slot :name="`filter-${field.key}`" :field="field" :value="draft[field.key]" :set="(v: any) => set(field.key, v)">
              <ProductFilterField :field="field" :value="draft[field.key]" @update="set(field.key, $event)" />
            </slot>
          </div>
          <VDivider v-if="i < filters.length - 1" class="my-4" />
        </template>
      </template>

      <slot name="append" />
    </VCardText>

    <template v-if="showActions && !immediate">
      <VDivider />
      <VCardActions>
        <slot name="actions" :apply="apply" :reset="reset" :has-changes="hasChanges">
          <VBtn :color="resetColor" :variant="resetVariant" @click="reset">{{ resetLabel }}</VBtn>
          <VSpacer />
          <VBtn :color="applyColor" :variant="applyVariant" :disabled="!hasChanges" @click="apply">
            {{ applyLabel }}
          </VBtn>
        </slot>
      </VCardActions>
    </template>
  </VCard>

  <!-- ── INLINE ──────────────────────────────────────────────────── -->
  <div v-else class="product-filter-inline">
    <VRow align="center" dense>
      <slot name="header" />

      <template v-for="field in filters" :key="field.key">
        <slot :name="`filter-${field.key}`" :field="field" :value="draft[field.key]" :set="(v: any) => set(field.key, v)">

          <!-- Search & Select: render directly -->
          <VCol v-if="field.type === 'search'" cols="auto">
            <VTextField
              :model-value="draft[field.key] ?? ''"
              density="compact"
              variant="outlined"
              hide-details
              clearable
              prepend-inner-icon="mdi-magnify"
              :placeholder="field.label"
              :color="field.color"
              style="min-width: 200px"
              @update:model-value="set(field.key, $event)"
            />
          </VCol>

          <VCol v-else-if="field.type === 'select'" cols="auto">
            <VSelect
              :model-value="draft[field.key]"
              :items="field.options ?? []"
              item-title="label"
              item-value="value"
              :multiple="field.multiple"
              density="compact"
              variant="outlined"
              hide-details
              clearable
              :color="field.color"
              :label="field.label"
              style="min-width: 150px"
              @update:model-value="set(field.key, $event)"
            />
          </VCol>

          <VCol v-else-if="field.type === 'checkbox'" cols="auto">
            <VChipGroup
              :model-value="draft[field.key] ?? []"
              multiple
              :color="field.color ?? Colors.Primary"
              @update:model-value="set(field.key, $event)"
            >
              <VChip v-for="opt in field.options" :key="opt.value" :value="opt.value" filter size="small">
                {{ opt.label }}
              </VChip>
            </VChipGroup>
          </VCol>

          <VCol v-else-if="field.type === 'toggle'" cols="auto">
            <VSwitch
              :model-value="draft[field.key] ?? false"
              :color="field.color ?? Colors.Primary"
              :label="field.label"
              density="compact"
              hide-details
              @update:model-value="set(field.key, $event)"
            />
          </VCol>

          <!-- Range & Rating: open in a menu popover -->
          <VCol v-else-if="field.type === 'range' || field.type === 'rating'" cols="auto">
            <VMenu :close-on-content-click="false">
              <template #activator="{ props: menuProps }">
                <VBtn v-bind="menuProps" variant="outlined" density="compact" size="small">
                  <VIcon v-if="field.icon" start size="16">{{ field.icon }}</VIcon>
                  {{ field.label }}
                  <VBadge v-if="draft[field.key] != null" color="primary" dot floating />
                  <VIcon end>mdi-chevron-down</VIcon>
                </VBtn>
              </template>
              <VCard min-width="260" class="pa-4">
                <p :class="filterLabelClass">{{ field.label }}</p>
                <ProductFilterField :field="field" :value="draft[field.key]" @update="set(field.key, $event)" />
              </VCard>
            </VMenu>
          </VCol>

        </slot>
      </template>

      <!-- Reset -->
      <VCol v-if="activeCount > 0" cols="auto">
        <VBtn :color="resetColor" variant="text" size="small" @click="reset">
          <VIcon start>mdi-filter-remove-outline</VIcon>
          {{ resetLabel }}
        </VBtn>
      </VCol>

      <!-- Apply (non-immediate) -->
      <VCol v-if="showActions && !immediate" cols="auto">
        <VBtn :color="applyColor" :variant="applyVariant" size="small" :disabled="!hasChanges" @click="apply">
          {{ applyLabel }}
        </VBtn>
      </VCol>

      <slot name="append" />
    </VRow>
  </div>
</template>

<style scoped>
.product-filter {
  height: 100%;
}
</style>
