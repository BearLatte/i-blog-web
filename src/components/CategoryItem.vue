<template>
  <div class="category-item">
    <div class="cover">
      <img :src="proxy?.$globalInfo.imageUrl + cover" v-if="cover" alt="" />
      <img src="../assets/default_cover.png" alt="" />
    </div>
    <h4 class="name">
      <router-link :to="'/categories/' + categoryId" v-if="type == 'category'">
        {{ name }}
      </router-link>
      <router-link :to="'/specials/' + categoryId" v-if="type == 'special'">
        {{ name }}
      </router-link>
    </h4>
    <div class="count">{{ count }}篇</div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ComponentInternalInstance } from 'vue'
const { proxy } = <ComponentInternalInstance>getCurrentInstance()
const props = defineProps({
  categoryId: Number,
  cover: {
    type: String,
    default: undefined
  },
  name: String,
  count: Number,
  type: String
})
</script>
<style lang="less" scoped>
.category-item {
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 10px;
  .cover {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .name {
    flex: 1;
    margin: 0 10px;
    word-break: break-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .count {
    width: 50px;
    text-align: right;
    font-size: @small-font-size;
  }
}
</style>
