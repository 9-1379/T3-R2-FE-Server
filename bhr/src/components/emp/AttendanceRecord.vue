<template>
  <div>
    <h1>출퇴근 기록 시스템</h1>
    <div>
      <!-- 출근 버튼 -->
      <div v-if="!startClicked && !endClicked">
        <button @click="startWork">출근하기</button>
      </div>

      <!-- 출근 시간과 퇴근 버튼 -->
      <div v-if="startClicked && !endClicked">
        <div v-if="startTime">출근 시간: {{ startTime }}</div>
        <button @click="endWork">퇴근하기</button>
      </div>

      <!-- 출근 시간과 퇴근 시간 -->
      <div v-if="endClicked">
        <div v-if="startTime">출근 시간: {{ startTime }}</div>
        <div v-if="endTime">퇴근 시간: {{ endTime }}</div>
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
      startClicked: false,
      endClicked: false,
      startTime: '',
      endTime: '',
    };
  },
  created() {
    this.checkAttendance();
  },
  methods: {
    checkAttendance() {
      axiosInstance.get(`/attendance/record/${this.$store.state.empId}`)
        .then(response => {
          if (response.data && response.data.timeIn) {
            this.startTime = response.data.timeIn;
            this.startClicked = true;
          }
          if (response.data && response.data.timeOut) {
            this.endTime = response.data.timeOut;
            this.endClicked = true;
          }
        })
        .catch(error => {
          console.error('기록을 가져오는 중 오류가 발생했습니다.', error);
        });
    },
    startWork() {
      axiosInstance.post(`/attendance/startWork?employeeId=${String(this.$store.state.empId)}`)
        .then(response => {
          this.handleWorkResponse(response, 'start');
        })
        .catch(error => {
          console.error('출근 처리 중 오류가 발생했습니다.', error);
          alert('오류입니다.');
        });
    },
    endWork() {
      axiosInstance.post(`/attendance/endWork?employeeId=${String(this.$store.state.empId)}`)
        .then(response => {
          this.handleWorkResponse(response, 'end');
        })
        .catch(error => {
          console.error('퇴근 처리 중 오류가 발생했습니다.', error);
          alert('오류입니다.');
        });
    },
    handleWorkResponse(response, type) {
      if (type === 'start' && response.data.timeIn) {
        this.startTime = response.data.timeIn;
        this.startClicked = true;
      } else if (type === 'end' && response.data.timeOut) {
        this.endTime = response.data.timeOut;
        this.endClicked = true;
      }
      alert(response.data.message || `${type === 'start' ? '출근' : '퇴근'}완료!`);
    },
  }
};
</script>
