import { t } from '@/locale/index'

/** 非vue 文件使用 i18n */
export const testI18n = () => {
  // 下面同样生效
  uni.showModal({
    title: 'i18n 测试',
    content: t('app.name'),
  })
}
