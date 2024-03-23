<template>
    <div class="employee-list-container">
      <h2 class="list-title">직원 목록 조회</h2>
      <div class="search-and-actions">
        <div class="search-section">
          <label for="search">검색:</label>
          <input type="text" id="search" v-model="searchQuery" placeholder="검색">
        </div>
        <div class="action-buttons">
          <button @click="fetchEmployees" class="action-button">신규 직원 추가</button>
          <button @click="downloadEmployeeList" class="action-button">퇴직 처리</button>
        </div>
      </div>
      <div class="table-section">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox"></th>
              <th>이름</th>
              <th>부서</th>
              <th>전화번호</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in filteredEmployees" :key="employee.id">
              <td><input type="checkbox" :value="employee.id" v-model="selectedEmployees"></td>
              <td>{{ employee.name }}</td>
              <td>{{ employee.dept }}</td>
              <td>{{ employee.phoneNumber }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        employees: [],
        searchQuery: '',
        selectedEmployees: []
      };
    },
    computed: {
      filteredEmployees() {
        return this.employees.filter(employee =>
          employee.name.includes(this.searchQuery)
        );
      }
    },
    methods: {
      fetchEmployees() {
        // Fetch logic here
      },
      downloadEmployeeList() {
        // Download logic here
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
    align-items: flex-start; /* 왼쪽 정렬 */
    height: 100vh;
    background-color: white; /* 변경된 배경색 */
    padding: 20px; /* 추가된 패딩 */
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
    background-color: transparent; /* 배경색을 투명하게 설정 */
    border: 1px solid #4a76a8; /* 테두리 색상과 두께를 설정 */
    border-radius: 4px; /* 테두리의 둥근 모서리를 설정 */
    padding: 10px 15px;
    color: #4a76a8; /* 글자 색상을 설정 */
    cursor: pointer;
  }
  
  .action-button:hover {
    background-color: #e0e0e0; /* 마우스를 올렸을 때의 배경색 변경 */
  }
  
  .table-section {
    width: 100%;
    max-width: 700px;
    border-collapse: collapse;
  }
  
  table {
    width: 100%;
  }
  
  th, td {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid #e0e0e0;
    background-color: transparent;
    color: #ccc; /* 연한 회색으로 변경 */
  }
  
  th {
    border-top: 1px solid #e0e0e0;
  }
  
  td {
    border-bottom: 1px solid #e0e0e0;
  }
  
  </style>