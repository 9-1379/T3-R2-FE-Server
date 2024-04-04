<template>
<div class="emp-profile-container">
  <div v-if="employee" class="employee-profile">
  <div v-for="employee in filteredEmployees" :key="employee.id" :class="{'emp-profile': selectedEmployees.includes(employee.id)}"></div>
  <img :src="getProfilePictureUrl(employee.profilePicture)" class="profile-circle" alt="프로필 사진" />
  <!--<img :src="profilePictureUrl" />--> 
  <input type="file" id="file-upload" @change="uploadProfilePicture" style="display: none"/>
  <label for="file-upload" class="profile-edit-button">수정</label>
  <div class="name-container">
    <h2>{{ employee?.name }}</h2>
  </div>
  <div class="info-container">
    <p>{{ employee.deptName }}</p>
    <p>|</p>
    <p>{{ employee.position }}</p>
  </div>
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
    profilePictureUrl: require('@/assets/profile.jpg'), //프로필 사진 url 초기화
  };
},
  methods: {
      getProfilePictureUrl(profilePicture) {
    if (profilePicture) {
      return `data:image/jpeg;base64,${profilePicture}`; // 예시: base64 인코딩된 이미지를 보여주는 방식
    } else {
      // 프로필 사진이 없는 경우 기본 이미지 경로 반환
      return this.profilePictureUrl;
    }
  },
  async uploadProfilePicture(event) {
        const files = event.target.files;
        const employeeId = this.$route.params.id;
        if (files && files.length > 0) {
          const selectedFile = files[0];
          const formData = new FormData();
          formData.append('file', selectedFile, selectedFile.name);

          this.profilePictureUrl = URL.createObjectURL(event.target.files[0]);

          try {
            const response = await axiosInstance.post(`/emp/dashboard/${employeeId}`, formData);
            this.profilePictureUrl = response.data; // 서버로부터 반환된 파일 경로를 저장
            this.profilePictureUrl += '?t=' + new Date().getTime(); //캐시를 무시하고 이미지를 갱신하기 위한 쿼리 파라미터 추가
            
            console.log('프로필 사진 업로드 성공!', response);
          } catch (error) {
            console.error('프로필사진 업로드 실패.', error);
          }
        }
      },
      async updateIntroduction() {
      const employeeId = this.$route.params.id; // 라우트에서 실제 ID를 가져옵니다.
      try {
         await axiosInstance.patch(`/emp/dashboard/${employeeId}`,{
          introduction: this.introduction});
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
      const employeeId = this.$route.params.id; // 라우트에서 ID를 가져옵니다.
      console.log(`Fetching employee data for ID: ${employeeId}`);
        try {
        const res = await axiosInstance.get(`/emp/dashboard/${employeeId}`);
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

.emp-profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%; 
}

.emp-profile {
  width: 100%; /* 전체 너비를 사용하도록 설정 */
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center; /* 가로축 중앙 정렬 */
  justify-content: center; /* 세로축 중앙 정렬 */
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.name-container {
  text-align: center;
  margin-bottom: 10px; /* 아래쪽 요소와의 간격 */
}

/* 부서와 직위를 가로로 나란히 배치하기 위한 스타일 */
.info-container {
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
}

.info-container p {
  margin: 0 10px; /* 요소들 사이의 간격 */
}

.profile-edit-button {
  display: inline-block; /* 블록 요소로 만들고 가로 크기를 조절할 수 있게 함 */
  width: 50px; /* 라벨의 가로 크기 설정 */
  margin-top: -50px;
  cursor: pointer;
  border: 1px solid #ccc; /* 테두리 */
  left: 50%; /* 가로 중앙에 배치 */
  transform: translateX(-50%);
}

.textarea-container {
  position: relative;
  /* margin: auto; */
  width: 100px; /* 텍스트 필드 너비에 맞게 설정 */
  background: #fff;
}

.profile-textarea {
  width: 200px;
  height: 50px; /* 또는 필요한 만큼 높이 조절 */
  /* padding-right: 40px;  */ /* 버튼 자리를 비워두기 위해 패딩 설정 */
  background: #fff;
}

.edit-button {
  position: in;
  top: 50%; /* 텍스트 필드의 내부 상단에 버튼을 배치 */
  right: 200%;
  transform: translateY(-10%); /* 버튼을 상하 중앙에 정렬 */
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