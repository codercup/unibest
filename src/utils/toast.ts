/**
 * toast 弹窗组件
 * 支持 success/error/warning/info 四种状态
 * 可配置 duration, position 等参数
 */

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastOptions {
  type?: ToastType
  duration?: number
  position?: 'top' | 'middle' | 'bottom'
  icon?: 'success' | 'error' | 'none' | 'loading' | 'fail' | 'exception'
  message: string
  /**
   * 是否显示透明蒙层，防止触摸穿透
   * @default true
   */
  mask?: boolean
}
/**
 * 显示 toast
 */
export function showToast(message: string): void
export function showToast(options: ToastOptions): void
export function showToast(options: ToastOptions | string): void {
  const defaultOptions: ToastOptions = {
    type: 'info',
    duration: 2000,
    position: 'middle',
    message: '',
    mask: true,
  }
  const mergedOptions
    = typeof options === 'string'
      ? { ...defaultOptions, message: options }
      : { ...defaultOptions, ...options }
  // 映射position到uniapp支持的格式
  const positionMap: Record<ToastOptions['position'], 'top' | 'bottom' | 'center'> = {
    top: 'top',
    middle: 'center',
    bottom: 'bottom',
  }

  // 映射图标类型
  const iconMap: Record<
    ToastType,
    'success' | 'error' | 'none' | 'loading' | 'fail' | 'exception'
  > = {
    success: 'success',
    error: 'error',
    warning: 'fail',
    info: 'none',
  }

  // 调用uni.showToast显示提示
  uni.showToast({
    title: mergedOptions.message,
    duration: mergedOptions.duration,
    position: positionMap[mergedOptions.position],
    icon: mergedOptions.icon || iconMap[mergedOptions.type],
    mask: mergedOptions.mask,
  })
}

type _ToastOptions = Omit<ToastOptions, 'type' | 'message'>

export const toast = {
  success: (message: string, options?: _ToastOptions) =>
    showToast({ ...options, type: 'success', message }),
  error: (message: string, options?: _ToastOptions) =>
    showToast({ ...options, type: 'error', message }),
  warning: (message: string, options?: _ToastOptions) =>
    showToast({ ...options, type: 'warning', message }),
  info: (message: string, options?: _ToastOptions) =>
    showToast({ ...options, type: 'info', message }),
}
