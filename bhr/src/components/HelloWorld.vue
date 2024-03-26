<template>
  <div>{{ greetingMessage }}</div>
  <p>dddd</p>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      greetingMessage: '',
    };
  },
  created() {
    this.fetchGreeting();
  },
  methods: {
    fetchGreeting() {
      axios.get('/greeting') // 백엔드 URL 및 포트 번호 수정
        .then(response => this.greetingMessage = response.data)
        .catch(error => console.error(error));
    }
  }
}
</script>

<!-- axios.get('http://172.31.6.228:8000/greeting') -->
