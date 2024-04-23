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
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 100px;
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
