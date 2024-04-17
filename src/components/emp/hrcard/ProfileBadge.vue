<template>
    <div class="profile-badge">
        <h3>Badges</h3>
        <div v-if="badges.length > 0" class="badges-container">
            <div v-for="badge in badges" :key="badge.id" class="badge-item">
                <img :src="getBadgeImageUrl(badge.badgeImage)" :alt="badge.name" class="badge-image" />
                <span>{{ badge.name }}</span>
            </div>
        </div>
        <div v-else>
            No badges to display.
        </div>
    </div>
</template>

<script>
import axiosInstance from '@/axios';

export default {
    props: {
        employeeId: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            badges: []
        };
    },
    watch: {
        employeeId(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.fetchBadges();
            }
        }
    },
    methods: {
        getBadgeImageUrl(filename) {
            return `https://9-1379-be.store${filename}`;
        },
        fetchBadges() {
            if (!this.employeeId) return;
            axiosInstance.get(`/hrCard/badges/${this.employeeId}`)
                .then(response => {
                    this.badges = response.data;
                })
                .catch(error => {
                    console.error('Error fetching badges:', error);
                    this.badges = [];
                });
        }
    },
    created() {
        if (this.employeeId) {
            this.fetchBadges();
        }
    }
};
</script>

<style scoped>
.badges-container {
    display: flex;
    /* 배지들을 가로로 정렬 */
    overflow-x: auto;
    /* 가로 스크롤을 추가 */
    white-space: nowrap;
    /* 배지 항목들을 한 줄에 유지 */
}

.badge-item {
    margin-right: 15px;
    /* 각 배지 사이의 간격 */
}

.badge-image {
    width: 100px;
    /* 이미지 크기 조정 */
    height: 100px;
    /* 이미지 비율 유지 */
}
</style>