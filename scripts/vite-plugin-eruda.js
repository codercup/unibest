/**
 * @description 通过 vite 自定义条件动态导入 eruda
 * @description Eruda 配置参考 https://eruda.liriliri.io/zh/docs/
 * @param {object} options
 * @param {boolean} [options.open] - 是否开启 eruda
 * @param {object} [options.erudaOptions] - eruda 配置
 * @param {string} [options.erudaUrl] - eruda 地址
 */
export default function vitePluginEruda(options = {}) {
  const { open = true, erudaOptions = {}, erudaUrl = 'https://cdn.jsdelivr.net/npm/eruda' } = options

  return {
    name: 'vite-plugin-eruda',

    transformIndexHtml(html) {
      const tags = [
        {
          tag: 'script',
          attrs: {
            src: erudaUrl,
          },
          injectTo: 'head',
        },
        {
          tag: 'script',
          children: `eruda.init(${JSON.stringify(erudaOptions)});`,
          injectTo: 'head',
        },
      ]

      if (!open) {
        return html
      }
      return { html, tags }
    },
  }
}
