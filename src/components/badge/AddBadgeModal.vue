<template>
    <div class="modal">
        <div class="modal-content">
            <span class="close" @click="closePop()">&times;</span>
            <h2>배지 추가</h2>
            <ul>
                <li v-for="badge in badges" :key="badge.id">
                    {{ badge.badgeName }} - {{ badge.badgeDetail }}
                    <button @click="activateBadge(badge.badgeName)">활성화</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axiosInstance from '@/axios'; // 또는 설정된 axios 인스턴스

export default {
    data() {
        return {
            badges: [],
        };
    },
    methods: {
        closePop() {
            this.$emit('close');
        },
        async fetchBadges() {
            try {
                const response = await axiosInstance.get('/api/admin/badge/list');
                this.badges = response.data.filter(badge => badge.status === 'Disabled');
            } catch (error) {
                console.error("배지 리스트를 가져오는 데 실패했습니다.", error);
            }
        },
        async activateBadge(badgeName) {
            try {
                await axiosInstance.post('/api/admin/badge/activate', null, { params: { badgeName } });
                this.$emit('badgeActivated');
                this.closePop();
                this.$emit('update');
            } catch (error) {
                console.error("배지 활성화 실패: ", error);
                alert("배지 활성화에 실패했습니다. 다시 시도해 주세요.");
            }
        }
    },
    mounted() {
        this.fetchBadges();
    }
}
</script>

<style scoped>
.modal {
    display: block;
    /* 모달을 보여주기 위해 */
    position: fixed;
    /* 페이지에 고정 */
    z-index: 1000;
    /* 다른 요소들 위에 레이어 */
    left: 0;
    top: 0;
    width: 100%;
    /* 전체 너비 */
    height: 100%;
    /* 전체 높이 */
    overflow: auto;
    /* 내용이 넘칠 경우 스크롤 */
    background-color: rgb(0, 0, 0);
    /* 뒷배경 검정 */
    background-color: rgba(0, 0, 0, 0.4);
    /* 뒷배경 어둡게 */
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    /* 페이지 중앙에 위치 */
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    /* 모달 너비 */
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>