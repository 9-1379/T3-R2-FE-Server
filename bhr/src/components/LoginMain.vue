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
import store from "@/store/store.js"; // Vuex 스토어 import

export default {
  name: "LoginMain",
  setup() {
    const router = useRouter();
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
            return axiosInstance.get("/api/login");
          }
        })
        .then((res) => {
          if (res.status === 200) {
            const { role, empId } = res.data; // API 응답에서 empId 추출
            store.commit("setUserRole", role);
            store.commit("setEmpId", empId); // Vuex 스토어에 empId 저장
            router.push("/emp/dashboard/:empId");
            //router.push("/hrcard");
          }
        })
        .catch((error) => {
          console.error("로그인 에러 혹은 사용자 정보 요청 에러:", error);
          alert(error.response.data.message || "로그인 실패 혹은 사용자 정보 요청 실패");
        });
    };

    const goToNewEmp = () => {
      router.push("/New");
    };

    return { form, handleLogin, goToNewEmp };
  },
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
