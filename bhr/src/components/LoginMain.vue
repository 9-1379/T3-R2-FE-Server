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
          if (res.data.token) {
            // 로그인 성공 시, 토큰을 localStorage에 저장하고 성공 메시지 표시
            localStorage.setItem("Authorization", res.data.token);
            alert("로그인 성공");
            // 로그인 성공 후의 추가 로직 (예: 페이지 이동)
          } else {
            // 토큰이 반환되지 않았다면 로그인 실패 메시지 표시
            alert("로그인 실패: 토큰이 반환되지 않았습니다.");
          }
        })
        .catch((error) => {
          // 요청 중 에러가 발생하면 에러 메시지 표시
          console.error("로그인 에러:", error);
          alert("로그인 실패");
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