<<<<<<< HEAD
import { createRouter, createWebHistory } from 'vue-router'

// import HelloWorld from '@/components/HelloWorld.vue'; //메인 컴포넌트 호출
import LoginMain from '@/components/LoginMain.vue';
import LoginSuccess from '@/components/LoginSuccess.vue';
import EmpDashboard from '@/components/EmpDashboard.vue';

const routes = [
  {
    path:'/',
    name:'LoginMain',
    component:LoginMain
=======
import { createRouter, createWebHistory } from 'vue-router';
// import HelloWorld from '@/components/HelloWorld.vue';
import LoginMain from '@/components/LoginMain.vue'; // 메인 컴포넌트 호출
import LoginSuccess from '@/components/LoginSuccess.vue'; // 성공 컴포넌트 호출
import EmpList from '@/components/EmpList.vue';
import NewEmp from '@/components/NewEmp.vue';

const routes = [
  {
    path: '/',
    name: 'LoginMain', // 경로 이름은 그대로 유지됩니다.
    component: LoginMain // 임포트된 컴포넌트 이름을 사용합니다.
>>>>>>> dev
  },
  {
    path: '/success',
    name: 'LoginSuccess', // 여기에 문자열 이름을 사용
    component: LoginSuccess
<<<<<<< HEAD
},
  {
    path: '/dashboard',
    name: 'EmpDashboard',
    component: EmpDashboard
=======
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
>>>>>>> dev
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
