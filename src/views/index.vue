<template>
  <div>首页首页首页首页首页首页首页首页首页</div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue'

const { proxy } = getCurrentInstance()

onMounted(async () => {
  proxy.$customMsg.success('封装成功')
  console.log('测试一下网络请求是否能发通')
  const result = await proxy.$request({
    url: '/front/blogs'
  })
  console.log(result)
})
</script>

<style lang="scss" scoped></style>