// TIPS: 很多用户无法安装这个插件所以先注释掉了，如果您可以安装成功，那就可以放开这个注释，以及下面的viteImagemin配置
// 注意，小程序有主包2M的限制，所以一般图片会放到图片服务器（不放本地），那就不需要这个插件
import viteImagemin from 'vite-plugin-imagemin'

export default (enabled: boolean) => {
  if (!enabled) {
    return undefined
  }
  return viteImagemin({
    gifsicle: {
      // gif图片压缩
      optimizationLevel: 3, // 选择1到3之间的优化级别
      interlaced: false, // 隔行扫描gif进行渐进式渲染
      // colors: 2 // 将每个输出GIF中不同颜色的数量减少到num或更少。数字必须介于2和256之间。
    },
    optipng: {
      // png
      optimizationLevel: 7, // 选择0到7之间的优化级别
    },
    mozjpeg: {
      // jpeg
      quality: 20, // 压缩质量，范围从0(最差)到100(最佳)。
    },
    pngquant: {
      // png
      quality: [0.8, 0.9], // Min和max是介于0(最差)到1(最佳)之间的数字，类似于JPEG。达到或超过最高质量所需的最少量的颜色。如果转换导致质量低于最低质量，图像将不会被保存。
      speed: 4, // 压缩速度，1(强力)到11(最快)
    },
    svgo: {
      // svg压缩
      plugins: [
        {
          name: 'removeViewBox',
        },
        {
          name: 'removeEmptyAttrs',
          active: false,
        },
      ],
    },
  })
}
