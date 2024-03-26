<<<<<<< HEAD
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
=======

>>>>>>> 872128eaeece9df8abcf79318ca8324d7e3a1f82
import { createRouter, createWebHistory } from 'vue-router';
// import HelloWorld from '@/components/HelloWorld.vue';
import LoginMain from '@/components/LoginMain.vue'; // 메인 컴포넌트 호출
import LoginSuccess from '@/components/LoginSuccess.vue'; // 성공 컴포넌트 호출
<<<<<<< HEAD
=======
import EmpDashboard from '@/components/EmpDashboard.vue';
>>>>>>> 872128eaeece9df8abcf79318ca8324d7e3a1f82
import EmpList from '@/components/EmpList.vue';
import NewEmp from '@/components/NewEmp.vue';

const routes = [
  {
    path: '/',
    name: 'LoginMain', // 경로 이름은 그대로 유지됩니다.
    component: LoginMain // 임포트된 컴포넌트 이름을 사용합니다.
<<<<<<< HEAD
>>>>>>> dev
=======
>>>>>>> 872128eaeece9df8abcf79318ca8324d7e3a1f82
  },
  {
    path: '/success',
    name: 'LoginSuccess', // 여기에 문자열 이름을 사용
    component: LoginSuccess
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 872128eaeece9df8abcf79318ca8324d7e3a1f82
},
  {
    path: '/dashboard',
    name: 'EmpDashboard',
    component: EmpDashboard
<<<<<<< HEAD
=======
=======

>>>>>>> 872128eaeece9df8abcf79318ca8324d7e3a1f82
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
<<<<<<< HEAD
>>>>>>> dev
=======
>>>>>>> 872128eaeece9df8abcf79318ca8324d7e3a1f82
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
