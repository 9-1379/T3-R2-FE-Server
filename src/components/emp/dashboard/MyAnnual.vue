<template>
    <div class="hrcard-container">
      <h2>HR Card</h2>
      <div v-if="annualDetails">
        <p>연차 현황</p>
        <p>귀속 연도: {{ annualDetails.annualYear }}</p>
        <p>직원 ID: {{ annualDetails.empId }}</p>
        <p>총 생성 연차: {{ annualDetails.annualTotal }}</p>
        <p>선 사용 연차: {{ annualDetails.annualUsed }}</p>
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

    const annualYear = '2024'; // 예시로 2024로 정의
    const empId = 'e1'; // 예시로 e1로 정의

    // 직원의 연차 현황을 불러오는 함수
    const fetchAnnualDetails = async () => {
      try {
        const response = await axiosInstance.get(`/myAnnual/${annualYear}/${empId}`);
        if (response.data) { // 값이 있는지 확인
          Object.assign(annualDetails, response.data);
        } else {
          console.error("연차 정보를 불러오는 중 에러: 응답 데이터가 없습니다.");
          alert("연차 정보를 불러오는 중 에러 발생: 응답 데이터가 없습니다.");
        }
      } catch (error) {
        console.error("연차 정보를 불러오는 중 에러:", error);
        console.error("에러 응답:", error.response);
        alert("연차 정보를 불러오는 중 에러 발생: " + (error.response ? error.response.data.message : "알 수 없는 오류"));
      }
    };

    // 컴포넌트가 마운트된 후 연차 정보를 불러옴
    onMounted(fetchAnnualDetails);

    return { annualDetails };
  },
};
</script>
  
  <style>
  .hrcard-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .p {
    margin-bottom: 10px;
  }
  </style>
  