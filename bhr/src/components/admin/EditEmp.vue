<template>
    <div class="page-container" :class="{ 'dark-mode': darkModeEnabled }">
      <div class="admin-menu-wrapper">
        <AdminMenu />
      </div>
      <div class="employee-detail-container">
        <!-- 수정 완료 버튼 -->
        <button class="save-button" @click="saveEmployeeDetails">저장하기</button>
        <div v-if="employee" class="employee-details">
          <!-- Left Section: Employee Photo -->
          <div class="left-section">
            <h2>직원상세정보</h2>
            <div class="employee-photo">
              <img :src="getProfilePictureUrl(employee.profilePicture)" alt="프로필 사진" />
            </div>
  
            <!-- Middle Section: Employee Basic Information -->
            <div class="info-section">
              <div class="info-row"><strong>이름:</strong> <input type="text" v-model="employee.name" /></div>
              <div class="info-row"><strong>사번:</strong> {{ employee.id }}</div>
              <div class="info-row">
                <!-- <strong>소개:</strong>  -->
                <textarea v-model="employee.introduction"></textarea>
              </div>
            </div>
          </div>
  
          <!-- Right Section: Employee Detailed Information -->
          <div class="right-section">
            <div class="info-section">
              <div class="info-row"><strong>성별:</strong> <input type="radio" v-model="employee.gender" value="MALE" /> 남성 <input type="radio" v-model="employee.gender" value="FEMALE" /> 여성</div>
              <div class="info-row"><strong>생년월일:</strong> <input type="date" v-model="employee.birthday" /></div>
              <div class="info-row"><strong>전화번호:</strong> <input type="tel" v-model="employee.phoneNumber" /></div>
              <div class="info-row"><strong>이메일:</strong> <input type="email" v-model="employee.email" /></div>
              <div class="info-row"><strong>부서:</strong> <input type="text" v-model="employee.deptName" /></div>
              <div class="info-row"><strong>직위:</strong> <input type="text" v-model="employee.position" /></div>
              <div class="info-row"><strong>직무:</strong> <input type="text" v-model="employee.jobId" /></div>
              <div class="info-row"><strong>입사 날짜:</strong> <input type="date" v-model="employee.hireDate" /></div>
              <div class="info-row"><strong>주소:</strong> <input type="text" v-model="employee.formattedAddress" /></div>
              <div class="info-row"><strong>재직여부:</strong> <select v-model="employee.status">
                <option value="WORKING">재직중</option>
                <option value="REST">휴직중</option>
                <option value="LEAVE">퇴직</option>
              </select></div>
              <div class="info-row"><strong>권한:</strong> <input type="text" v-model="employee.authorization" /></div>
            </div>
          </div>
        </div>
        <div v-else class="loading">로딩 중...</div>
      </div>
    </div>
  </template>
  
  <script>
  import axiosInstance from '@/axios';
  import { useRoute, useRouter } from 'vue-router';
  import AdminMenu from '@/components/menu/AdminMenu.vue';
  
  export default {
    components: { AdminMenu },
    data() {
      return {
        employee: null
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
          return `data:image/jpeg;base64,${profilePicture}`;
        } else {
          return require('@/assets/profile_basic.png');
        }
      },
      async fetchEmployeeDetails() {
        const route = useRoute();
        const employeeId = route.params.id;
        try {
          const response = await axiosInstance.get(`/employees/${employeeId}`);
          this.employee = response.data;
        } catch (error) {
          console.error('Failed to fetch employee details:', error);
          alert('Failed to fetch employee details.');
        }
      },
      async saveEmployeeDetails() {
        try {
          await axiosInstance.put(`/employees/${this.employee.id}`, this.employee);
          alert('Employee details saved successfully.');
          // 이동할 경로 설정
          const router = useRouter();
          router.push(`/detail/${this.employee.id}`);
        } catch (error) {
          console.error('Failed to save employee details:', error);
          alert('Failed to save employee details.');
        }
      }
    },
    mounted() {
      this.fetchEmployeeDetails();
    }
  };
  </script>
  
  <style scoped>
  .page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  
  .admin-menu-wrapper {
    width: 100%;
  }
  
  .employee-detail-container {
    width: 70%;
    margin-top: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  
  .employee-details {
    display: flex;
  }
  
  .employee-photo {
    width: 150px;
    height: 150px;
    margin-bottom: 20px;
    align-self: center;
  }
  
  .employee-photo img {
    width: 100%;
    height: auto;
  }
  
  .info-section {
    display: flex;
    flex-direction: column;
  }
  
  .info-row {
    margin-bottom: 10px;
    overflow-wrap: break-word;
    word-break: break-word;
  }
  
  h2 {
    margin-bottom: 20px;
    text-align: center;
  }
  
  .loading {
    text-align: center;
  }
  
  .left-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-right: 50px;
    align-items: flex-start;
    text-align: left;
  }
  
  .right-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 80px;
  }
  
  .right-section .info-row {
    margin-bottom: 10px;
    white-space: nowrap;
    text-align: left;
  }
  
  .dark-mode {
    background-color: #333;
    color: #fff;
  }
  
  .dark-mode .employee-detail-container {
    background-color: #444;
  }
  
  .dark-mode .info-row {
    color: #fff;
  }
  
  /* 수정하기 버튼 스타일 */
  .save-button {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .save-button:hover {
    background-color: #0056b3;
  }
  </style>
  