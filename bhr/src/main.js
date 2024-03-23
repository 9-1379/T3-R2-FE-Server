import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 변수명이 일관성 있게 변경되었습니다.

createApp(App).use(router).mount('#app'); // 순서가 중요합니다!


