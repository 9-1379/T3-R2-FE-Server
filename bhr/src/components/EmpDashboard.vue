<template>
  <div class="emp-dashboard">
    <div v-if="emp">
      <div v-if="editingImage.value">
        <input type="file" @change="uploadProfilePicture" />
        <button @click="cancelEditImage">Cancel</button>
      </div>
      <div v-else>
        <img :src="emp.profilePicture || defaultProfilePicture" alt="Profile Picture" class="profile-picture" />
        <button @click="editImage">Edit Image</button>
      </div>
      <h2>{{ emp.name }}</h2>
      <p><strong>Department:</strong> {{ emp.department }}</p>
      <p><strong>Position:</strong> {{ emp.position }}</p>
      <div>
        <p><strong>About:</strong> {{ emp.introduction }}</p>
        <button @click="editIntroduction">Edit</button>
        <button @click="deleteIntroduction">Delete</button>
        <textarea v-if="editingIntroduction.value" v-model="emp.introduction"></textarea>
        <button v-if="editingIntroduction.value" @click="saveIntroduction">Save</button>
        <button v-if="editingIntroduction.value" @click="cancelEditIntroduction">Cancel</button>
      </div>
    </div>
    <div v-else>
      <p>Emp not found.</p>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/axios";
import { ref } from 'vue';

export default {
  setup() {
    const emp = ref({
      name: "김로미",
      department: "Engineering",
      position: "Software Engineer",
      introduction: "Hello! I'm a software engineer.😺",
      profilePicture: "path_to_emp_image"
    });
    const editingImage = ref(false);
    const editingIntroduction = ref(false);
    const defaultProfilePicture = 'path_to_default_image';

    const editImage = () => {
      console.log('Edit Image button clicked');
      editingImage.value = true;
    };

    const cancelEditImage = () => {
      editingImage.value = false;
    };

    const editIntroduction = () => {
      console.log('Edit Introduction button clicked');
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

    const uploadProfilePicture = async (event) => {
      const file = event.target.files[0];
      if (!file) {
        alert('Please select a file.');
        return;
      }
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axiosInstance.post(`/api/employees/${emp.value.id}/profile-picture`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // 성공 응답 후 emp 객체의 profilePicture 업데이트
        if (response.data.path) { // 가정: 응답에 파일 경로가 포함되어 있음
          emp.value.profilePicture = response.data.path;
        }
        editingImage.value = false; // 이미지 업로드 후 편집 모드 종료
      } catch (error) {
        console.error(error); // 에러 처리
      }
    };

    return {
      emp,
      editingImage,
      editingIntroduction,
      editImage,
      cancelEditImage,
      editIntroduction,
      saveIntroduction,
      deleteIntroduction,
      cancelEditIntroduction,
      defaultProfilePicture,
      uploadProfilePicture,
    };
  },
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