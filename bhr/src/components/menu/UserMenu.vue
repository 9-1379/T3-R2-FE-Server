<template>
  <div class="top-navbar" :class="{ 'dark-mode': darkModeEnabled }">
    <div class="navbar-logo">
      <img src="@/assets/team_logo.png" alt="Logo" /> <!-- 로고 이미지 경로를 설정해주세요 -->
    </div>
    <div class="navbar-links">
      <a href="#home" class="nav-link">Home</a>
      <div class="nav-item" @mouseenter="toggleDropdown(true, 'vacation')" @mouseleave="toggleDropdown(false, 'vacation')">
        <a href="#vacation" class="nav-link">연차<span class="dropdown-arrow" v-html="dropdownType === 'vacation' ? ' ▲' : ' ▼'"></span></a>
        <div class="dropdown-content" v-show="dropdownType === 'vacation'">
          <a href="/newannual">연차관리</a>
        </div>
      </div>
      <div class="nav-item" @mouseenter="toggleDropdown(true, 'emp')" @mouseleave="toggleDropdown(false, 'emp')">
        <a href="#emp" class="nav-link">인사<span class="dropdown-arrow" v-html="dropdownType === 'emp' ? ' ▲' : ' ▼'"></span></a>
        <div class="dropdown-content" v-show="dropdownType === 'emp'">
          <a href="/list">임직원조회</a>
          <a href="/new">신규직원추가</a>
        </div>
      </div>
      <div class="nav-item" @mouseenter="toggleDropdown(true, 'badge')" @mouseleave="toggleDropdown(false, 'badge')">
        <a href="/badge" class="nav-link">배지<span class="dropdown-arrow" v-html="dropdownType === 'badge' ? ' ▲' : ' ▼'"></span></a>
        <div class="dropdown-content" v-show="dropdownType === 'badge'">
          <a href="#badge">배지기준관리</a>
        </div>
      </div>
    </div>
    <div class="navbar-icons">
      <button class="user-btn">사용자</button>
      <!-- Dark Mode Toggle Button -->
      <button class="mode-toggle-btn" @click="toggleDarkMode">
        {{ darkModeEnabled ? '🌜' : '🌞' }}
      </button>
      <!-- Logout Button -->
      <a href="/" class="logout-link" @click="logout">로그아웃</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopMenuBar',
  computed: {
    darkModeEnabled() {
      return this.$store.state.darkMode;
    },
  },
  methods: {
    logout() {
      console.log("실행")
      localStorage.clear();
    },
    toggleDropdown(visible, type) {
      this.dropdownType = visible ? type : '';
    },
    toggleDarkMode() {
      this.$store.commit('toggleDarkMode');
    },
    goToNewAnnual() {
      this.$router.push("/newannual")
  },
},
  data() {
    return {
      dropdownType: '',
    };
  },
};
</script>

<style lang="css" src="@/css/styles.css">

</style>
