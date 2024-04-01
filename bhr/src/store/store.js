import { createStore } from 'vuex';

const DARK_MODE_KEY = 'darkMode'; // 로컬 스토리지 키

export default createStore({
  state: {
    darkMode: localStorage.getItem(DARK_MODE_KEY) === 'true', // 로컬 스토리지에서 다크 모드 상태를 가져옴
    userRole: null, // 사용자의 역할 정보를 저장할 변수 추가
  },
  mutations: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem(DARK_MODE_KEY, state.darkMode); // 변경된 다크 모드 상태를 로컬 스토리지에 저장
    },
    setDarkMode(state, value) {
      state.darkMode = value;
      localStorage.setItem(DARK_MODE_KEY, value); // 변경된 다크 모드 상태를 로컬 스토리지에 저장
    },
    setUserRole(state, role) { // 사용자의 역할 정보를 설정하는 뮤테이션 추가
      state.userRole = role;
      localStorage.setItem('userRole', role); // 변경된 사용자의 역할 정보를 로컬 스토리지에 저장
    },
  },
});
