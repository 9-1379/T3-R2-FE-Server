<template>
  <div>
    <div>
      <AdminMenu />
    </div>
    <div class="profile-section">
      <div
        class="first-section"
        v-for="(list, index) in employee"
        v-bind:key="index"
      >
        <p>
          이름: {{ list.name }} <br />
          부서명:{{ list.deptName }} <br />
          직위: {{ list.position }} <br />
          직무: {{ list.jobId }} <br />
          입사일: {{ list.hireDate }} <br />
          소개글: {{ list.introduction }}
        </p>
        <textarea v-model="form.introduction"></textarea>
        <button @click="postIntro">저장</button>
        <div>
          <AttendanceRecord />
        </div>
      </div>
      <div class="second-section">
        <p>배지가 들어갈 공간</p>
        <MyAttendance />
        <MyAnnual />
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/axios";
import AdminMenu from "@/components/menu/AdminMenu.vue";
import AttendanceRecord from "@/components/emp/dashboard/AttendanceRecord.vue";
import MyAnnual from "@/components/emp/dashboard/MyAnnual.vue";
import MyAttendance from "@/components/emp/dashboard/MyAttendance.vue";

export default {
  components: {
    AdminMenu,
    AttendanceRecord,
    MyAnnual,
    MyAttendance,
  },
  data() {
    return {
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
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  text-align: left;
  border: 1px solid #ccc; /* 네모 박스 테두리 스타일 */
  padding: 20px; /* 내부 여백 설정 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
}
.first-section,
.second-section {
  width: 45%; /* 섹션의 너비 */
  display: inline-block; /* 같은 라인에 표시 */
  vertical-align: top; /* 섹션들을 위쪽에 정렬 */
  margin-right: 5%; /* 오른쪽 마진 설정 */
}

p {
  line-height: 1.5; /* 원하는 줄간격 값으로 조절합니다. */
}
</style>