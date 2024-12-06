<!-- .vitepress/layouts/Default.vue -->
<template>
  <div class="custom-layout">
    <VPLayout>
      <template #layout-bottom>
        <footer class="footer">
          <p>© 2024 菲鸽科技</p>
          <p><a href="https://beian.miit.gov.cn" target="_blank">粤ICP备2024160998号</a></p>
          <BuildInfo />
        </footer>
      </template>
    </VPLayout>
  </div>
</template>

<script setup>
import VPLayout from '@theme-default/Layout.vue'
</script>

<style scoped>
.footer {
  padding: 20px;
  text-align: center;
  background-color: #f8f8f8;
}
</style>
