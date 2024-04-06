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
import { useRouter } from "vue-router";

export default {
  name: "LoginMain",
  setup() {
    const router = useRouter();
    const form = reactive({
      username: "",
      password: "",
    });

    // 토큰에서 empId를 추출하는 메서드
    function getEmpIdFromToken(token) {
      // 실제 토큰 구조에 따라 다를 수 있으므로, 이 예시는 단순화된 버전입니다.
      // 여기서는 페이로드의 empId를 반환한다고 가정합니다.
      // 실제로는 서버와의 약속된 토큰 구조와 보안 요구사항에 따라 구현해야 합니다.
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.empId;
    }

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
           // router.push("/hrcard");

           const empId = getEmpIdFromToken(token); //토큰에서 empId 추출하는 로직
           router.push(`/emp/dashboard/${empId}`);
          }
        })
        .catch((error) => {
          console.error("로그인 에러:", error);
          alert(error.response.data.message || "로그인 실패");
        });
    };

    const goToNewEmp = () => {
      router.push("/New");
    };

    return { form, handleLogin, goToNewEmp };
  }
};
</script>

<style>
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

input[type="text"],
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
