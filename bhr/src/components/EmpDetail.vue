<template>
  <div class="page-container" :class="{ 'dark-mode': darkModeEnabled }">
    <div class="admin-menu-wrapper">
      <AdminMenu />
    </div>
    <div class="employee-detail-container">
      <div v-if="employee" class="employee-details">
        <!-- Left Section: Employee Photo -->
        <div class="left-section">
          <h2>직원상세정보</h2>
          <div class="employee-photo">
            <img :src="getProfilePictureUrl(employee.profilePicture)" alt="프로필 사진" />
          </div>

          <!-- Middle Section: Employee Basic Information -->
          <div class="info-section">
            <div class="info-row"><strong>이름:</strong> {{ employee.name }}</div>
            <div class="info-row"><strong>사번:</strong> {{ employee.id }}</div>
            <div class="info-row">
              <!-- <strong>소개:</strong>  -->
              {{ employee.introduction }}
            </div>
          </div>
        </div>

        <!-- Right Section: Employee Detailed Information -->
        <div class="right-section">
          <div class="info-section">
            <div class="info-row"><strong>성별:</strong> {{ employee.gender === 'MALE' ? '남성' : '여성' }}</div>
            <div class="info-row"><strong>생년월일:</strong> {{ formatDate(employee.birthday) }}</div>
            <div class="info-row"><strong>전화번호:</strong> {{ employee.phoneNumber }}</div>
            <div class="info-row"><strong>이메일:</strong> {{ employee.email }}</div>
            <div class="info-row"><strong>부서:</strong> {{ employee.deptName }}</div>
            <div class="info-row"><strong>직위:</strong> {{ employee.position }}</div>
            <div class="info-row"><strong>직무:</strong> {{ employee.jobId }}</div>
            <div class="info-row"><strong>입사 날짜:</strong> {{ formatDate(employee.hireDate) }}</div>
            <div class="info-row"><strong>주소:</strong> {{ employee.formattedAddress }}</div>
            <div class="info-row"><strong>재직여부:</strong> {{ formatEmploymentStatus(employee.status) }}</div>
            <div class="info-row"><strong>권한:</strong> {{ employee.authorization }}</div>
          </div>
        </div>
      </div>
      <div v-else class="loading">로딩 중...</div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/axios';
import { useRoute } from 'vue-router';
import AdminMenu from '@/components/menu/AdminMenu.vue';

export default {
  components: { AdminMenu },
  data() {
    return {
      employee: null
    };
  },
  computed: {
    darkModeEnabled() {
      return this.$store.state.darkMode;
    }
  },
  methods: {
    formatDate(value) {
      if (value) {
        const date = new Date(value);
        return date.toLocaleDateString(); // 이 부분은 필요에 따라 형식을 조정할 수 있습니다.
      }
      return '';
    },
    formatEmploymentStatus(status) {
      switch (status) {
        case 'WORKING':
          return '재직중';
        case 'REST':
          return '휴직중';
        case 'LEAVE':
          return '퇴직';
        default:
          return '알 수 없음';
      }
    },
    getProfilePictureUrl(profilePicture) {
      // 프로필 사진이 null이 아닌 경우에만 URL 반환
      if (profilePicture) {
        return `data:image/jpeg;base64,${profilePicture}`; // 예시: base64 인코딩된 이미지를 보여주는 방식
      } else {
        // 프로필 사진이 없는 경우 기본 이미지 경로 반환
        return require('@/assets/profile_basic.png');
      }
    },
    async fetchEmployeeDetails() {
      const route = useRoute();
      const employeeId = route.params.id;
      try {
        const response = await axiosInstance.get(`/employees/${employeeId}`);
        this.employee = response.data;
      } catch (error) {
        console.error('직원 정보를 불러오는데 실패했습니다:', error);
        alert('직원 정보를 불러오는데 실패했습니다.');
      }
    }
  },
  mounted() {
    this.fetchEmployeeDetails();
  }
};
</script>

<style lang="css" src="@/css/styles.css">

</style>
