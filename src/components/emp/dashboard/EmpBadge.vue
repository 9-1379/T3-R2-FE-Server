<template>
  <div>
    <h2>My Badges</h2>
    <div v-if="badges.length === 0">No badges yet.</div>
    <div v-else>
      <div v-for="badge in badges" :key="badge.id">
        <img :src="getBadgeImageUrl(badge.badgeMaster.badgeImage)" :alt="badge.badgeMaster.badgeName" />
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/axios";

export default {
  data() {
    return {
      badges: []
    };
  },
  //mounted() {
    created() {
    this.fetchBadges()
  },
  methods: {
    getBadgeImageUrl(filename) {
      return `http://localhost:8000${filename}`;
        },
    fetchBadges() {
      axiosInstance.get('/emp/badge')
        .then(response => {
          this.badges = response.data
        })
        .catch(error => {
          console.error(error)
        });
    }
  }
}
</script>