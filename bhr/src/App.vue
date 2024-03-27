<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <router-view />
</template>

<script>
export default {
  name: 'App',
  created() {
    // 초기 로드 시 로컬 스토리지에서 다크 모드 상태를 가져와서 적용
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  },
  computed: {
    darkModeEnabled() {
      return this.$store.state.darkMode;
    }
  },
  watch: {
    // Vuex의 darkMode 상태가 변경될 때마다 로컬 스토리지를 업데이트하고 body 클래스를 조작합니다.
    darkModeEnabled(newVal) {
      if (newVal) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      localStorage.setItem('darkMode', newVal);
    },
    // 페이지 이동 시에도 다크 모드 상태 유지
    $route() {
      const darkMode = localStorage.getItem('darkMode');
      if (darkMode === 'true') {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
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
}

.dark-mode {
  /* 다크 모드 스타일 */
  background-color: #333;
  color: white;
}
</style>
