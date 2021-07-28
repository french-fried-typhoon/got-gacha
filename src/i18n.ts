import { createI18n } from 'vue-i18n'
import ja from './locale/ja.json'
import en from './locale/en.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'ja',
  fallbackLocale: 'en',
  messages: {
    en,
    ja
  }
})
