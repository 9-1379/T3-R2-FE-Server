<template>
  <div>
    <UserMenu />
    <div class="signup-form-container">
      <div class="signup-form">
        <h2 class="form-title">연차 신청</h2>
        <div class="form-columns">
          <div class="form-section">
            <div class="form-group">
              <p>연차시작일</p>
              <input type="date" id="annualStart" v-model="form.startDate" placeholder="연차시작일">
            </div>
          </div>
          <div class="form-section">
            <div class="form-group">
              <p>연차종료일</p>
              <input type="date" id="annualEnd" v-model="form.endDate" placeholder="연차종료일">
            </div>
          </div>
          <div class="form-group">
          </div>
        </div>
        <button class="submit-button" @click="submitForm">연 차 신 청</button>
        <div class="form-section">
          <h2 class="form-title">연차 신청 내역</h2>
          <div class="form-columns">
            <table>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>연차사용일자</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="list in annualList" :key="list.id">
                  <td>{{ list.id }}</td>
                  <td>{{ list.annualYear }} - {{ list.startDate }} - {{ list.endDate }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import UserMenu from '@/components/menu/UserMenu.vue';
import axiosInstance from '@/axios';
// import axios from '@/axios';


export default {
  components: {
    UserMenu,
  },
  name: 'AnnualList',
  data() {
    return {
      annualList: [],
    };
  },
  methods: {
    async fetchAnnualList() {
      try {
        const response = await axiosInstance.get('/annualList'); // API 경로에 맞게 수정하세요.
        this.annualList = response.data.map(item => ({
          ...item,
          startDate: item.startDate.split('T')[0], // ISO 문자열의 날짜 부분만 추출
          endDate: item.endDate.split('T')[0], // ISO 문자열의 날짜 부분만 추출
        }));
      } catch (error) {
        console.error('연차 목록을 불러오는데 실패했습니다: ', error);
      }
    },
  },
  created() {
    this.fetchAnnualList();
  },
};
</script>

<style lang="css" src="@/css/styles.css">

</style>