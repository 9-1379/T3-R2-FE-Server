import { createStore } from 'vuex';

const DARK_MODE_KEY = 'darkMode';
const EMP_ID_KEY = 'empId';
const USER_ROLE_KEY = 'userRole';

export default createStore({
  state: {
    darkMode: localStorage.getItem(DARK_MODE_KEY) === 'true',
    userRole: localStorage.getItem(USER_ROLE_KEY),
    empId: localStorage.getItem(EMP_ID_KEY),
  },
  mutations: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem(DARK_MODE_KEY, state.darkMode);
    },
    setUserRole(state, role) {
      state.userRole = role;
      localStorage.setItem(USER_ROLE_KEY, role);
    },
    setEmpId(state, empId) {
      state.empId = empId;
      localStorage.setItem(EMP_ID_KEY, empId);
    },
  },
});
