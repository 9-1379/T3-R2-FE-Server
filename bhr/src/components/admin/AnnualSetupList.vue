<template>
  <div>
    <AdminMenu />
    <div>
      <h1>직원 연차 부여</h1>
      해당 년도: {{ currentYear }}
      <input v-model="form.annualTotal" />
      <button @click="newAnnualTotal">부여</button>
    </div>
    <div>
      <h1>직원 연차 현황</h1>
      <table v-for="(annual, index) in annualStatus" v-bind:key="index">
        {{
          annual.name
        }}
        -
        {{ annual.annualTotal }}
        -
        {{ annual.annualCnt }}
      </table>
      <!-- <table border="1">
        <thead>
          <th>월</th>
          <th v-for="(month, index) in months" v-bind:key="index"></th>
        </thead>
      </table> -->
    </div>
  </div>
</template>

<script>
import AdminMenu from "@/components/menu/AdminMenu.vue";
import axiosInstance from "@/axios";

export default {
  components: {
    AdminMenu,
  },
  data() {
    return {
      form: {
        annualYear: "",
        annualTotal: "",
      },
      currentYear: new Date().getFullYear(),
      annualStatus: [],
    };
  },
  methods: {
    async newAnnualTotal() {
      await axiosInstance.post("/annualTotal", this.form);
    },
    async fetchAnnualStatus() {
      const statusResponse = await axiosInstance.get(
        `/status/${this.currentYear}`
      );
      this.annualStatus = statusResponse.data;
    },
  },
  mounted() {
    this.fetchAnnualStatus();
  },
};
</script>

<style scoped>
</style>
