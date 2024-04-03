import { defineMock } from '@alova/mock'

export default defineMock(
  {
    // 捕获get请求
    '/mock/todo': [1, 2, 3, 4],

    // 捕获post请求
    '[POST]/mock/todo': ({ query, data }) => {
      return { success: true, data, query }
    },

    // key前面添加`-`，表示禁用此mock接口
    '-[DELETE]/mock/todo/{id}': ({ params }) => {
      return { success: true, data: params }
    },
  },
  true,
) // 第二个参数表示是否启用本组mock接口，默认为true，可以指定为false关闭
