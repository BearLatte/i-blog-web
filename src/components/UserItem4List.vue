<template>
  <div class="user-item-user" :id="data?.id + ''">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h2>{{ data?.nickName }}</h2>
          <div class="avatar">
            <img
              :src="proxy?.$globalInfo.imageUrl + data?.avatar"
              v-if="data?.avatar"
            />
          </div>
        </div>
      </template>
      <div class="content">
        <div>
          <span class="field">职业信息：</span>
          <span class="field-value">{{ data?.profession }}</span>
        </div>
        <div>
          <span class="field">发布文章：</span>
          <div class="field-value">
            <span>已发布{{ data?.blogCount }}篇文章</span>
          </div>
        </div>
        <div>
          <span class="field">登录时间：</span>
          <span class="field-value">
            {{ proxy?.$func.dateformatter(data?.lastLoginTime) }}
          </span>
        </div>
        <div>
          <span class="field">个人简介：</span>
          <div class="field-value">{{ data?.introduction }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { UserObj } from '@/types/DataInterfaces'
import { PropType, getCurrentInstance, ComponentInternalInstance } from 'vue'

const { proxy } = <ComponentInternalInstance>getCurrentInstance()
const props = defineProps({
  data: Object as PropType<UserObj>
})
</script>
<style lang="less" scoped>
.user-item-user {
  .box-card {
    background-color: @theme-fornt-color;
    border: none;
    box-shadow: inset 0px 0px 5px 1px #222;
    :deep(.el-card__header) {
      border-bottom: 1px solid @theme-border-color;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      h2 {
        color: @theme-high-color;
      }
      .avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }

    .content {
      color: @theme-text-color;
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
        .field-value {
          // color: @theme-high-color;
          max-width: 1000px;
        }
      }
    }
  }
}
</style>
