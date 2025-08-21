import type { IUserInfoVo, IUserLogin, IUserTokenVo } from '@/api/types/login'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getUserInfo as _getUserInfo,
  login as _login,
  logout as _logout,
  refreshToken as _refreshToken,
  wxLogin as _wxLogin,
  getWxCode,
} from '@/api/login'
import { toast } from '@/utils/toast'

// 初始化状态
const userInfoState: IUserInfoVo = {
  id: 0,
  username: '',
  avatar: '/static/images/default-avatar.png',
}

const userTokenState: IUserTokenVo = {
  token: '',
  refreshToken: '',
  refreshExpire: 0,
}

export const useUserStore = defineStore(
  'user',
  () => {
    // 定义用户信息
    const userInfo = ref<IUserInfoVo>({ ...userInfoState })
    const userToken = ref<IUserTokenVo>({ ...userTokenState })
    // 设置用户信息
    const setUserInfo = (val: IUserInfoVo) => {
      console.log('设置用户信息', val)
      // 若头像为空 则使用默认头像
      if (!val.avatar) {
        val.avatar = userInfoState.avatar
      }
      else {
        val.avatar = 'https://oss.laf.run/ukw0y1-site/avatar.jpg?feige'
      }
      userInfo.value = val
    }
    const setUserAvatar = (avatar: string) => {
      userInfo.value.avatar = avatar
      console.log('设置用户头像', avatar)
      console.log('userInfo', userInfo.value)
    }
    // 删除用户信息
    const removeUserInfo = () => {
      userInfo.value = { ...userInfoState }
      userToken.value = { ...userTokenState }
      uni.removeStorageSync('userInfo')
      uni.removeStorageSync('token')
      uni.removeStorageSync('refreshToken')
    }

    /**
     * 存储token,非导出
     */
    const setToken = (tokenBody: IUserLogin) => {
      userToken.value.token = tokenBody.token
      userToken.value.refreshToken = tokenBody.refreshToken
      userToken.value.refreshExpire = tokenBody.refreshExpire
      uni.setStorageSync('token', tokenBody.token)
      uni.setStorageSync('refreshToken', tokenBody.refreshToken)
    }

    /**
     * 获取用户信息
     */
    const getUserInfo = async () => {
      const res = await _getUserInfo()
      const userInfo = res.data
      setUserInfo(userInfo)
      uni.setStorageSync('userInfo', userInfo)
      // TODO 这里可以增加获取用户路由的方法 根据用户的角色动态生成路由
      return res
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
      console.log('登录信息', res)
      toast.success('登录成功')
      // 这里设置token 和 refreshToken
      setToken(res.data)
      await getUserInfo()
      return res
    }

    /**
     * 刷新token
     */
    const refreshToken = async () => {
      const res = await _refreshToken(userToken.value.refreshToken)
      setToken(res.data)
      await getUserInfo()
      return res
    }

    /**
     * 退出登录 并 删除用户信息
     */
    const logout = async () => {
      _logout()
      removeUserInfo()
    }
    /**
     * 微信登录
     */
    const wxLogin = async () => {
      // 获取微信小程序登录的code
      const data = await getWxCode()
      console.log('微信登录code', data)

      const res = await _wxLogin(data)
      await getUserInfo()
      return res
    }

    return {
      userInfo,
      userToken,
      login,
      wxLogin,
      getUserInfo,
      setUserAvatar,
      logout,
      refreshToken,
    }
  },
  {
    persist: true,
  },
)
