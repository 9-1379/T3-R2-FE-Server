<template>
  <div class="hrcard-container">
    <h4 class="header">연차 현황</h4>
    <div v-if="annualDetails">
      <div class="annual-status">
        <div class="status-item">
          <p>All</p>
          <div class="status-circle">{{ annualDetails.annualTotal }}</div>
        </div>
        <div class="status-item">
          <p>사용</p>
          <div class="status-circle">{{ annualDetails.annualUsed }}</div>
        </div>
        <div class="status-item">
          <p>잔여</p>
          <div class="status-circle">
            {{ annualDetails.annualTotal - annualDetails.annualUsed }}
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>연차 정보를 불러오는 중...</p>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/axios";
import { reactive, onMounted } from "vue";

export default {
  name: "HRCard",
  setup() {
    const annualDetails = reactive({}); // 빈 객체로 초기화

    // 현재 시스템의 년도를 가져오기
    const currentYear = new Date().getFullYear();

    // 직원의 연차 현황을 불러오는 함수
    const fetchAnnualDetails = async () => {
      try {
        const empId = getEmpIdFromToken(); // 직원의 ID 가져오기
        const response = await axiosInstance.get(
          `/myAnnual/${currentYear}/${empId}`
        );
        if (response.data) {
          Object.assign(annualDetails, response.data);
        }
      } catch (error) {
        console.error("연차 정보를 불러오는 중 에러:", error);
      }
    };

    // 컴포넌트가 마운트된 후 연차 정보를 불러옴
    onMounted(fetchAnnualDetails);

    // 직원의 ID 가져오는 함수
    function getEmpIdFromToken() {
      const token = localStorage.getItem("access_token");
      if (token) {
        const decodedToken = atob(token.split(".")[1]);
        const { empId } = JSON.parse(decodedToken);
        return empId;
      }
      return null;
    }

    return { annualDetails };
  },
};
</script>

<style scoped>
.hrcard-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border-radius: 5px;
  display: inline-block;
  margin-top: 15px;
}

.header {
  text-align: left;
  margin-bottom: 5px;
  /* 텍스트 위의 공간 조절 */
  margin-top: 0;
  /* 헤더와 컨테이너 간의 공백 제거 */
}

.annual-status {
  display: flex;
  justify-content: flex-start;
}

.status-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 40px;
  /* 원 사이의 간격 조절 */
}

.status-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f0f0f0;
}

.p {
  margin-bottom: 10px;
}

.status-item:last-child {
  margin-right: 0;
  /* 마지막 원의 오른쪽 공간 제거 */
}
</style>
