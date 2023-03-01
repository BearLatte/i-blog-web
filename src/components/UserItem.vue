<template>
  <div class="user-item">
    <div class="avatar">
      <img :src="proxy?.$globalInfo.imageUrl + avatar" />
    </div>
    <div class="info">
      <h4 class="nickName">
        <router-link to="/">{{ nickName }}</router-link>
      </h4>
      <p>{{ profession }}</p>
    </div>

    <div class="count">{{ blogCount }}篇</div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ComponentInternalInstance } from 'vue'
const { proxy } = <ComponentInternalInstance>getCurrentInstance()
const props = defineProps({
  avatar: {
    type: String,
    required: true
  },
  nickName: {
    type: String,
    required: true
  },
  blogCount: {
    type: Number,
    required: true
  },
  profession: String
})
</script>
<style lang="less" scoped>
.user-item {
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-top: 10px;
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .info {
    flex: 1;
    margin: 0 10px;
    .nickName {
      word-break: break-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      margin-top: 5px;
      font-size: @small-font-size;
      color: #777;
    }
  }

  .count {
    width: 50px;
    text-align: right;
    font-size: @small-font-size;
  }
}
</style>
