<template>
  <div>
    <div>
      <UserMenu />
    </div>
    <div class="profile-section">
      <div
        class="first-section"
        v-for="(list, index) in employee"
        v-bind:key="index"
      >
        <p class="p1">
          이름: {{ list.name }} <br />
          부서명:{{ list.deptName }} <br />
          직위: {{ list.position }} <br />
          직무: {{ list.jobId }} <br />
        </p>
        <p class="p1">
          <br />
          {{ list.introduction }}
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
  text-align: center;
}
.first-section,
.second-section {
  width: 45%; /* 섹션의 너비 */
  display: inline-block; /* 같은 라인에 표시 */
  vertical-align: top; /* 섹션들을 위쪽에 정렬 */
  /* margin-right: 5%; 오른쪽 마진 설정 */
  /* text-align: center; */
}


p {
  line-height: 1.5; /* 원하는 줄간격 값으로 조절합니다. */
}
.p1 {
  text-align: left;
  border: 1px solid #a09e9e; /* 네모 박스 테두리 스타일 */
  width: 280px; /* 네모 박스의 너비 */
  height: 100px; /* 네모 박스의 높이 */
  border-radius: 10px;
  box-shadow: 0px 4px 2px rgba(96, 99, 100, 0.3);
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
}
</style>