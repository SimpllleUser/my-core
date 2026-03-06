<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { MatrixRow, MatrixColumn, MatrixGroup, MatrixValue, MatrixMode } from './types'

interface Props {
  rows: MatrixRow[]
  columns: MatrixColumn[]
  modelValue?: MatrixValue

  // Grouping
  columnGroups?: MatrixGroup[]
  rowGroups?: MatrixGroup[]

  // Behavior
  immediate?: boolean   // emit on every toggle vs. only on save

  // Cell appearance
  checkedIcon?: string
  uncheckedIcon?: string
  checkedColor?: string
  uncheckedColor?: string

  // Table
  rowHeaderLabel?: string
  showRowActions?: boolean
  showColumnActions?: boolean

  // Card
  elevation?: string | number
  rounded?: string | boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({}),
  immediate: true,
  checkedIcon: 'mdi-check-circle',
  uncheckedIcon: 'mdi-circle-outline',
  checkedColor: 'success',
  uncheckedColor: 'grey-lighten-2',
  rowHeaderLabel: '',
  showRowActions: true,
  showColumnActions: true,
  elevation: 1,
})

const emit = defineEmits<{
  'update:modelValue': [MatrixValue]
  'update:mode': [MatrixMode]
  change: [{ row: string; column: string; value: boolean }]
  save: [MatrixValue]
  discard: []
}>()

// ─── Internal state ──────────────────────────────────────────────────────────

const mode = ref<MatrixMode>('view')
const compareA = ref(props.rows[0]?.key ?? '')
const compareB = ref(props.rows[1]?.key ?? '')
const search = ref('')

// Draft for non-immediate mode
const draft = ref<MatrixValue>(JSON.parse(JSON.stringify(props.modelValue)))

watch(() => props.modelValue, val => {
  if (props.immediate) draft.value = JSON.parse(JSON.stringify(val))
}, { deep: true })

// ─── Computed ────────────────────────────────────────────────────────────────

const filteredRows = computed(() => {
  if (!search.value) return props.rows
  const q = search.value.toLowerCase()
  return props.rows.filter(r => r.label.toLowerCase().includes(q))
})

const rowsByGroup = computed(() => {
  if (!props.rowGroups?.length) return null
  const map = new Map<string, MatrixRow[]>()
  for (const g of props.rowGroups) map.set(g.key, [])
  const ungrouped: MatrixRow[] = []
  for (const row of filteredRows.value) {
    if (row.group && map.has(row.group)) map.get(row.group)!.push(row)
    else ungrouped.push(row)
  }
  return { map, ungrouped }
})

const columnGroupHeaders = computed(() => {
  if (!props.columnGroups?.length) return []
  return props.columnGroups
    .map(g => ({ ...g, span: props.columns.filter(c => c.group === g.key).length }))
    .filter(g => g.span > 0)
})

const hasColumnGroups = computed(() => columnGroupHeaders.value.length > 0)

const hasChanges = computed(() =>
  JSON.stringify(draft.value) !== JSON.stringify(props.modelValue)
)

// ─── Value helpers ───────────────────────────────────────────────────────────

function get(rowKey: string, colKey: string): boolean {
  return draft.value?.[rowKey]?.[colKey] ?? false
}

function set(rowKey: string, colKey: string, value: boolean) {
  const next = JSON.parse(JSON.stringify(draft.value)) as MatrixValue
  if (!next[rowKey]) next[rowKey] = {}
  next[rowKey][colKey] = value
  draft.value = next

  if (props.immediate) {
    emit('update:modelValue', next)
    emit('change', { row: rowKey, column: colKey, value })
  }
}

function toggle(rowKey: string, colKey: string) {
  if (mode.value !== 'edit') return
  set(rowKey, colKey, !get(rowKey, colKey))
}

function setRowAll(rowKey: string, value: boolean) {
  const next = JSON.parse(JSON.stringify(draft.value)) as MatrixValue
  next[rowKey] = {}
  for (const col of props.columns) next[rowKey][col.key] = value
  draft.value = next
  if (props.immediate) emit('update:modelValue', next)
}

function setColumnAll(colKey: string, value: boolean) {
  const next = JSON.parse(JSON.stringify(draft.value)) as MatrixValue
  for (const row of props.rows) {
    if (!next[row.key]) next[row.key] = {}
    next[row.key][colKey] = value
  }
  draft.value = next
  if (props.immediate) emit('update:modelValue', next)
}

function save() {
  emit('update:modelValue', draft.value)
  emit('save', draft.value)
}

function discard() {
  draft.value = JSON.parse(JSON.stringify(props.modelValue))
  emit('discard')
}

// ─── Compare helpers ─────────────────────────────────────────────────────────

function isDiffCell(rowKey: string, colKey: string): boolean {
  if (mode.value !== 'compare') return false
  if (rowKey !== compareA.value && rowKey !== compareB.value) return false
  const other = rowKey === compareA.value ? compareB.value : compareA.value
  return get(rowKey, colKey) !== get(other, colKey)
}

function isCompareRow(rowKey: string): boolean {
  return mode.value === 'compare' && (rowKey === compareA.value || rowKey === compareB.value)
}

// ─── Stats ───────────────────────────────────────────────────────────────────

function rowGranted(rowKey: string): number {
  return props.columns.filter(c => get(rowKey, c.key)).length
}
</script>

<template>
  <VCard :elevation="elevation" :rounded="rounded" class="permissions-matrix overflow-hidden">

    <!-- ── Toolbar ──────────────────────────────────────────────── -->
    <slot name="toolbar" :mode="mode" :set-mode="(m: MatrixMode) => { mode = m; emit('update:mode', m) }">
      <div class="d-flex align-center gap-3 pa-3 flex-wrap">
        <slot name="toolbar-prepend" />

        <VTextField
          v-model="search"
          density="compact"
          variant="outlined"
          hide-details
          placeholder="Search..."
          prepend-inner-icon="mdi-magnify"
          clearable
          style="max-width: 220px"
        />

        <VSpacer />

        <slot name="toolbar-append" :mode="mode" :has-changes="hasChanges">
          <VBtnToggle
            :model-value="mode"
            mandatory
            density="compact"
            variant="outlined"
            rounded="lg"
            @update:model-value="v => { mode = v as MatrixMode; emit('update:mode', v as MatrixMode) }"
          >
            <VBtn value="view" size="small">
              <VIcon start size="16">mdi-eye</VIcon>View
            </VBtn>
            <VBtn value="edit" size="small">
              <VIcon start size="16">mdi-pencil</VIcon>Edit
            </VBtn>
            <VBtn value="compare" size="small">
              <VIcon start size="16">mdi-swap-horizontal</VIcon>Compare
            </VBtn>
          </VBtnToggle>

          <template v-if="mode === 'edit' && !immediate && hasChanges">
            <VBtn variant="text" size="small" @click="discard">Discard</VBtn>
            <VBtn color="primary" size="small" variant="flat" @click="save">Save</VBtn>
          </template>
        </slot>
      </div>
    </slot>

    <!-- ── Compare bar ─────────────────────────────────────────── -->
    <template v-if="mode === 'compare'">
      <VDivider />
      <slot name="compare-bar" :compare-a="compareA" :compare-b="compareB" :rows="rows">
        <div class="d-flex align-center gap-3 pa-3 flex-wrap bg-surface-variant">
          <span class="text-caption text-medium-emphasis font-weight-medium">COMPARING</span>

          <VSelect
            v-model="compareA"
            :items="rows"
            item-title="label"
            item-value="key"
            density="compact"
            variant="outlined"
            hide-details
            style="max-width: 180px"
          />

          <VIcon size="18" color="medium-emphasis">mdi-swap-horizontal</VIcon>

          <VSelect
            v-model="compareB"
            :items="rows"
            item-title="label"
            item-value="key"
            density="compact"
            variant="outlined"
            hide-details
            style="max-width: 180px"
          />

          <div class="d-flex gap-3 ml-auto text-caption flex-wrap">
            <span class="d-flex align-center gap-1">
              <VIcon color="success" size="14">mdi-circle</VIcon> Both
            </span>
            <span class="d-flex align-center gap-1">
              <VIcon color="warning" size="14">mdi-circle</VIcon> Only A
            </span>
            <span class="d-flex align-center gap-1">
              <VIcon color="info" size="14">mdi-circle</VIcon> Only B
            </span>
          </div>
        </div>
      </slot>
    </template>

    <VDivider />

    <!-- ── Table ───────────────────────────────────────────────── -->
    <div class="matrix-scroll">
      <table class="matrix-table">
        <thead>
          <!-- Column group headers -->
          <tr v-if="hasColumnGroups" class="group-header-row">
            <th class="row-th sticky-col">
              <slot name="row-header-label">{{ rowHeaderLabel }}</slot>
            </th>
            <th
              v-for="group in columnGroupHeaders"
              :key="group.key"
              :colspan="group.span"
              class="group-th text-center"
            >
              <slot name="column-group-header" :group="group">
                <VChip :color="group.color" size="x-small" variant="tonal" class="font-weight-bold">
                  <VIcon v-if="group.icon" start size="12">{{ group.icon }}</VIcon>
                  {{ group.label }}
                </VChip>
              </slot>
            </th>
          </tr>

          <!-- Column headers -->
          <tr class="col-header-row">
            <th class="row-th sticky-col">
              <slot name="row-header-label">{{ rowHeaderLabel }}</slot>
            </th>
            <th
              v-for="col in columns"
              :key="col.key"
              class="col-th text-center"
            >
              <slot name="column-header" :column="col" :mode="mode" :set-all="(v: boolean) => setColumnAll(col.key, v)">
                <div class="col-header-content">
                  <VTooltip v-if="showColumnActions && mode === 'edit'" :text="col.label" location="top">
                    <template #activator="{ props: tp }">
                      <VMenu :close-on-content-click="true" location="bottom">
                        <template #activator="{ props: mp }">
                          <div v-bind="{ ...tp, ...mp }" class="col-label" style="cursor: pointer">
                            <VIcon v-if="col.icon" :color="col.color" size="14">{{ col.icon }}</VIcon>
                            <span>{{ col.shortLabel ?? col.label }}</span>
                          </div>
                        </template>
                        <VList density="compact" min-width="150">
                          <VListItem prepend-icon="mdi-check-all" title="Grant all" @click="setColumnAll(col.key, true)" />
                          <VListItem prepend-icon="mdi-close-circle-outline" title="Revoke all" @click="setColumnAll(col.key, false)" />
                        </VList>
                      </VMenu>
                    </template>
                  </VTooltip>
                  <div v-else class="col-label">
                    <VIcon v-if="col.icon" :color="col.color" size="14">{{ col.icon }}</VIcon>
                    <span>{{ col.shortLabel ?? col.label }}</span>
                  </div>
                </div>
              </slot>
            </th>
          </tr>
        </thead>

        <tbody>
          <!-- With row groups -->
          <template v-if="rowsByGroup">
            <template v-for="group in rowGroups" :key="group.key">
              <tr v-if="rowsByGroup.map.get(group.key)?.length" class="row-group-row">
                <td :colspan="columns.length + 1">
                  <slot name="row-group-header" :group="group">
                    <VChip :color="group.color" size="x-small" variant="tonal">
                      <VIcon v-if="group.icon" start size="12">{{ group.icon }}</VIcon>
                      {{ group.label }}
                    </VChip>
                  </slot>
                </td>
              </tr>
              <tr
                v-for="row in rowsByGroup.map.get(group.key)"
                :key="row.key"
                class="data-row"
                :class="{
                  'compare-selected': isCompareRow(row.key),
                  'compare-dimmed': mode === 'compare' && !isCompareRow(row.key),
                }"
              >
                <td class="row-td sticky-col">
                  <slot name="row-label" :row="row" :mode="mode" :granted="rowGranted(row.key)" :total="columns.length">
                    <div class="row-label-content">
                      <VAvatar v-if="row.icon || row.color" :color="row.color" size="24" class="flex-shrink-0">
                        <VIcon v-if="row.icon" size="14">{{ row.icon }}</VIcon>
                      </VAvatar>
                      <div class="flex-1-1 min-width-0">
                        <div class="text-body-2 font-weight-medium text-truncate">{{ row.label }}</div>
                        <div v-if="row.subtitle" class="text-caption text-medium-emphasis text-truncate">{{ row.subtitle }}</div>
                      </div>
                      <span class="text-caption text-medium-emphasis ml-auto flex-shrink-0">
                        {{ rowGranted(row.key) }}/{{ columns.length }}
                      </span>
                      <VMenu v-if="showRowActions && mode === 'edit'" :close-on-content-click="true" location="bottom end">
                        <template #activator="{ props: mp }">
                          <VBtn v-bind="mp" icon="mdi-dots-vertical" density="compact" variant="text" size="x-small" class="row-action-btn" />
                        </template>
                        <VList density="compact" min-width="170">
                          <VListItem prepend-icon="mdi-check-all" title="Grant all" @click="setRowAll(row.key, true)" />
                          <VListItem prepend-icon="mdi-close-circle-outline" title="Revoke all" @click="setRowAll(row.key, false)" />
                        </VList>
                      </VMenu>
                    </div>
                  </slot>
                </td>
                <td
                  v-for="col in columns"
                  :key="col.key"
                  class="cell-td"
                  :class="{
                    'cell-diff': isDiffCell(row.key, col.key),
                    'cell-diff-a': isDiffCell(row.key, col.key) && row.key === compareA,
                    'cell-diff-b': isDiffCell(row.key, col.key) && row.key === compareB,
                    'cell-editable': mode === 'edit',
                  }"
                  @click="toggle(row.key, col.key)"
                >
                  <slot name="cell" :row="row" :column="col" :value="get(row.key, col.key)" :toggle="() => toggle(row.key, col.key)">
                    <VIcon
                      :color="get(row.key, col.key) ? (col.color ?? checkedColor) : uncheckedColor"
                      size="18"
                    >
                      {{ get(row.key, col.key) ? checkedIcon : uncheckedIcon }}
                    </VIcon>
                  </slot>
                </td>
              </tr>
            </template>

            <!-- Ungrouped rows -->
            <tr
              v-for="row in rowsByGroup.ungrouped"
              :key="row.key"
              class="data-row"
              :class="{
                'compare-selected': isCompareRow(row.key),
                'compare-dimmed': mode === 'compare' && !isCompareRow(row.key),
              }"
            >
              <td class="row-td sticky-col">
                <slot name="row-label" :row="row" :mode="mode" :granted="rowGranted(row.key)" :total="columns.length">
                  <div class="row-label-content">
                    <VAvatar v-if="row.icon || row.color" :color="row.color" size="24" class="flex-shrink-0">
                      <VIcon v-if="row.icon" size="14">{{ row.icon }}</VIcon>
                    </VAvatar>
                    <div class="flex-1-1 min-width-0">
                      <div class="text-body-2 font-weight-medium text-truncate">{{ row.label }}</div>
                      <div v-if="row.subtitle" class="text-caption text-medium-emphasis text-truncate">{{ row.subtitle }}</div>
                    </div>
                    <span class="text-caption text-medium-emphasis ml-auto flex-shrink-0">
                      {{ rowGranted(row.key) }}/{{ columns.length }}
                    </span>
                    <VMenu v-if="showRowActions && mode === 'edit'" :close-on-content-click="true" location="bottom end">
                      <template #activator="{ props: mp }">
                        <VBtn v-bind="mp" icon="mdi-dots-vertical" density="compact" variant="text" size="x-small" class="row-action-btn" />
                      </template>
                      <VList density="compact" min-width="170">
                        <VListItem prepend-icon="mdi-check-all" title="Grant all" @click="setRowAll(row.key, true)" />
                        <VListItem prepend-icon="mdi-close-circle-outline" title="Revoke all" @click="setRowAll(row.key, false)" />
                      </VList>
                    </VMenu>
                  </div>
                </slot>
              </td>
              <td
                v-for="col in columns"
                :key="col.key"
                class="cell-td"
                :class="{
                  'cell-diff': isDiffCell(row.key, col.key),
                  'cell-diff-a': isDiffCell(row.key, col.key) && row.key === compareA,
                  'cell-diff-b': isDiffCell(row.key, col.key) && row.key === compareB,
                  'cell-editable': mode === 'edit',
                }"
                @click="toggle(row.key, col.key)"
              >
                <slot name="cell" :row="row" :column="col" :value="get(row.key, col.key)" :toggle="() => toggle(row.key, col.key)">
                  <VIcon
                    :color="get(row.key, col.key) ? (col.color ?? checkedColor) : uncheckedColor"
                    size="18"
                  >
                    {{ get(row.key, col.key) ? checkedIcon : uncheckedIcon }}
                  </VIcon>
                </slot>
              </td>
            </tr>
          </template>

          <!-- Flat rows (no groups) -->
          <template v-else>
            <tr
              v-for="row in filteredRows"
              :key="row.key"
              class="data-row"
              :class="{
                'compare-selected': isCompareRow(row.key),
                'compare-dimmed': mode === 'compare' && !isCompareRow(row.key),
              }"
            >
              <td class="row-td sticky-col">
                <slot name="row-label" :row="row" :mode="mode" :granted="rowGranted(row.key)" :total="columns.length">
                  <div class="row-label-content">
                    <VAvatar v-if="row.icon || row.color" :color="row.color" size="24" class="flex-shrink-0">
                      <VIcon v-if="row.icon" size="14">{{ row.icon }}</VIcon>
                    </VAvatar>
                    <div class="flex-1-1 min-width-0">
                      <div class="text-body-2 font-weight-medium text-truncate">{{ row.label }}</div>
                      <div v-if="row.subtitle" class="text-caption text-medium-emphasis text-truncate">{{ row.subtitle }}</div>
                    </div>
                    <span class="text-caption text-medium-emphasis ml-auto flex-shrink-0">
                      {{ rowGranted(row.key) }}/{{ columns.length }}
                    </span>
                    <VMenu v-if="showRowActions && mode === 'edit'" :close-on-content-click="true" location="bottom end">
                      <template #activator="{ props: mp }">
                        <VBtn v-bind="mp" icon="mdi-dots-vertical" density="compact" variant="text" size="x-small" class="row-action-btn" />
                      </template>
                      <VList density="compact" min-width="170">
                        <VListItem prepend-icon="mdi-check-all" title="Grant all" @click="setRowAll(row.key, true)" />
                        <VListItem prepend-icon="mdi-close-circle-outline" title="Revoke all" @click="setRowAll(row.key, false)" />
                      </VList>
                    </VMenu>
                  </div>
                </slot>
              </td>
              <td
                v-for="col in columns"
                :key="col.key"
                class="cell-td"
                :class="{
                  'cell-diff': isDiffCell(row.key, col.key),
                  'cell-diff-a': isDiffCell(row.key, col.key) && row.key === compareA,
                  'cell-diff-b': isDiffCell(row.key, col.key) && row.key === compareB,
                  'cell-editable': mode === 'edit',
                }"
                @click="toggle(row.key, col.key)"
              >
                <slot name="cell" :row="row" :column="col" :value="get(row.key, col.key)" :toggle="() => toggle(row.key, col.key)">
                  <VIcon
                    :color="get(row.key, col.key) ? (col.color ?? checkedColor) : uncheckedColor"
                    size="18"
                  >
                    {{ get(row.key, col.key) ? checkedIcon : uncheckedIcon }}
                  </VIcon>
                </slot>
              </td>
            </tr>
          </template>

          <!-- Empty state -->
          <tr v-if="filteredRows.length === 0">
            <td :colspan="columns.length + 1" class="text-center pa-8 text-medium-emphasis">
              <VIcon size="36" class="mb-2 d-block mx-auto">mdi-table-search</VIcon>
              No rows match "{{ search }}"
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ── Footer slot ─────────────────────────────────────────── -->
    <slot name="footer" :mode="mode" :has-changes="hasChanges" :save="save" :discard="discard" />

  </VCard>
</template>

<style scoped>
.matrix-scroll {
  overflow-x: auto;
}

.matrix-table {
  border-collapse: collapse;
  width: 100%;
  min-width: max-content;
}

/* Sticky first column */
.sticky-col {
  position: sticky;
  left: 0;
  z-index: 2;
  background: rgb(var(--v-theme-surface));
  min-width: 200px;
}

/* Column group header row */
.group-header-row .group-th {
  padding: 6px 8px;
  border-bottom: 1px solid rgba(var(--v-border-color), 0.12);
  font-weight: 500;
  white-space: nowrap;
}

.group-header-row .row-th {
  padding: 6px 12px;
}

/* Column header row */
.col-header-row .col-th {
  padding: 8px 6px;
  border-bottom: 2px solid rgba(var(--v-border-color), 0.2);
  white-space: nowrap;
  min-width: 70px;
}

.col-header-row .row-th {
  padding: 8px 12px;
  border-bottom: 2px solid rgba(var(--v-border-color), 0.2);
  text-align: left;
}

.col-header-content {
  display: flex;
  justify-content: center;
}

.col-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  font-size: 11px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface-variant));
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Row group separator */
.row-group-row td {
  padding: 6px 12px;
  background: rgba(var(--v-theme-surface-variant), 0.5);
  border-top: 1px solid rgba(var(--v-border-color), 0.12);
}

/* Data rows */
.data-row {
  transition: background 0.1s;
}

.data-row:hover td {
  background: rgba(var(--v-theme-on-surface), 0.03);
}

.data-row:hover .sticky-col {
  background: color-mix(in srgb, rgb(var(--v-theme-surface)) 97%, rgb(var(--v-theme-on-surface)) 3%);
}

.data-row + .data-row td {
  border-top: 1px solid rgba(var(--v-border-color), 0.08);
}

/* Row label cell */
.row-td {
  padding: 8px 12px;
}

.row-label-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.row-action-btn {
  opacity: 0;
  transition: opacity 0.15s;
}

.data-row:hover .row-action-btn {
  opacity: 1;
}

/* Permission cell */
.cell-td {
  text-align: center;
  padding: 8px 6px;
  vertical-align: middle;
}

.cell-editable {
  cursor: pointer;
}

.cell-editable:hover {
  background: rgba(var(--v-theme-on-surface), 0.06) !important;
}

/* Compare mode */
.compare-selected td {
  background: rgba(var(--v-theme-primary), 0.04);
}

.compare-dimmed {
  opacity: 0.4;
}

.cell-diff-a {
  background: rgba(var(--v-theme-warning), 0.12) !important;
}

.cell-diff-b {
  background: rgba(var(--v-theme-info), 0.12) !important;
}
</style>
