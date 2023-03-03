<template>
  <div class="special-body">
    <category-item-4-list
      v-for="item in specialListInfo.list"
      :key="item.id"
      :data="item"
      class="list-item"
    >
    </category-item-4-list>
    <div class="pagination">
      <el-pagination
        v-if="specialListInfo.totalCount"
        ref="blogPagination"
        background
        :prev-text="'上一页'"
        :next-text="'下一页'"
        :total="specialListInfo.totalCount"
        :page-size="specialListInfo.pageSize"
        :current-page.sync="specialListInfo.pageNo"
        layout="total, prev, pager, next"
        @current-change="handlerPageNoChange"
        hide-on-single-page
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CategoryObj, DatasourceWithPages } from '@/types/DataInterfaces'
import {
  ref,
  getCurrentInstance,
  ComponentInternalInstance,
  reactive
} from 'vue'
const { proxy } = <ComponentInternalInstance>getCurrentInstance()
const api = {
  getSpecial: '/front/specials'
}

const specialListInfo = reactive(<DatasourceWithPages<CategoryObj>>{
  pageNo: 1,
  pageSize: 15,
  list: []
})

const loadSpecials = async () => {
  const { pageNo, pageSize } = specialListInfo
  const result = await proxy?.$request({
    url: api.getSpecial,
    method: 'GET',
    params: { pageNo, pageSize }
  })
  if (!result) return
  Object.assign(specialListInfo, result.data)
}

loadSpecials()
const handlerPageNoChange = (pageNo: number) => {
  specialListInfo.pageNo = pageNo
  loadSpecials()
}
</script>
<style lang="less" scoped>
.special-body {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  background-color: @theme-fornt-color;
  .list-item {
    width: 20%;
  }
  .pagination {
    width: 100%;
    margin-top: 5px;
    :deep(ul > li.is-active) {
      background-color: @theme-high-color;
    }
  }
}
</style>
