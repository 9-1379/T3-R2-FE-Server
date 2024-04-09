<template>
  <div>
    <AdminMenu />
    <div>
      <h1>직원 연차 부여</h1>
      해당 년도: {{ currentYear }}
      <input v-model="form.annualTotal">
      <button @click="newAnnualTotal">부여</button>
    </div>
    <div>
      <h1>직원 연차 현황</h1>
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
      form:{
      annualYear: "",
      annualTotal: ""
      },
      currentYear: new Date().getFullYear()
    };
  },
  methods: {
    async newAnnualTotal() {
      await axiosInstance.post("/annualTotal", this.form);
    },
  },
};
</script>

<style scoped>
</style>
