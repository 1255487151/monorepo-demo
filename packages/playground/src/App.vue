<template>
  <main class="playground-shell">
    <section class="hero">
      <p class="eyebrow">SmallBrother UI Playground</p>
      <h1>XlgSelect Component Lab</h1>
      <p class="hero-copy">
        A local Vue 3 workspace app for validating both package install modes and the token handoff
        between Element Plus and XLG component-level variables.
      </p>

      <div class="hero-tags">
        <span>Named Import</span>
        <span>Plugin Install</span>
        <span>Theme Tokens</span>
        <span>Grouped Options</span>
      </div>
    </section>

    <section class="playground-grid">
      <article class="panel panel--direct">
        <div class="panel-head">
          <p class="panel-kicker">Mode 01</p>
          <h2>Components Entry</h2>
          <p>
            This block imports
            <code>XlgSelect</code>
            directly from
            <code>@smallbrother/components/components</code>
            .
          </p>
        </div>

        <div class="panel-demo">
          <label class="demo-label">Imported component</label>
          <XlgSelect
            v-model="directValue"
            :options="options"
            placeholder="Choose a direct import option"
          />
          <p class="demo-value">Current value: {{ formatValue(directValue) }}</p>
        </div>
      </article>

      <article class="panel panel--plugin">
        <div class="panel-head">
          <p class="panel-kicker">Mode 02</p>
          <h2>Plugin Install</h2>
          <p>
            This block uses the globally registered
            <code>&lt;xlg-select&gt;</code>
            provided by
            <code>app.use(@smallbrother/components)</code>
            .
          </p>
        </div>

        <div class="panel-demo">
          <label class="demo-label">Globally installed component</label>
          <xlg-select
            v-model="pluginValue"
            :options="options"
            placeholder="Choose a plugin install option"
          />
          <p class="demo-value">Current value: {{ formatValue(pluginValue) }}</p>
        </div>
      </article>

      <article class="panel panel--theme theme-demo">
        <div class="panel-head">
          <p class="panel-kicker">Mode 03</p>
          <h2>Element Tokens</h2>
          <p>
            The wrapper changes Element Plus globals like
            <code>--el-color-primary</code>
            and
            <code>--el-border-color</code>
            .
          </p>
        </div>

        <div class="panel-demo">
          <label class="demo-label">Theme token override</label>
          <XlgSelect v-model="themeValue" :options="options" placeholder="Theme-driven select" />
          <p class="demo-note">
            Global-looking styling without changing component-specific XLG tokens.
          </p>
        </div>
      </article>

      <article class="panel panel--local local-demo">
        <div class="panel-head">
          <p class="panel-kicker">Mode 04</p>
          <h2>XLG Tokens</h2>
          <p>
            The wrapper only changes
            <code>--xlg-select-width</code>
            and
            <code>--xlg-select-dropdown-padding-y</code>
            .
          </p>
        </div>

        <div class="panel-demo">
          <label class="demo-label">Local token override</label>
          <XlgSelect
            v-model="localValue"
            :options="options"
            placeholder="Component-scoped tuning"
          />
          <p class="demo-note">
            Use this layer when you want to tune XLG behavior without retheming all Element Plus
            fields.
          </p>
        </div>
      </article>

      <article class="panel panel--grouped">
        <div class="panel-head">
          <p class="panel-kicker">Mode 05</p>
          <h2>Grouped Options</h2>
          <p>
            This block demonstrates the lightweight grouped data mode using
            <code>{ label, options }</code>
            while still keeping all native
            <code>el-select</code>
            attrs available.
          </p>
        </div>

        <div class="panel-demo">
          <label class="demo-label">Grouped option rendering</label>
          <XlgSelect
            v-model="groupedValue"
            :options="groupedOptions"
            clearable
            filterable
            placeholder="Choose a grouped option"
          />
          <p class="demo-value">Current value: {{ formatValue(groupedValue) }}</p>
        </div>
      </article>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { XlgSelect, type OptionItems } from "@smallbrother/components/components"

type SelectModelValue = string | number | (string | number)[]

const options: OptionItems[] = [
  { label: "Morning batch", value: "morning" },
  { label: "Noon batch", value: "noon" },
  { label: "Night batch", value: "night" },
  { label: "Locked batch", value: "locked", disabled: true }
]

const groupedOptions = [
  {
    label: "North Region",
    options: [
      { label: "Beijing HQ", value: "beijing" },
      { label: "Tianjin Branch", value: "tianjin" }
    ]
  },
  {
    label: "South Region",
    options: [
      { label: "Guangzhou HQ", value: "guangzhou" },
      { label: "Shenzhen Branch", value: "shenzhen", disabled: true }
    ]
  }
] as unknown as OptionItems[]

const directValue = ref<SelectModelValue>("morning")
const pluginValue = ref<SelectModelValue>("noon")
const themeValue = ref<SelectModelValue>("night")
const localValue = ref<SelectModelValue>("morning")
const groupedValue = ref<SelectModelValue>("beijing")

function formatValue(value: SelectModelValue) {
  return Array.isArray(value) ? JSON.stringify(value) : String(value)
}
</script>

<style scoped>
:global(:root) {
  color: #281e1a;
  background:
    radial-gradient(circle at top left, rgba(184, 124, 87, 0.22), transparent 34%),
    linear-gradient(180deg, #f7f1ea 0%, #efe5d7 100%);
}

:global(body) {
  margin: 0;
  min-height: 100vh;
  font-family: "Avenir Next", "Segoe UI Variable", "Trebuchet MS", sans-serif;
  background: transparent;
}

:global(*),
:global(*::before),
:global(*::after) {
  box-sizing: border-box;
}

.playground-shell {
  min-height: 100vh;
  padding: clamp(1.25rem, 2vw, 2rem);
  display: grid;
  gap: clamp(1.5rem, 3vw, 3rem);
}

.hero {
  display: grid;
  gap: 0.9rem;
  max-width: 58rem;
  padding: clamp(1.5rem, 4vw, 3rem);
  border: 1px solid rgba(73, 44, 25, 0.08);
  background: rgba(255, 251, 247, 0.78);
  box-shadow: 0 24px 70px rgba(72, 45, 27, 0.08);
}

.eyebrow,
.panel-kicker {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.74rem;
  color: #9b6041;
}

.hero h1,
.panel h2 {
  margin: 0;
  font-family: "Iowan Old Style", "Palatino Linotype", "Book Antiqua", serif;
  font-weight: 600;
  letter-spacing: -0.03em;
  color: #2a1a14;
}

.hero h1 {
  font-size: clamp(2.4rem, 6vw, 4.8rem);
  line-height: 0.96;
}

.hero-copy,
.panel-head p,
.demo-note,
.demo-value {
  margin: 0;
  line-height: 1.6;
  color: #5e4738;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero-tags span {
  padding: 0.55rem 0.9rem;
  border: 1px solid rgba(122, 79, 52, 0.14);
  background: rgba(255, 255, 255, 0.64);
  color: #6f4a32;
  font-size: 0.88rem;
}

.playground-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.4rem);
}

.panel {
  display: grid;
  gap: 1.35rem;
  padding: clamp(1.25rem, 2.5vw, 1.8rem);
  border: 1px solid rgba(73, 44, 25, 0.08);
  background: rgba(255, 252, 248, 0.82);
  box-shadow: 0 22px 58px rgba(84, 54, 32, 0.08);
}

.panel--direct,
.panel--plugin {
  grid-column: span 6;
}

.panel--theme,
.panel--local {
  grid-column: span 6;
}

.panel--grouped {
  grid-column: 1 / -1;
}

.panel-demo {
  display: grid;
  gap: 0.85rem;
}

.demo-label {
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #87624b;
}

.theme-demo {
  --el-color-primary: #9a3412;
  --el-border-color: #f2a65a;
  --el-fill-color-light: #fff4e8;
}

.local-demo {
  --xlg-select-width: min(100%, 21rem);
  --xlg-select-dropdown-padding-y: 0.9rem;
}

code {
  font-family: "Consolas", "Liberation Mono", monospace;
  font-size: 0.92em;
  color: #7a3f1f;
}

@media (max-width: 900px) {
  .panel--direct,
  .panel--plugin,
  .panel--theme,
  .panel--local,
  .panel--grouped {
    grid-column: 1 / -1;
  }
}
</style>
