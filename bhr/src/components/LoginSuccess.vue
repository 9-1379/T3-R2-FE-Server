<template>
    <div class="user-profile">
      <h2>User Profile</h2>
      <p>Welcome back, {{ username }}!</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const username = ref('');
  
      onMounted(() => {
        // LocalStorage에서 username 가져오기
        username.value = localStorage.getItem('username');
      });
  
      return {
        username,
      };
    },
  };
  </script>
  
  <style scoped>
  .user-profile {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    max-width: 300px;
    margin: 20px auto;
  }
  </style>