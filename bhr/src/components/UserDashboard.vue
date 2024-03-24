<template>
    <div class="user-dashboard">
      <div v-if="user">
        <div v-if="editingImage">
          <input type="file" @change="updateImage"/>
          <button @click="cancelEditImage">Cancel</button>
        </div>
        <div v-else>
          <img :src="user.profilePicture || defaultProfilePicture" alt="Profile Picture" class="profile-picture"/>
          <button @click="editImage">Edit Image</button>
        </div>
        <h2>{{ user.name }}</h2>
        <p><strong>Department:</strong> {{ user.department }}</p>
        <p><strong>Position:</strong> {{ user.position }}</p>
        <div>
          <p><strong>About:</strong> {{ user.introduction }}</p>
          <button @click="editIntroduction">Edit</button>
          <button @click="deleteIntroduction">Delete</button>
          <textarea v-if="editingIntroduction" v-model="user.introduction"></textarea>
          <button v-if="editingIntroduction" @click="saveIntroduction">Save</button>
          <button v-if="editingIntroduction" @click="cancelEditIntroduction">Cancel</button>
        </div>
      </div>
      <div v-else>
        <p>User not found.</p>
      </div>
    </div>
  </template>
  
  <script>
 // import axios from 'axios';
  import { ref } from 'vue';
  
  export default {
    setup() {
      const user = ref(null);
      const editingImage = ref(false);
      const editingIntroduction = ref(false);
      const defaultProfilePicture = 'path_to_default_image';
  
      // user data
      user.value = {
        name: "김로미",
        department: "Engineering",
        position: "Software Engineer",
        introduction: "Hello! I'm a software engineer.😺",
        profilePicture: "path_to_user_image"
      };
  
      const editImage = () => {
        editingImage.value = true;
      };
  
      const cancelEditImage = () => {
        editingImage.value = false;
      };
  
      const updateImage = (event) => {
        console.log(event.target.files[0]);
        editingImage.value = false;
      };
  
      const editIntroduction = () => {
        editingIntroduction.value = true;
      };
  
      const saveIntroduction = () => {
        editingIntroduction.value = false;
      };
  
      const deleteIntroduction = () => {
        user.value.introduction = ''; 
      };
  
      const cancelEditIntroduction = () => {
        editingIntroduction.value = false;
      };
  
      return {
        user,
        editingImage,
        editingIntroduction,
        editImage,
        cancelEditImage,
        updateImage,
        editIntroduction,
        saveIntroduction,
        deleteIntroduction,
        cancelEditIntroduction,
        defaultProfilePicture
      };
    }
  };
  </script>
  
<style scoped>
.user-dashboard {
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