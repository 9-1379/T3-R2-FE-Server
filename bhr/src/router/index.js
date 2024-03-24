import { createRouter, createWebHistory } from 'vue-router'
// import HelloWorld from '@/components/HelloWorld.vue'; //메인 컴포넌트 호출
import LoginMain from '@/components/LoginMain.vue';
import EmpDashboard from '@/components/EmpDashboard.vue';

const routes = [

  {
    path:'/',
    name:'LoginMain',
    component:LoginMain
  },
  {
    path: '/dashboard',
    name: 'EmpDashboard',
    component: EmpDashboard
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router