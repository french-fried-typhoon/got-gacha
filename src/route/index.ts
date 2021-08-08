import { useRoute, createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router'
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
})

export function setInitialPath(route: RouteLocationNormalized) {
  if (route.params.locale !== '') { return }
  const initialPath = language === 'ja' ? '/' : `/${language}`
  router.push(initialPath)
}

export { router }
