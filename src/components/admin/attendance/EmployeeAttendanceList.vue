<template>
    <div class="employee-attendance-list">
        <h2>직원 근태 리스트</h2>
        <table>
            <thead>
                <tr>
                    <th>직원 번호</th>
                    <th>이름</th>
                    <th>직위</th>
                    <th>출근 시간</th>
                    <th>퇴근 시간</th>
                    <th>상태</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="attendance in attendances" :key="attendance.id">
                    <td>{{ attendance.empNo }}</td>
                    <td>{{ attendance.name }}</td>
                    <td>{{ attendance.position }}</td>
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
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';

// eslint-disable-next-line no-undef
const props = defineProps({
    status: String,
    date: String
});

const attendances = ref([]);

const fetchAttendances = async (status, date) => {
    try {
        const response = await axios.get('/api/attendance', { params: { status, date } });
        attendances.value = response.data;
    } catch (error) {
        console.error('직원 근태 정보를 불러오는 데 실패했습니다.', error);
    }
};

onMounted(() => {
    fetchAttendances(props.status, props.date);
});

watch(() => props.status, (newStatus) => {
    fetchAttendances(newStatus, props.date);
});
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
