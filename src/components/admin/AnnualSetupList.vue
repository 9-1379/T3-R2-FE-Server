<template>
  <div>
    <AdminMenu />
    <div class="section-top">
      <h2>직원 연차 부여</h2>
      부여 년도: {{ currentYear }}년도
      <input @keyup.enter="newAnnualTotal" class="input-set" v-model="form.annualTotal" placeholder="부여할 갯수 입력">
      <button class="button-set" @click="newAnnualTotal">전체 부여</button>
      <button class="button-set" @click="deleteTotalAll">전체 삭제</button>
    </div>
    <div class="section-bottom">
      <h2 class="list-title">직원 연차 현황</h2>
      <div class="department-selection">
        <text class="dept-title">부서선택</text>
        <div
          class="department-option"
          v-for="(department, index) in departments"
          :key="index"
        >
          <input
            type="checkbox"
            v-model="selectedDepartments"
            :value="department"
          />
          <label>{{ department }}</label>
        </div>
      </div>

      <div class="table-selection">
        <table>
          <thead>
            <th>이름</th>
            <th>부서명</th>
            <th>부여연차</th>
            <th>선사용연차</th>
            <th>사용연차</th>
          </thead>
          <tbody>
            <tr
              v-for="(list, index) in paginatedEmpAnnualList"
              v-bind:key="index"
            >
              <td>{{ list.name }}</td>
              <td>{{ list.deptName }}</td>
              <td>{{ list.annualTotal }}</td>
              <td>{{ list.annualUsed }}</td>
              <th>{{ list.annualCnt }}</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="paging, section-bottom-bottom">
      <button class="button-set" @click="prevPage" :disabled="currentPage === 1">이전</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button class="button-set" @click="nextPage" :disabled="currentPage === totalPages">다음</button>
    </div>
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
      departments: [], // 예시로 부서 정보를 배열로 추가합니다.
      selectedDepartments: [], // 선택된 부서를 담을 배열
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    filteredEmpAnnualList() {
      if (this.selectedDepartments.length === 0) {
        return this.empAnnualList;
      }
      return this.empAnnualList.filter((emp) =>
        this.selectedDepartments.includes(emp.deptName)
      );
    },
    totalPages() {
      return Math.ceil(this.filteredEmpAnnualList.length / this.itemsPerPage);
    },
    paginatedEmpAnnualList() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredEmpAnnualList.slice(startIndex, endIndex);
    },
  },
  methods: {
    async deleteTotalAll() {
      await axiosInstance.delete("/annualTotal/delete");
      alert("연차가 전체 삭제 되었습니다");
      this.empAnnualStatus();
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    async newAnnualTotal() {
      this.form.annualYear = this.currentYear;
      await axiosInstance.post("/annualTotal", this.form);
      this.clearInput();
      alert("연차가 부여되었습니다");
      this.empAnnualStatus();
    },
    clearInput() {
      this.form.annualTotal = "";
    },
    // 현재 연차 현황 메서드
    async empAnnualStatus() {
      const statusListResponse = await axiosInstance.get(
        `/status/${this.currentYear}`
      );
      this.empAnnualList = statusListResponse.data;
    },
    // 부서 불러오기 메서드
    async deptList() {
      const empdepartmentResponse = await axiosInstance.get(
        "api/hrCard/deptList"
      );
      this.departments = empdepartmentResponse.data;
    },
  },
  mounted() {
    this.empAnnualStatus();
    this.deptList();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap");
* {
  font-family: "Open Sans", sans-serif;
}

.section-top {
  width: 80%; /* 요소의 너비를 100%로 설정 */
  padding: 20px; /* 내부 여백 설정 */
  box-sizing: border-box; /* 박스 크기를 내부 여백 및 테두리를 포함하여 계산하도록 설정 */
  background-color: white; /* 배경색 설정 */
  border: 1px solid #ccc; /* 테두리 스타일 및 색상 설정 */
  border-radius: 10px; /* 모서리를 동그랗게 만듦 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: auto; /* 왼쪽 여백을 auto로 설정하여 가운데 정렬 */
  margin-right: auto; /* 오른쪽 여백을 auto로 설정하여 가운데 정렬 */
}

.section-bottom {
  width: 80%; /* 요소의 너비를 100%로 설정 */
  padding: 20px; /* 내부 여백 설정 */
  box-sizing: border-box; /* 박스 크기를 내부 여백 및 테두리를 포함하여 계산하도록 설정 */
  background-color: white; /* 배경색 설정 */
  border: 1px solid #ccc; /* 테두리 스타일 및 색상 설정 */
  border-radius: 10px; /* 모서리를 동그랗게 만듦 */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  margin-left: auto; /* 왼쪽 여백을 auto로 설정하여 가운데 정렬 */
  margin-right: auto; /* 오른쪽 여백을 auto로 설정하여 가운데 정렬 */
}
.section-bottom-bottom {
  margin-top: 10px;
}
.button-set {
  margin-left: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); /* 그림자 효과 추가 */
}
.input-set {
  width: 200px; /* 너비 설정 */
  height: 30px; /* 높이 설정 */
}
.department-selection {
  display: flex;
  flex-wrap: wrap; /* 여러 줄로 나눠서 표시되도록 합니다 */
  gap: 15px; /* 체크박스 간 간격을 설정합니다 */
  justify-content: center;
  margin-bottom: 20px;
}
.department-option {
  display: flex;
  align-items: center; /* 체크박스와 레이블을 수직 중앙정렬합니다 */
}
.table-selection {
  display: flex;
  justify-content: center;
  width: 80%; /* 예를 들어, 화면 너비의 80%를 차지하도록 설정 */
  margin: 0 auto;
}
.list-title {
  color: #4a4a4a;
  text-align: center;
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

.centered-table {
  width: 100%;
  max-width: 700px;
  text-align: center;
}
button {
  background: #8070f7;
}
span {
  margin-left: 10px;
  margin-right: auto;
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

.dept-title {
  border: 1px solid rgb(255, 255, 255) beb; /* 테두리 스타일 및 색상 */
  background-color: #8070f7; /* 배경색 설정 */
  color: white; /* 글자 색 설정 */
  border-radius: 10px; /* 모서리를 동그랗게 만듦 */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); /* 그림자 효과 추가 */
  padding: 5px; /* 내부 여백 설정 */
}
input::placeholder {
  text-align: center;
  color: gray;
}
</style>
