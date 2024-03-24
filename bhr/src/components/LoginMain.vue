<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="form.username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="form.password" required>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";

export default {
  name: "LoginMain",
  setup() {
    const form = reactive({
      username: "",
      password: "",
    });

    const handleLogin = () => {
      // FormData 인스턴스 생성
      let formData = new FormData();
      // 폼 데이터에 사용자 이름과 비밀번호 추가
      formData.append("username", form.username);
      formData.append("password", form.password);

      // axios를 사용해 서버에 로그인 요청 보내기
      // 이번에는 폼 데이터를 전송합니다.
      axios.post("http://localhost:8000/login", formData)
      .then((res) => {
        if (res.status === 200) {
          // 모든 헤더 이름은 소문자
          let accessToken = res.headers['authorization']; // 응답헤더에서 토큰 받기
          let refreshToken = res.headers['refresh']; // 응답헤더에서 토큰 받기
          console.log('access 토큰 :', accessToken);
          console.log('refresh 토큰 :', refreshToken);
          localStorage.setItem('access_token', accessToken); // 토큰 localStorage에 저장
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;
        }
      });
};

return { form, handleLogin };
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

input[type="email"],
input[type="password"] {
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