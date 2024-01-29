<route lang="json">
{
  "style": {
    "navigationBarTitleText": "%app.name%"
  }
}
</route>

<template>
  <view>{{ $t('app.name') }}</view>

  <view>切换语言 </view>
  <view class="uni-list">
    <radio-group @change="radioChange">
      <label class="uni-list-cell uni-list-cell-pd" v-for="item in languages" :key="item.value">
        <view>
          <radio :value="item.value" :checked="item.value === current" />
        </view>
        <view>{{ item.name }}</view>
      </label>
    </radio-group>
  </view>

  <!-- http://localhost:9000/#/pages/index/i18n -->
  <button @click="testI18n">测试弹窗</button>
</template>

<script lang="ts" setup>
import { getLocale } from '@/locales/index'
import { testI18n } from '@/utils/index'

const current = ref(getLocale())
const languages = [
  {
    value: 'zh',
    name: '中文',
    checked: 'true',
  },
  {
    value: 'en',
    name: '英文',
  },
]

const radioChange = (evt) => {
  // console.log(evt)
  current.value = evt.detail.value
  // https://uniapp.dcloud.net.cn/api/ui/locale.html#setlocale
  uni.setLocale(evt.detail.value)
}
</script>
