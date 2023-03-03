<template>
  <el-card class="card">
    <div class="card-container">
      <div class="cover">
        <img
          :src="proxy?.$globalInfo.imageUrl + categoryInfo.cover"
          v-if="categoryInfo.cover"
        />
        <img src="../assets/default_cover.png" v-else />
      </div>
      <div class="content">
        <h3>{{ categoryInfo.categoryName }}</h3>
        <p>{{ categoryInfo.categoryDesc }}</p>
        <p class="count">
          共发布
          <span>{{ categoryInfo.blogCount }} </span>
          篇博客
        </p>
      </div>
    </div>
  </el-card>
  <div class="container">
    <div class="left">
      <div class="blog-list">
        <div v-if="categoryInfo.blogCount == 0" class="empty-content">
          暂无文章
        </div>
        <div v-for="item in blogPageInfo.list" :key="item.id" v-else>
          <BlogItem
            :title="item.title"
            :cover="item.cover"
            :summary="item.summary"
            :createdAt="item.createdAt"
            :nickName="item.nickName"
            :categoryName="item.categoryName"
            :blogId="item.id"
          />
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          v-if="blogPageInfo.totalCount"
          ref="blogPagination"
          background
          :prev-text="'上一页'"
          :next-text="'下一页'"
          :total="blogPageInfo.totalCount"
          :page-size="blogPageInfo.pageSize"
          :current-page.sync="blogPageInfo.pageNo"
          layout="total, prev, pager, next"
          @current-change="handlerPageNoChange"
          hide-on-single-page
        >
        </el-pagination>
      </div>
    </div>
    <div class="right">
      <div class="category-list">
        <div class="part-title">
          <span>分类专栏</span>
          <router-link to="/categories">更多&gt;&gt;</router-link>
        </div>
        <ul>
          <li v-for="item in categoryList" :key="item.id">
            <CategoryItem
              :cover="item.cover"
              :name="item.categoryName"
              :count="item.blogCount"
              :categoryId="item.id"
              :type="'category'"
            >
            </CategoryItem>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  BlogObj,
  CategoryObj,
  DatasourceWithPages
} from '@/types/DataInterfaces'
import {
  getCurrentInstance,
  ref,
  ComponentInternalInstance,
  reactive,
  watch
} from 'vue'

import { useRoute } from 'vue-router'
const route = useRoute()
const { proxy } = <ComponentInternalInstance>getCurrentInstance()

const categoryId = ref(route.params.categoryId)

const api = {
  getBlogList: '/front/blogs',
  getCategories: '/front/categories'
}

// 博客列表
const blogPageInfo = reactive(<DatasourceWithPages<BlogObj>>{
  pageSize: 8
})

const getBlogList = async () => {
  const { pageNo, pageSize } = blogPageInfo
  const result = await proxy?.$request({
    url: api.getBlogList,
    method: 'GET',
    params: { pageNo, pageSize, categoryId: categoryId.value }
  })
  if (!result) return
  Object.assign(blogPageInfo, result.data)
}
getBlogList()

// 分页获取
const handlerPageNoChange = (pageNo: number) => {
  blogPageInfo.pageNo = pageNo
  getBlogList()
}

// 分类列表
const categoryList = ref<CategoryObj[]>([])
const getCategoryList = async () => {
  const result = await proxy?.$request({
    url: api.getCategories,
    method: 'GET',
    params: { pageSize: 5 }
  })
  categoryList.value = result.data
}
getCategoryList()

// 获取分类详情
const categoryInfo = reactive(<CategoryObj>{})
const getCategoryInfo = async () => {
  console.log('方法标记getCategoryInfo')
  const result = await proxy?.$request({
    url: api.getCategories + '/' + categoryId.value,
    method: 'GET'
  })

  if (!result) return
  Object.assign(categoryInfo, result.data)
}
getCategoryInfo()

// 添加路由对象监听，实现参数变化重新加载页面
watch(
  () => proxy?.$route,
  (newVal, oldVal) => {
    console.log(newVal?.params.categoryId)
    categoryId.value = newVal?.params.categoryId as string
    getCategoryInfo()
    getCategoryList()
    getBlogList()
  }
)
</script>

<style lang="less" scoped>
.card {
  margin: 10px 0;
  background-color: @theme-fornt-color;
  border: none;
  box-shadow: inset 0px 0px 5px 1px #222;
  .card-container {
    display: flex;
    .cover {
      width: 120px;
      height: 120px;
      border-radius: 10px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .content {
      flex: 1;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      position: relative;
      // justify-content: space-around;
      h3 {
        padding: 8px 0;
        color: @theme-high-color;
      }
      p {
        color: @theme-border-color;
        max-width: 1050px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .count {
        position: absolute;
        bottom: 0px;
        right: 0px;
        span {
          color: @theme-high-color;
        }
      }
    }
  }
}
.container {
  .left {
    .pagination {
      margin-top: 5px;
      :deep(ul > li.is-active) {
        background-color: @theme-high-color;
      }
    }
  }
}
</style>
