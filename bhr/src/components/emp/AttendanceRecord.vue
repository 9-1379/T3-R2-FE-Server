<template>
  <div>
    <h1>출퇴근 기록 시스템</h1>
    <button @click="startWork">출근하기</button>
    <button @click="endWork">퇴근하기</button>
  </div>
</template>

<script>
import axiosInstance from '@/axios'; // axiosInstance를 import합니다.

export default {
  name: 'AttendanceRecord',
  data() {
    return {
      employeeId: 1, // 예시 ID. 실제 애플리케이션에서는 동적으로 설정해야 합니다.
      attendanceId: null, // 퇴근 시 사용할 출근 기록의 ID
    };
  },
  methods: {
    startWork() {
      // axiosInstance를 사용하여 출근 기록
      axiosInstance.post(`/attendance/startWork?employeeId=${this.employeeId}`)
        .then(response => {
          this.attendanceId = response.data.id; // 출근 기록의 ID를 저장
          alert('출근 처리되었습니다.');
        })
        .catch(error => {
          console.error('출근 처리 중 오류가 발생했습니다.', error);
        });
    },
    endWork() {
      if (!this.attendanceId) {
        alert('출근 기록이 없습니다.');
        return;
      }

      // axiosInstance를 사용하여 퇴근 기록
      axiosInstance.post(`/attendance/endWork?attendanceId=${this.attendanceId}`)
        .then(() => {
          alert('퇴근 처리되었습니다.');
        })
        .catch(error => {
          console.error('퇴근 처리 중 오류가 발생했습니다.', error);
        });
    }
  }
};
</script>
