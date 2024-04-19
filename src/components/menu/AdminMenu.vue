<template>
  <div class="top-navbar" :class="{ 'dark-mode': darkModeEnabled }">
    <div class="navbar-logo">
      <img src="@/assets/team_logo.png" alt="Logo" @click="goToHome" /> <!-- 로고 이미지 경로를 설정해주세요 -->
    </div>
    <div class="navbar-links">
      <div class="nav-item" @mouseenter="toggleDropdown(true, 'vacation')"
        @mouseleave="toggleDropdown(false, 'vacation')">
        <a href="/admin/attendance" class="nav-link">근태 관리</a>
      </div>
      <div class="nav-item" @mouseenter="toggleDropdown(true, 'vacation')"
        @mouseleave="toggleDropdown(false, 'vacation')">
        <a class="nav-link">연차<span class="dropdown-arrow"
            v-html="dropdownType === 'vacation' ? ' ▲' : ' ▼'"></span></a>
        <div class="dropdown-content" v-show="dropdownType === 'vacation'">
          <a href="/admin/annual">직원연차관리</a>
        </div>
      </div>
      <div class="nav-item" @mouseenter="toggleDropdown(true, 'emp')" @mouseleave="toggleDropdown(false, 'emp')">
        <a class="nav-link">인사<span class="dropdown-arrow" v-html="dropdownType === 'emp' ? ' ▲' : ' ▼'"></span></a>
        <div class="dropdown-content" v-show="dropdownType === 'emp'">
          <a href="/list">임직원조회</a>
          <a href="/new">신규직원추가</a>
        </div>
      </div>
      <div class="nav-item" @mouseenter="toggleDropdown(true, 'badge')" @mouseleave="toggleDropdown(false, 'badge')">
        <a class="nav-link">배지<span class="dropdown-arrow" v-html="dropdownType === 'badge' ? ' ▲' : ' ▼'"></span></a>
        <div class="dropdown-content" v-show="dropdownType === 'badge'">
          <a href="/admin/badge">배지기준관리</a>
        </div>
      </div>
    </div>
    
    <div class="navbar-icons">
      <h4>관리자님 환영합니다</h4>
      <button class="user-btn" @click="goToEmp">사용자 전환</button> <!-- 수정된 부분 -->
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
      console.log("실행");
      localStorage.clear();
      // 로그아웃 후 로그인 페이지로 이동
      this.$router.push("/login");
    },
    toggleDropdown(visible, type) {
      this.dropdownType = visible ? type : '';
    },
    toggleDarkMode() {
      this.$store.commit('toggleDarkMode');
    },
    goToEmp() {
      this.$router.push("/emp/dashboard"); // 수정된 부분
    },
    goToHome() {
      this.$router.push("/")
    }
  },
  data() {
    return {
      dropdownType: '',
    };
  },
};
</script>

<style scoped>
h4 {
  text-align: right;
  margin-right: 10px;
}
.top-navbar {
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
  /* 연한 경계선 추가 */
}

.navbar-logo,
.navbar-links,
.navbar-icons {
  display: flex;
  align-items: center;
}

.navbar-logo img {
  height: 40px;
}

.navbar-links {
  margin-left: 20px;
}

.nav-link {
  margin: 0 15px;
  color: black;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
}

.navbar-icons {
  margin-left: auto;
}

.user-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.user-btn:hover {
  background-color: #2980b9;
}

.mode-toggle-btn {
  background-color: transparent;
  border: none;
  margin-left: 20px;
  cursor: pointer;
  font-size: 1.5em;
}

.mode-toggle-btn:hover {
  opacity: 0.8;
}

.logout-link {
  color: black;
  text-decoration: none;
  margin-left: 10px;
  cursor: pointer;
}

.logout-link:hover {
  text-decoration: underline;
}

.nav-item {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  text-align: left;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.nav-item:hover .dropdown-content {
  display: block;
}

.dark-mode {
  background-color: #666;
  color: white;
}

.dark-mode .top-navbar {
  background-color: #757575;
  color: white;
}

.dark-mode .nav-link {
  color: white;
}

.dark-mode .user-btn {
  background-color: #555;
  color: white;
}
</style>
