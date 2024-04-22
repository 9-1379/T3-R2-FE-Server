<template>
    <div class="badge-management">
        <AdminMenu />
        <div class="badge-list">
            <h1>배지 관리</h1>
            <div class="badge-header">
                <button class="add-badge-btn" @click="changePopState()">배지 활성화</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>배지 이름</th>
                        <th>배지 설명</th>
                        <th>배지 사진</th>
                        <th>비활성화</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="badge in badges" :key="badge.id">
                        <td>{{ badge.badgeName }}</td>
                        <td>{{ badge.badgeDetail }}</td>
                        <td><img :src="getImageUrl(badge.badgeImage)" alt="배지 사진" /></td>
                        <td>
                            <button @click="deactivateBadge(badge.badgeName)">비활성화</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <AddBadgeModal v-if="popState" @close="changePopState()" />
        </div>
    </div>
</template>

<script>
import AddBadgeModal from './AddBadgeModal.vue';
import AdminMenu from '@/components/menu/AdminMenu.vue'; // AdminMenu 추가
import axiosInstance from '@/axios';

export default {
    components: {
        AddBadgeModal,
        AdminMenu // AdminMenu 추가
    },
    data() {
        return {
            badges: [],
            popState: false
        };
    },
    methods: {
        getImageUrl(filename) {
            return `https://9-1379-be.store${filename}`;
        },
        async fetchBadges() {
            try {
                const response = await axiosInstance.get('/api/admin/badge/list');
                this.badges = response.data.filter(badge => badge.status === 'Enabled');
            } catch (error) {
                console.error("배지 리스트를 가져오는 데 실패했습니다.", error);
            }
        },
        deactivateBadge(badgeName) {
            axiosInstance.post('/api/admin/badge/deactivate', null, { params: { badgeName } })
                .then(() => {
                    this.fetchBadges(); // 배지 리스트를 다시 불러옴
                    alert(badgeName + ' 배지가 비활성화되었습니다.');
                })
                .catch(error => {
                    console.error("배지 비활성화 중 오류가 발생했습니다.", error);
                    alert('배지 비활성화에 실패했습니다. 에러 로그를 확인해주세요.');
                });
        },
        changePopState() {
            this.popState = !this.popState;
            this.fetchBadges();
        }
    },
    mounted() {
        this.fetchBadges();
    }
};
</script>

<style scoped>
.badge-list {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    height: 100vh;
    background-color: white;
    padding: 20px;
}

.badge-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}

.add-badge-btn {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
}

.add-badge-btn:hover {
    background-color: #45a049;
}

table {
    width: 100%;
    border-collapse: collapse;
}

table,
th,
td {
    border: 1px solid #ddd;
}

th,
td {
    padding: 8px;
    text-align: left;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

tr:hover {
    background-color: #ddd;
}

img {
    width: 50px;
    height: 50px;
    object-fit: cover;
}

button {
    background-color: #f44336;
    color: white;
    border: none;
    cursor: pointer;
    padding: 5px 10px;
}

button:hover {
    background-color: #d32f2f;
}
</style>
