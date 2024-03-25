<template>
    <div class="emp-dashboard">
      <div v-if="emp">
        <div v-if="editingImage">
          <input type="file" @change="updateImage"/>
          <button @click="cancelEditImage">Cancel</button>
        </div>
        <div v-else>
          <img :src="emp.profilePicture || defaultProfilePicture" alt="Profile Picture" class="profile-picture"/>
          <button @click="editImage">Edit Image</button>
        </div>
        <h2>{{ emp.name }}</h2>
        <p><strong>Department:</strong> {{ emp.department }}</p>
        <p><strong>Position:</strong> {{ emp.position }}</p>
        <div>
          <p><strong>About:</strong> {{ emp.introduction }}</p>
          <button @click="editIntroduction">Edit</button>
          <button @click="deleteIntroduction">Delete</button>
          <textarea v-if="editingIntroduction" v-model="emp.introduction"></textarea>
          <button v-if="editingIntroduction" @click="saveIntroduction">Save</button>
          <button v-if="editingIntroduction" @click="cancelEditIntroduction">Cancel</button>
        </div>
      </div>
      <div v-else>
        <p>emp not found.</p>
      </div>                            
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref } from 'vue';
  
  export default {
    setup() {
      const emp = ref(null);
      const editingImage = ref(false);
      const editingIntroduction = ref(false);
      const defaultProfilePicture = 'path_to_default_image';
  
      // emp data
      emp.value = {
        name: "김로미",
        department: "Engineering",
        position: "Software Engineer",
        introduction: "Hello! I'm a software engineer.😺",
        profilePicture: "path_to_emp_image"
      };

      const updateImage = async (event) => {
        const file = event.target.files[0]; 
        if (file) {
          const formData = new FormData();
          formData.append ('profilePicture', file); // 서버에서 'profilePicture'필드를 사용하여 파일을 참조!
        
         try {
          const responce = await axios.post('서버_업로드_URL', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          // 업로드 성공 후 로직, 예: 서버 응답을 바탕으로 UI 업데이트
          emp.value.profilePicture = Response.data.url;
         } catch (error) {
          console.error('Failed to upload image', error);
          //오류 처리 로직
          }
        } else {
          alert('Please select an image file.');
      
          }
        };
  
      const editImage = () => {
        editingImage.value = true;
      };
  
      const cancelEditImage = () => {
        editingImage.value = false;
      };
  
      const editIntroduction = () => {
        editingIntroduction.value = true;
      };
  
      const saveIntroduction = () => {
        editingIntroduction.value = false;
      };
  
      const deleteIntroduction = () => {
        emp.value.introduction = ''; 
      };
  
      const cancelEditIntroduction = () => {
        editingIntroduction.value = false;
      };
  
      return {
        emp,
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