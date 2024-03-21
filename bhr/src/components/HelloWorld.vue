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
      axios.get('http://localhost:8000/greeting') // 백엔드 URL 및 포트 번호 수정
        .then(response => this.greetingMessage = response.data)
        .catch(error => console.error(error));
    }
  }
}
</script>
