<template>
  <div class="page-container" :class="{ 'dark-mode': darkModeEnabled }">
  <div class="admin-menu-wrapper">
    <AdminMenu />
<div class="emp-dashboard">
  <div v-if="employee">
    <div v-if="editingImage">
      <input type="file" @change="uploadProfilePicture" />
      <button @click="cancelEditImage">Cancel</button>
    </div>
    <div v-else>
      <img :src="getProfilePictureUrl(employee.profile_picture)" alt="Profile Picture" class="profile-picture" />
      <button @click="editImage">Edit Image</button>
    </div>

    <div class="emp-profile">
    </div>
    <h2>{{ employee.emp_name }}</h2>
    <p><strong>부서:</strong> {{ employee.dept_id }}</p>
    <p><strong>직위:</strong> {{ employee.position }}</p>
    <div>
      <p><strong>소개:</strong> {{ employee.introduction }}</p>
      <button @click="editingIntroduction">Edit</button>
      <textarea v-if="editingIntroduction" v-model="employee.introduction"></textarea>
      <button v-if="editingIntroduction" @click="saveIntroduction">Save</button>
      <button v-if="editingIntroduction" @click="cancelEditIntroduction">Cancel</button>
    </div>
  </div>
  <div v-else>
    <p>Employee not found.</p>
  </div>
  </div>
</div>
</div>

</template>

<script>
import axiosInstance from "@/axios";
import AdminMenu from '@/components/menu/AdminMenu.vue';

export default {
name: 'emp-profile', 
components: { AdminMenu },
data() {
  return {
    connectData: null,
    employee: null,
    editingImage: false,
    editingIntroduction: false,
  };
},
computed: {
  darkModeEnabled() {
    return this.$store.state.darkMode;
  }
},
methods: {
  async fetchEmployee(employeeId) {
  try {
    const url = `/employees/dashboard/${employeeId}`; // URL 구성 확인
    console.log('Request URL:', url); // 실제 요청 URL 확인
    const response = await axiosInstance.get(url);
    this.employee = response.data;
  } catch (error) {
    console.error('직원 데이터를 불러오는 데 실패했습니다.', error);
    }
   }
  },
  uploadProfilePicture(event) {
  const profilePicture = event.target.files[0];
  const formData = new FormData(); // FormData 인스턴스 생성
  formData.append('file', profilePicture);
  axiosInstance.post('/employees/dashboard', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  .then(response => {
    console.log('완료:', response.data);
  })
  .catch(error => {
    console.error('Upload error:', error);
   });
  },
  getProfilePictureUrl(profilePicture) {
    if (profilePicture) {
      return `data:image/jpeg;base64,${profilePicture}`; // 예시: base64 인코딩된 이미지를 보여주는 방식
    } else {
      return this.defaultProfilePicture;
    }
  },
  editImage() {
    this.editingImage = true;
  },
  cancelEditImage() {
    this.editingImage = false;
  },
  editIntroduction() {
    this.editingIntroduction = true;
  },
 saveIntroduction() {
 const employeeId = this.$route.params.id;
 const introduction =  this.employee.introduction;
  axiosInstance.put(`/employees/dashboard/${employeeId}/introduction`, { introduction })
      .then(() => {
        alert('소개글이 성공적으로 저장되었습니다.');
        // 필요한 경우, 직원 데이터를 다시 불러옵니다.
        this.fetchEmployee(employeeId);
      })
      .catch(error => {
        console.error('소개글 저장에 실패했습니다.', error);
      });
},
cancelEditIntroduction() {
    this.editingIntroduction = false;
  },
async deleteIntroduction() {
  const employeeId = this.$route.params.id;
    if (employeeId) {
      try {
        await axiosInstance.delete(`/employees/dashboard/${employeeId}/introduction`);
        this.employee.introduction = '';
        alert('소개글이 성공적으로 삭제되었습니다.');
      } catch (error) {
        console.error('Failed to delete introduction:', error);
      }
    } 
  },
  async mounted() {
    const employeeId = this.$route.params.id; // 실제 라우트 파라미터에서 ID를 가져옴
  if (employeeId) {
    await this.fetchEmployee(employeeId);
  } else {
    console.error("No employee ID provided");
  }
 },
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