// import request from '@/utils/request'
// import message from '@/utils/message'
// (config: RequestConfig) => Promise<AxiosResponse<any, any> | null>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BlogItem: import('@/components/BlogItem.vue')
    CategoryItem: import('@/components/CategoryItem.vue')
    UserItem: import('@/components/UserItem.vue')
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $request: import('@/utils/request')
    $indicator: import('@/utils/message')
    $globalInfo: { imageUrl: string }
    $func: import('@/utils/func')
  }
}
export {}
