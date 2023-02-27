<template>
  <div>首页首页首页首页首页首页首页首页首页</div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue'

const { proxy } = getCurrentInstance()

onMounted(() => {
  proxy.$customMsg.success('封装成功')
  console.log()
})
</script>

<style lang="scss" scoped></style>
