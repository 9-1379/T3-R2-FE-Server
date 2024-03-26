import { createApp } from 'vue';
import App from './App.vue';
<<<<<<< HEAD
import router from './router'; // 변수명이 일관성 있게 변경되었습니다.

createApp(App).use(router).mount('#app'); // 순서가 중요합니다!

=======
import router from './router';
import axiosInstance from './axios'; // 2단계에서 생성한 인스턴스를 가져옵니다.

const app = createApp(App);

// 애플리케이션 인스턴스에 axios 인스턴스 추가
app.config.globalProperties.$axios = axiosInstance;

app.use(router);
app.mount('#app');
>>>>>>> dev

