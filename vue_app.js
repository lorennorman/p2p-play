import { createApp, h } from 'vue'
import { createPinia } from 'pinia'

import App from './vue/App.vue'
const app = createApp(App)
app.use(createPinia())
app.mount('#app')

export default app
