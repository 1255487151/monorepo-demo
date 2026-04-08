import { createApp } from "vue"
import ElementPlus from "element-plus"
import SmallBrotherComponents from "@smallbrother/components"
import "element-plus/dist/index.css"
import App from "./App.vue"

const app = createApp(App)

app.use(ElementPlus)
app.use(SmallBrotherComponents)
app.mount("#app")
