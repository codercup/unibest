import { translate as t } from '@/locale/index'

/**
 * test i18n in not .vue file
 */
export const testI18n = () => {
  console.log(t('app.name'))
  // 下面同样生效
  uni.showModal({
    title: 'i18n 测试',
    content: t('app.name'),
  })
}
