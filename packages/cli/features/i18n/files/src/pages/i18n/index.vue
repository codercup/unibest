<script lang="ts" setup>
import i18n, { t } from '@/locale/index'
import { setTabbarItem } from '@/tabbar/i18n'
import { testI18n } from '@/utils/i18n'

definePage({
  style: {
    navigationBarTitleText: '%i18n.title%',
  },
})

const current = ref(uni.getLocale())
const user = { name: '张三', detail: { height: 178, weight: '75kg' } }
const languages = [
  {
    value: 'zh-Hans',
    name: '中文',
    checked: 'true',
  },
  {
    value: 'en',
    name: '英文',
  },
]

function radioChange(evt) {
  // console.log(evt)
  current.value = evt.detail.value
  // 下面2句缺一不可！！！
  uni.setLocale(evt.detail.value)
  i18n.global.locale = evt.detail.value

  // 底部tabbar需要重新设置一下
  setTabbarItem()
  // 本页的标题也需要重新设置一下
  uni.setNavigationBarTitle({
    title: t('i18n.title'),
  })
}
</script>

<template>
  <view class="mt-6 center flex-col">
    <view class="p-4 text-red-500 leading-6">
      经过我的测试发现，小程序里面会有2处BUG：
      <view>
        <text class="line-through"> 1. 页面标题多语言不生效 </text>
        <text class="ml-2 text-green-500"> 已解决 </text>
      </view>
      <view>
        <text class="line-through">
          2. 多语言传递的参数不生效，如下 heavy
        </text>
        <text class="ml-2 text-green-500"> 已解决 </text>
        <view class="ml-2 text-green-500">
          把 $t 改为自定义的 t 即可
        </view>
      </view>
    </view>
    <view class="text-green-500">
      多语言测试
    </view>
    <view class="m-4">
      {{ $t("i18n.title") }}
    </view>
    <view class="text-gray-500 italic">
      使用$t: {{ $t("weight", { heavy: 100 }) }}
    </view>
    <view class="m-4">
      {{ $t("weight", { heavy: 100 }) }}
    </view>
    <view class="text-gray-500 italic">
      使用t: {{ t("weight", { heavy: 100 }) }}
    </view>
    <view class="m-4">
      {{ t("weight", { heavy: 100 }) }}
    </view>
    <view class="m-4">
      {{ t("introduction", user) }}
    </view>

    <view class="mt-12 text-green-500">
      切换语言
    </view>
    <view class="uni-list">
      <radio-group class="radio-group" @change="radioChange">
        <label
          v-for="item in languages"
          :key="item.value"
          class="uni-list-cell uni-list-cell-pd"
        >
          <view>
            <radio :value="item.value" :checked="item.value === current" />
          </view>
          <view>{{ item.name }}</view>
        </label>
      </radio-group>
    </view>

    <!-- http://localhost:9000/#/pages/index/i18n -->
    <button class="mb-44 mt-20" @click="testI18n">
      测试弹窗
    </button>
  </view>
</template>

<style lang="scss">
.uni-list {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  border-radius: 12px;
}

.radio-group {
  width: 200px;
  margin: 10px auto;
  border-radius: 12px;
}

.uni-list-cell {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #bcecd1;
}
</style>
