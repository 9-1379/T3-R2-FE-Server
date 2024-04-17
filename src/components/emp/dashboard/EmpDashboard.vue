<template>
  <div>
    <UserMenu />
    <div class="profile-section">
      <div class="profile-info">
        <div class="profile-image-wrapper">
          <img class="profile-image" src="@/assets/emotion/dead.jpg" alt="Profile Picture" />
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
            <EmpBadge />
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
import EmpBadge from "./EmpBadge.vue";

export default {
  components: {
    UserMenu,
    AttendanceRecord,
    MyAnnual,
    MyAttendance,
    EmpBadge
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
  /* 기타 스타일링 */
}

.profile-info {
  text-align: center;
  margin-right: 30px;
  /* 추가된 스타일링 */
}

.profile-image-wrapper {
  border: 3px solid #ccc;
  border-radius: 0%;
  width: 300px;
  height: 300px;
  margin-bottom: 15px;
  overflow: hidden;
}

.profile-image {
  width: 100%;
  height: auto;
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
  /* 오른쪽 정렬 */
  padding-top: 10px;
  /* 버튼과 텍스트 영역 사이 간격 */
}

.edit-button {
  padding: 5px 10px;
  /* 버튼 내부 여백 */
  font-size: 0.8rem;
  /* 글씨 크기 */
  border-radius: 4px;
  /* 버튼 모서리 둥글게 */
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
  /* 2열 구조 */
  grid-template-rows: 1fr 1fr;
  /* 2행 구조 */
  gap: 20px;
  /* 그리드 사이의 간격 */
  width: 100%;
  /* 컨테이너 너비 */
  height: auto;
  /* 자동 높이 조정 */
}

.grid-item {
  background-color: #fff;
  /* 배경색 */
  border: 1px solid #ccc;
  /* 테두리 */
  padding: 10px;
  /* 패딩 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 그림자 효과 */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>