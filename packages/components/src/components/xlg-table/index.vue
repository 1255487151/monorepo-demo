<template>
  <div class="xlg-table-wrapper" :style="wrapperStyle">
    <div v-if="$slots['header'] || $slots['toolbar']" class="xlg-table-header">
      <slot name="header" />
      <slot name="toolbar" />
    </div>

    <div class="xlg-table-container">
      <ElTable
        ref="tableRef"
        v-bind="$attrs"
        v-loading="loading"
        :data="tableData"
        :element-loading-text="loadingText"
        v-table-auto-height="directiveAutoHeightOptions"
      >
        <slot name="beforeColumn" />

        <slot name="default">
          <ElTableColumn
            v-for="col in visibleColumns"
            :key="String(col.prop)"
            v-bind="getColumnProps(col)"
          >
            <template v-if="col.slot" #[col.slot]="scope">
              <slot :name="col.slot" v-bind="scope" />
            </template>
          </ElTableColumn>
        </slot>

        <slot name="afterColumn" />
      </ElTable>
    </div>

    <div v-if="showPagination || $slots['footer']" class="xlg-table-footer">
      <ElPagination
        v-if="showPagination"
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        :page-sizes="pagination.pageSizes"
        :layout="pagination.layout"
        :background="pagination.background"
        :pager-count="pagination.pagerCount"
        :hide-on-single-page="pagination.hideOnSinglePage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentPageChange"
      />

      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from "vue"
import type { CSSProperties } from "vue"
import { ElPagination, ElTable, ElTableColumn } from "element-plus"
import { tableAutoHeightDirective } from "@smallbrother/directives"
import type {
  TableColumn,
  XlgTableAutoHeightOptions,
  XlgTableEmits,
  XlgTableProps
} from "../../types"

const props = withDefaults(defineProps<XlgTableProps>(), {
  data: () => [],
  columns: () => [],
  pagination: () => ({}),
  autoHeight: true,
  autoHeightOptions: () => ({
    includePagination: true,
    watchParent: true
  }),
  loading: false,
  loadingText: "Loading...",
  background: "#fff"
})

const emit = defineEmits<XlgTableEmits>()

defineOptions({
  name: "XlgTable",
  inheritAttrs: false
})

const attrs = useAttrs()
const vTableAutoHeight = tableAutoHeightDirective

type TableRefInstance = {
  clearSelection?: () => void
  toggleRowSelection?: (row: object, selected?: boolean) => void
  toggleAllSelection?: () => void
  setCurrentRow?: (row?: object) => void
  sort?: (prop: string, order?: "ascending" | "descending" | null) => void
  clearSort?: () => void
  doLayout?: () => void
}

const tableRef = ref<TableRefInstance>()

const defaultPaginationConfig = {
  currentPage: 1,
  pageSize: 10,
  total: 0,
  pageSizes: [10, 20, 50, 100],
  layout: "total, sizes, prev, pager, next, jumper",
  background: true,
  showPagination: true,
  pagerCount: 7,
  hideOnSinglePage: false
}

const wrapperStyle = computed<CSSProperties>(() => ({
  background: props.background
}))

const tableData = computed(() => props.data)

const visibleColumns = computed(() =>
  props.columns.filter((column: TableColumn) => column.show !== false)
)

const pagination = computed(() => ({
  ...defaultPaginationConfig,
  ...props.pagination
}))

const showPagination = computed(() => pagination.value.showPagination !== false)

const hasExplicitHeight = computed(() =>
  ["height", "maxHeight", "max-height"].some(key => {
    const value = attrs[key]
    return value !== undefined && value !== null && value !== ""
  })
)

const shouldEnableAutoHeight = computed(() => props.autoHeight && !hasExplicitHeight.value)

const mergedAutoHeightOptions = computed<XlgTableAutoHeightOptions>(() => ({
  ...props.autoHeightOptions,
  includePagination:
    props.autoHeightOptions?.includePagination === undefined
      ? showPagination.value
      : props.autoHeightOptions.includePagination
}))

const directiveAutoHeightOptions = computed<XlgTableAutoHeightOptions | false>(() =>
  shouldEnableAutoHeight.value ? mergedAutoHeightOptions.value : false
)

const handleSizeChange = (size: number) => {
  emit("size-change", size)
}

const handleCurrentPageChange = (page: number) => {
  emit("page-change", page)
}

const clearSelection = () => {
  tableRef.value?.clearSelection?.()
}

const toggleRowSelection = (row: object, selected?: boolean) => {
  tableRef.value?.toggleRowSelection?.(row, selected)
}

const toggleAllSelection = () => {
  tableRef.value?.toggleAllSelection?.()
}

const setCurrentRow = (row?: object) => {
  tableRef.value?.setCurrentRow?.(row)
}

const clearCurrentRow = () => {
  tableRef.value?.setCurrentRow?.(undefined)
}

const sort = (prop: string, order?: "ascending" | "descending" | null) => {
  if (!order) {
    clearSort()
    return
  }

  tableRef.value?.sort?.(prop, order)
}

const clearSort = () => {
  tableRef.value?.clearSort?.()
}

const refresh = () => {
  emit("page-change", pagination.value.currentPage ?? 1)
}

const doLayout = () => {
  tableRef.value?.doLayout?.()
}

const getColumnProps = (col: TableColumn) => {
  const columnProps: Record<string, unknown> = {
    prop: String(col.prop),
    label: col.label
  }

  if (col.width !== undefined) {
    columnProps["width"] = col.width
  }

  if (col.minWidth !== undefined) {
    columnProps["minWidth"] = col.minWidth
  }

  if (col.fixed !== undefined) {
    columnProps["fixed"] = col.fixed
  }

  if (col.align !== undefined) {
    columnProps["align"] = col.align
  }

  if (col.headerAlign !== undefined) {
    columnProps["headerAlign"] = col.headerAlign
  }

  if (col.sortable !== undefined) {
    columnProps["sortable"] = col.sortable
  }

  if (col.resizable !== undefined) {
    columnProps["resizable"] = col.resizable
  }

  if (col.className !== undefined) {
    columnProps["className"] = col.className
  }

  if (col.headerClassName !== undefined) {
    columnProps["headerClassName"] = col.headerClassName
  }

  if (col.formatter !== undefined) {
    columnProps["formatter"] = col.formatter
  }

  return columnProps
}

defineExpose({
  clearSelection,
  toggleRowSelection,
  toggleAllSelection,
  setCurrentRow,
  clearCurrentRow,
  sort,
  clearSort,
  refresh,
  doLayout,
  tableRef,
  tableData,
  paginationConfig: pagination
})
</script>
