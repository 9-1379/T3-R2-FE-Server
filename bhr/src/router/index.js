import { createRouter, createWebHistory } from 'vue-router'
import AdminPage from '@/components/AdminPage.vue'; //메인 컴포넌트 호출
import HelloWorld from '@/components/HelloWorld.vue';

const routes = [
  {
    path:'/'
	,name:'AdminPage'
	,component:AdminPage,
  },
  {
  path:'/hello'
	,name:'HelloWorld'
	,component:HelloWorld
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes
})

export default router