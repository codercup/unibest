import RequestComp from './components/request.vue' import UploadComp from './components/upload.vue'
import i18n, { t } from '@/locale/index' onShow(() => { console.log('About Show', t('app.name'))
console.log(uni.getLocale()) console.log(i18n.global.locale) // #ifdef MP-WEIXIN // fix
微信小程序需要手动调用 api 设置一次国际化标题。 uni.setNavigationBarTitle({ title: t('app.name') })
// #endif }) // 获取屏幕边界到安全区域距离 const { safeAreaInsets } = uni.getSystemInfoSync() const
gotoPage = (path) => { uni.navigateTo({ url: `/pages/about/${path}`, }) } const toSubPage = () => {
uni.navigateTo({ url: '/pages-sub/demo/index', }) }
