<template>
    <div class="profile-section" v-if="employee">
        <img src="@/assets/emotion/dead.jpg" alt="프로필 사진" />
        <h2>{{ employee.name }}</h2>
        <profile-badge :employeeId="employee.id" />
        <p>{{ employee.email }}</p>
        <p>{{ employee.deptName }} | {{ employee.position }} | {{ employee.jobId }}</p>
        <p>{{ employee.introduction }}</p>
    </div>
</template>

<script>
import ProfileBadge from './ProfileBadge.vue';

export default {
    components: {
        ProfileBadge
    },
    props: {
        employee: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>

<style scoped>
.profile-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.profile-section img {
    width: 150px;
    height: 150px;
    border-radius: 75px;
    object-fit: cover;
    border: 3px solid #eef2f7;
    /* 이미지 테두리 */
}

.profile-section h2 {
    color: #2b2d42;
    /* 텍스트 색상 */
    font-size: 1.5rem;
    /* 글꼴 크기 */
    font-weight: 600;
    /* 글꼴 굵기 */
}

.badges {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    /* 중앙 정렬 */
}

.badge {
    background-color: #5a67d8;
    /* 배지 배경 색상 */
    color: white;
    /* 배지 텍스트 색상 */
    border-radius: 12px;
    padding: 5px 15px;
    font-size: 0.85rem;
}
</style>