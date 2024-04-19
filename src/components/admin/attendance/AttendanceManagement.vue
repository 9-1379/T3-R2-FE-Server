<template>
    <AdminMenu />
    <div class="attendance-management">
        <AttendanceSummary @status-selected="handleStatusSelected" />
        <EmployeeAttendanceList :status="selectedStatus" :date="selectedDate" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import AttendanceSummary from './AttendanceSummary.vue';
import EmployeeAttendanceList from './EmployeeAttendanceList.vue';
import AdminMenu from '@/components/menu/AdminMenu.vue';

const selectedStatus = ref('');
const selectedDate = ref(new Date().toISOString().split('T')[0]); // 현재 날짜를 기본값으로 설정

function handleStatusSelected(status) {
    selectedStatus.value = status;
    // 여기서 selectedDate.value를 변경하거나 다른 상태를 조정하여 EmployeeAttendanceList 컴포넌트에 전달할 수 있습니다.
}
</script>

<style scoped>
.attendance-management {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}
</style>
