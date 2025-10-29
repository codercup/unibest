import type { TabBar } from '@uni-helper/vite-plugin-uni-pages'
import type { RemoveLeadingSlashFromUnion } from '@/typings'

/**
 * 原生 tabbar 的单个选项配置
 */
export type NativeTabBarItem = TabBar['list'][number] & {
  pagePath: RemoveLeadingSlashFromUnion<_LocationUrl>
}

/** badge 显示一个数字或 小红点（样式可以直接在 tabbar/index.vue 里面修改） */
export type CustomTabBarItemBadge = number | 'dot'

/** 自定义 tabbar 的单个选项配置 */
export interface CustomTabBarItem {
  text: string
  pagePath: RemoveLeadingSlashFromUnion<_LocationUrl>
  /** 图标类型，不建议用 image 模式，因为需要配置 2 张图，更麻烦 */
  iconType: 'uiLib' | 'unocss' | 'iconfont' | 'image'
  /**
   * icon 的路径
   * - uiLib: wot-design-uni 图标的 icon prop
   * - unocss: unocss 图标的类名
   * - iconfont: iconfont 图标的类名
   * - image: 图片的路径
   */
  icon: string
  /** 只有在 image 模式下才需要，传递的是高亮的图片（PS： 不建议用 image 模式） */
  iconActive?: string
  /** badge 显示一个数字或 小红点 */
  badge?: CustomTabBarItemBadge
  /** 是否是中间的鼓包tabbarItem */
  isBulge?: boolean
}
