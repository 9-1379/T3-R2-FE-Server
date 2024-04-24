<template>
  <div class="background-image"> </div>
    <div class="login-container">
      <h2>HR 시스템 로그인</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">아이디</label>
          <input type="text" id="username" v-model="form.username" required />
        </div>
        <div>
          <label for="password">비밀번호</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            required
          />
        </div>
        <div>
          <button type="submit">로그인</button>
        </div>
        <p>관리자 ID: admin PW: 1234 / 직원 ID: user PW: 1234</p>
      </form>
    </div>
 
</template>

<script>
import axiosInstance from "@/axios";
import { reactive } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "LoginMain",
  setup() {
    const router = useRouter();
    localStorage.removeItem("access_token");
    const form = reactive({
      username: "",
      password: "",
    });

    const handleLogin = () => {
      let formData = new FormData();
      formData.append("username", form.username);
      formData.append("password", form.password);
      axiosInstance
        .post("/login", formData)
        .then((res) => {
          if (res.status === 200) {
            localStorage.removeItem("access_token");
            let token = res.headers["authorization"];
            localStorage.setItem("access_token", token);
            router.push("/emp/dashboard");
          }
        })
        .catch((error) => {
          console.error("로그인 에러:", error);
          alert(error.response.data.message || "로그인 실패");
        });
    };

    return { form, handleLogin };
  },
};
</script>

<style>
html, body {
  height: 100%; /* 화면 전체 높이를 채우기 위해 필요 */
  margin: 0; /* 기본 마진 제거 */
  padding: 0; /* 기본 패딩 제거 */
  overflow-y: hidden;
  
}
.background-image {
  position: fixed; /* 요소를 화면에 고정 */
  top: 0; /* 상단에서 시작 */
  left: 0; /* 왼쪽에서 시작 */
  width: 100%; /* 화면 전체 너비 */
  height: 100%; /* 화면 전체 높이 */
  background-image: url('/src/assets/emotion/login.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; /* 이미지 반복 없음 */
  z-index: -1; /* 다른 내용 뒤로 배치 */
}
.login-container {
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  padding: 60px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 88px;
  background-color: #2BBEE8;
  color: #ffffff;
  /* 추가적인 그림자 효과 */
}

label {
  margin-bottom: 5px;
  display: block;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  /* 패딩과 테두리 포함하여 요소 크기 계산 */
}

button {
  padding: 10px 20px;
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
