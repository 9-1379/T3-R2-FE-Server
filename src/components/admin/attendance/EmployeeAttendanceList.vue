<template>
    <div class="employee-attendance-list">
        <h2>직원 근태 리스트</h2>
        <!-- 검색 필터 -->
        <div>
            <input type="date" v-model="searchDate" />
            <input type="text" v-model="searchName" placeholder="이름 검색" />
            <button @click="applyFilters">검색</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>날짜</th>
                    <th>사번</th>
                    <th>이름</th>
                    <th>부서</th>
                    <th>직위</th>
                    <th>출근 시간</th>
                    <th>퇴근 시간</th>
                    <th>상태</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="attendance in attendances" :key="attendance.empNo">
                    <td>{{ attendance.startDate }}</td>
                    <td>{{ attendance.empNo }}</td>
                    <td>{{ attendance.empName }}</td>
                    <td>{{ attendance.deptName }}</td>
                    <td>{{ attendance.jobId }}</td>
                    <td>{{ attendance.timeIn }}</td>
                    <td>{{ attendance.timeOut }}</td>
                    <td>{{ attendance.status }}</td>
                </tr>
            </tbody>
        </table>
        <div v-if="attendances.length === 0">해당 상태의 직원 정보가 없습니다.</div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { onMounted } from 'vue';
import axiosInstance from '@/axios';

// eslint-disable-next-line
const props = defineProps({
    status: String,
    date: String
});

const searchName = ref('');
const searchDate = ref('');
const attendances = ref([]);

// 데이터를 서버로부터 가져오는 함수
const fetchAttendances = async () => {
    try {
        const response = await axiosInstance.get('/api/admin/attendance/list', {
            params: {
                status: props.status,
                date: searchDate.value,
                name: searchName.value
            }
        });
        attendances.value = response.data;
    } catch (error) {
        console.error('직원 근태 정보를 불러오는 데 실패했습니다.', error);
    }
};

// 검색 버튼 클릭 이벤트
const applyFilters = () => {
    fetchAttendances();
};

onMounted(fetchAttendances);

// 감시자를 통해 상태가 변경되면 데이터를 다시 불러옵니다.
watch(() => props.status, fetchAttendances);
</script>

<style scoped>
.employee-attendance-list table {
    width: 100%;
    border-collapse: collapse;
}

.employee-attendance-list th,
.employee-attendance-list td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.employee-attendance-list tr:nth-child(even) {
    background-color: #f2f2f2;
}
</style>
