<template>
  <div>
    <li v-for="(annualList, index) in annualLists" v-bind:key="index">
        {{ annualList.startDate }}</li>
  </div>

</template>
  
  <script>
  import axiosInstance from "../axios";
  
  export default {
    data() {
      return {
        annualLists: []
      }
      
    },
  
    methods: {
      async fetchAnnualList() {
        const annualListResponse = await axiosInstance.get("/annualList");
        this.annualLists = annualListResponse.data;
      }
    },
    mounted() {
      this.fetchAnnualList();
    },
  };
  </script>
  
  <style lang="scss" scoped>
  </style>