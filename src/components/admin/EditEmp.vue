<template>
  <div class="page-container" :class="{ 'dark-mode': darkModeEnabled }">
    <div class="admin-menu-wrapper">
      <AdminMenu />
    </div>
    <div class="employee-detail-container">
      <!-- 저장하기 버튼 -->
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
          </div>
        </div>

        <!-- Right Section: Employee Detailed Information -->
        <div class="right-section">
          <div class="info-section">
            <!-- Gender Selection Radio Buttons -->
            <div class="info-row">
              <strong>성별:</strong>
              <label>
                <input type="radio" v-model="employee.gender" value="MALE" /> 남성
              </label>
              <label>
                <input type="radio" v-model="employee.gender" value="FEMALE" /> 여성
              </label>
            </div>
            <div class="info-row"><strong>생년월일:</strong> <input type="date" v-model="employee.birthday" /></div>
            <div class="info-row"><strong>전화번호:</strong> <input type="tel" v-model="employee.phoneNumber" /></div>
            <div class="info-row">
              <strong>이메일:</strong>
              <input type="email" v-model="employee.email" @blur="validateEmail" />
              <span v-if="emailError" class="error">{{ emailError }}</span>
            </div>
            <!-- Department Selection -->
            <div class="info-row">
              <strong>부서: </strong>
              <select v-model="employee.deptName">
                <option value="영업팀">영업팀</option>
                <option value="밤양갱팀">밤양갱팀</option>
                <option value="개발팀">개발팀</option>
                <option value="인사팀">인사팀</option>
                <option value="고구마팀">고구마팀</option>
              </select>
            </div>
            <!-- End of Department Selection -->
            <div class="info-row"><strong>직위: </strong> <input type="text" v-model="employee.position" /></div>
            <div class="info-row"><strong>직무: </strong> <input type="text" v-model="employee.jobId" /></div>
            <div class="info-row"><strong>입사 날짜: </strong> <input type="date" v-model="employee.hireDate" /></div>
            <!-- Address Section -->
            <div class="info-row">
              <strong>우편번호: </strong>
              <input type="text" v-model="employee.address.postcode" placeholder="우편번호" />
              <button @click="searchAddress">찾기</button>
            </div>
            <div class="info-row"><strong>주소: </strong> <input type="text" v-model="employee.address.address" placeholder="주소" /></div>
            <div class="info-row"><strong>상세주소: </strong> <input type="text" v-model="employee.address.detailAddress" placeholder="상세주소" /></div>
            <div class="info-row"><strong>참고항목: </strong> <input type="text" v-model="employee.address.extraAddress" placeholder="참고항목" /></div>
            <!-- End of Address Section -->
            <div class="info-row">
              <strong>재직여부: </strong>
              <select v-model="employee.status">
                <option value="WORKING">재직중</option>
                <option value="REST">휴직중</option>
                <option value="LEAVE">퇴직</option>
              </select>
            </div>
            <div class="info-row">
              <strong>권한:</strong>
              <select v-model="employee.authorization">
                <option value="MANAGER"> 매니저</option>
                <option value="HRMANAGER"> 인사담당자</option>
                <option value="EMPLOYEE"> 직원</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="loading">로딩 중...</div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/axios';
import AdminMenu from '@/components/menu/AdminMenu.vue';

export default {
  components: { AdminMenu },
  data() {
    return {
      employee: null,
      emailError: ''
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
      const employeeId = this.$route.params.id;
      try {
        const response = await axiosInstance.get(`/employees/${employeeId}`);
        this.employee = response.data;
        // Ensure address object exists
        if (!this.employee.address) {
          this.employee.address = { postcode: '', address: '', detailAddress: '', extraAddress: '' };
        }
      } catch (error) {
        console.error('Failed to fetch employee details:', error);
        alert('Failed to fetch employee details.');
      }
    },
    async saveEmployeeDetails() {
      if (!this.employee) {
        alert('직원 정보를 먼저 불러와야 합니다.');
        return;
      }
      if (this.employee.email && !this.isValidEmail(this.employee.email)) {
        this.showEmailErrorAlert();
        return;
      } else {
        this.emailError = '';
      }
      if (!this.employee.email) {
        this.employee.email = null;
      }
      const requiredFields = ['name', 'gender', 'birthday', 'phoneNumber', 'deptName', 'position', 'jobId', 'hireDate', 'status', 'authorization'];
      for (const field of requiredFields) {
        if (!this.employee[field]) {
          alert(`${field} 필드는 필수 입력 사항입니다.`);
          return;
        }
      }
      this.employee.birthday = new Date(this.employee.birthday).toISOString().slice(0, 10);
      this.employee.hireDate = new Date(this.employee.hireDate).toISOString().slice(0, 10);
      try {
        await axiosInstance.put(`/employees/${this.employee.id}`, this.employee);
        alert('저장하였습니다.');
        this.$router.push(`/employees/${this.employee.id}`);
      } catch (error) {
        console.error('저장에 실패하였습니다.', error);
        alert('저장에 실패하였습니다.');
      }
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    showEmailErrorAlert() {
      this.emailError = '이메일 형식이 잘못되었습니다.';
    },
    searchAddress() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.employee.address = {
            ...this.employee.address,
            address: data.address,
            postcode: data.zonecode
          };
        }
      }).open();
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

/* 저장하기 버튼 스타일 */
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

.error {
  color: red;
}

/* 찾기 버튼 스타일 */
.right-section .info-row button {
  padding: 4px 8px; /* 패딩 줄임 */
  font-size: 12px; /* 폰트 사이즈 줄임 */
  margin-left: 0px; /* 버튼과 인풋 사이 간격 */
  vertical-align: middle; /* 버튼을 입력 필드와 같은 높이에 위치시킴 */
}

</style>