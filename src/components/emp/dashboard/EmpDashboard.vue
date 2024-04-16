<template>
  <div>
    <UserMenu />
    <div class="profile-section">
      <div class="profile-info">
        <div class="profile-image-wrapper">
          <!-- 이미지의 src 속성에 getImagePath 메서드를 호출하여 프로필 사진 경로를 동적으로 설정합니다. -->
          <img class="profile-image" :src="getImagePath(employee.profilePicture)" alt="Profile Picture" />
          <input type="file" @change="uploadProfilePicture" accept="image/*" style="display: none" ref="fileInput" />
          <button class="change-profile-btn" @click="$refs.fileInput.click()">프로필 사진 변경</button>
        </div>
        <div class="basic-info">
          <h2>{{ employee.name }}</h2>
          <p>{{ employee.deptName }} | {{ employee.position }}</p>
        </div>
        <div class="introduction">
          <p v-if="!editMode">{{ employee.introduction }}</p>
          <textarea v-if="editMode" v-model="form.introduction"></textarea>
          <div class="button-container">
            <button class="edit-button" @click="editMode ? postIntro() : editMode = !editMode">
              {{ editMode ? '저장' : '수정' }}
            </button>
          </div>
        </div>
      </div>

      <div class="second-section">
        <div class="grid-container">
          <div class="grid-item">
            <AttendanceRecord />
          </div>
          <div class="grid-item">
            <p>배지가 들어갈 공간</p>
          </div>
          <div class="grid-item">
            <MyAttendance />
          </div>
          <div class="grid-item">
            <MyAnnual />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/axios";
import AttendanceRecord from "@/components/emp/dashboard/AttendanceRecord.vue";
import MyAnnual from "@/components/emp/dashboard/MyAnnual.vue";
import MyAttendance from "@/components/emp/dashboard/MyAttendance.vue";
import UserMenu from "@/components/menu/UserMenu.vue";

export default {
  components: {
    UserMenu,
    AttendanceRecord,
    MyAnnual,
    MyAttendance,
  },
  data() {
    return {
      editMode: false,
      employee: [],
      form: {
        introduction: "",
      },
    };
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

      // empId를 가져오는 함수 호출
      const empId = this.getEmpIdFromToken();
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
          this.$router.push('/emp/dashboard');
          alert('파일 업로드 성공!');
        })
        .catch((error) => {
          console.error('파일 업로드 실패:', error);
          alert('파일 업로드에 실패했습니다.');
        });
    },
    getEmpIdFromToken() {
      const token = localStorage.getItem('access_token');
      if (token) {
        const decodedToken = atob(token.split('.')[1]);
        const { empId } = JSON.parse(decodedToken);
        return empId;
      }
      return null;
    },
    getImagePath(profilePicture) {
      if (profilePicture) {
        try {
          return require('@/assets/' + profilePicture);
        } catch (error) {
          console.error('이미지를 불러오는 데 실패했습니다.', error);
          return require('@/assets/emotion/dead.jpg');
        }
      } else {
        console.error('프로필 사진이 없습니다.');
        return require('@/assets/emotion/dead.jpg');
      }
    },
    enableEditing() {
      this.isEditable = true;
    },
    async getEmpToOne() {
      const empResponse = await axiosInstance.get("/emp/dashboard/empToOne");
      this.employee = empResponse.data;
    },
    async postIntro() {
      await axiosInstance.post("/emp/dashboard/empIntro", this.form);
      alert("소개글이 저장되었습니다");
      this.clearInput();
      this.getEmpToOne();
      this.editMode = false;
    },
    clearInput() {
      this.form.introduction = "";
    },
  },
  mounted() {
    this.getEmpToOne();
  },
};
</script>

<style scoped>
.profile-section {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: 30px;
}

.profile-info {
  text-align: center;
  margin-right: 30px;
}

.profile-image-wrapper {
  border: 3px solid #ccc;
  border-radius: 0%;
  width: 300px;
  height: 300px;
  margin-bottom: 15px;
  overflow: hidden;
  position: relative;
}

.profile-image {
  width: 100%;
  height: auto;
}

.change-profile-btn {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  z-index: 1; /* 이미지 위로 버튼이 올라오도록 설정 */
  color: #333; /* 버튼 텍스트 색상 지정 */
}

.basic-info h2 {
  margin: 0;
  padding: 10px 0;
}

.basic-info p {
  margin: 0;
  padding: 5px 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.introduction {
  margin: 15px 0;
  position: relative;
}

.introduction p {
  height: 100px;
  width: 300px;
  margin: 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: auto;
}

.introduction textarea {
  width: 100%;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
  overflow: auto;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
}

.edit-button {
  padding: 5px 10px;
  font-size: 0.8rem;
  border-radius: 4px;
}

.second-section {
  width: 55%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 50px;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  width: 100%;
  height: auto;
}

.grid-item {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
