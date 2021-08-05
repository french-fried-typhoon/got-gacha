import 'vue-global-api'
import './assets/styles/bootstrap.css'

import { createApp } from 'vue'
import { i18n } from './i18n'
import { router, setInitialPath } from './route'
import App from './App.vue'


createApp(App).use(i18n).use(router).mount('#app')

setInitialPath()
