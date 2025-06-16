# ⭐ 优秀案例

我们非常欢迎大家一起贡献优秀的案例，欢迎在此 [issue](https://github.com/feige996/unibest/issues/139) 提交案例。

`unibest` 已被很多公司和团队在生产环境使用，下面是一些优秀的案例：

<script setup>
   import bairun from './佰润.png'
   import jinhuopingtai from './进货平台.png'
   import chengzhanggui from './橙掌柜.png'
const  cases = [
    {
        name: '佰润', 
        desc: '月销200w+',  
        image: bairun,
    },
    {
        name: '进货平台', 
        desc: '月销200w+',  
        image: jinhuopingtai,
    },
    {
        name: '橙掌柜', 
        desc: '月销200w+',  
        image: chengzhanggui,
    },
]
</script>

<div class="cases-container">
  <el-card v-for="(item, index) in cases" :key="index" shadow="hover">
    <template #header>
      <span class="case-title">{{ item.name }}</span>
      <span class="case-desc">{{ item.desc }}</span>
    </template>
    <el-image :src="item.image" />
  </el-card>
</div>

<style scoped>
.cases-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.case-title {
  font-size: 18px;
  font-weight: 500;
}

.case-desc {
  margin-left: 10px;
  font-size: 14px;
  color: #999;
}

:deep(.el-card__body .el-image) {
  width: 100%;
  border-radius: 4px;
}
</style>
