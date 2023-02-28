<template>
  <div class="container">
    <div class="container-header">
      <div class="nav">
        <h1 class="nav-logo">
          <router-link to="/" title="i-Blog，让你爱上书写">
            i-Blog
          </router-link>
        </h1>
        <div class="item-container">
          <router-link to="/" class="nav-item">博客</router-link>
          <router-link to="/" class="nav-item">分类专栏</router-link>
          <router-link to="/" class="nav-item">专题</router-link>
          <router-link to="/" class="nav-item">成员</router-link>
        </div>
      </div>
    </div>
    <div class="container-body">sdasfdasfasdfasddfasdfasdfasdfsdafsda</div>
    <div class="container-footer">
      <p>
        ©2023-{{ new Date().getFullYear() }} {{ systemInfo.icpDomain }} All
        rights reserved.
        {{ systemInfo.policeProvince }}
        ICP备
        {{ systemInfo.icpNo }}
      </p>
      <p>{{ systemInfo.policeProvince }}公网安备</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SystemSettings } from '@/types/DataInterfaces'
import {
  ComponentInternalInstance,
  getCurrentInstance,
  onMounted,
  reactive,
  toRefs
} from 'vue'

const { proxy } = <ComponentInternalInstance>getCurrentInstance()
const data = reactive({
  systemInfo: {} as SystemSettings
})
const { systemInfo } = toRefs(data)
const api = {
  getSysInfo: '/front/getSysInfo'
}

const initRemoteData = async () => {
  const result = await proxy?.$request({
    url: api.getSysInfo
  })
  if (!result) return
  systemInfo.value = result.data
}

// initRemoteData()

onMounted(() => {
  initRemoteData()
})
</script>

<style lang="less" scoped>
.container-header {
  position: fixed;
  height: 80px;
  box-shadow: 0 2px 6px 0 #222;
  width: 100%;

  .nav {
    display: flex;
    position: relative;
    width: @content-width;
    min-width: @content-min-width;
    height: 80px;
    margin: 0 auto;

    .nav-logo {
      margin-left: 10px;
      width: 130px;
      height: 80px;
      a {
        display: block;
        width: 130px;
        height: 80px;
        font-size: 0;
        background: url(./assets/web_logo.png) no-repeat;
        background-size: cover;
      }
    }

    .item-container {
      position: absolute;
      display: flex;
      bottom: 10px;
      left: 140px;
      height: 40px;
      .nav-item {
        height: 40px;
        margin-left: 20px;
        padding: 0 40px;
        font-size: @theme-top-title-size;
        line-height: 40px;
      }
      .active {
        color: @theme-high-color;
      }
    }
  }
}

.container-body {
  padding-top: 80px;
  width: @content-width;
  min-width: @content-min-width;
  margin: 0 auto;
}

.container-footer {
  font-size: 12px;
  text-align: center;
  p {
    height: 20px;
  }
}
</style>
