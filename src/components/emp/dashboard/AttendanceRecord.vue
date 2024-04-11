<template>
  <div>
    <div>
      <div style="margin-bottom: 10px;">
        <button @click="startWork" style="padding: 8px 60px; background-color: beige; color: black;">출근</button>
        <span v-if="record.timeIn">출근 시간: {{ formatTime(record.timeIn) }}</span>
      </div>
      <div>
        <button @click="endWork" style="padding: 8px 60px; background-color: beige; color: black;">퇴근</button>
        <span v-if="record.timeOut">퇴근 시간: {{ formatTime(record.timeOut) }}</span>
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
      record: {
        timeIn: null,
        timeOut: null
      }
    };
  },
  created() {
    this.fetchAttendanceRecord();
  },
  methods: {
    fetchAttendanceRecord() {
      const today = new Date().toISOString().split('T')[0];
      axiosInstance.get(`/attendance/record/${this.getEmpIdFromToken()}`)
        .then(response => {
          const record = response.data;
          this.record = record;
          this.hasTodayRecord = today === record.startDate;
        })
        .catch(error => {
          console.error('Error fetching attendance record:', error);
        });
    },
    startWork() {
      axiosInstance.post(`/attendance/startWork?employeeId=${this.getEmpIdFromToken()}`)
        .then(() => {
          this.fetchAttendanceRecord(); // 출근 후 다시 데이터를 불러와서 시간 업데이트
          alert('출근 완료!');
        })
        .catch(error => {
          console.error('Error starting work:', error);
          alert('이미 출근 하셨습니다.');
        });
    },
    endWork() {
      axiosInstance.post(`/attendance/endWork?employeeId=${this.getEmpIdFromToken()}`)
        .then(() => {
          this.fetchAttendanceRecord(); // 퇴근 후 다시 데이터를 불러와서 시간 업데이트
          alert('퇴근 완료!');
        })
        .catch(error => {
          console.error('Error ending work:', error);
          alert('출근을 먼저 해주세요.');
        });
    },
    formatTime(time) {
      if (!time) return ''; // 시간이 없으면 빈 문자열 반환
      const [hours, minutes] = time.split(':');
      return `${hours}:${minutes}`; // 시간 및 분만 반환
    },
    getEmpIdFromToken() {
      const token = localStorage.getItem('access_token');
      if (token) {
        const decodedToken = atob(token.split('.')[1]);
        const { empId } = JSON.parse(decodedToken);
        return empId;
      }
      return null;
    }
  }
};
</script>
