import { createI18n } from 'vue-i18n'
import { useLocalStorage } from '@vueuse/core'
import ja from './locale/ja.json'
import en from './locale/en.json'

export type Locale = typeof locales[number]
export const locales = ['ja', 'en'] as const

export const language = useLocalStorage('locale', getInitialLocale())

export function getInitialLocale() {
  const defaultLang = 'ja'
  const locales = ['ja', 'en']
  const lang =  window.navigator.language.toLocaleLowerCase().split('-')[0]
  return locales.includes(lang) ? lang : defaultLang
}

export function changeLocale(toLocale: Locale) {
  i18n.global.locale.value = toLocale
}

export const i18n = createI18n({
  legacy: false,
  locale: language.value,
  fallbackLocale: 'en',
  messages: {
    en,
    ja
  }
})
