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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const emp = ref(null);
    const route = useRoute();
    const editingImage = ref(false);
    const editingIntroduction = ref(false);
    const defaultProfilePicture = 'path_to_default_image'; // 실제 경로로 대체해야 함
    const employeeId = ref(null);

    onMounted(async () => {
      employeeId.value = route.params.id; // 라우트 파라미터에서 직원 ID를 가져옵니다.
      console.log('Current employee ID:', employeeId.value); 
      if (employeeId.value) {
        try {
          const response = await axiosInstance.get(`/api/employees/${employeeId.value}`);
          emp.value = response.data;
        } catch (error) {
          console.error('Failed to fetch employee data:', error);
        }
      }
    });


    // 파일 업로드를 위한 함수 정의
    const uploadProfilePicture = async (event) => {
      const file = event.target.files[0];
      if (!file) {
        alert('Please select a file.');
        return;
      }
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axiosInstance.post(`/api/employees/${employeeId.value}/profile-picture`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.data.path) {
          emp.value.profilePicture = response.data.path;
        }
      } catch (error) {
        console.error('Failed to upload profile picture:', error);
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

    const saveIntroduction = async () => {
      try {
        const response = await axiosInstance.put(`/api/employees/${employeeId.value}`, {
          ...emp.value,
          introduction: emp.value.introduction
        });
        emp.value = response.data;
        editingIntroduction.value = false;
      } catch (error) {
        console.error('Failed to update introduction:', error);
      }
    };
// eslint-disable-next-line no-unused-vars
    const deleteIntroduction = async () => {
      if (employeeId.value) {
      try {
        await axiosInstance.delete(`/api/employees/${employeeId.value}/introduction`);
        emp.value.introduction = '';
      } catch (error) {
        console.error('Failed to delete introduction:', error);
      }
    }

    const cancelEditIntroduction = () => {
      editingIntroduction.value = false;
    };

    return {
      emp,
      editingImage,
      editingIntroduction,
      defaultProfilePicture,
      editImage,
      cancelEditImage,
      uploadProfilePicture,
      editIntroduction,
      saveIntroduction,
      deleteIntroduction,
      cancelEditIntroduction,
    };
   }
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