<template>
  <div>
    <h1>출퇴근 기록 시스템</h1>
    <div>
      <div>
        <button @click="startWork">출근하기</button>
      </div>
      <div>
        <button @click="endWork">퇴근하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/axios';

export default {
  name: 'AttendanceRecord',
  data() {
    return {
      hasTodayRecord: false,
    };
  },
  created() {
    this.fetchAttendanceRecord();
  },
  methods: {
    fetchAttendanceRecord() {
      const today = new Date().toISOString().split('T')[0];
      axiosInstance.get(`/attendance/record/${this.$store.state.empId}`)
        .then(response => {
          const record = response.data;
          const recordDate = record.startDate.split('T')[0]; // 출근 날짜의 날짜 부분만 추출
          // 오늘 날짜와 출근 날짜가 같으면 오늘 출근 기록이 있다고 판단
          this.hasTodayRecord = today === recordDate;
        })
        .catch(error => {
          console.error('Error fetching attendance record:', error);
        });
    },
    startWork() {
      // 출근 요청 보내기
      axiosInstance.post(`/attendance/startWork?employeeId=${this.$store.state.empId}`)
        .then(() => {
          this.hasTodayRecord = true; // 출근 기록이 있음을 표시
          alert('출근 완료!');
        })
        .catch(error => {
          console.error('Error starting work:', error);
          alert('이미 출근 하셨습니다.');
        });
    },
    endWork() {
      // 퇴근 요청 보내기
      axiosInstance.post(`/attendance/endWork?employeeId=${this.$store.state.empId}`)
        .then(() => {
          this.hasTodayRecord = false; // 퇴근 기록이 있음을 표시
          alert('퇴근 완료!');
        })
        .catch(error => {
          console.error('Error ending work:', error);
          alert('출근을 먼저 해주세요.');
        });
    },
  }
};
</script>
