<template>
<div class="emp-profile-container">
  <div v-if="employee" class="employee-profile">
  <tr v-for="employee in filteredEmployees" :key="employee.id" :class="{'emp-profile': selectedEmployees.includes(employee.id)}"></tr>
  <img :src="getProfilePictureUrl(employee.profilePicture)" class="profile-circle" alt="프로필 사진" />
   <h2>{{ employee?.name }}님</h2>
    <p>{{ employee.deptName }}</p>
    <p>{{ employee.position }}</p>
    <div class="textarea-container"></div>
    <textarea v-model="introduction" :disabled="!isEditable" class="profile-textarea"></textarea>
    <button @click="updateIntroduction" v-if="isEditable">저장</button>
    <button class="edit-button" @click="enableEditing" v-else>수정</button>
      </div>
    </div>
</template>

<script>
import axiosInstance from 'axios';

export default {
  data() {
      return {
    employee: null,
    introduction: '',
    isEditable: false,
  };
},
  methods: {
    async login() {
  try {
    const response = await axiosInstance.post('http://localhost:8000/api/login', {
      username: this.username,
      password: this.password,
    });
    const userId = response.data.userId; 
    this.$router.push({ name: 'EmpDashboard', params: { id: userId } });
  } catch (error) {
    console.error("로그인 실패:", error);
    // 로그인 실패 시의 처리 로직
  }
},
      getProfilePictureUrl(profilePicture) {
    if (profilePicture) {
      return `data:image/jpeg;base64,${profilePicture}`; // 예시: base64 인코딩된 이미지를 보여주는 방식
    } else {
      // 프로필 사진이 없는 경우 기본 이미지 경로 반환
      return require('@/assets/profile.jpg');
    }
  },
      async updateIntroduction() {
      const employeeId = this.$route.params.id; // 라우트에서 실제 ID를 가져옵니다.
      try {
         await axiosInstance.patch(`/emp/dashboard/${employeeId}`, {
          introduction: this.introduction
        }, {
          headers: {
            'Authorization': `Bearer ${'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJvbWkiLCJyb2xlIjoiUk9MRV9FTVBMT1lFRSIsImlhdCI6MTcxMjEwNDk1NiwiZXhwIjoxNzEyMTQwOTU2fQ.sW4cnEihASQDmmvrHK4Dhuv4Zs_ggyNwseFmTu1ZJBs'}`
        }
      });
      this.isEditable = false; // 저장 후 텍스트 필드를 비활성화
        this.fetchEmployeeProfile(); // 소개글 업데이트 후 직원 정보 다시 로드
      } catch (error) {
        console.error("소개글을 저장하는 데 실패했습니다.", error);
    }
  },
  enableEditing() {
    this.isEditable = true; 
  },
    async fetchEmployeeProfile() {
      const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InJvbWkiLCJyb2xlIjoiUk9MRV9FTVBMT1lFRSIsImlhdCI6MTcxMjEwNDk1NiwiZXhwIjoxNzEyMTQwOTU2fQ.sW4cnEihASQDmmvrHK4Dhuv4Zs_ggyNwseFmTu1ZJBs';
      const employeeId = this.$route.params.id; // 라우트에서 ID를 가져옵니다.
      console.log(`Fetching employee data for ID: ${employeeId}`);
        try {
        const res = await axiosInstance.get(`/emp/dashboard/${employeeId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
          this.employee = res.data;
          this.introduction = this.employee.introduction || '';
          this.isEditable = false;
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

.textarea-container {
  position: relative;
  margin: auto;
  width: 100px; /* 텍스트 필드 너비에 맞게 설정 */
  background: #fff;
}

.profile-textarea {
  width: 200px;
  height: 50px; /* 또는 필요한 만큼 높이 조절 */
  padding-right: 40px; /* 버튼 자리를 비워두기 위해 패딩 설정 */
  background: #fff;
}

.edit-button {
  position: in;
  top: 50%; /* 텍스트 필드의 내부 상단에 버튼을 배치 */
  right: 10px; /* 텍스트 필드의 내부 우측에 버튼을 배치 */
  transform: translateY(-50%); /* 버튼을 상하 중앙에 정렬 */
  border: 1px solid #ccc; /* 경계선 설정, 색상은 예시입니다 */
  background: #fff; 
  cursor: pointer; 
  padding:0 10px; 
}

.profile-circle {
width: 250px;
height: 250px;
border-radius: 50%;
object-fit: cover;
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