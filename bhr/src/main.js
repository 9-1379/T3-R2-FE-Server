import { createApp } from 'vue'
// import axios from 'axios'
import App from './App.vue'
import routers from './router'  // router import
import axios from 'axios';

// Axios 인스턴스 생성 및 설정
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000'
});

// 모든 Vue 인스턴스에서 `$http`를 통해 접근할 수 있도록 설정
Vue.prototype.$http = axiosInstance;

// app.config.globalProperties.$axios = axios;
createApp(App).mount('#app').use(routers)

