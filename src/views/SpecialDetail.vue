<template>
  <div class="special-body">
    <div class="left">
      <div class="special-info">
        <div class="cover">
          <img
            :src="proxy?.$globalInfo.imageUrl + specialInfo.cover"
            v-if="specialInfo.cover"
          />
          <img src="../assets/default_cover.png" v-else />
        </div>
        <div class="special-panel">
          <div class="category-name">{{ specialInfo.categoryName }}</div>
          <div>文章数：{{ specialInfo.blogCount }}</div>
        </div>
      </div>
      <div class="special-desc">简介：{{ specialInfo.categoryDesc }}</div>
      <div class="blog-tree">
        <el-tree
          ref="treeRef"
          :data="specialInfo.blogs"
          :props="defaultProps"
          @node-click="handleNodeClick"
          default-expand-all
          :check-on-click-node="true"
          :node-key="'id'"
          :highlight-current="true"
        />
      </div>
    </div>
    <div class="right">
      <div class="content" id="blogContent" v-html="blogInfo.content"></div>
      <el-button
        type="warning"
        size="small"
        class="show-toc-btn"
        :style="{ right: showTocBtnRightPosition + 'px' }"
        v-show="!isShowToc"
        @click.prevent="isShowToc = !isShowToc"
      >
        显示目录
      </el-button>
      <transition>
        <div class="toc-list" v-show="isShowToc" id="toc-parent">
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
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 代码高亮显示需要的两个组件
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
import {
  ComponentInternalInstance,
  getCurrentInstance,
  reactive,
  nextTick,
  ref,
  VNodeRef,
  onMounted,
  onBeforeUnmount
} from 'vue'
import { useRoute } from 'vue-router'
import { BlogObj, CategoryObj } from '@/types/DataInterfaces'
const { proxy } = <ComponentInternalInstance>getCurrentInstance()

hljs.configure({
  ignoreUnescapedHTML: true
})

const route = useRoute()

const specialId = route.params.specialId

const api = {
  specialDetail: '/front/specials'
}

const defaultProps = {
  children: 'children',
  label: 'title',
  value: 'blogId'
}

const treeRef = ref<VNodeRef | undefined>(undefined)
const blogInfo = reactive(<BlogObj>{})

const specialInfo = reactive(<CategoryObj>{})
const getSpecialDetail = async () => {
  const result = await proxy?.$request({
    url: api.specialDetail + '/' + specialId,
    method: 'GET'
  })

  if (!result) return
  Object.assign(specialInfo, result.data)
  nextTick(() => {
    console.log(specialInfo.blogs.length)
    if (specialInfo.blogs.length > 0) {
      treeRef.value.setCurrentKey(specialInfo.blogs[0].id)
      handleNodeClick(specialInfo.blogs[0])
    }
  })
}
getSpecialDetail()

// 文章树点击的响应事件
const handleNodeClick = (blog: BlogObj) => {
  Object.assign(blogInfo, blog)
  nextTick(() => {
    const blocks = document.querySelectorAll('pre code')
    blocks.forEach((block) => hljs.highlightElement(block as HTMLElement))
    tocs.value = []
    createToc()
  })
}

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

const showTocBtnRightPosition = ref((window.innerWidth - 1350) / 2 + 10)
const isShowToc = ref(false)

onMounted(() => {
  document.addEventListener('click', (e) => {
    const element = e.target as HTMLInputElement
    if (element.textContent?.trim() == '显示目录') {
      return
    }

    console.log(element)
    isShowToc.value = false
  })

  // 添加窗口变化事件
  window.addEventListener('resize', () => {
    showTocBtnRightPosition.value = (window.innerWidth - 1350) / 2 + 10
  })
})

onBeforeUnmount(() => {
  console.log('移除方法调用了')
  window.removeEventListener('resize', () => {})
  document.removeEventListener('click', () => {})
})
</script>

<style lang="less" scoped>
.special-body {
  display: flex;
  margin-top: 10px;
  background-color: @theme-fornt-color;
  .left {
    width: 300px;
    .special-info {
      display: flex;
      padding: 10px;
      .cover {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 70px;
        height: 70px;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .special-panel {
        padding: 10px;
      }
    }
    .special-desc {
      padding: 10px;
      border-bottom: 1px solid @theme-border-color;
    }
    .blog-tree {
      margin-top: 10px;
      margin-left: 10px;
      .el-tree {
        background-color: @theme-fornt-color;
        color: @theme-text-color;
        :deep(.el-tree-node__content) {
          &:hover {
            background-color: @thme-code-bg-color;
            color: @theme-high-color;
          }
        }
        :deep(.el-tree-node.is-current > .el-tree-node__content) {
          background-color: @thme-code-bg-color;
          color: @theme-high-color;
        }
      }
    }
  }

  .right {
    flex: 1;
    // position: relative;
    border-left: 1px solid @theme-border-color;
    width: 1050px;
    .content {
      line-height: 40px;
      padding: 20px 20px;
      // max-height: calc(100vh - 160px);
      overflow: auto;

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
        white-space: pre-wrap;
        padding: 40px 10px 10px;
        background-color: @thme-code-bg-color;
        border-radius: 5px;
        border: 1px solid #324560;
        max-width: 100%;
      }

      :deep(pre > code) {
        word-wrap: break-word;
        background-color: #192133;
        color: #aaa;
        font-weight: 700;
        line-height: 20px;
        max-width: 100%;
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
    .show-toc-btn {
      position: fixed;
      top: 100px;
    }
    .toc-list {
      position: fixed;
      top: 100px;
      right: 10px;
      width: 200px;
      max-height: 500px;
      overflow: auto;
      border: 1px solid @theme-border-color;
      background-color: @theme-fornt-color;
      padding: 10px;
      .part-title {
        padding: 10px 0;
        border-bottom: 1px solid @theme-border-color;
      }
      .no-toc {
        padding: 10px;
        text-align: center;
        color: #aaa;
      }
      ul {
        padding: 20px 0;
        li {
          list-style: none;
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

.v-enter-active {
  animation: tocShow 0.5s;
}

.v-leave-active {
  animation: tocShow 0.5s reverse;
}

@keyframes tocShow {
  from {
    // transform: translate(100%);
    top: 100px;
    right: -200px;
  }
  to {
    // transform: translateX(100%);
    top: 100px;
    right: 5px;
  }
}
</style>
