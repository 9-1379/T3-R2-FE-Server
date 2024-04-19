<template>
  <div class="attendance-card-container">
    <h4 class="header">이번 달 출석 현황</h4>
    <div v-if="monthlyAttendance">
      <div class="attendance-status">
        <div class="status-item">
          <p>출근</p>
          <div class="status-circle">{{ monthlyAttendance.출근 }}</div>
        </div>
        <div class="status-item">
          <p>지각</p>
          <div class="status-circle">{{ monthlyAttendance.지각 }}</div>
        </div>
        <div class="status-item">
          <p>결근</p>
          <div class="status-circle">{{ monthlyAttendance.결근 }}</div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>출석 정보를 불러오는 중...</p>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/axios";
import { reactive, onMounted } from "vue";

export default {
  name: "AttendanceCard",
  setup() {
    const monthlyAttendance = reactive({ attendance: 0, late: 0, absence: 0 });

    const fetchMonthlyAttendance = async () => {
      try {
        const empId = getEmpIdFromToken(); // 직원의 ID 가져오기
        const response = await axiosInstance.get(
          `/attendance/monthlySummary/${empId}`
        );
        if (response.data) {
          Object.assign(monthlyAttendance, response.data);
        }
      } catch (error) {
        console.error("출석 정보를 불러오는 중 에러:", error);
      }
    };

    onMounted(fetchMonthlyAttendance);

    function getEmpIdFromToken() {
      const token = localStorage.getItem("access_token");
      if (token) {
        const decodedToken = atob(token.split(".")[1]);
        const { empId } = JSON.parse(decodedToken);
        return empId;
      }
      return null;
    }

    return { monthlyAttendance };
  },
};
</script>

<style>
.attendance-card-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 5px;
  display: inline-block;
  margin-top: 15px;
}

.header {
  text-align: left;
  margin-bottom: 5px;
  margin-top: 0;
}

.attendance-status {
  display: flex;
  justify-content: flex-start;
}

.status-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 40px;
}

.status-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f0f0f0;
}

.p {
  margin-bottom: 10px;
}

.status-item:last-child {
  margin-right: 0;
}
</style>