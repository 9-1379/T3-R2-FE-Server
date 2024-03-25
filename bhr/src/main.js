import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import routers from './router'

const app = createApp(App);
app.config.globalProperties.$axios = axios; // axios를 전역 속성으로 추가
app.use(routers).mount('#app');
