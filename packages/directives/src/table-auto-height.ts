import type { DirectiveBinding, ObjectDirective } from "vue"

export interface TableAutoHeightOptions {
  offset?: number
  includePagination?: boolean
  minHeight?: number
  maxHeight?: number
  watchParent?: boolean
  calcHeight?: (availableHeight: number) => number
}

export type TableAutoHeightBinding = TableAutoHeightOptions | false | null | undefined

interface TableAutoHeightState {
  bindingValue: TableAutoHeightBinding
  resizeObserver: ResizeObserver | null
  parentResizeObserver: ResizeObserver | null
  timeoutId: number | null
  updateHeight: (() => void) | null
}

interface TableAutoHeightElement extends HTMLElement {
  _tableAutoHeightState?: TableAutoHeightState
  __vueParentComponent?: {
    proxy?: {
      doLayout?: () => void
    }
  }
}

interface ThemeMetrics {
  spacingMd: number
  spacingXl: number
  fontSizeBase: number
}

const THEME_FALLBACKS: ThemeMetrics = {
  spacingMd: 16,
  spacingXl: 32,
  fontSizeBase: 14
}

const parsePixelValue = (value: string | null | undefined, fallback: number) => {
  const parsed = Number.parseFloat(String(value || "").trim())
  return Number.isFinite(parsed) ? parsed : fallback
}

const getThemeMetric = (cssVariable: string, fallback: number) => {
  if (typeof window === "undefined") return fallback

  const styles = window.getComputedStyle(document.documentElement)
  return parsePixelValue(styles.getPropertyValue(cssVariable), fallback)
}

const getThemeMetrics = (): ThemeMetrics => ({
  spacingMd: getThemeMetric("--spacing-md", THEME_FALLBACKS.spacingMd),
  spacingXl: getThemeMetric("--spacing-xl", THEME_FALLBACKS.spacingXl),
  fontSizeBase: getThemeMetric("--font-size-base", THEME_FALLBACKS.fontSizeBase)
})

const getDefaultOptions = (): Required<TableAutoHeightOptions> => {
  const themeMetrics = getThemeMetrics()

  return {
    offset: 0,
    includePagination: true,
    minHeight: Math.max(100, themeMetrics.spacingXl * 4),
    maxHeight: Infinity,
    watchParent: true,
    calcHeight: height => height
  }
}

const normalizeOptions = (
  value: TableAutoHeightBinding
): Required<TableAutoHeightOptions> | null => {
  if (value === false || value === null) return null
  return { ...getDefaultOptions(), ...(value || {}) }
}

const resetTableHeight = (tableElement: HTMLElement) => {
  tableElement.style.removeProperty("height")
  tableElement.style.removeProperty("max-height")
  tableElement.removeAttribute("height")
}

const findTableContainer = (tableElement: HTMLElement) =>
  tableElement.closest(".xlg-table-container") as HTMLElement | null

const getContainerAvailableHeight = (
  tableElement: HTMLElement,
  options: Required<TableAutoHeightOptions>
) => {
  const container = findTableContainer(tableElement)
  if (!container) return null

  const tableRect = tableElement.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  const availableHeight = containerRect.bottom - tableRect.top - options.offset

  return availableHeight > 0 ? availableHeight : null
}

const findPaginationAnchor = (tableElement: HTMLElement) => {
  const wrapper = tableElement.closest(".xlg-table-wrapper") as HTMLElement | null
  if (wrapper) {
    const footer = Array.from(wrapper.children).find(child =>
      child.classList.contains("xlg-table-footer")
    ) as HTMLElement | undefined

    if (footer) return footer
  }

  let current: HTMLElement | null = tableElement.parentElement
  while (current) {
    const pagination = current.querySelector(
      ".el-pagination, [class*='pagination']"
    ) as HTMLElement | null

    if (pagination) {
      return pagination
    }

    current = current.parentElement
  }

  return null
}

const getFallbackPaginationOffset = (tableElement: HTMLElement, themeMetrics: ThemeMetrics) => {
  const anchor = findPaginationAnchor(tableElement)
  if (!anchor) return 0

  const tableRect = tableElement.getBoundingClientRect()
  const anchorRect = anchor.getBoundingClientRect()
  const occupiedHeight = anchorRect.bottom - tableRect.bottom

  return occupiedHeight > themeMetrics.fontSizeBase ? occupiedHeight : themeMetrics.spacingMd
}

const calculateTableHeight = (
  tableElement: HTMLElement,
  options: Required<TableAutoHeightOptions>
) => {
  const themeMetrics = getThemeMetrics()
  const containerAvailableHeight = getContainerAvailableHeight(tableElement, options)
  const tableRect = tableElement.getBoundingClientRect()

  let availableHeight =
    containerAvailableHeight ?? window.innerHeight - tableRect.top - options.offset

  if (containerAvailableHeight === null && options.includePagination) {
    availableHeight -= getFallbackPaginationOffset(tableElement, themeMetrics)
  }

  availableHeight = options.calcHeight(availableHeight)
  availableHeight = Math.max(options.minHeight, availableHeight)
  availableHeight = Math.min(options.maxHeight, availableHeight)

  return availableHeight
}

const setTableHeight = (
  tableElement: TableAutoHeightElement,
  options: Required<TableAutoHeightOptions>
) => {
  const height = calculateTableHeight(tableElement, options)

  tableElement.style.height = `${height}px`
  tableElement.style.maxHeight = `${height}px`
  tableElement.setAttribute("height", `${height}`)
  tableElement.__vueParentComponent?.proxy?.doLayout?.()
}

const createResizeObserver = (
  element: HTMLElement,
  callback: () => void
): ResizeObserver | null => {
  if (!("ResizeObserver" in window)) return null

  const observer = new ResizeObserver(() => {
    callback()
  })

  observer.observe(element)
  return observer
}

const createState = (): TableAutoHeightState => ({
  bindingValue: undefined,
  resizeObserver: null,
  parentResizeObserver: null,
  timeoutId: null,
  updateHeight: null
})

const destroyAutoHeight = (tableElement: TableAutoHeightElement, resetHeight = true) => {
  const state = tableElement._tableAutoHeightState
  if (!state) return

  if (state.timeoutId !== null) {
    clearTimeout(state.timeoutId)
    state.timeoutId = null
  }

  if (state.updateHeight) {
    window.removeEventListener("resize", state.updateHeight)
  }

  state.resizeObserver?.disconnect()
  state.parentResizeObserver?.disconnect()
  state.resizeObserver = null
  state.parentResizeObserver = null
  state.updateHeight = null
  state.bindingValue = undefined

  if (resetHeight) {
    resetTableHeight(tableElement)
    tableElement.__vueParentComponent?.proxy?.doLayout?.()
  }
}

const setupAutoHeight = (
  tableElement: TableAutoHeightElement,
  bindingValue: TableAutoHeightBinding
) => {
  const state = tableElement._tableAutoHeightState || createState()
  tableElement._tableAutoHeightState = state

  destroyAutoHeight(tableElement, false)
  state.bindingValue = bindingValue

  state.updateHeight = () => {
    if (state.timeoutId !== null) {
      clearTimeout(state.timeoutId)
    }

    state.timeoutId = window.setTimeout(() => {
      const options = normalizeOptions(state.bindingValue)
      if (options) {
        setTableHeight(tableElement, options)
      }
      state.timeoutId = null
    }, 100)
  }

  window.addEventListener("resize", state.updateHeight)
  state.resizeObserver = createResizeObserver(tableElement, state.updateHeight)

  const options = normalizeOptions(bindingValue)
  if (options?.watchParent && tableElement.parentElement) {
    state.parentResizeObserver = createResizeObserver(
      tableElement.parentElement,
      state.updateHeight
    )
  }

  state.updateHeight()
}

export const tableAutoHeightDirective: ObjectDirective<
  TableAutoHeightElement,
  TableAutoHeightBinding
> = {
  mounted(el, binding: DirectiveBinding<TableAutoHeightBinding>) {
    if (!el.classList.contains("el-table")) {
      console.warn("v-table-auto-height 指令只能用于 el-table 元素")
      return
    }

    el._tableAutoHeightState = createState()

    const options = normalizeOptions(binding.value)
    if (options) {
      setupAutoHeight(el, binding.value)
    }
  },

  updated(el, binding: DirectiveBinding<TableAutoHeightBinding>) {
    if (!el._tableAutoHeightState) return

    const options = normalizeOptions(binding.value)
    if (!options) {
      destroyAutoHeight(el)
      return
    }

    setupAutoHeight(el, binding.value)
  },

  unmounted(el) {
    destroyAutoHeight(el)
    delete el._tableAutoHeightState
  }
}
