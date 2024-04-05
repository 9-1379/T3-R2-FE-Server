<template>
  <div>
    <h1>출퇴근 기록 시스템</h1>
    <div>
      <!-- 오늘 출근 기록이 없으면 출근 버튼 표시 -->
      <div v-if="!hasTodayRecord">
        <button @click="startWork">출근하기</button>
      </div>

      <div v-if="startTime">출근 시간: {{ startTime }}</div>
      
      <!-- 오늘 출근 기록이 있고, 퇴근 기록이 없으면 퇴근 버튼 표시 -->
      <div v-if="hasTodayRecord && !endTime">
        <button @click="endWork">퇴근하기</button>
      </div>
      
      <div v-if="endTime">퇴근 시간: {{ endTime }}</div>
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
      startTime: '',
      endTime: '',
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
          const recordDate = record.startDate;
          this.startTime = record.timeIn;
          this.endTime = record.timeOut;
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
        .then(response => {
          this.startTime = response.data.timeIn;
          this.endTime = ''; // 퇴근 시간 초기화
          this.hasTodayRecord = true; // 출근 기록이 있음을 표시
          alert('출근 완료!');
        })
        .catch(error => {
          console.error('Error starting work:', error);
          alert('오류입니다.');
        });
    },
    endWork() {
      // 퇴근 요청 보내기
      axiosInstance.post(`/attendance/endWork?employeeId=${this.$store.state.empId}`)
        .then(response => {
          this.endTime = response.data.timeOut;
          alert('퇴근 완료!');
        })
        .catch(error => {
          console.error('Error ending work:', error);
          alert('오류입니다.');
        });
    },
  }
};
</script>
