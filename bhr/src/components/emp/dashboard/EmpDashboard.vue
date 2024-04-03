<template>
    <div class="page-container" :class="{ 'dark-mode': darkModeEnabled }">
    <div class="admin-menu-wrapper">
      <AdminMenu />
  <div class="emp-profile-container">
    <div v-if="employee" class="employee-profile">
    <tr v-for="employee in filteredEmployees" :key="employee.id" :class="{'emp-profile': selectedEmployees.includes(employee.id)}"></tr>
    <img :src="getProfilePictureUrl(employee.profilePicture)" alt="프로필 사진" />
     <h2>{{ employee?.name }}</h2>
      <p>{{ employee.deptName }}</p>
      <p>{{ employee.position }}</p>
      <textarea v-model="introduction"></textarea>
      <button @click="updateIntroduction">저장</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
 import axiosInstance from "../../../axios";
import AdminMenu from '@/components/menu/AdminMenu.vue';
  
  export default {
    components: { AdminMenu },
    data() {
        return {
      employee: null,
      introduction: '',
    };
  },
  computed: {
    darkModeEnabled() {
      return this.$store.state.darkMode;
    }
  },
    methods: {
        getProfilePictureUrl(profilePicture) {
      if (profilePicture) {
        return `data:image/jpeg;base64,${profilePicture}`; // 예시: base64 인코딩된 이미지를 보여주는 방식
      } else {
        // 프로필 사진이 없는 경우 기본 이미지 경로 반환
        return require('@/assets/profile_basic.png');
      }
    },
        async updateIntroduction() {
        const employeeId = this.$route.params.id; // 라우트에서 실제 ID를 가져옵니다.
        try {
           await axiosInstance.patch(`/emp/dashboard/${employeeId}/introduction`, {
            introduction: this.introduction
          });
          this.fetchEmployeeProfile(); // 소개글 업데이트 후 직원 정보 다시 로드
        } catch (error) {
          console.error("소개글을 저장하는 데 실패했습니다.", error);
      }
    },
      async fetchEmployeeProfile() {
        const employeeId = this.$route.params.id; // 라우트에서 ID를 가져옵니다.
        console.log(`Fetching employee data for ID: ${employeeId}`);
          try {
            const res = await axiosInstance.get(`/emp/dashboard/${employeeId}`);
            this.employee = res.data;
          } catch (error) {
            console.error("직원 데이터를 불러오는 데 실패했습니다.", error);
            alert('직원 정보를 불러오는데 실패했습니다.');
           }
          }
        },
    mounted() {
        this.fetchEmployeeProfile();
    }
  };

  </script>
  
  <style scoped>
  /* 여기에 스타일을 그대로 유지 */
  
  .emp-dashboard {
  font-family: 'Arial', sans-serif;
  margin: 0 auto;
  max-width: 800px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 3px solid #f3f3f3;
  }
  
  h2 {
  margin: 0;
  color: #333;
  font-size: 24px;
  }
  
  p {
  color: #666;
  line-height: 1.6;
  }
  
  button {
  margin-right: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #e0e0e0;
  color: #333;
  cursor: pointer;
  font-size: 14px;
  }
  
  button:hover {
  background-color: #d5d5d5;
  }
  
  textarea {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  resize: vertical;
  }
  </style>