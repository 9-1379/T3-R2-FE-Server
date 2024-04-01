import { createRouter, createWebHistory } from 'vue-router';

import LoginMain from '@/components/LoginMain.vue'; // 메인 컴포넌트 호출
import LoginSuccess from '@/components/LoginSuccess.vue'; // 성공 컴포넌트 호출
import EmpList from '@/components/admin/EmpList.vue';
import NewEmp from '@/components/admin/NewEmp.vue';
import AdminMenu from '@/components/menu/AdminMenu.vue';
import HrCardMain from '@/components/emp/hrcard/HrCardMain.vue';
<<<<<<< HEAD
<<<<<<< HEAD
import EmpDetail from '@/components/EmpDetail.vue'; // EmpDetail을 임포트합니다.
import EmpDashboard from '@/components/EmpDashboard.vue';
=======
import EmpDetail from '@/components/admin/EmpDetail.vue'; // EmpDetail을 임포트합니다.
<<<<<<< HEAD
>>>>>>> dev
=======
import EmpDetail from '@/components/EmpDetail.vue'; // EmpDetail을 임포트합니다.
import EmpDashboard from '@/components/EmpDashboard.vue';
import EmpDetail from '@/components/admin/EmpDetail.vue'; // EmpDetail을 임포트합니다.
>>>>>>> a9cdc188d36c0e461f8993027c882da91a1b39df
import NewAnnual from '@/components/NewAnnual.vue';
=======
>>>>>>> dev
import EditEmp from '@/components/admin/EditEmp.vue';
import AnnualSetupList from '@/components/adminPage/AnnualSetupList';
import NewAnnual from '@/components/emp/annual/NewAnnual.vue';

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
    path: '/employees/dashboard',
    name: 'EmpDashboard',
    component:EmpDashboard
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
    path: '/employees/:id', // 직원 상세 정보 페이지의 라우트 경로를 추가합니다.
    name: 'EmpDetail',
    component: EmpDetail
  },
  {
    path: '/admin/annual',
    name: 'AdminSetupList',
    component: AnnualSetupList
  },
  {
    path: '/emp/NewAnnual',
    name: 'NewAnnual',
    component: NewAnnual
  },
  {
    path: '/edit/:id',
    name: 'EditEmp',
    component: EditEmp
  },
  {
    path: '/adnim/annual',
    name: 'AdminSetupList',
    component: AnnualSetupList

  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;


