<template>
  <div>
    <AdminMenu />
    <div>
      <h1>직원 연차 부여</h1>
      해당 년도: {{ currentYear }}
      <input v-model="form.annualTotal" />
      <button @click="newAnnualTotal">부여</button>
    </div>
    <h1>직원 연차 현황1</h1>
    <div class="table-section">
      <table class="centered-table">
        <thead>
          <th>이름</th>
          <th>부여연차</th>
          <th>선사용연차</th>
          <th>사용연차</th>
        </thead>
        <tbody>
          <tr v-for="(list, index) in empAnnualList" v-bind:key="index">
            <td>{{ list.name }}</td>
            <td>{{ list.annualTotal }}</td>
            <td>{{ list.annualUsed }}</td>
            <th>{{ list.annualCnt }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AdminMenu from "@/components/menu/AdminMenu.vue";
import axiosInstance from "@/axios";

export default {
  components: {
    AdminMenu,
  },
  data() {
    return {
      form: {
        annualYear: "",
        annualTotal: "",
      },
      currentYear: new Date().getFullYear(),
      empAnnualList: [],
    };
  },
  methods: {
    async newAnnualTotal() {
      this.form.annualYear = this.currentYear;
      await axiosInstance.post("/annualTotal", this.form);
      this.clearInput();
      alert("연차가 부여되었습니다");
    },
    clearInput: function () {
      this.form.annualTotal = "";
    },
    async empAnnualStatus() {
      const statusListResponse = await axiosInstance.get(`/status/${this.currentYear}`);
      this.empAnnualList = statusListResponse.data;
    },
  },
  mounted() {
    this.empAnnualStatus();
  },
};
</script>

<style scoped>
.employee-list-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;
  background-color: white;
  padding: 20px;
}

.list-title {
  color: #4a4a4a;
  text-align: left;
  margin-bottom: 20px;
}

.search-and-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 700px;
  margin-bottom: 20px;
}

.search-section {
  display: flex;
  align-items: center;
}

.search-section label,
.search-section input {
  margin-right: 10px;
}

.action-buttons {
  display: flex;
  align-items: center;
}

.action-button {
  margin: 0 5px;
  background-color: transparent;
  border: 1px solid #4a76a8;
  border-radius: 4px;
  padding: 10px 15px;
  color: #4a76a8;
  cursor: pointer;
}

.action-button:hover {
  background-color: #e0e0e0;
}

.table-section {
  display: flex;
  justify-content: center;
  width: 80%;
}
.centered-table {
  width: 100%;
  max-width: 700px;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: center;
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
}

th {
  border-top: 1px solid #e0e0e0;
}

td {
  border-bottom: 1px solid #e0e0e0;
}

.detail-button {
  margin: 0 5px;
  background-color: #f0f0f0;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.detail-button:hover {
  background-color: #e2e2e2;
}

/* 선택된 행의 배경색을 변경하는 스타일 */
.selected-row {
  background-color: #f2f2f2;
}

.dark-mode .employee-list-container {
  background-color: #333;
  color: white;
}

.dark-mode .list-title {
  color: white;
}

.dark-mode .action-button {
  color: white;
  border-color: #888;
}

.dark-mode .action-button:hover {
  background-color: #555;
}

.dark-mode th,
.dark-mode td {
  border-color: #888;
}

.dark-mode .detail-button {
  background-color: #555;
  border-color: #444;
}

.dark-mode .detail-button:hover {
  background-color: #777;
}

.dark-mode .selected-row {
  background-color: #444;
}
</style>
