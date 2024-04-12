import { createRouter, createWebHistory } from 'vue-router';

import LoginMain from '@/components/LoginMain.vue'; // 메인 컴포넌트 호출
import EmpList from '@/components/admin/EmpList.vue';
import NewEmp from '@/components/admin/NewEmp.vue';
import AdminMenu from '@/components/menu/AdminMenu.vue';
import HrCardMain from '@/components/emp/hrcard/HrCardMain.vue';
import EmpDetail from '@/components/admin/EmpDetail.vue'; // EmpDetail을 임포트합니다.
import EditEmp from '@/components/admin/EditEmp.vue';
import AnnualSetupList from '@/components/admin/AnnualSetupList';
import NewAnnual from '@/components/emp/annual/NewAnnual.vue';
import BadgeManagement from '@/components/badge/BadgeManagement.vue';

import AttendanceRecord from '@/components/emp/dashboard/AttendanceRecord.vue';
import EmpDashboard from '@/components/emp/dashboard/EmpDashboard';
import MyAnnual from '@/components/emp/dashboard/MyAnnual';
import EmpProfile from '@/components/emp/dashboard/EmpProfile.vue';
import MyAttendance from '@/components/emp/dashboard/MyAttendance';
import AttendanceManagement from '@/components/admin/attendance/AttendanceManagement.vue';


const routes = [
  {
    path: '/',
    name: 'LoginMain',
    component: LoginMain,
    meta: { roles: [] }
  },
  {
    //  메뉴 바
    path: '/admin',
    name: 'AdminMenu',
    component: AdminMenu
  },
  {
    // (관리자)직원 리스트 조회
    path: '/list',
    name: 'EmpList',
    component: EmpList,
    meta: { roles: ['ROLE_MANAGER','ROLE_HRMANAGER'] }

  },
  {
    // (관리자) 신규직원 등록
    path: '/new',
    name: 'NewEmp',
    component: NewEmp
  },
  {
    // (사용자) 인사카드 조회
    path: '/hrcard',
    name: 'HrCardMain',
    component: HrCardMain
  },
  {
    // (관리자) 직원상세정보 
    path: '/employees/:id', // 직원 상세 정보 페이지의 라우트 경로를 추가합니다.
    name: 'EmpDetail',
    component: EmpDetail
  },
  {
    // (사용자) 사용자별 본인 프로필 코드 재확인
    path: '/emp/dashboard',
    name: 'EmpDashboard',
    component: EmpDashboard
  },
  {
    // (사용자) 사용자별로 되게 코드 재확인
    path: '/emp/dashboard/:empId',
    name: 'EmpProfile',
    component: EmpProfile 
  },
  { 
    //(관리자) 직원 연차 부여 및 현황
    path: '/admin/annual',
    name: 'AdminSetupList',
    component: AnnualSetupList
  },
  {
    // (사용자) 본인 연차 신청 및 내역 
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
  },
  {
    path: '/admin/attendance',
    name: 'AttendanceManagement',
    component: AttendanceManagement
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;


