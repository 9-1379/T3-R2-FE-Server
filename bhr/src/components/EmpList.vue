<template>
  <AdminMenu />
  <div class="employee-list-container">
    <h2 class="list-title">직원 목록 조회</h2>
    <div class="search-and-actions">
      <div class="search-section">
        <label for="search">검색:</label>
        <input type="text" id="search" v-model="searchQuery" placeholder="검색">
      </div>
      <div class="action-buttons">
        <button @click="goToNewEmployee" class="action-button">신규 직원 추가</button>
        <button @click="retireEmployees" class="action-button">퇴직 처리</button>
      </div>
    </div>
    <div class="table-section">
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" @change="selectAllEmployees"></th>
            <th>이름</th>
            <th>부서</th>
            <th>전화번호</th>
            <th>상세정보</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in filteredEmployees" :key="employee.id" 
              :class="{'selected-row': selectedEmployees.includes(employee.id)}">
            <td><input type="checkbox" :value="employee.id" v-model="selectedEmployees"></td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.deptName ? employee.deptName : '부서 정보 없음' }}</td>
            <td>{{ employee.phoneNumber }}</td>
            <td><button @click="viewEmployeeDetails(employee)" class="detail-button">상세보기</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/axios';
import { useRouter } from 'vue-router';
import AdminMenu from '@/components/menu/AdminMenu.vue';

export default {
  components: {
    AdminMenu
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      employees: [],
      searchQuery: '',
      selectedEmployees: []
    };
  },
  computed: {
    filteredEmployees() {
      if (!Array.isArray(this.employees)) {
        return [];
      }
      return this.employees.filter(employee =>
        employee.name.toLowerCase().includes(this.searchQuery.toLowerCase()) && employee.status !== 'LEAVE'
      );
    }
  },
  methods: {
    async fetchEmployees() {
      try {
        const response = await axiosInstance.get('/employees');
        this.employees = response.data;
      } catch (error) {
        console.error('직원 정보를 불러오는데 실패했습니다:', error);
        alert('직원 정보를 불러오는데 실패했습니다.');
      }
    },
    async retireEmployees() {
      if (this.selectedEmployees.length === 0) {
        alert('직원을 선택해주세요.');
        return;
      }

      try {
        await axiosInstance.put('/employees/retire-multiple', this.selectedEmployees);
        await this.fetchEmployees();
        this.selectedEmployees = [];
        alert('선택된 직원이 퇴직 처리되었습니다.');
      } catch (error) {
        console.error('직원 퇴직 처리 중 오류가 발생했습니다:', error);
        alert('직원 퇴직 처리 중 오류가 발생했습니다.');
      }
    },
    goToNewEmployee() {
      this.router.push('/new');
    },
    viewEmployeeDetails(employee) {
      this.router.push({ name: 'EmpDetail', params: { id: employee.id }});
    },
    selectAllEmployees(event) {
      if (event.target.checked) {
        this.selectedEmployees = this.filteredEmployees.map(employee => employee.id);
      } else {
        this.selectedEmployees = [];
      }
    }
  },
  created() {
    this.fetchEmployees();
  }
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
.search-section label, .search-section input {
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
  color: #4a76a8; /* 글자 색상 설정 */
  cursor: pointer;
}

.action-button:hover {
  background-color: #e0e0e0; /* 마우스를 올렸을 때의 배경색 변경 */
}

.table-section {
  width: 100%;
  max-width: 700px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: left;
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
  background-color: #f2f2f2; /* 선택된 행의 배경색 */
}
</style>
