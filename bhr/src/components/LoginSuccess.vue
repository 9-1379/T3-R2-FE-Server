<template>
    <div class="user-profile">
        <h2>User Profile</h2>
        <p>Welcome back, {{ username }}!</p>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    name: 'UserProfile',
    setup() {
        const username = ref(''); // username을 저장할 반응형 참조

        // 컴포넌트가 마운트되었을 때 실행할 함수
        onMounted(async () => {
            try {
                const response = await axios.get('/api/user'); // 서버에 GET 요청
                username.value = response.data.username; // 응답에서 username 추출하여 저장
            } catch (error) {
                console.error('사용자 정보 요청 실패:', error);
            }
        });

        return {
            username, // 템플릿에서 사용할 수 있도록 username 반환
        };
    },
};
</script>

<style scoped>
.user-profile {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    max-width: 300px;
    margin: 20px auto;
}
</style>