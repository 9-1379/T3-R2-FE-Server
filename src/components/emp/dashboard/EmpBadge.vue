<template>
    <div class="emp-badge">
      <div v-if="badges.length > 0">
        <div v-for="badge in badges" :key="badge.id" class="badge">
          <img :src="`${badge.badgeImage}`" :alt="badge.badgeName" />
          <div>{{ badge.badgeName }}</div>
        </div>
      </div>
      <div v-else>
        <p>배지 정보를 불러오는 중...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axiosInstance from '@/axios';
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'EmpBadge',
    setup() {
      const badges = ref([]);
  
      const fetchBadges = async () => {
        try {
          const empId = getEmpIdFromToken();
          if (empId) {
            const response = await axiosInstance.get(`/myBadge/${empId}`);
            badges.value = response.data;
          } else {
            console.error('Employee ID is null');
          }
        } catch (error) {
          console.error('Failed to fetch badges', error);
        }
      };
  
      function getEmpIdFromToken() {
        const token = localStorage.getItem('access_token');
        if (token) {
          const decodedToken = atob(token.split('.')[1]);
          const { empId } = JSON.parse(decodedToken);
          return empId;
        }
        return null;
      }
  
      onMounted(fetchBadges);
  
      return { badges };
    },
  };
  </script>