<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      message: ''
    };
  },
  mounted() {
    this.fetchMessage();
  },
  methods: {
    async fetchMessage() {
      try {
        const response = await axios.get('http://localhost:8000/api/login');
        this.message = response.data;
      } catch (error) {
        console.error('Error fetching message:', error);
      }
    }
  }
};
</script>