import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.interceptors.request.use((config) => {
    config.baseURL = 'http://localhost'
    // config.headers['leel'] = 'ram'
    config.url = config.url.replace('https://', 'http://')
    return config
})

createApp(App).use(store).use(router).mount('#app')