
import { createRouter, createWebHistory } from 'vue-router';
// import HelloWorld from '@/components/HelloWorld.vue';
import LoginMain from '@/components/LoginMain.vue'; // 메인 컴포넌트 호출
import LoginSuccess from '@/components/LoginSuccess.vue'; // 성공 컴포넌트 호출
import EmpDashboard from '@/components/EmpDashboard.vue';
import EmpList from '@/components/EmpList.vue';
import NewEmp from '@/components/NewEmp.vue';

const routes = [
  {
    path: '/',
    name: 'LoginMain', // 경로 이름은 그대로 유지됩니다.
    component: LoginMain // 임포트된 컴포넌트 이름을 사용합니다.
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
  routes
});

export default router;
