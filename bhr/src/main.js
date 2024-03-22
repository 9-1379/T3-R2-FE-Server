import { createApp } from 'vue'
// import axios from 'axios'
import App from './App.vue'
import routers from './router'  // router import

// app.config.globalProperties.$axios = axios;
createApp(App).mount('#app').use(routers)

