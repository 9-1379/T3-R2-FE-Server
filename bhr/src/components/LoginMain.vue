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
      <div>
        <button @click="goToNewEmp">신규직원추가(개발용버튼)</button>
      </div>
    </form>
  </div>
</template>

<script>
import axiosInstance from "@/axios";

import { reactive } from "vue";
import { useRouter } from "vue-router"; // 라우터 사용을 위해 import

export default {
  name: "LoginMain",

  methods: {
    goToNewEmp() {
      this.$router.push("/New")
    }
  },
  setup() {
    const router = useRouter(); // 라우터 인스턴스 사용
    const form = reactive({
      username: "",
      password: "",
    });

    const handleLogin = () => {
      let formData = new FormData();
      formData.append("username", form.username);
      formData.append("password", form.password);

      axiosInstance.post("/login", formData)
        .then((res) => {
          if (res.status === 200) {
            let token = res.headers['authorization'];
            localStorage.setItem('access_token', token); // 토큰 저장
            axiosInstance.defaults.headers.common['Authorization'] = `${localStorage.getItem('access_token')}`; // 저장된 토큰 사용

            return axiosInstance.get("/api/login"); // 사용자 정보 요청 시 정확한 엔드포인트 확인
          }
        })
        .then((res) => {
          if (res.status === 200) {
            const { role } = res.data;
            switch (role) {
              case "ROLE_HRMANAGER":
                router.push("/new");
                break;
              case "ROLE_EMPLOYEE":
                router.push("/admin");
                break;
              default:
                router.push("/admin");
                break;
            }
          }
        })
        .catch((error) => {
          // 에러 응답에서 메시지 추출하여 표시
          let errorMessage = error.response && error.response.data && error.response.data.message ? error.response.data.message : "로그인 실패 혹은 사용자 정보 요청 실패";
          console.error("로그인 에러 혹은 사용자 정보 요청 에러:", error);
          alert(errorMessage);
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