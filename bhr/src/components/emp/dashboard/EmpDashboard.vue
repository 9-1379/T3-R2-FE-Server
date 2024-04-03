<template>
  <div class="page-container" :class="{ 'dark-mode': darkModeEnabled }">
  <div class="admin-menu-wrapper">
    <AdminMenu />
    <EmpProfile />
  </div>
</div>
</template>

<script>
import AdminMenu from '@/components/menu/AdminMenu.vue';
import EmpProfile from './EmpProfile.vue';

export default {
  components: { 
    AdminMenu,
    EmpProfile 
  },

  computed: {
  darkModeEnabled() {
    return this.$store.state.darkMode;
  }
 }
};

</script>

<style scoped>
/* 여기에 스타일을 그대로 유지 */

.emp-dashboard {
font-family: 'Arial', sans-serif;
margin: 0 auto;
max-width: 800px;
border: 1px solid #ccc;
padding: 20px;
border-radius: 8px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-picture {
width: 150px;
height: 150px;
border-radius: 50%;
margin-bottom: 20px;
border: 3px solid #f3f3f3;
}

h2 {
margin: 0;
color: #333;
font-size: 24px;
}

p {
color: #666;
line-height: 1.6;
}

button {
margin-right: 10px;
padding: 10px 15px;
border: none;
border-radius: 4px;
background-color: #e0e0e0;
color: #333;
cursor: pointer;
font-size: 14px;
}

button:hover {
background-color: #d5d5d5;
}

textarea {
width: 100%;
padding: 10px;
margin-top: 10px;
border-radius: 4px;
border: 1px solid #ccc;
resize: vertical;
}
</style>