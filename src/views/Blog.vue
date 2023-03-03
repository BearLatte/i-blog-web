<template>
  <div class="container">
    <div class="left">
      <div class="blog-list">
        <div v-if="blogPageInfo.list.length == 0" class="empty-data"></div>
        <div v-for="item in blogPageInfo.list" :key="item.id" v-else>
          <BlogItem
            :title="item.title"
            :cover="item.cover"
            :summary="item.summary"
            :createdAt="item.createdAt"
            :nickName="item.nickName"
            :categoryName="item.categoryName"
            :blogId="item.id"
            :userId="item.userId"
            :categoryId="item.categoryId"
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
      <div class="user-list">
        <div class="part-title">
          <span>博客成员</span>
          <router-link to="/users">更多&gt;&gt;</router-link>
        </div>
        <ul>
          <li v-for="user in userList" :key="user.id">
            <UserItem
              :avatar="user.avatar"
              :nickName="user.nickName"
              :blogCount="user.blogCount"
              :profession="user.profession"
              :userId="user.id"
            >
            </UserItem>
          </li>
        </ul>
      </div>
      <div class="special-list">
        <div class="part-title">
          <span>专题</span>
          <router-link to="/specials">更多&gt;&gt;</router-link>
        </div>
        <ul>
          <li v-for="item in specialList" :key="item.id">
            <CategoryItem
              :cover="item.cover"
              :name="item.categoryName"
              :count="item.blogCount"
              :type="'special'"
              :categoryId="item.id"
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
  UserObj,
  DatasourceWithPages
} from '@/types/DataInterfaces'
import {
  getCurrentInstance,
  ref,
  ComponentInternalInstance,
  reactive,
  onUnmounted
} from 'vue'

const { proxy } = <ComponentInternalInstance>getCurrentInstance()

const api = {
  getBlogList: '/front/blogs',
  getCategories: '/front/categories',
  getSpectials: '/front/specials',
  getUserList: '/front/users'
}

// 博客列表
const blogPageInfo = reactive(<DatasourceWithPages<BlogObj>>{
  pageSize: 7,
  list: []
})

const getBlogList = async () => {
  const { pageNo, pageSize } = blogPageInfo
  const result = await proxy?.$request({
    url: api.getBlogList,
    method: 'GET',
    params: { pageNo, pageSize }
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
    params: { pageSize: 3 }
  })
  categoryList.value = result.data
}
getCategoryList()

// 专题列表
const specialList = ref<CategoryObj[]>([])
const getSpecialList = async () => {
  const result = await proxy?.$request({
    url: api.getSpectials,
    method: 'GET',
    params: { pageSize: 3 }
  })
  console.log(result)
  specialList.value = result.data.list
}

getSpecialList()

// 成员列表
const userList = ref<UserObj[]>([])
const getUserList = async () => {
  const result = await proxy?.$request({
    url: api.getUserList,
    method: 'GET',
    params: { pageSize: 3 }
  })
  if (!result) return
  userList.value = result.data
}
getUserList()

onUnmounted(() => {
  console.log('blogvue,,,,onUnmounted页面卸载了')
})
</script>

<style lang="less" scoped>
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
