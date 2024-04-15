<template>
    <div class="employee-attendance-list">
        <!-- 검색 필터 -->
        <div class="search-filter">
            <input type="date" v-model="searchDate" />
            <input v-model="searchName" placeholder="이름 검색" />
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
import { ref, watch, onMounted, defineProps } from 'vue';
import axiosInstance from '@/axios';

const props = defineProps({
    status: String,
    date: String
});

const searchName = ref('');
const searchDate = ref('');
const attendances = ref([]);

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

const applyFilters = () => {
    fetchAttendances();
};

onMounted(fetchAttendances);
watch(() => props.status, fetchAttendances);
</script>

<style scoped>
.employee-attendance-list .search-filter {
    margin-top: 20px;
    display: flex;

    gap: 10px;
    margin-bottom: 20px;
}

.employee-attendance-list table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    /* 테이블 너비 고정 */
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
