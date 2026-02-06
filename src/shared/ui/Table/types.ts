import type { Component } from 'vue';

// Base types
export interface Header {
  key: string;
  title: string;
  align?: 'start' | 'center' | 'end';
  sortable?: boolean;
  width?: string | number;
  minWidth?: string;
  maxWidth?: string;
  fixed?: boolean;
  [key: string]: unknown;
}
export type SortOrder = 'asc' | 'desc';

// Filter types
export interface FilterOption {
  title: string;
  value: string | number | boolean;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date';
  options?: FilterOption[] | string[];
  placeholder?: string;
  clearable?: boolean;
  cols?: number | { xs?: number; sm?: number; md?: number; lg?: number };
}

export interface FilterState {
  [key: string]: string | number | boolean | null;
}

// Action types
export interface TableAction {
  icon: string;
  label?: string;
  color?: string;
  handler: (item: unknown) => void;
  show?: (item: unknown) => boolean;
}

export interface TableMenuItem {
  icon: string;
  label: string;
  color?: string;
  handler: (item: unknown) => void;
  show?: (item: unknown) => boolean;
  divider?: boolean;
}

// Column slot configuration
export interface ColumnSlotConfig {
  key: string;
  component?: Component;
  props?: Record<string, unknown>;
}

// Table Header Props
export interface TableHeaderProps {
  title?: string;
  showAddButton?: boolean;
  addButtonText?: string;
  addButtonIcon?: string;
}

// Table Filters Props
export interface TableFiltersProps {
  filters: FilterConfig[];
  modelValue: FilterState;
  showResetButton?: boolean;
  resetButtonText?: string;
}

// Table Body Props
export interface TableBodyProps {
  headers: Header[];
  items: unknown[];
  loading?: boolean;
  showSelect?: boolean;
  itemValue?: string;
  sortBy?: { key: string; order: SortOrder }[];
  search?: string;
  density?: 'default' | 'comfortable' | 'compact';
}

// Table Empty Props
export interface TableEmptyProps {
  icon?: string;
  title?: string;
  subtitle?: string;
  showResetButton?: boolean;
  resetButtonText?: string;
}

// Table Loading Props
export interface TableLoadingProps {
  rows?: number;
  type?: string;
}

// Pagination Props
export interface PaginationProps {
  modelValue: number;
  perPage: number;
  total: number;
  showInfo?: boolean;
  infoTemplate?: string;
}

// Main Table Props
export interface TableProps {
  // Data
  headers: Header[];
  items: unknown[];
  itemValue?: string;

  // Header
  title?: string;
  showAddButton?: boolean;
  addButtonText?: string;
  addButtonIcon?: string;

  // Filters
  filters?: FilterConfig[];
  filterValues?: FilterState;
  showFilters?: boolean;

  // Features
  loading?: boolean;
  showSelect?: boolean;
  search?: string;
  sortable?: boolean;

  // Pagination
  page?: number;
  perPage?: number;
  total?: number;
  showPagination?: boolean;

  // Empty state
  emptyIcon?: string;
  emptyTitle?: string;
  emptySubtitle?: string;

  // Actions
  actions?: TableAction[];
  menuItems?: TableMenuItem[];

  // Styling
  density?: 'default' | 'comfortable' | 'compact';
  elevation?: number | string;

  // Deprecated (for backward compatibility)
  data?: unknown[];
  getRowClass?: (item: unknown, index: number) => string;
}

// Emit types
export interface TableEmits {
  'update:page': [value: number];
  'update:perPage': [value: number];
  'update:filterValues': [value: FilterState];
  'update:search': [value: string];
  'update:selected': [value: unknown[]];
  'click:add': [];
  'click:row': [item: unknown];
  'click:action': [action: string, item: unknown];
  'reset:filters': [];
}

// Composable return types
export interface UseTableFiltersReturn {
  filterState: Ref<FilterState>;
  hasActiveFilters: ComputedRef<boolean>;
  filteredItems: ComputedRef<unknown[]>;
  updateFilter: (key: string, value: unknown) => void;
  resetFilters: () => void;
}

export interface UseTableSortReturn {
  sortKey: Ref<string>;
  sortOrder: Ref<SortOrder>;
  sortedItems: ComputedRef<unknown[]>;
  sortBy: (key: string) => void;
  getSortIcon: (key: string) => string;
}

export interface UseTablePaginationReturn {
  currentPage: Ref<number>;
  itemsPerPage: Ref<number>;
  totalPages: ComputedRef<number>;
  paginatedItems: ComputedRef<unknown[]>;
  paginationInfo: ComputedRef<string>;
}

// Type imports for composable return types
import type { Ref, ComputedRef } from 'vue';
