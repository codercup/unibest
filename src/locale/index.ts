import { createI18n } from 'vue-i18n'

import en from './en.json'
import zhHans from './zh-Hans.json' // 简体中文

const messages = {
  en,
  'zh-Hans': zhHans, // key 不能乱写，查看截图 screenshots/i18n.png
}

const i18n = createI18n({
  locale: uni.getLocale(), // 获取已设置的语言，fallback 语言需要再 manifest.config.ts 中设置
  messages,
})

console.log(uni.getLocale())
console.log(i18n.global.locale)

/**
 * 非 vue 文件使用这个方法
 * @param { string } localeKey 多语言的key，eg: "app.name"
 */
export const translate = (localeKey: string) => {
  if (!localeKey) {
    console.error(`[i18n] Function translate(), localeKey param is required`)
    return ''
  }
  const locale = uni.getLocale()
  console.log('locale:', locale)

  const message = messages[locale]
  if (Object.keys(message).includes(localeKey)) {
    return message[localeKey]
  }
  return localeKey
}

/**
 * formatString('已阅读并同意{0}和{1}','用户协议','隐私政策') -> 已阅读并同意用户协议和隐私政策
 * @param template
 * @param values
 * @returns
 */
export function formatString(template: string, ...values: any) {
  console.log(template, values)
  // 使用map来替换{0}, {1}, ...等占位符
  return template.replace(/{(\d+)}/g, (match, index) => {
    const value = values[index]
    return value !== undefined ? value : match
  })
}
export default i18n
