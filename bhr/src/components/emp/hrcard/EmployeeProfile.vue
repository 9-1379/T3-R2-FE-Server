<template>
    <div class="profile-section" v-if="employee">
        <img :src="employee.profilePicture" alt="프로필 사진" />
        <h2>{{ employee.name }}</h2>
        <div class="badges">
            <div v-for="(badge, index) in employee.badges" :key="index" class="badge">
                <img :src="badge.image" :alt="badge.name" />
                <span>{{ badge.name }}</span>
            </div>
        </div>
        <p>{{ employee.phoneNumber }}</p>
        <p>{{ employee.email }}</p>
        <p>{{ employee.deptName }}</p>
        <p>{{ employee.position }}</p>
        <p>{{ employee.jobId }}</p>
        <p>{{ employee.introduction }}</p>
    </div>
</template>

<script>
export default {
    props: {
        employee: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>

<style>
/* 프로필 섹션 스타일링 */
</style>
