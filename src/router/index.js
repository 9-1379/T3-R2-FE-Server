import { createRouter, createWebHistory } from 'vue-router';

import LoginMain from '@/components/LoginMain.vue'; // 메인 컴포넌트 호출
import LoginSuccess from '@/components/LoginSuccess.vue'; // 성공 컴포넌트 호출
import EmpList from '@/components/admin/EmpList.vue';
import NewEmp from '@/components/admin/NewEmp.vue';
import AdminMenu from '@/components/menu/AdminMenu.vue';
import HrCardMain from '@/components/emp/hrcard/HrCardMain.vue';
import EmpDetail from '@/components/admin/EmpDetail.vue'; // EmpDetail을 임포트합니다.
import EditEmp from '@/components/admin/EditEmp.vue';
import AnnualSetupList from '@/components/admin/AnnualSetupList';
import NewAnnual from '@/components/emp/annual/NewAnnual.vue';
import BadgeManagement from '@/components/badge/BadgeManagement.vue';
import AttendanceRecord from '@/components/emp/dashboard/AttendanceRecord';
import MyAnnual from '@/components/emp/dashboard/MyAnnual';
import MyAttendance from '@/components/emp/dashboard/MyAttendance';

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
  },
  {

    path: '/admin/badge',
    name: 'BadgeManagement',
    component: BadgeManagement
  },
  {
    path: '/attendance',
    name: 'AttendanceRecord',
    component: AttendanceRecord
  },
  {
    path: '/myAnnual',
    name: 'MyAnnual',
    component: MyAnnual
  },
  {
    path: '/myAttendance',
    name: 'MyAttendance',
    component: MyAttendance
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;


