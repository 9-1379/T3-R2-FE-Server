<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <LoginMain/> -->
  <router-view></router-view>
  <!-- <AdminPage/>
  <HelloWorld/> -->
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
// import LoginMain from './components/LoginMain.vue'
import AdminPage from './components/AdminPage.vue'

export default {
  name: 'App',
  components: {
    AdminPage,
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
