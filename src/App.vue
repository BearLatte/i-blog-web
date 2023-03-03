<template>
  <el-config-provider :locale="zhCn" :message="config">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { reactive } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const config = reactive({
  max: 1
})
</script>

<style lang="less">
@import url('@/assets/style/main.less');
</style>
