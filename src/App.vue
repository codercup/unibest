import { onLaunch, onShow, onHide } from '@dcloudio/uni-app' import
'abortcontroller-polyfill/dist/abortcontroller-polyfill-only' import { useI18n } from 'vue-i18n'
import { tabBarList, getIsTabbar } from '@/utils/index' onLaunch(() => { console.log('App Launch')
// #ifdef MP-WEIXIN const setTabbarText = () => { if (!getIsTabbar()) { return } const { t } =
useI18n() const tabbarTexts = tabBarList.map((item) => item.text.replace(/(^%|%$)/g, ''))
tabbarTexts.forEach((tabbar: string, index: number) => { console.log('tabbar', tabbar)
uni.setTabBarItem({ index, text: t(tabbar), }) }) } // fix 微信小程序需要手动调用 api
设置一次国际化tabbar text。 setTabbarText() uni.onLocaleChange(setTabbarText) // #endif }) onShow(()
=> { console.log('App Show') }) onHide(() => { console.log('App Hide') })
