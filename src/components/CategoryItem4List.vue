<template>
  <div class="container">
    <el-card class="card">
      <img
        :src="proxy?.$globalInfo.imageUrl + data.cover"
        v-if="data.cover"
        class="cover"
      />
      <img src="../assets/default_cover.png" class="cover" v-else />

      <div class="content">
        <h3>
          <router-link :to="'/categories/' + data.id" v-if="type == 'category'">
            {{ data.categoryName }}
          </router-link>
          <router-link :to="'/specials/' + data.id" v-else>{{
            data.categoryName
          }}</router-link>
        </h3>
        <div class="bottom">
          <p class="desc">{{ data.categoryDesc }}</p>
          <p class="count">
            <span>{{ data.blogCount }}</span>
            篇
          </p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { CategoryObj } from '@/types/DataInterfaces'
import { PropType, getCurrentInstance, ComponentInternalInstance } from 'vue'

const { proxy } = <ComponentInternalInstance>getCurrentInstance()
const props = defineProps({
  data: {
    type: Object as PropType<CategoryObj>,
    required: true
  },
  type: String
})
</script>
<style lang="less" scoped>
.container {
  padding: 10px;
  .card {
    border: none;
    background-color: @thme-code-bg-color;
    .cover {
      width: 100%;
    }

    .content {
      padding: 10px;
      h3 {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .bottom {
        position: relative;
        margin-top: 10px;
        color: #999;
        .desc {
          max-width: 170px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .count {
          position: absolute;
          bottom: 0;
          right: -10px;
          width: 40px;
          font-size: @small-font-size;
          text-align: right;
          span {
            color: @theme-high-color;
          }
        }
      }
    }
  }
}
</style>
