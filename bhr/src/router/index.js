import { createRouter, createWebHistory } from 'vue-router';

// import HelloWorld from '@/components/HelloWorld.vue';
import LoginMain from '@/components/LoginMain.vue'; // 메인 컴포넌트 호출
import LoginSuccess from '@/components/LoginSuccess.vue'; // 성공 컴포넌트 호출
import EmpList from '@/components/EmpList.vue';
import NewEmp from '@/components/NewEmp.vue';
import AdminMenu from '@/components/menu/AdminMenu.vue';
import HrCardMain from '@/components/emp/hrcard/HrCardMain.vue';
import EmpDetail from '@/components/EmpDetail.vue'; // EmpDetail을 임포트합니다.
<<<<<<< HEAD
import EmpDashboard from '@/components/EmpDashboard.vue';
=======
import NewAnnual from '@/components/NewAnnual.vue';
>>>>>>> dev

const routes = [
  {
    path: '/',
    name: 'LoginMain',
    component: LoginMain
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
  },
  {
<<<<<<< HEAD
=======
    path: '/admin',
    name: 'AdminMenu',
    component: AdminMenu
  },
  {
    path: '/hrcard',
    name: 'HrCardMain',
    component: HrCardMain
  },
  {
>>>>>>> dev
    path: '/employees/:id', // 직원 상세 정보 페이지의 라우트 경로를 추가합니다.
    name: 'EmpDetail',
    component: EmpDetail
  },
  {
    path: '/newannual', // 직원 상세 정보 페이지의 라우트 경로를 추가합니다.
    name: 'NewAnnual',
    component: NewAnnual
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;