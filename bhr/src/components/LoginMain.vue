<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // vue-router를 사용하고 있다고 가정

export default {
  setup() {
    const router = useRouter(); // 라우터 인스턴스를 사용
    const username = ref('');
    const password = ref('');

    const handleLogin = async () => {
      try {
        const response = await axios.post('YOUR_LOGIN_API_ENDPOINT', {
          username: username.value,
          password: password.value,
        });

        // 로그인 성공 시, JWT를 LocalStorage에 저장
        localStorage.setItem('authToken', response.data.token);

        // 사용자 권한에 따라 다른 페이지로 리다이렉트
        switch (response.data.role) {
          case 'ROLE_MANAGER':
            router.push({ name: 'LoginSuccess' }); // 'admin' 권한을 가진 사용자를 위한 페이지
            break;
          case 'ROLE_EMPLOYEE':
            router.push({ name: 'LoginSuccess' }); // 'user' 권한을 가진 사용자를 위한 페이지
            break;
          default:
            router.push({ name: 'LoginSuccess' }); // 기본 홈페이지
            break;
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed');
      }
    };

    return {
      username,
      password,
      handleLogin,
    };
  },
};
</script>
  
  <style>
  /* 여기에 CSS 스타일을 추가하세요 */
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  label {
    margin-bottom: 5px;
    display: block;
  }
  
  input[type="email"], input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>