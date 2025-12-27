<script setup lang="ts">
import type { TableProps, FilterState, Header } from '../types';
import TableHeader from './TableHeader.vue';
import TableFilters from './TableFilters.vue';
import TableBody from './TableBody.vue';
import TableEmpty from './TableEmpty.vue';
import TableLoading from './TableLoading.vue';
import TablePagination from './TablePagination.vue';

const props = withDefaults(defineProps<TableProps>(), {
  itemValue: 'id',
  showAddButton: false,
  addButtonText: 'Add',
  addButtonIcon: 'mdi-plus',
  showFilters: true,
  loading: false,
  showSelect: false,
  sortable: true,
  showPagination: true,
  perPage: 10,
  emptyIcon: 'mdi-database-off',
  emptyTitle: 'No data available',
  density: 'default',
  elevation: 1,
});

const emit = defineEmits<{
  'update:page': [value: number];
  'update:perPage': [value: number];
  'update:filterValues': [value: FilterState];
  'update:search': [value: string];
  'update:selected': [value: unknown[]];
  'click:add': [];
  'click:row': [item: unknown];
  'click:action': [action: string, item: unknown];
  'reset:filters': [];
}>();

const slots = useSlots();

// Internal state
const internalPage = ref(props.page || 1);
const internalFilterValues = ref<FilterState>(props.filterValues || {});
const internalSearch = ref(props.search || '');

// Computed items (support backward compatibility with 'data' prop)
const computedItems = computed(() => props.items || props.data || []);

// Total items count
const totalItems = computed(() => props.total || computedItems.value.length);

// Show header if title or add button is present
const showHeader = computed(() => {
  return props.title || props.showAddButton || slots.title || slots.actions;
});

// Show filters if filters are configured
const showFiltersSection = computed(() => {
  return props.showFilters && props.filters && props.filters.length > 0;
});

// Prepare headers with sortable defaults based on sortable prop
const processedHeaders = computed<Header[]>(() => {
  return props.headers.map((header) => ({
    ...header,
    sortable: props.sortable ? (header.sortable !== false) : false,
  }));
});

// Handlers
const handleFilterUpdate = (value: FilterState) => {
  internalFilterValues.value = value;
  emit('update:filterValues', value);
};

const handleFilterReset = () => {
  internalFilterValues.value = {};
  internalSearch.value = '';
  emit('reset:filters');
};

const handlePageUpdate = (value: number) => {
  internalPage.value = value;
  emit('update:page', value);
};

// Watch for external prop changes
watch(() => props.page, (newVal) => {
  if (newVal !== undefined) internalPage.value = newVal;
});

watch(() => props.filterValues, (newVal) => {
  if (newVal) internalFilterValues.value = newVal;
}, { deep: true });

watch(() => props.search, (newVal) => {
  if (newVal !== undefined) internalSearch.value = newVal;
});
</script>

<template>
  <VCard :elevation="elevation">
    <!-- Header Section -->
    <TableHeader
      v-if="showHeader"
      :title="title"
      :show-add-button="showAddButton"
      :add-button-text="addButtonText"
      :add-button-icon="addButtonIcon"
      @click:add="emit('click:add')"
    >
      <template v-if="slots.title" #title>
        <slot name="title" />
      </template>
      <template v-if="slots.actions" #actions>
        <slot name="actions" />
      </template>
    </TableHeader>

    <!-- Filters Section -->
    <TableFilters
      v-if="showFiltersSection"
      :filters="filters!"
      :model-value="internalFilterValues"
      @update:model-value="handleFilterUpdate"
      @reset="handleFilterReset"
    >
      <template v-if="slots.filters" #filters>
        <slot name="filters" />
      </template>
    </TableFilters>

    <!-- Table Body -->
    <TableBody
      :headers="processedHeaders"
      :items="computedItems"
      :loading="loading"
      :show-select="showSelect"
      :item-value="itemValue"
      :search="internalSearch"
      :density="density"
      @click:row="emit('click:row', $event)"
      @update:selected="emit('update:selected', $event)"
    >
      <!-- Forward all item slots -->
      <template
        v-for="(_, name) in slots"
        :key="name"
        #[name]="slotProps"
      >
        <slot :name="name" v-bind="slotProps" />
      </template>

      <!-- Empty state -->
      <template #no-data>
        <slot name="empty">
          <TableEmpty
            :icon="emptyIcon"
            :title="emptyTitle"
            :subtitle="emptySubtitle"
            :show-reset-button="showFiltersSection && Object.keys(internalFilterValues).length > 0"
            @reset="handleFilterReset"
          />
        </slot>
      </template>

      <!-- Loading state -->
      <template #loading>
        <slot name="loading">
          <TableLoading :rows="5" />
        </slot>
      </template>
    </TableBody>

    <!-- Pagination Section -->
    <TablePagination
      v-if="showPagination"
      :model-value="internalPage"
      :per-page="perPage"
      :total="totalItems"
      :show-info="true"
      @update:model-value="handlePageUpdate"
      @update:per-page="emit('update:perPage', $event)"
    >
      <template v-if="slots.pagination" #default>
        <slot name="pagination" />
      </template>
    </TablePagination>
  </VCard>
</template>
