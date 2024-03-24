<template>
  <div>
    <h1>Employee List</h1>
    <p>Total Employees: {{ count }}</p>
    <ul>
      <li v-for="employee in employeeList" :key="employee.id">
        {{ employee.name }} - {{ employee.position }}
      </li>
    </ul>
  </div>
</template>
  
  <script>

  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const employeeList = ref([]);
      const count = ref(0);
  
      onMounted(async () => {
        try {
          const response = await axios.get('http://localhost:8050/list');
          employeeList.value = response.data.employeeList;
          count.value = response.data.count;
        } catch (error) {
          console.error('Error fetching users:', error);
          // 에러 처리 로직
        } 
      });
  
      return {
        employeeList,
        count
      };
    },
  };
  </script>
  
  <style scoped>
  .admin-dashboard ul {
    list-style-type: none;
    padding: 0;
  }
  
  .admin-dashboard li {
    cursor: pointer;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .admin-dashboard li:hover {
    background-color: #f0f0f0;
  }
  </style>
  