export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string, opt?: Record<string, any>) => string
    $tm: (key: string, opt?: Record<string, any>) => [] | { [p: string]: any }
  }
}
