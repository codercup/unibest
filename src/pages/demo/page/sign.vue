<route lang="json5">
{
  layout: 'default',
  style: { navigationBarTitleText: '签字板' },
}
</route>

<template>
  <view class="canvas-box flex flex-col box-border p-3" :class="{ 'full-screen': isFullScreen }">
    <canvas
      canvas-id="canvas"
      class="w-full b b-dashed b-rd b-gray-300 canvas"
      :disable-scroll="true"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      @mousedown="touchStart"
      @mousemove="touchMove"
      @mouseup="touchEnd"
    />
    <view class="btns flex justify-between text-center box-border">
      <view class="btn-box flex">
        <view class="btn bg-gray-100 b-rd b-gray-300 c-gray-500 p-1" @click="handFullScreen">
          {{ isFullScreen ? '退出全屏' : '全屏' }}
        </view>
        <view class="btn bg-gray-100 b-rd b-gray-300 c-gray-500 p-1 ml-2" @click="clear">清空</view>
        <view class="btn bg-gray-100 b-rd b-gray-300 c-gray-500 p-1 ml-2" @click="withdraw">
          撤回
        </view>
      </view>
      <view class="btn-box flex">
        <view class="btn bg-sky-500 b-rd c-white p-1" @click="save">保存</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup name="sign">
const isFullScreen = ref(false)
const isSigned = ref(false)
let ctx = null
let isButtonDown = false
let points = []
let allPoints = []

// 初始化画布
function initCanvas() {
  ctx = uni.createCanvasContext('canvas')
  // 设置画笔样式
  ctx.lineWidth = 4
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
}

// 重设画板大小
function onResize() {
  initCanvas() // 重新初始化canvas
}

// 绘画
function draw(w?) {
  const point1 = points[0]
  const point2 = points[1]

  if (!w) {
    allPoints[allPoints.length - 1].push(JSON.parse(JSON.stringify(points)))
  }

  points.shift()
  ctx.moveTo(point1.X, point1.Y)
  ctx.lineTo(point2.X, point2.Y)
  ctx.stroke()
  ctx.draw(true)
  isSigned.value = true
}

// 触摸开始，获取到起点
function touchStart() {
  allPoints.push([])
  ctx.beginPath() // 每次触摸开始，开启新的路径
  isButtonDown = true
}

// 触摸移动，获取到路径点
function touchMove(e) {
  if (isButtonDown) {
    let movePoint = {}
    if (e.changedTouches[0].x) {
      movePoint = { X: e.changedTouches[0].x, Y: e.changedTouches[0].y }
    } else {
      const X = e.changedTouches[0].pageX - e.currentTarget.offsetLeft
      const Y = e.changedTouches[0].pageY - e.currentTarget.offsetTop
      movePoint = { X, Y }
    }
    points.push(movePoint) // 存点
    const len = points.length
    if (len >= 2) {
      draw() // 绘制路径
    }
  }
}

// 触摸结束，将未绘制的点清空防止对后续路径产生干扰
function touchEnd() {
  allPoints = allPoints.filter((e) => {
    return e.length > 0
  })
  points = []
  isButtonDown = false
}

// 清空, 传入true表示清空全部，不传传表示撤回一步
function clear(reset?: boolean) {
  if (reset) allPoints = []
  ctx.clearRect(0, 0, 1000, 1000)
  ctx.draw(true)
  isSigned.value = false
}

// 全屏
function handFullScreen() {
  clear(true)
  isFullScreen.value = !isFullScreen.value
  const tid = setTimeout(() => {
    onResize()
    clearTimeout(tid)
  }, 100)
}

// 撤回
function withdraw() {
  // 清除画布
  clear()
  if (allPoints.length <= 1) {
    allPoints = []
    points = []
    return
  }
  // 删除最后一个路径
  allPoints.pop()
  // 循环路径，重新绘制
  allPoints.forEach((e) => {
    e.forEach((r) => {
      points = JSON.parse(JSON.stringify(r))
      draw(1)
    })
  })
}

// h5保存方法
function saveCanvasAsImage(dataURL, imageName?) {
  // 创建一个Image元素
  const img = new Image()

  // 设置img的src属性为数据URL
  img.src = dataURL

  // 创建一个链接元素用于下载图片
  const link = document.createElement('a')

  // 设置下载的文件名
  link.download = imageName || 'canvas-image'

  // 触发点击，下载图片
  link.href = img.src
  link.click()
}

// 保存
const save = () => {
  if (!isSigned.value) {
    uni.showToast({
      title: '请签名',
      icon: 'none',
    })
    return
  }

  uni.canvasToTempFilePath({
    canvasId: 'canvas',
    success: (res) => {
      // 获取图片路径
      const { tempFilePath } = res
      // 保存图片到相册
      // #ifdef H5
      const name = `sign-${new Date().getTime()}`
      saveCanvasAsImage(tempFilePath, name)
      // #endif

      // #ifndef H5
      uni.saveImageToPhotosAlbum({
        filePath: tempFilePath,
        success: () => {
          uni.showToast({
            title: '图片保存成功',
          })
        },
        fail: (err) => {
          console.error(err)

          uni.showToast({
            title: '图片保存失败',
            icon: 'none',
          })
        },
      })
      // #endif
    },
    fail: () => {
      uni.showToast({
        title: '转换图片失败',
        icon: 'none',
      })
    },
  })
}

onMounted(() => {
  initCanvas()
})
</script>

<style lang="scss" scoped>
$padding: 30rpx;

.canvas-box {
  .canvas {
    height: 300rpx;
    transition: height 0.3s;
  }

  .btns {
    margin-top: 10rpx;
    transition: transform 0.3s;

    .btn {
      width: auto;
      height: 50rpx;
    }
  }
}

.full-screen {
  flex-direction: row;
  height: calc(100vh - 88rpx);

  .canvas {
    width: calc(100% - 100rpx);
    height: 100%;
    margin-left: 100rpx;
  }

  .btns {
    position: absolute;
    align-items: center;
    width: calc(100vh - (88rpx + $padding * 2));
    height: 100rpx;
    transform: translate(100rpx, 0) rotate(90deg);
    transform-origin: top left;

    .btn-box {
      flex-direction: row;
    }
  }
}
</style>
