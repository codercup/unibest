// 全局要用的类型放到这里

declare global {
  interface IResData<T> {
    code: number
    msg: string
    data: T
  }

  // uni.uploadFile文件上传参数
  interface IUniUploadFileOptions {
    file?: File
    files?: UniApp.UploadFileOptionFiles[]
    filePath?: string
    name?: string
    formData?: any
  }

  interface IUserInfo {
    nickname?: string
    avatar?: string
    /** 微信的 openid，非微信没有这个字段 */
    openid?: string
  }

  interface IUserToken {
    token: string
    refreshToken?: string
    refreshExpire?: number
  }
}

// patch uni 类型
// 1. 补全 uni.hideToast() 的 options 类型
// 2. 补全 uni.hideLoading() 的 options 类型
// 3. 使用方式见：https://github.com/unibest-tech/unibest/pull/241
declare global {
  declare namespace UniNamespace {
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    type HideLoadingCompleteCallback = (res: GeneralCallbackResult) => void
    /** 接口调用失败的回调函数 */
    type HideLoadingFailCallback = (res: GeneralCallbackResult) => void
    /** 接口调用成功的回调函数 */
    type HideLoadingSuccessCallback = (res: GeneralCallbackResult) => void

    interface HideLoadingOption {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: HideLoadingCompleteCallback
      /** 接口调用失败的回调函数 */
      fail?: HideLoadingFailCallback
      test: UniNamespace.GeneralCallbackResult
      /**
       * 微信小程序：需要基础库： `2.22.1`
       *
       * 微信小程序：目前 toast 和 loading 相关接口可以相互混用，此参数可用于取消混用特性
       */
      noConflict?: boolean
      /** 接口调用成功的回调函数 */
      success?: HideLoadingSuccessCallback
    }

    // ----------------------------------------------------------

    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    type HideToastCompleteCallback = (res: GeneralCallbackResult) => void
    /** 接口调用失败的回调函数 */
    type HideToastFailCallback = (res: GeneralCallbackResult) => void
    /** 接口调用成功的回调函数 */
    type HideToastSuccessCallback = (res: GeneralCallbackResult) => void
    interface HideToastOption {
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: HideToastCompleteCallback
      /** 接口调用失败的回调函数 */
      fail?: HideToastFailCallback
      /**
       * 微信小程序：需要基础库： `2.22.1`
       *
       * 微信小程序：目前 toast 和 loading 相关接口可以相互混用，此参数可用于取消混用特性
       */
      noConflict?: boolean
      /** 接口调用成功的回调函数 */
      success?: HideToastSuccessCallback
    }
  }
  interface Uni {
    /**
     * 隐藏 loading 提示框
     *
     * 文档: [http://uniapp.dcloud.io/api/ui/prompt?id=hideloading](http://uniapp.dcloud.io/api/ui/prompt?id=hideloading)
     * @example ```typescript
     * uni.showLoading({
     *   title: '加载中'
     * });
     *
     * setTimeout(function () {
     *   uni.hideLoading();
     * }, 2000);
     *
     * ```
     * @tutorial [](https://uniapp.dcloud.net.cn/api/ui/prompt.html#hideloading)
     * @uniPlatform {
     * "app": {
     * "android": {
     * "osVer": "4.4.4",
     * "uniVer": "√",
     * "unixVer": "3.9.0"
     * },
     * "ios": {
     * "osVer": "9.0",
     * "uniVer": "√",
     * "unixVer": "3.9.0"
     * }
     * }
     * }
     */
    // eslint-disable-next-line ts/method-signature-style
    hideLoading<T extends UniNamespace.HideToastOption = UniNamespace.HideToastOption>(options?: T): void
    /**
     * 隐藏消息提示框
     *
     * 文档: [http://uniapp.dcloud.io/api/ui/prompt?id=hidetoast](http://uniapp.dcloud.io/api/ui/prompt?id=hidetoast)
     * @example ```typescript
     *    uni.hideToast();
     * ```
     * @tutorial [](https://uniapp.dcloud.net.cn/api/ui/prompt.html#hidetoast)
     * @uniPlatform {
     * "app": {
     * "android": {
     * "osVer": "4.4.4",
     * "uniVer": "√",
     * "unixVer": "3.9.0"
     * },
     * "ios": {
     * "osVer": "9.0",
     * "uniVer": "√",
     * "unixVer": "3.9.0"
     * }
     * }
     * }
     */
    // eslint-disable-next-line ts/method-signature-style
    hideToast<T extends UniNamespace.HideLoadingOption = UniNamespace.HideLoadingOption>(options?: T): void
  }
}

export {} // 防止模块污染
