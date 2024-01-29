import { createI18n } from 'vue-i18n'

import en from './en.json'
import zh from './zh.json'

const messages = {
  en,
  zh,
}
console.log(uni.getLocale())

const getLocale = () => {
  const browserLang = uni.getLocale()
  if (Object.keys(messages).includes(browserLang)) {
    return browserLang
  }
  return 'zh' // fallback language, 可以配置，必须是 message 的key
}

console.log(getLocale())

const i18n = createI18n({
  locale: getLocale(), //
  messages,
})

/**
 * 非 vue 文件使用这个方法
 * @param { string } localeKey 多语言的key，eg: "app.name"
 */
export const translate = (localeKey: string) => {
  if (!localeKey) {
    console.error(`[i18n] Function translate(), localeKey param is required`)
    return ''
  }
  const locale = getLocale()
  const message = messages[locale]
  if (Object.keys(message).includes(localeKey)) {
    return message[localeKey]
  }
  return localeKey
}
export default i18n
