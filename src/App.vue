import { onLaunch, onShow, onHide } from '@dcloudio/uni-app' import
'abortcontroller-polyfill/dist/abortcontroller-polyfill-only' onLaunch(() => { console.log('App
Launch') }) onShow(() => { console.log('App Show') }) onHide(() => { console.log('App Hide') })
