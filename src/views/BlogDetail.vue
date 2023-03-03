<template>
  <div class="container blog-detail">
    <div class="left">
      <h2 class="title">{{ blog.title }}</h2>
      <div class="info">
        <span>{{ proxy?.$func.dateformatter(blog.createdAt) }}</span>
        <span>
          作者：<router-link to="">{{ blog.nickName }}</router-link>
        </span>
        <span>
          分区专栏：
          <router-link to="">
            {{ blog.categoryName }}
          </router-link>
        </span>
      </div>
      <div class="content" id="blogContent" v-html="blog.content"></div>
    </div>
    <div
      class="right"
      :style="{ right: rightPanelRightPosition - scrollBarWidth + 'px' }"
      v-show="isShowRightPanel"
    >
      <div class="toc-list">
        <div class="part-title">
          <span>目录结构</span>
        </div>
        <div class="no-toc" v-if="tocs.length == 0">暂无目录</div>
        <ul v-else>
          <li
            v-for="item in tocs"
            :key="item.id"
            :style="{ paddingLeft: (item.level - 1) * 15 + 'px' }"
          >
            <a :href="'#' + item.id">{{ item.title }}</a>
          </li>
        </ul>
      </div>
      <div class="category-list">
        <div class="part-title">
          <span>分类专栏</span>
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
  ref,
  getCurrentInstance,
  ComponentInternalInstance,
  reactive,
  nextTick,
  onMounted
} from 'vue'
import { BlogObj, CategoryObj } from '@/types/DataInterfaces'
import { useRoute } from 'vue-router'

// 代码高亮显示需要的两个组件
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'

hljs.configure({
  ignoreUnescapedHTML: true
})

// 从路由对象中获取当前跳转的博客id
const route = useRoute()
const blogId = ref(route.params.blogId)
const { proxy } = <ComponentInternalInstance>getCurrentInstance()
const api = {
  detail: '/front/blogDetail',
  getCategories: '/front/categories'
}

const blog = reactive(<BlogObj>{})
const getBlogDetail = async () => {
  const result = await proxy?.$request({
    url: api.detail,
    method: 'GET',
    params: { blogId: blogId.value }
  })
  console.log(result)
  if (!result) return
  Object.assign(blog, result.data)
  // 将代码找出来高亮显示
  nextTick(() => {
    const blocks = document.querySelectorAll('pre code')
    blocks.forEach((block) => hljs.highlightElement(block as HTMLElement))
    createToc()

    // 判断是否有滚动条
    // const hasScrollBar = document.body.scrollHeight > window.innerHeight
    // const scrollBarWidth = hasScrollBar ? 4 : 0
    proxy?.$func.triggerResize()
  })
}

getBlogDetail()

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

// 目录结构
const tocs = ref<{ id: string; title: string; level: number }[]>([])
const tocTag = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
const createToc = () => {
  const contentDom = document.querySelector('#blogContent')
  const chilNodes = contentDom?.childNodes
  let index = 0
  chilNodes?.forEach((element) => {
    let nodeName = element.nodeName
    if (nodeName == undefined) {
      return true
    }
    if (!tocTag.includes(nodeName.toUpperCase())) {
      return true
    }

    index++
    const id = 'toc' + index
    ;(element as HTMLElement).setAttribute('id', id)

    tocs.value.push({
      id: id,
      title: (element as HTMLElement).innerText,
      level: Number.parseInt(nodeName.substring(1))
    })
  })
}
createToc()

onMounted(() => {
  // window添加resize时间，重新计算右边面板距离右边的位置
  window.addEventListener('resize', () => {
    console.log('方法是否调用')
    // 判断是否有滚动条
    const hasScrollBar = document.body.scrollHeight > window.innerHeight
    scrollBarWidth.value = hasScrollBar ? 4 : 0
    rightPanelRightPosition.value = (window.innerWidth - 1350) / 2
    isShowRightPanel.value = window.innerWidth >= 1350
  })
})

const scrollBarWidth = ref(0)
const isShowRightPanel = ref(window.innerWidth >= 1350)
const rightPanelRightPosition = ref((window.innerWidth - 1350) / 2)
</script>
<style lang="less" scoped>
.blog-detail {
  .left {
    width: 1040px;
    flex: none;
    .title {
      color: @theme-high-color;
    }
    .info {
      margin: 15px 0;
      background-color: @thme-code-bg-color;
      span {
        padding: 10px;
        display: inline-block;
        margin-right: 30px;
      }
    }
    .content {
      line-height: 40px;
      padding: 20px 20px;
      background-color: @theme-bolg-content-bg-color;

      :deep(img) {
        max-width: 100%;
      }

      :deep(a) {
        color: #71bfd9;
      }

      :deep(blockquote) {
        padding: 0 1em;
        color: #a9aaab;
        border-left: 0.25em solid #f0b751;
      }
      :deep(pre) {
        position: relative;
        margin: 20px;
        white-space: pre-wrap;
        padding: 40px 10px 10px;
        background-color: @thme-code-bg-color;
        border-radius: 5px;
        border: 1px solid #324560;
      }

      :deep(pre > code) {
        word-wrap: break-word;
        background-color: #192133;
        color: #aaa;
        font-weight: 400;
        line-height: 20px;
      }
      :deep(code) {
        background-color: #6952b6;
        padding: 5px;
        border-radius: 5px;
        font-weight: 700;
        color: #fff;
      }

      :deep(pre::before) {
        content: '';
        position: absolute;
        -webkit-border-radius: 50%;
        border-radius: 50%;
        background: #fc625d;
        width: 12px;
        height: 12px;
        top: 10px;
        left: 12px;
        -webkit-box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
        box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
        z-index: 2;
      }

      :deep(ul > li) {
        margin-left: 15px;
      }

      :deep(ul > li::marker) {
        color: #f0b751;
      }

      :deep(ol > li) {
        margin-left: 15px;
      }

      :deep(ol > li::marker) {
        color: #f0b751;
      }

      :deep(table) {
        position: relative;
        width: 100%;
        font-size: 0.875rem;
        padding: 0;
        word-break: initial;
        border-collapse: collapse;
        border-spacing: 0px;
        overflow: auto;
        break-inside: auto;
        text-align: left;
        margin: 25px 0;
        margin-bottom: 30px;
        // border-top: 20px solid #f0b752;
      }

      :deep(table::before) {
        content: '';
        position: absolute;
        top: -6px;
        width: 100%;
        height: 6px;
        background-color: #f0b752;
        border-top-left-radius: 3px;
        border-top-right-radius: 4px;
      }

      :deep(table tr) {
        border-top: 1px solid #57708d;
        margin: 0;
        padding: 0;
      }

      :deep(thead) {
        background-color: #324963;
        color: #9dbbdd;
      }

      :deep(table tr th) {
        border: 1px solid #57708d;
        border-bottom: solid 2px #ccc;
        border-bottom: 0;
        font-weight: bold;
        margin: 0;
        padding: 10px 16px;
      }

      :deep(table tr td) {
        background: #192534;
        border: 1px solid #57708d;
        margin: 0;
        padding: 10px 16px;
      }

      :deep(table tr th:first-child, table tr td:first-child) {
        margin-top: 0;
      }

      :deep(table tr th:last-child, table tr td:last-child) {
        margin-bottom: 0;
      }
    }
  }

  .right {
    position: fixed;
    .toc-list {
      .no-toc {
        padding: 10px;
        text-align: center;
        color: #aaa;
      }
      ul {
        padding: 20px 0;
        li {
          line-height: 25px;
          cursor: pointer;
        }
        li:hover {
          color: @theme-high-color;
        }
      }
    }
  }
}
</style>
