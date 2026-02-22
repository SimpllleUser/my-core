// src/modules/ui-builder/widgets/sidebar-tree/ui/SidebarTreeNode.vue

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { UiNode, ComponentType } from '../../../entities/ui-node/model/types'
import { useUiTreeStore } from '../../../entities/ui-node/model/store'
import { getComponentSlots } from '../../../entities/ui-node/model/componentRegistry'
import { Icons } from '@/shared'

const props = defineProps<{
  node: UiNode
  depth?: number
}>()

const store = useUiTreeStore()
const { selectedNodeId } = storeToRefs(store)
const { selectNode, createNode, appendChild, appendToSlot } = store

const availableComponents: { type: ComponentType; label: string }[] = [
  { type: 'VBtn', label: 'Button' },
  { type: 'VTextField', label: 'Input Field' },
  { type: 'VCard', label: 'Card' },
  { type: 'VCardTitle', label: 'Card Title' },
  { type: 'VCardText', label: 'Card Text' },
  { type: 'VList', label: 'List' },
  { type: 'VListItem', label: 'List Item' },
  { type: 'VRow', label: 'Row' },
  { type: 'VCol', label: 'Col' },
]

const componentSlots = computed(() => getComponentSlots(props.node.type))
const hasDefaultSlot = computed(() => componentSlots.value.some(s => s.name === 'default'))
const namedSlots = computed(() => componentSlots.value.filter(s => s.name !== 'default'))
const hasExpandable = computed(() =>
  props.node.children.length > 0 || namedSlots.value.length > 0,
)

const isExpanded = ref(true)
const collapsedSlots = ref<Set<string>>(new Set())

const isSlotExpanded = (name: string) => !collapsedSlots.value.has(name)
const toggleSlot = (name: string) => {
  if (collapsedSlots.value.has(name)) collapsedSlots.value.delete(name)
  else collapsedSlots.value.add(name)
}

const slotChildren = (name: string) => props.node.slots?.[name] ?? []

const indent = computed(() => `${(props.depth ?? 0) * 14 + 4}px`)
const slotIndent = computed(() => `${(props.depth ?? 0) * 14 + 22}px`)
const slotEmptyIndent = computed(() => `${(props.depth ?? 0) * 14 + 38}px`)

const getIcon = (type: string) => {
  const map: Record<string, string> = {
    VCard: 'mdi-card-outline',
    VCol: 'mdi-view-column-outline',
    VRow: 'mdi-view-sequential-outline',
    VBtn: 'mdi-rectangle-outline',
    VTextField: 'mdi-form-textbox',
    VList: 'mdi-format-list-bulleted',
    VListItem: 'mdi-order-bool-ascending-variant',
    VCardTitle: 'mdi-format-header-1',
    VCardText: 'mdi-text-box-outline',
    'root-canvas': 'mdi-view-dashboard-outline',
  }
  return map[type] ?? 'mdi-cube-outline'
}

const onAdd = (type: ComponentType, label: string) => {
  const node = createNode(type, label)
  appendChild(props.node.id, node)
  selectNode(node.id)
}

const onAddToSlot = (slotName: string, type: ComponentType, label: string) => {
  const node = createNode(type, label)
  appendToSlot(props.node.id, slotName, node)
  selectNode(node.id)
}
</script>

<template>
  <div class="tree-node">
    <!-- ── Node row ────────────────────────────────────────── -->
    <div
      class="node-row"
      :class="{ 'node-row--selected': selectedNodeId === node.id }"
      :style="{ paddingLeft: indent }"
      @click.stop="selectNode(node.id)"
    >
      <button
        v-if="hasExpandable"
        class="tree-btn expand-btn"
        @click.stop="isExpanded = !isExpanded"
      >
        <VIcon :icon="isExpanded ? Icons.ChevronDown : Icons.ChevronRight" size="13" />
      </button>
      <span v-else class="expand-placeholder" />

      <VIcon :icon="getIcon(node.type)" size="15" class="node-type-icon" />
      <span class="node-label">{{ node.name }}</span>

      <span class="node-actions" @click.stop>
        <VMenu v-if="hasDefaultSlot" location="bottom end">
          <template #activator="{ props: mp }">
            <button v-bind="mp" class="tree-btn action-btn">
              <VIcon :icon="Icons.Plus" size="13" />
            </button>
          </template>
          <VList density="compact" min-width="160">
            <VListItem
              v-for="comp in availableComponents"
              :key="comp.type"
              :title="comp.label"
              density="compact"
              class="text-caption"
              @click="onAdd(comp.type, comp.label)"
            />
          </VList>
        </VMenu>
      </span>
    </div>

    <!-- ── Children (Vuetify expand transition) ───────────── -->
    <VExpandTransition>
      <div v-if="isExpanded">

        <!-- Named slot sections -->
        <template v-for="slot in namedSlots" :key="slot.name">
          <!-- Slot header -->
          <div class="slot-row" :style="{ paddingLeft: slotIndent }">
            <!-- Chevron only when slot has children -->
            <button
              v-if="slotChildren(slot.name).length > 0"
              class="tree-btn expand-btn"
              @click.stop="toggleSlot(slot.name)"
            >
              <VIcon
                :icon="isSlotExpanded(slot.name) ? Icons.ChevronDown : Icons.ChevronRight"
                size="11"
              />
            </button>
            <span v-else class="expand-placeholder" />

            <VIcon icon="mdi-code-braces" size="13" class="mr-1 text-medium-emphasis" />
            <span class="slot-label">#{{ slot.name }}</span>

            <VChip
              v-if="slotChildren(slot.name).length > 0"
              size="x-small"
              density="compact"
              class="slot-count px-1 mr-1"
            >
              {{ slotChildren(slot.name).length }}
            </VChip>

            <span class="node-actions" @click.stop>
              <VMenu location="bottom end">
                <template #activator="{ props: mp }">
                  <button v-bind="mp" class="tree-btn action-btn">
                    <VIcon :icon="Icons.Plus" size="13" />
                  </button>
                </template>
                <VList density="compact" min-width="160">
                  <VListItem
                    v-for="comp in availableComponents"
                    :key="comp.type"
                    :title="comp.label"
                    density="compact"
                    class="text-caption"
                    @click="onAddToSlot(slot.name, comp.type, comp.label)"
                  />
                </VList>
              </VMenu>
            </span>
          </div>

          <!-- Slot children — expand transition, only when non-empty -->
          <VExpandTransition>
            <div v-if="slotChildren(slot.name).length > 0 && isSlotExpanded(slot.name)">
              <SidebarTreeNode
                v-for="child in slotChildren(slot.name)"
                :key="child.id"
                :node="child"
                :depth="(depth ?? 0) + 2"
              />
            </div>
          </VExpandTransition>

          <!-- Empty label (no toggle needed) -->
          <div
            v-if="slotChildren(slot.name).length === 0"
            class="slot-empty"
            :style="{ paddingLeft: slotEmptyIndent }"
          >
            empty
          </div>
        </template>

        <!-- Default slot children -->
        <SidebarTreeNode
          v-for="child in node.children"
          :key="child.id"
          :node="child"
          :depth="(depth ?? 0) + 1"
        />

      </div>
    </VExpandTransition>
  </div>
</template>

<style scoped>
.tree-node {
  display: flex;
  flex-direction: column;
  user-select: none;
}

.node-row,
.slot-row {
  display: flex;
  align-items: center;
  gap: 2px;
  border-radius: 4px;
  cursor: pointer;
  min-height: 22px;
  padding-right: 4px;
}

.node-row:hover,
.slot-row:hover {
  background: rgba(var(--v-theme-on-surface), 0.06);
}

.node-row:hover .node-actions,
.slot-row:hover .node-actions {
  opacity: 1;
}

.node-row--selected {
  background: rgba(var(--v-theme-primary), 0.1);
}
.node-row--selected .node-label {
  color: rgb(var(--v-theme-primary));
  font-weight: 600;
}

.expand-btn,
.expand-placeholder {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}

.tree-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  border-radius: 3px;
  color: rgba(var(--v-theme-on-surface), 0.55);
  line-height: 1;
}
.tree-btn:hover {
  background: rgba(var(--v-theme-on-surface), 0.1);
  color: rgb(var(--v-theme-on-surface));
}

.action-btn {
  width: 16px;
  height: 16px;
}

.node-type-icon {
  flex-shrink: 0;
  opacity: 0.65;
}

.node-label {
  flex: 1;
  min-width: 0;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.node-actions {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.1s;
}

.slot-label {
  flex: 1;
  font-size: 11px;
  font-style: italic;
  opacity: 0.65;
}

.slot-count {
  font-size: 10px !important;
  height: 16px !important;
  opacity: 0.5;
}

.slot-empty {
  font-size: 10px;
  color: rgba(var(--v-theme-on-surface), 0.3);
  min-height: 18px;
  display: flex;
  align-items: center;
  font-style: italic;
}
</style>
