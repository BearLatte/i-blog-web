// 系统设置类型
export interface SystemSettings {
  // icp 备案号
  icpNo: string
  // 公安备案号
  policeNo: string
  // 域名
  icpDomain: string
  // 是否开启gitpages
  gitPageType: number
  // 公安备案省份
  policeProvince: string
  // 是否开启评论
  openCommentType: number
}

// 博客类型接口
export interface BlogObj {
  // 唯一标识
  id: number
  // 标签
  tag: string
  // 博客标题
  title: string
  // 博客封面
  cover: string
  // 博客内容
  content: string
  // 创建时间
  createdAt: string
  // 分类名称
  categoryName: string
  // 作者昵称
  nickName: string
  // 转载地址
  reprintUri: string
  // 发布类型名称
  sourceTypeName: string
  // 博客简介
  summary: string
}

// 博客分类接口
export interface CategoryObj {
  id: number
  cover: string
  nickName: string
  createdAt: string
  categoryName: string
  categoryDesc: string
  categoryType: number
  blogCount: number
}

// 用户接口
export interface UserObj {
  // 唯一标识
  id: number
  // 昵称
  nickName: string
  // 头像
  avatar: string
  // 手机号
  phone: string
  // 职业
  profession: string
  // 个人介绍
  introduction: string
  // 最后登录时间
  lastLoginTime: string
  // 博客数量
  blogCount: number
}

export interface DatasourceWithPages<T> {
  pageNo?: number
  pageSize?: number
  totalCount?: number
  list: T[]
}
