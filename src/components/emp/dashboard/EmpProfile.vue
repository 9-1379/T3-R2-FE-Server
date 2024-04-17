<template>
  <div class="emp-profile-container">
    <div v-if="employee" class="employee-profile">
      <img :src="getProfilePictureUrl(employee.profilePicture)" class="profile-circle" alt="Profile Picture" />
      <div class="upload-container">
        <input type="file" @input="uploadProfilePicture" />
        <div class="emp-db">
          <h2>{{ employee.name }}</h2>
          <p>{{ employee.deptName }}</p>
          <p>{{ employee.position }}</p>
          <div class="textarea-container">
            <textarea v-model="employee.introduction" :disabled="!isEditable" class="profile-textarea"></textarea>
            <button @click="updateIntroduction" v-if="isEditable">저장</button>
            <button @click="enableEditing" v-else>수정</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/axios';

export default {
  data() {
    return {
      employee: null,
      introduction: '',
      isEditable: false,
    };
  },
  // Vuex store의 state에서 empId를 가져옴
computed: {
    empId() {
        return this.$store.state.empId;
    }
},
  methods: {
    uploadProfilePicture(event) {
      const selectedFile = event.target.files[0];
      if (!selectedFile) {
        alert('파일을 선택해 주세요.');
        return;
      }
      const formData = new FormData();
      formData.append('file', selectedFile, selectedFile.name);

      const empId = this.$store.state.empId;
      if (!empId) {
        console.error('Employee ID is not set.');
        alert('사용자 정보를 불러올 수 없습니다. 다시 로그인 해주세요.');
        return;
      }

      // 파일 업로드 요청보내기
      axiosInstance.post(`/emp/dashboard/${empId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => {
          console.log("서버 응답:", res.data);
          this.$router.push(`/emp/dashboard/${empId}`);
          alert('파일 업로드 성공!');
        })
        .catch((error) => {
          console.error('파일 업로드 실패:', error);
          alert('파일 업로드에 실패했습니다.');
        });
    },
    getProfilePictureUrl(profilePicture) {
      if (profilePicture) {
        return `http://localhost:8000${profilePicture}`;
      } else {
        // 프로필 사진이 없는 경우 기본 이미지 경로 반환
        return require('@/assets/profile.jpg');
      }
    },
    enableEditing() {
      this.isEditable = true;
    },
    async updateIntroduction() {
      try {
        const res = await axiosInstance.patch('/emp/dashboard', {
          introduction: this.employee.introduction,
        });
        if (res.status === 200) {
          alert('소개글이 저장되었습니다.');
          this.employee = res.data;
        }
        this.isEditable = false; // 저장 후 텍스트 필드를 비활성화
        // this.fetchEmployeeProfile(); // 소개글 업데이트 후 직원 정보 다시 로드
      } catch (error) {
        console.error("소개글을 저장하는 데 실패했습니다.", error);
      }
    },
    async fetchEmployeeProfile() {
      try {
        const res = await axiosInstance.get('/emp/dashboard');

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

.emp-profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* min-height: 100vh; 뷰포트 높이의 100%를 차지하도록 설정 */
}

.emp-dashboard {
  font-family: 'Arial', sans-serif;
  margin: 0 auto;
  max-width: 800px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.upload-container {
  justify-content: center;
  align-items: center;
  position: relative;
  /* 상대적 위치 설정 */
  right: 30px;

}

.emp-db {
  justify-content: center;
  align-items: center;
}

.textarea-container {
  position: relative;
  margin: auto;
  width: 100px;
  /* 텍스트 필드 너비에 맞게 설정 */
  background: #fff;
}

.profile-textarea {
  width: 200px;
  height: 30px;
  /* 또는 필요한 만큼 높이 조절 */
  background: #fff;
  position: relative;
  /* 상대적 위치 설정 */
  left: -50px;
  /* 왼쪽으로 10px 이동 */
}

.edit-button {
  position: in;
  top: 50%;
  /* 텍스트 필드의 내부 상단에 버튼을 배치 */
  right: 10px;
  /* 텍스트 필드의 내부 우측에 버튼을 배치 */
  transform: translateY(-50%);
  /* 버튼을 상하 중앙에 정렬 */
  border: 1px solid #ccc;
  /* 경계선 설정, 색상은 예시입니다 */
  background: #fff;
  cursor: pointer;
  padding: 0 10px;
}

.profile-circle {
  justify-content: center;
  align-items: center;
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