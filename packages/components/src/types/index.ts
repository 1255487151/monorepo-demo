import type { Ref, VNode } from "vue"

export type OptionItemValue = string | number | boolean | Record<string, unknown>
export type OptionItemLabel = string | number

export interface OptionItem {
  value: OptionItemValue
  label?: OptionItemLabel
  disabled?: boolean
}

export interface OptionGroupItem {
  label: OptionItemLabel
  options: OptionItem[]
}

export type OptionItems = OptionItem | OptionGroupItem

export interface PaginationConfig {
  currentPage?: number
  pageSize?: number
  total?: number
  pageSizes?: number[]
  layout?: string
  showPagination?: boolean
  pagerCount?: number
  background?: boolean
  hideOnSinglePage?: boolean
}

export interface XlgTableAutoHeightOptions {
  offset?: number
  includePagination?: boolean
  minHeight?: number
  maxHeight?: number
  watchParent?: boolean
  calcHeight?: (availableHeight: number) => number
}

export interface TableColumn<T = unknown> {
  prop: string
  label: string
  width?: string | number
  minWidth?: string | number
  fixed?: string | boolean
  align?: "left" | "center" | "right"
  headerAlign?: "left" | "center" | "right"
  sortable?: boolean | "custom"
  formatter?: (row: T, column: unknown, cellValue: unknown, index: number) => string | VNode
  slot?: string
  resizable?: boolean
  show?: boolean
  className?: string
  headerClassName?: string
  [propName: string]: unknown
}

export interface XlgTableProps<T = unknown> {
  data: T[]
  columns?: TableColumn<T>[]
  pagination?: PaginationConfig
  autoHeight?: boolean
  autoHeightOptions?: XlgTableAutoHeightOptions
  loading?: boolean
  loadingText?: string
  background?: string
}

export interface XlgTableEmits {
  (e: "page-change", page: number): void
  (e: "size-change", size: number): void
}

export interface XlgTableMethods<T = unknown> {
  clearSelection: () => void
  toggleRowSelection: (row: T, selected?: boolean) => void
  toggleAllSelection: () => void
  setCurrentRow: (row?: T) => void
  clearCurrentRow: () => void
  sort: (prop: string, order?: "ascending" | "descending" | null) => void
  clearSort: () => void
  refresh: () => void
  doLayout: () => void
  tableRef: Ref<unknown>
}

export type XlgTableInstance<T = unknown> = XlgTableMethods<T> & {
  tableData: Readonly<Ref<T[]>>
  paginationConfig: Readonly<Ref<PaginationConfig>>
}
