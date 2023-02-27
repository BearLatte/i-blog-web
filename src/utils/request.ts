import axios from 'axios'
import { ElLoading } from 'element-plus'
import message from './Message.js'

enum ContentType {
  // form 表单格式，默认值
  form = 'application/x-www-form-urlencoded;charset=UTF-8',
  // json 格式
  json = 'application/json',
  // formdata 格式
  file = 'multipart/form-data'
}

// 此处声明成接口
interface RequestConfig {
  url: string,
  method?: string,
  params?: { [key: string]: any },
  dataType?: ContentType,
  showLoading?: boolean,
  errorCallback?: () => void
}


const request = async (config: RequestConfig) => {
  let { url, method, dataType, params, showLoading } = config
  method = method ? method : 'GET'
  dataType = dataType ? dataType : ContentType.form
  showLoading = showLoading ? showLoading : true
  if (dataType == ContentType.file) {
    let param = new FormData()
    for (const key in params) {
      param.append(key, params[key])
    }
    params = param
  }

  const instance = axios.create({
    baseURL: '',
    timeout: 10 * 1000,
    headers: {
      'Content-Type': dataType,
      'X-Requested-with': 'XMLHttpRequest'
    }
  })

  let loading : any  = null
  // 请求前拦截
  instance.interceptors.request.use(
    (config) => {
      if (showLoading) {
        loading = ElLoading.service({
          lock: true,
          text: '加载中....',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      }
      return config
    },
    () => { 
      if (showLoading && loading) {
        loading.close()
        message.error('发送请求失败')
        return Promise.reject('发送请求失败')
      }
    }
  )

  // 请求后拦截
  instance.interceptors.response.use((response) => {
    if (showLoading && loading) {
      loading.close()
    }
    let responseData = response.data
    // 处理返回信息
    if (responseData.status != 0) {
      if (config.errorCallback) {
        config.errorCallback()
      }
      return Promise.reject(responseData.message)
    }

    return responseData
  }, (error) => { 
    console.log(error)
    if (showLoading && loading) {
      loading.close()
      return Promise.reject('网络异常')
    }
  })

  // 请求方法处理
  if (method.toLowerCase() == 'post') {
    return instance.post(url, params).catch(
      (error) => {
        message.error(error)
        return null
      }
    )
    
  } else if (method.toLocaleLowerCase() == 'delete') {
    return instance.delete(url, params).catch((error) => {
      message.error(error)
      return null
    })
  } else if (method.toLowerCase() === 'put') {
    return instance.put(url, params).catch((error) => {
      message.error(error)
      return null
    })
  } else if (method.toLowerCase() === 'options') {
    return instance.options(url, params).catch((error) => {
      message.error(error)
      return null
    })
  } else {
    return instance.get(url, params).catch((error) => {
      message.error(error)
      return null
    })
  }
}

export default request
