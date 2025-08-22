import type { IAuthLoginRes, IDoubleTokenRes, ISingleTokenRes } from '@/api/types/login'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  login as _login,
  logout as _logout,
  refreshToken as _refreshToken,
  wxLogin as _wxLogin,
  getWxCode,
} from '@/api/login'
import { isDoubleTokenMode } from '@/utils'
import { useUserStore } from './user'

// 初始化状态
const tokenInfoState = isDoubleTokenMode
  ? {
      accessToken: '',
      accessExpiresIn: 0,
      refreshToken: '',
      refreshExpiresIn: 0,
    }
  : {
      token: '',
      expiresIn: 0,
    }

export const useTokenStore = defineStore(
  'token',
  () => {
    // 定义用户信息
    const tokenInfo = ref<IAuthLoginRes>({ ...tokenInfoState })
    // 设置用户信息
    const setTokenInfo = (val: IAuthLoginRes) => {
      tokenInfo.value = val
    }

    async function _postLogin(tokenInfo: IAuthLoginRes) {
      setTokenInfo(tokenInfo)
      const userStore = useUserStore()
      await userStore.fetchUserInfo()
    }

    /**
     * 用户登录
     * @param credentials 登录参数
     * @returns R<IUserLogin>
     */
    const login = async (credentials: {
      username: string
      password: string
      code: string
      uuid: string
    }) => {
      const res = await _login(credentials)
      console.log('普通登录-res: ', res)
      await _postLogin(res.data)
      uni.showToast({
        title: '登录成功',
        icon: 'success',
      })
    }

    /**
     * 微信登录
     */
    const wxLogin = async () => {
      // 获取微信小程序登录的code
      const code = await getWxCode()
      console.log('微信登录-code: ', code)
      const res = await _wxLogin(code)
      console.log('微信登录-res: ', res)
      await _postLogin(res.data)
      uni.showToast({
        title: '登录成功',
        icon: 'success',
      })
    }

    /**
     * 退出登录 并 删除用户信息
     */
    const logout = async () => {
      _logout()
      const userStore = useUserStore()
      await userStore.removeUserInfo()
    }

    /**
     * 刷新token
     */
    const refreshToken = async () => {
      const refreshToken = (tokenInfo.value as IDoubleTokenRes).refreshToken
      const res = await _refreshToken(refreshToken)
      console.log('刷新token-res: ', res)
      setTokenInfo(res.data)
    }

    const hasLogin = computed(() => isDoubleTokenMode
      ? (tokenInfo.value as IDoubleTokenRes).accessToken
      : (tokenInfo.value as ISingleTokenRes).token,
    )

    return {
      tokenInfo,
      hasLogin,
      login,
      wxLogin,
      logout,
      refreshToken,
    }
  },
)
