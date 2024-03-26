import { createRouter, createWebHistory } from 'vue-router'

// import HelloWorld from '@/components/HelloWorld.vue'; //메인 컴포넌트 호출
import LoginMain from '@/components/LoginMain.vue';
import LoginSuccess from '@/components/LoginSuccess.vue';
import EmpDashboard from '@/components/EmpDashboard.vue';
import EmpList from '@/components/EmpList.vue';
import NewEmp from '@/components/NewEmp.vue';

const routes = [
  {
    path:'/',
    name:'LoginMain',
    component:LoginMain
  },
  {
    path: '/success',
    name: 'LoginSuccess', // 여기에 문자열 이름을 사용
    component: LoginSuccess
},
  {
    path: '/dashboard',
    name: 'EmpDashboard',
    component: EmpDashboard
  },
  {
    path: '/list',
    name: 'EmpList',
    component: EmpList
  },
  {
    path: '/new',
    name: 'NewEmp',
    component: NewEmp

  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
