import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'; //메인 컴포넌트 호출
import MyLogin from '@/components/login/MyLogin.vue'

const routes = [
  {
    path:'/'
	,name:HelloWorld
	,component:HelloWorld
  },
  {
    path:'/login'
    ,name:MyLogin
    ,component:MyLogin
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router