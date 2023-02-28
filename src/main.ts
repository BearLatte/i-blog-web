import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import request from './utils/request'
import message from './utils/Message'

const env = import.meta.env
console.log(env)

const app = createApp(App)
app.use(router)
// axios封装，挂载到全局实例
app.config.globalProperties.$request = request
app.config.globalProperties.$indicator = message
app.mount('#app')
