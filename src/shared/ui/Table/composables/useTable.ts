import { ref, computed, watch } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import type {
  FilterState,
  FilterConfig,
  SortOrder,
  UseTableFiltersReturn,
  UseTableSortReturn,
  UseTablePaginationReturn,
} from '../types';

// Filter composable
export function useTableFilters<T extends Record<string, unknown>>(
  items: Ref<T[]>,
  filters: Ref<FilterConfig[]>,
  initialState?: FilterState
): UseTableFiltersReturn {
  const filterState = ref<FilterState>(initialState || {});

  const hasActiveFilters = computed(() => {
    return Object.values(filterState.value).some(
      (value) => value !== null && value !== '' && value !== undefined
    );
  });

  const filteredItems = computed(() => {
    if (!hasActiveFilters.value) return items.value;

    return items.value.filter((item) => {
      return filters.value.every((filter) => {
        const filterValue = filterState.value[filter.key];
        if (filterValue === null || filterValue === '' || filterValue === undefined) {
          return true;
        }

        const itemValue = item[filter.key];

        if (filter.type === 'text') {
          return String(itemValue)
            .toLowerCase()
            .includes(String(filterValue).toLowerCase());
        }

        return itemValue === filterValue;
      });
    });
  }) as ComputedRef<unknown[]>;

  const updateFilter = (key: string, value: unknown) => {
    filterState.value[key] = value as string | number | boolean | null;
  };

  const resetFilters = () => {
    filterState.value = {};
  };

  return {
    filterState: filterState as Ref<FilterState>,
    hasActiveFilters,
    filteredItems,
    updateFilter,
    resetFilters,
  };
}

// Sort composable
export function useTableSort<T extends Record<string, unknown>>(
  items: Ref<T[]>,
  initialKey = '',
  initialOrder: SortOrder = 'asc'
): UseTableSortReturn {
  const sortKey = ref(initialKey);
  const sortOrder = ref<SortOrder>(initialOrder);

  const sortedItems = computed(() => {
    if (!sortKey.value) return items.value;

    return [...items.value].sort((a, b) => {
      const aVal = a[sortKey.value];
      const bVal = b[sortKey.value];

      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      let comparison = 0;

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal);
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else if (aVal instanceof Date && bVal instanceof Date) {
        comparison = aVal.getTime() - bVal.getTime();
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return sortOrder.value === 'asc' ? comparison : -comparison;
    });
  }) as ComputedRef<unknown[]>;

  const sortBy = (key: string) => {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey.value = key;
      sortOrder.value = 'asc';
    }
  };

  const getSortIcon = (key: string) => {
    if (sortKey.value !== key) return 'mdi-unfold-more-horizontal';
    return sortOrder.value === 'asc' ? 'mdi-chevron-up' : 'mdi-chevron-down';
  };

  return {
    sortKey: sortKey as Ref<string>,
    sortOrder: sortOrder as Ref<SortOrder>,
    sortedItems,
    sortBy,
    getSortIcon,
  };
}

// Pagination composable
export function useTablePagination<T>(
  items: Ref<T[]>,
  initialPage = 1,
  initialPerPage = 10
): UseTablePaginationReturn {
  const currentPage = ref(initialPage);
  const itemsPerPage = ref(initialPerPage);

  const totalPages = computed(() => {
    return Math.ceil(items.value.length / itemsPerPage.value);
  });

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return items.value.slice(start, end);
  }) as ComputedRef<unknown[]>;

  const paginationInfo = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value + 1;
    const end = Math.min(currentPage.value * itemsPerPage.value, items.value.length);
    return `Showing ${start}-${end} of ${items.value.length}`;
  });

  // Reset to first page when items change significantly
  watch(
    () => items.value.length,
    (newLength, oldLength) => {
      if (newLength < oldLength && currentPage.value > totalPages.value) {
        currentPage.value = Math.max(1, totalPages.value);
      }
    }
  );

  return {
    currentPage: currentPage as Ref<number>,
    itemsPerPage: itemsPerPage as Ref<number>,
    totalPages,
    paginatedItems,
    paginationInfo,
  };
}

// Combined table composable
export function useTable<T extends Record<string, unknown>>(
  items: Ref<T[]>,
  options?: {
    filters?: Ref<FilterConfig[]>;
    initialFilterState?: FilterState;
    initialSortKey?: string;
    initialSortOrder?: SortOrder;
    initialPage?: number;
    initialPerPage?: number;
  }
) {
  const {
    filters = ref([]),
    initialFilterState,
    initialSortKey = '',
    initialSortOrder = 'asc',
    initialPage = 1,
    initialPerPage = 10,
  } = options || {};

  const filterComposable = useTableFilters(items, filters, initialFilterState);
  const sortComposable = useTableSort(
    filterComposable.filteredItems as Ref<T[]>,
    initialSortKey,
    initialSortOrder
  );
  const paginationComposable = useTablePagination(
    sortComposable.sortedItems as Ref<T[]>,
    initialPage,
    initialPerPage
  );

  return {
    // Filter
    ...filterComposable,
    // Sort
    ...sortComposable,
    // Pagination
    ...paginationComposable,
    // Processed items (final result)
    processedItems: paginationComposable.paginatedItems,
    // Total count of filtered items
    filteredCount: computed(() => (filterComposable.filteredItems.value as T[]).length),
  };
}
