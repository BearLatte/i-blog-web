<template>
  <div class="container-header">
    <div class="nav">
      <h1 class="nav-logo">
        <router-link to="/" title="i-Blog，让你爱上书写"> i-Blog </router-link>
      </h1>
      <router-link
        :class="['nav-item', menu.path == activePath ? 'active' : '']"
        v-for="(menu, index) in menus"
        :key="index"
        :to="menu.path"
      >
        {{ menu.name }}
      </router-link>
    </div>
  </div>
  <div class="container-body">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component
          :is="Component"
          :key="route.name"
          v-if="route.meta.keepAlive"
        />
      </keep-alive>
      <component
        :is="Component"
        :key="route.name"
        v-if="!route.meta.keepAlive"
      />
    </router-view>
  </div>
  <div class="container-footer">
    <p>
      ©2023-{{ new Date().getFullYear() }} {{ systemInfo.icpDomain }} All rights
      reserved.
      {{ systemInfo.policeProvince }}
      ICP备
      {{ systemInfo.icpNo }}
    </p>
    <p>{{ systemInfo.policeProvince }}公网安备</p>
  </div>
</template>

<script setup lang="ts">
import { SystemSettings } from '@/types/DataInterfaces'
import { useRouter, useRoute } from 'vue-router'
import {
  ComponentInternalInstance,
  getCurrentInstance,
  reactive,
  ref,
  watch
} from 'vue'

const { proxy } = <ComponentInternalInstance>getCurrentInstance()
const route = useRoute()
const router = useRouter()
const systemInfo = reactive<SystemSettings>(<SystemSettings>{})
const api = {
  getSysInfo: '/front/getSysInfo'
}

const initRemoteData = async () => {
  const result = await proxy?.$request({
    url: api.getSysInfo
  })
  if (!result) return
  Object.assign(systemInfo, result.data)
}

initRemoteData()

// 路由菜单
const menus = ref<{ name: string; path: string }[]>([
  {
    name: '博客',
    path: '/'
  },
  {
    name: '分区专栏',
    path: '/categories'
  },
  {
    name: '专题',
    path: '/specials'
  },
  {
    name: '成员',
    path: '/users'
  }
])

const activePath = ref<string | undefined>(undefined)
watch(
  () => router,
  (currentRouter) => {
    activePath.value = currentRouter.currentRoute.value.meta
      .activePath as string
  },
  { immediate: true, deep: true }
)
</script>

<style lang="less" scoped>
.container-header {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 80px;
  background-color: #292d3e;
  box-shadow: 0 2px 6px 0 #222;
  .nav {
    margin: 0 auto;
    width: @content-width;
    min-width: @content-min-width;
    display: flex;
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
    .nav-item {
      margin-top: 30px;
      height: 40px;
      margin-left: 20px;
      padding: 0 40px;
      line-height: 40px;
      font-size: @theme-top-title-size;
    }

    .active {
      color: @theme-high-color;
    }
  }
}
.container-body {
  min-height: calc(100vh - 60px);
  margin: 0px auto;
  width: @content-width;
  min-width: @content-min-width;
  padding-top: 80px;
  padding-bottom: 10px;
}
.container-footer {
  height: 60px;
  font-size: 12px;
  text-align: center;
  p {
    height: 20px;
    line-height: 20px;
  }
}
</style>
