<template>
    <div class="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div v-if="loading">Loading users...</div>
      <ul v-else>
        <li v-for="user in users" :key="user.id" @click="selectUser(user)">
          {{ user.name }}
        </li>
      </ul>
  
      <div v-if="selectedUser">
        <h3>Selected User</h3>
        <p>ID: {{ selectedUser.id }}</p>
        <p>Name: {{ selectedUser.name }}</p>
        <p>Email: {{ selectedUser.email }}</p>
        <!-- 추가 정보를 여기에 표시 -->
      </div>
    </div>
    <div>
      <h1>직원 수 : {{ employeeConut }}</h1>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const loading = ref(true);
      const users = ref([]);
      const selectedUser = ref(null);
      const employeeConut = ref(null); // 직원 수 값 초기화
  
      onMounted(async () => {
        try {
          const response = await axios.get('http://localhost:8050/count');
          users.value = response.data;
          employeeConut.value = response.data;
        } catch (error) {
          console.error('Error fetching users:', error);
          // 에러 처리 로직
        } finally {
          loading.value = false;
        }
      });
  
      const selectUser = (user) => {
        selectedUser.value = user;
      };
  
      return {
        loading,
        users,
        selectedUser,
        selectUser,
        employeeConut,
      };
    },
  };
  </script>
  
  <style scoped>
  .admin-dashboard ul {
    list-style-type: none;
    padding: 0;
  }
  
  .admin-dashboard li {
    cursor: pointer;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .admin-dashboard li:hover {
    background-color: #f0f0f0;
  }
  </style>
  