import { createApp } from 'vue'
import App from './App.vue'
import { initRouter } from './router'
import request from './utils/request'
import message from './utils/Message'
import func from './utils/func'

const env = import.meta.env
console.log(env)

const app = createApp(App)
initRouter(app)
// axios封装，挂载到全局实例
app.config.globalProperties.$request = request
app.config.globalProperties.$indicator = message
app.config.globalProperties.$globalInfo = {
  imageUrl: '/files'
}
app.config.globalProperties.$func = func
app.mount('#app')
