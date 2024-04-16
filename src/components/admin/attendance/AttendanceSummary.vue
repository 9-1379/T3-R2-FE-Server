<template>
    <div class="attendance-summary">
        <div class="status-box" style="border-color: #219ebc;" @click="selectStatus()">
            <div class="status-label">총인원</div>
            <div class="number">{{ summary.total }}<span class="unit">명</span></div>
        </div>
        <div class="status-box" style="border-color: #8ecae6;" @click=" selectStatus('PRESENT')">
            <div class="status-label">출근</div>
            <div class="number">{{ summary.presentCount }}<span class="unit">명</span></div>
        </div>
        <div class="status-box" style="border-color: #023047;" @click="selectStatus('LATE')">
            <div class="status-label">지각</div>
            <div class="number">{{ summary.lateCount }}<span class="unit">명</span></div>
        </div>
        <div class="status-box" style="border-color: #fb8500;" @click="selectStatus('ON_LEAVE')">
            <div class="status-label">휴가</div>
            <div class="number">{{ summary.onLeaveCount }}<span class="unit">명</span></div>
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
    gap: 10px;
}

.status-box {
    flex: 1;
    border: 1px solid #ddd;
    padding: 20px;
    margin: 5px;
    text-align: center;
    cursor: pointer;
    background-color: #ffffff;
    transition: background-color 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
}

.status-label {
    font-size: 1em;
    margin-bottom: 5px;
}

.number {
    font-size: 3em;
    display: flex;
    align-items: baseline;
}

.unit {
    font-weight: normal;
    /* 굵기를 일반으로 변경 */
    font-size: 0.75em;
    /* 글씨 크기를 조금 줄임 */
    margin-left: 2px;
    /* 숫자와의 간격 조정 */
}

.status-box:hover {
    background-color: #e9ecef;
}
</style>
