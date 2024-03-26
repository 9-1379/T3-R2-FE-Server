<template>
  <h1>관리자 대시보드</h1>
  <div style="width: 30%;">
    <canvas id="deptNameChart"></canvas>
  </div>
  <div style="width: 30%;">
    <canvas id="deptNameBarChart"></canvas> <!-- 막대 차트 추가 -->
  </div>
  <div>
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
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  setup() {
    const employeeList = ref([]);
    const count = ref(0);

    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:8000/list');
        employeeList.value = response.data.employeeList;
        count.value = response.data.count;
        const departmentsData = createChartData(employeeList.value);
        createChart(departmentsData)
        createBarChart(departmentsData);
      } catch (error) {
        console.error('Error fetching users:', error);
        // 에러 처리 로직
      }
    });

    function createChartData(employees) {
      return employees.reduce((acc, cur) => {
        acc[cur.deptName] = (acc[cur.deptName] || 0) + 1;
        return acc;
      }, {});
    }
    function createChart(departmentsData){
      const ctx = document.getElementById('deptNameChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(departmentsData),
          datasets: [{
            data: Object.values(departmentsData),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
        }
      });
    }
    // 막대 차트 생성 함수
    function createBarChart(departmentsData) {
      const ctx = document.getElementById('deptNameBarChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(departmentsData),
          datasets: [{
            label: '부서별 직원 수',
            data: Object.values(departmentsData),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          responsive: true,
        }
      });
    }

    return {
      employeeList,
      count
    };
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

li:hover {
  background-color: #f0f0f0;
}

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