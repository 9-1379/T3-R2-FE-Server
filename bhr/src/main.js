import { createApp } from 'vue'
import axiosInstance from './axios'; // 2단계에서 생성한 인스턴스를 가져옵니다.
import App from './App.vue'
import routers from './router'


const app = createApp(App);
app.use(routers).mount('#app');
// 애플리케이션 인스턴스에 axios 인스턴스 추가
app.config.globalProperties.$axios = axiosInstance;
<<<<<<< HEAD
<<<<<<< HEAD
=======

app.use(router);
app.mount('#app');
>>>>>>> dev
=======
app.use(router);
app.mount('#app');

>>>>>>> 872128eaeece9df8abcf79318ca8324d7e3a1f82
