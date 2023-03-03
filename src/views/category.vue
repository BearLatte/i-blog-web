<template>
  <div class="category-body">
    <category-item-4-list
      v-for="item in categories"
      :key="item.id"
      :data="item"
      :type="'category'"
      class="list-item"
    >
    </category-item-4-list>
  </div>
</template>

<script lang="ts" setup>
import { CategoryObj } from '@/types/DataInterfaces'
import { ref, getCurrentInstance, ComponentInternalInstance } from 'vue'
const { proxy } = <ComponentInternalInstance>getCurrentInstance()
const api = {
  getAllCate: '/front/categories'
}

const categories = ref<CategoryObj[]>([])

const loadCategories = async () => {
  const result = await proxy?.$request({
    url: api.getAllCate,
    method: 'GET'
  })
  if (!result) return
  categories.value = result.data
}

loadCategories()
</script>
<style lang="less" scoped>
.category-body {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  background-color: @theme-fornt-color;
  .list-item {
    width: 20%;
  }
}
</style>
