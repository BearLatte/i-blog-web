<template>
  <div class="blog-item">
    <div class="cover">
      <img :src="proxy?.$globalInfo.imageUrl + cover" alt="" v-if="cover" />
      <img src="../assets/default_cover.png" v-else />
    </div>
    <div class="content">
      <h4 class="title">
        <router-link :to="'/blog/' + blogId">{{ title }}</router-link>
      </h4>
      <p class="summary">{{ summary }}</p>
      <div class="info">
        <span>{{ proxy?.$func.dateformatter(createdAt) }}</span>
        <span>
          作者：<router-link :to="'/users#' + userId">
            {{ nickName }}
          </router-link>
        </span>
        <span>
          分类专栏：<router-link :to="'/categories/' + categoryId">{{
            categoryName
          }}</router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ComponentInternalInstance, PropType } from 'vue'
const { proxy } = <ComponentInternalInstance>getCurrentInstance()

const props = defineProps({
  cover: {
    type: String,
    default: undefined
  },
  title: {
    type: String,
    default: undefined
  },
  summary: {
    type: String,
    default: undefined
  },
  createdAt: {
    type: String,
    default: undefined
  },
  nickName: {
    type: String,
    default: undefined
  },
  categoryName: {
    type: String,
    default: undefined
  },
  blogId: {
    type: Number,
    default: undefined
  },
  userId: {
    type: Number,
    default: undefined
  },
  categoryId: {
    type: Number,
    default: undefined
  }
})
</script>
<style lang="less" scoped>
.blog-item {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid @theme-border-color;
  .cover {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 110px;
    height: 110px;
    overflow: hidden;
    border-radius: 5px;
    img {
      width: 100%;
    }
  }
}
.content {
  position: relative;
  flex: 1;
  margin-left: 10px;
  .title {
    margin-top: 10px;
    font-weight: 700;
    height: 20px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    a {
      font-size: @theme-content-title-size;
      color: @theme-high-color;
    }
    a:hover {
      color: #c3e88d;
    }
  }

  .summary {
    word-break: break-all;
    margin-top: 6px;
    font-size: @theme-content-font-size;
    line-height: 22px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .info {
    position: absolute;
    bottom: 0;
    span {
      font-size: @small-font-size;
      margin-right: 30px;
    }
  }
}
</style>
