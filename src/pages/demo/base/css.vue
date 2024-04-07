<route lang="json5" type="page">
{
  layout: 'demo',
  style: {
    navigationBarTitleText: 'css 格式化问题',
  },
}
</route>

<template>
  <view class="mt-4">
    进过多次测试发现，粘贴的css代码块在如下情况时会出现格式化问题：
    <view class="ml-4">粘贴的css代码块中类名上面不包含空行(与大小写无关)</view>
    <view class="ml-4 text-green-600">1. 中间有空行的，正常，不用处理；</view>
    <view class="ml-4 text-red-600">
      2. 中间没有空行的，格式化异常，通过 ctrl+Z，ctrl+S 可以搞定
    </view>
    <image src="./css.png" mode="scaleToFill" class="css-img mt-2" width="688" height="885" />
  </view>
</template>

<script lang="ts" setup>
//
</script>

<style lang="scss" scoped>
// 最初的代码如下（版本1）
/*
.test{
    background: #FFF;
    .test1{
        color: #F9FF99;
    }
}
*/

// 中间有空行可以正常格式化（版本2）
/*
.test{
    background: #FFF;

    .test1{
        color: #F9FF99;
    }
}
*/

// 上面的版本1格式化会变成下面的，错误格式，可以通过 ctrl + z ， ctrl + S 解决
// .test {
//   background: #fff;

//     t1{fff
//       color: #F9FF99;
//     }
// }

// 上面的版本2格式化会变成下面的，正常
.test {
  background: #fff;

  .test1 {
    color: #f9ff99;
  }
}

// 下面是图片的样式，无关
.css-img {
  width: 90vw;
  max-width: 688px;
  height: calc(885 / 688 * 90vw);
  max-height: 885px;
}
</style>
