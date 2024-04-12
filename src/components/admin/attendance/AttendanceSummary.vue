<template>
    <div class="attendance-summary">
        <div class="status-box" @click="selectStatus('PRESENT')">
            출근: {{ summary.presentCount }}명
        </div>
        <div class="status-box" @click="selectStatus('LEAVE')">
            퇴근: {{ summary.leaveCount }}명
        </div>
        <div class="status-box" @click="selectStatus('LATE')">
            지각: {{ summary.lateCount }}명
        </div>
        <div class="status-box" @click="selectStatus('ABSENT')">
            결근: {{ summary.absentCount }}명
        </div>
        <div class="status-box" @click="selectStatus('ON_LEAVE')">
            휴가: {{ summary.onLeaveCount }}명
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import axiosInstance from '@/axios';

const emit = defineEmits(['status-selected']);

const summary = ref({
    presentCount: 0, // 출근
    leaveCount: 0, // 퇴근
    lateCount: 0, // 지각
    absentCount: 0, // 결근
    onLeaveCount: 0, // 휴가
});
const selectedStatus = ref('');

onMounted(async () => {
    try {
        const response = await axiosInstance.get('/api/admin/attendance/summary');
        summary.value = response.data;
    } catch (error) {
        console.error('근태 현황 요약 정보를 불러오는 데 실패했습니다.', error);
    }
});

function selectStatus(status) {
    selectedStatus.value = status;
    emit('status-selected', status);
}
</script>

<style scoped>
.attendance-summary {
    display: flex;
    width: 100%;
}

.status-box {
    flex: 1;
    border: 1px solid #ddd;
    padding: 20px;
    margin: 2px;
    text-align: center;
    cursor: pointer;
    background-color: #f9f9f9;
    transition: background-color 0.3s;
    font-size: 1.5em;
    /* 글씨 크기 키우기 */
}

.status-box:hover {
    background-color: #e9ecef;
}
</style>
