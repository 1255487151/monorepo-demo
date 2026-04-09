# XlgTable

## 安装 / 导入

```ts
import { XlgTable } from "@smallbrother/components/components"
```

需要全局样式时，引入：

```ts
import "@smallbrother/components/style"
```

## 基础用法

```vue
<template>
  <xlg-table
    :data="rows"
    :columns="columns"
    :pagination="{ total: 100, currentPage: 1, pageSize: 10 }"
    @page-change="handlePageChange"
  />
</template>

<script setup lang="ts">
import { ref } from "vue"
import { XlgTable, type TableColumn } from "@smallbrother/components/components"

const rows = ref([{ id: 1, name: "Alpha" }])

const columns: TableColumn[] = [
  { prop: "id", label: "ID", width: 80 },
  { prop: "name", label: "Name", minWidth: 180 }
]

const handlePageChange = (page: number) => {
  console.log(page)
}
</script>
```

## 插槽扩展

```vue
<xlg-table :data="rows" :columns="columns">
  <template #header>
    <h3>Table Header</h3>
  </template>

  <template #toolbar>
    <el-button>Refresh</el-button>
  </template>

  <template #afterColumn>
    <el-table-column label="Actions" min-width="160">
      <template #default="{ row }">
        <el-button link>View {{ row.name }}</el-button>
      </template>
    </el-table-column>
  </template>
</xlg-table>
```

## Props / Attributes

除下表外，其余属性会透传给底层 `ElTable`。若显式传入 `height`、`maxHeight` 或 `max-height`，组件会关闭自动高度逻辑。

| 名称                | 说明             | 类型                        | 默认值                                           |
| ------------------- | ---------------- | --------------------------- | ------------------------------------------------ |
| `data`              | 表格数据源       | `T[]`                       | `[]`                                             |
| `columns`           | 列配置列表       | `TableColumn<T>[]`          | `[]`                                             |
| `pagination`        | 分页配置         | `PaginationConfig`          | `{}`                                             |
| `autoHeight`        | 是否启用自动高度 | `boolean`                   | `true`                                           |
| `autoHeightOptions` | 自动高度配置     | `XlgTableAutoHeightOptions` | `{ includePagination: true, watchParent: true }` |
| `loading`           | 是否显示加载态   | `boolean`                   | `false`                                          |
| `loadingText`       | 加载提示文案     | `string`                    | `"Loading..."`                                   |
| `background`        | 外层容器背景色   | `string`                    | `"#fff"`                                         |

## Slots

| 插槽名         | 说明               |
| -------------- | ------------------ |
| `header`       | 头部内容区域       |
| `toolbar`      | 工具栏区域         |
| `beforeColumn` | 默认列前插入列     |
| `default`      | 完全接管默认列渲染 |
| `afterColumn`  | 默认列后插入列     |
| `footer`       | 分页区后附加内容   |

## Events

| 事件名        | 说明               | 回调参数         |
| ------------- | ------------------ | ---------------- |
| `page-change` | 当前页码变化时触发 | `(page: number)` |
| `size-change` | 分页大小变化时触发 | `(size: number)` |

## Exposes / Methods

| 方法名               | 说明               | 签名                                                                  |
| -------------------- | ------------------ | --------------------------------------------------------------------- |
| `clearSelection`     | 清空选中行         | `() => void`                                                          |
| `toggleRowSelection` | 切换指定行选中状态 | `(row: T, selected?: boolean) => void`                                |
| `toggleAllSelection` | 切换全选           | `() => void`                                                          |
| `setCurrentRow`      | 设置当前行         | `(row?: T) => void`                                                   |
| `clearCurrentRow`    | 清空当前行         | `() => void`                                                          |
| `sort`               | 按字段排序         | `(prop: string, order?: "ascending" \| "descending" \| null) => void` |
| `clearSort`          | 清除排序           | `() => void`                                                          |
| `refresh`            | 触发当前页刷新     | `() => void`                                                          |
| `doLayout`           | 触发表格重新布局   | `() => void`                                                          |
| `tableRef`           | 底层表格实例引用   | `Ref<unknown>`                                                        |
| `tableData`          | 当前表格数据       | `Readonly<Ref<T[]>>`                                                  |
| `paginationConfig`   | 当前分页配置       | `Readonly<Ref<PaginationConfig>>`                                     |

## 类型说明

### `PaginationConfig`

| 字段               | 说明               |
| ------------------ | ------------------ |
| `currentPage`      | 当前页码           |
| `pageSize`         | 每页数量           |
| `total`            | 总数               |
| `pageSizes`        | 可选分页大小       |
| `layout`           | 分页布局字符串     |
| `showPagination`   | 是否显示分页       |
| `pagerCount`       | 页码按钮数量       |
| `background`       | 分页是否显示背景   |
| `hideOnSinglePage` | 单页时是否隐藏分页 |

### `XlgTableAutoHeightOptions`

| 字段                | 说明                   |
| ------------------- | ---------------------- |
| `offset`            | 额外扣除的高度         |
| `includePagination` | 是否把分页高度纳入计算 |
| `minHeight`         | 最小高度               |
| `maxHeight`         | 最大高度               |
| `watchParent`       | 是否监听父容器变化     |
| `calcHeight`        | 自定义高度变换函数     |

### `TableColumn`

支持字段包括：

- `prop`
- `label`
- `width`
- `minWidth`
- `fixed`
- `align`
- `headerAlign`
- `sortable`
- `formatter`
- `slot`
- `resizable`
- `show`
- `className`
- `headerClassName`

## 样式与依赖

- 组件基于 `ElTable`、`ElTableColumn`、`ElPagination`
- 内部直接接入 `tableAutoHeightDirective`
- 自动高度是否包含分页高度，会根据 `showPagination` 自动补齐默认值
- 使用单组件 CSS 时，仍需自行补齐相关 Element Plus 样式
