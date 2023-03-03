<template>
  <div class="users-container">
    <UserItem4List
      v-for="user in userList"
      :key="user.id"
      :data="user"
      class="list-item"
    >
    </UserItem4List>
  </div>
</template>

<script lang="ts" setup>
import { UserObj } from '@/types/DataInterfaces'
import {
  ref,
  getCurrentInstance,
  ComponentInternalInstance,
  nextTick
} from 'vue'
import UserItem4List from '@/components/UserItem4List.vue'

const { proxy } = <ComponentInternalInstance>getCurrentInstance()

const api = {
  loadUsers: '/front/users'
}

// 获取用户列表
const userList = ref<UserObj[]>([])
const getUserList = async () => {
  const result = await proxy?.$request({
    url: api.loadUsers,
    method: 'GET'
  })
  if (!result) return
  userList.value = result.data

  nextTick(() => {
    let url = document.location.href
    let hashId = url.substring(url.indexOf('#') + 1)
    console.log(hashId)
    document.getElementById(hashId)?.scrollIntoView()
  })
}
getUserList()
</script>
<style lang="less" scoped>
.users-container {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  .list-item {
    width: 100%;
    margin: 10px;
  }
}
</style>
