import type { InternalDataTableHeader } from 'vuetify/lib/components/VDataTable/types';

export type Header = InternalDataTableHeader;

export interface TableProps {
  headers: Header[];
  data: Array<unknown>;
  getRowClass: Function;
}

export interface PaginationProps {
  modelValue: number;
  perPage: number;
  total: number;
}
