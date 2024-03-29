<template>
  <div class="emp-dashboard">
    <div v-if="employees">
      <div v-if="editingImage">
        <input type="file" @change="uploadProfilePicture" />
        <button @click="cancelEditImage">Cancel</button>
      </div>
      <div v-else>
        <img :src="employees.profilePicture || defaultProfilePicture" alt="Profile Picture" class="profile-picture" />
        <button @click="editImage">Edit Image</button>
      </div>
      <div>
        <div v-for="employee in employees" :key="employee.id">
          {{ employee.name }}
        </div>
      </div>
      <h2>{{ employees.name }}</h2>
      <p><strong>Department:</strong> {{ employees.department }}</p>
      <p><strong>Position:</strong> {{ employees.position }}</p>
      <div>
        <p><strong>About:</strong> {{ employees.introduction }}</p>
        <button @click="editIntroduction">Edit</button>
        <button @click="deleteIntroduction">Delete</button>
        <textarea v-if="editingIntroduction" v-model="employees.introduction"></textarea>
        <button v-if="editingIntroduction" @click="saveIntroduction">Save</button>
        <button v-if="editingIntroduction" @click="cancelEditIntroduction">Cancel</button>
      </div>
    </div>
    <div v-else>
      <p>Employee not found.</p>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/axios";
import { useRouter } from 'vue-router';
import AdminMenu from '@/components/menu/AdminMenu.vue';

export default {
  components: { AdminMenu },
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      employees: [],
      searchQuery: '',
      selectedEmployees: [],
      editingImage: false,
      editingIntroduction: false,
      defaultProfilePicture: 'https://i.pinimg.com/564x/67/78/b8/6778b87dfce51fb95792c256b2358dca.jpg', // 실제 경로로 대체해야 함
      
    };
  },
  methods: {
    // 서버로부터 직원 데이터를 불러오는 메서드
    fetchEmployees() {
      axiosInstance.get(`/employees/dashboard`)
      .then(response => {
          this.employees = response.data;
        })
       .catch (error => {
        console.error('직원 데이터를 불러오는 데 실패했습니다.', error);
      });
    },
    async uploadProfilePicture(event) {
      const employeesId = this.$route.params.id;
      const file = event.target.files[0];
      if (!file) {
        alert('Please select a file.');
        return;
      }
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axiosInstance.post(`/employees/dashboard/${employeesId}/profile-picture`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.data.path) {
          this.employees.profilePicture = response.data.path;
        }
      } catch (error) {
        console.error('Failed to upload profile picture:', error);
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
   const employeesId = this.$route.params.id;
   const introduction =  this.employees.introduction;
    axiosInstance.put(`/employees/dashboard/${employeesId}/introduction`, { introduction })
        .then(() => {
          alert('소개글이 성공적으로 저장되었습니다.');
          // 필요한 경우, 직원 데이터를 다시 불러옵니다.
          this.fetchEmployees();
        })
        .catch(error => {
          console.error('소개글 저장에 실패했습니다.', error);
        });
  },
    async deleteIntroduction() {
      const employeesId = this.$route.params.id;
      if (employeesId) {
        try {
          await axiosInstance.delete(`/employees/dashboard/${employeesId}/introduction`);
          this.employees.introduction = '';
        } catch (error) {
          console.error('Failed to delete introduction:', error);
        }
      }
    },
    cancelEditIntroduction() {
      this.editingIntroduction = false;
    }
  },
  mounted() {
    this.fetchEmployees();
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