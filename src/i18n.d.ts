/* eslint-disable no-unused-vars */
export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string) => string
    $tm: (key: string) => [] | { [p: string]: any }
  }
}
