<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
   <!--<LoginMain/>-->
  <EmpDashboard/>
  <router-view />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
//import LoginMain from './components/LoginMain.vue'
import EmpDashboard from './components/EmpDashboard.vue';

export default {
  name: 'App',
  components: {
    //LoginMain
    EmpDashboard
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
</style>./components/EmpDashboard.vue
