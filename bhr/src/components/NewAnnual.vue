<template>
  <div>
    <UserMenu />
  </div>
  <div class="signup-form-container">
    <div class="signup-form">
      <h2 class="form-title">연차 신청</h2>
      <div class="form-columns">
        <div class="form-section">
          <div class="form-group">
            <p>연차시작일</p>
            <div v-for="annualList in annualLists" v-bind:key="annualList">
              {{ annualList.startdate }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserMenu from "@/components/menu/UserMenu.vue";
import axiosInstance from "@/axios";

export default {
  components: {
    UserMenu,
  },
  data: function () {
    return {
      annualLists: [],
    };
  },
  methods: {
    async fetchAnnualList() {
      const response = await axiosInstance.get("/annualList"); 
      this.annualLists = response.data;
      console.log(response)
    },
  },
  created() {
    this.fetchAnnualList();
  }
};
</script>

<style lang="css" src="@/css/styles.css">
</style>