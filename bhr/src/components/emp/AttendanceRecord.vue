<template>
  <div>
    <h1>출퇴근 기록 시스템</h1>
    <!-- 출근 버튼 클릭 시 startWork 메서드 실행 -->
    <button @click="startWork">출근하기</button>
    <!-- 퇴근 버튼 클릭 시 endWork 메서드 실행 -->
    <button @click="endWork">퇴근하기</button>

    <!-- 출근 시간 표시 -->
    <div v-if="startClicked">출근 시간: {{ formatTime(systemTime) }}</div>
    <!-- 퇴근 시간 표시 -->
    <div v-if="endClicked">퇴근 시간: {{ formatTime(systemTime) }}</div>
  </div>
</template>

<script>
import axiosInstance from '@/axios';

export default {
  name: 'AttendanceRecord',
  data() {
    return {
      systemTime: '',
      startClicked: false,
      endClicked: false
    };
  },
  methods: {
    startWork() {
      axiosInstance.post(`/attendance/startWork?employeeId=${String(this.$store.state.empId)}`)
        .then(response => {
          // 출근 버튼 클릭 시간 저장 및 표시
          this.systemTime = new Date();
          this.startClicked = true;
          // 서버에서 받은 응답을 처리하여 알림 표시
          alert(response.data.message || '출근완료!');
        })
        .catch(error => {
          // 오류가 발생한 경우 콘솔에 오류 로그 출력
          console.error('출근 처리 중 오류가 발생했습니다.', error);
          alert('오류입니다.');
        });
    },
    endWork() {
      axiosInstance.post(`/attendance/endWork?employeeId=${String(this.$store.state.empId)}`)
        .then(response => {
          // 퇴근 버튼 클릭 시간 저장 및 표시
          this.systemTime = new Date();
          this.endClicked = true;
          // 서버에서 받은 응답을 처리하여 알림 표시
          alert(response.data.message || '퇴근!');
        })
        .catch(error => {
          // 오류가 발생한 경우 콘솔에 오류 로그 출력
          console.error('퇴근 처리 중 오류가 발생했습니다.', error);
          alert('오류입니다.');
        });
    },
    formatTime(date) {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
  }
};
</script>
