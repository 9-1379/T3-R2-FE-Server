import { createRouter, createWebHistory } from 'vue-router'
import LoginMain from '@/components/LoginMain.vue'; // 메인 컴포넌트 호출
import LoginSuccess from '@/components/LoginSuccess.vue'; // 성공 컴포넌트 호출

const routes = [
    {
        path: '/',
        name: 'LoginMain', // 여기에 문자열 이름을 사용
        component: LoginMain
    },
    {
        path: '/success',
        name: 'LoginSuccess', // 여기에 문자열 이름을 사용
        component: LoginSuccess
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
