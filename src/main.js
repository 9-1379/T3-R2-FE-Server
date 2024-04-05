import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axiosInstance from './axios'; // 2단계에서 생성한 인스턴스를 가져옵니다.
import store from './store/store.js';

const app = createApp(App)



// 애플리케이션 인스턴스에 axios 인스턴스 추가
app.config.globalProperties.$axios = axiosInstance;
app.config.globalProperties.$store = store;

app.use(router);
app.mount('#app');
