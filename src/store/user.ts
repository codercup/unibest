import { defineStore } from 'pinia'
import { ref } from 'vue'
import { UserInfo } from '../typings'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<UserInfo>()

    const setUserInfo = (val: UserInfo) => {
      userInfo.value = val
    }

    const clearUserInfo = () => {
      userInfo.value = undefined
    }

    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
    }
  },
  {
    persist: true,
  },
)
