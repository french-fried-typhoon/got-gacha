import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router'
import { changeLocale, language, Locale, locales } from '../i18n'
import App from '../App.vue'
import Main from '../pages/Main.vue'

const routes = [
  { path: '', component: Main },
]

const baseRoot = [
  {
    path: `/:locale(${locales.join('|')})?`,
    component: App,
    children: routes
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: baseRoot
})

router.beforeEach((to: RouteLocationNormalized) => {
  const newLocale = to.params.locale === '' ? 'ja' : to.params.locale
  changeLocale(newLocale as Locale)
  language.value = newLocale as Locale
})

export function setInitialPath() {
  const locale = language.value
  const initialPath = locale === 'ja' ? '/' : `/${locale}`
  router.push(initialPath)
}

export { router }
