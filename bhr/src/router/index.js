import { createRouter, createWebHistory } from 'vue-router';
// import HelloWorld from '@/components/HelloWorld.vue';
import LoginMain from '@/components/LoginMain.vue'; // MyLogin 대신 LoginMain을 임포트해야 합니다.
import EmpList from '@/components/EmpList.vue';
import NewEmp from '@/components/NewEmp.vue';

const routes = [
  {
    path: '/',
    name: 'LoginMain', // 경로 이름은 그대로 유지됩니다.
    component: LoginMain // 임포트된 컴포넌트 이름을 사용합니다.
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
