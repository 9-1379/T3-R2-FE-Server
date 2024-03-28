<template>
  <div>
    <TopMenuBar />
    <div class="signup-form-container">
      <div class="signup-form">
        <h2 class="form-title">연차 신청</h2>
        <div class="form-columns">
          <div class="form-section">
            <div class="form-group">
              <p>연차시작일</p>
              <input type="date" id="annual" v-model="form.annualStartday" placeholder="연차시작일">
            </div>
          </div>
          <div class="form-section">
            <div class="form-group">
              <p>연차종료일</p>
              <input type="date" id="annual" v-model="form.annualEndday" placeholder="연차종료일">
            </div>
          </div>
          <div class="form-group">
          </div>
        </div>
        <button class="submit-button" @click="submitForm">연 차 신 청</button>
        <div class="form-section">
          <h2 class="form-title">연차 신청 내역</h2>
          <div class="form-columns">
            <table>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>연차사용일자</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(annualLists, index) in annualList" :key="annualLists.id">
                  <td>{{ index }}</td>
                  <td>{{ annualLists.annualStartday }}</td>
                  <td>{{ annualLists.annualEndday }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import TopMenuBar from '@/components/menu/AdminMenu.vue';
import axiosInstance from '@/axios';

export default {
  created() {
    this.annualList();
  },
  components: {
    TopMenuBar,
      },
  methods: {
    async annualList(){
      try{
        const response = await axiosInstance.get('/annualList')
        this.annualListData = response.data;
      } catch (error) {
        console.error('연차 정보를 불러오는데 실패했습니다.', error);
        alert('연차 정보를 불러오는데 실패했습니다.');
      }
    }
  },
  data() { 
    return {
      form: {
        annualStartday: '',
        annualEndday: '',
        annualYear: '',
      },
      annualListData: [],
    };
  },
};
</script>

<style scoped>
.signup-form-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 110vh;
  background-color: #edf2f7;
  /* margin-top: 20px; */
  /* Lighter shade for background */
}

.signup-form {
  background: #ffffff;
  padding: 20px;
  /* Reduced padding */
  border-radius: 16px;
  /* Slightly rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Softer shadow */
  width: 100%;
  max-width: 840px;
  margin-top: 20px;
  /* Reduced maximum width */
}

.form-title,
.section-title {
  color: #2b2d42;
  /* Darker shade for better readability */
  text-align: center;
  /* Align to left for conventional reading */
  margin-bottom: 20px;
  /* Reduced margin */
  font-size: 30px;
  /* Smaller font size */
  margin-top: 40px;
}

.form-columns {
  display: flex;
  gap: 40px;
  /* Reduced space between columns */
}

.form-section {
  flex: 1;
  /* Adjust the width dynamically */
}

.form-group {
  margin-bottom: 16px;
  /* Reduced margin */
}

.form-group label {
  display: block;
  color: #4a5568;
  /* Darker label color */
  margin-bottom: 6px;
  /* Reduced margin */
  font-weight: 500;
  /* Slightly bolder */
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="date"],
.form-group input[type="password"] {
  width: 100%;
  padding: 10px 12px;
  /* Reduced padding */
  border: 1px solid #cbd5e0;
  /* Slightly thinner border */
  border-radius: 6px;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
  /* Smooth transition */
}

.form-group input[type="text"]:hover,
.form-group input[type="email"]:hover,
.form-group input[type="date"]:hover,
.form-group input[type="password"]:hover {
  border-color: #a0aec0;
  /* Darker border on hover */
}

.form-group input[type="text"]:focus,
.form-group input[type="email"]:focus,
.form-group input[type="date"]:focus,
.form-group input[type="password"]:focus {
  border-color: #4c51bf;
  /* Highlighted border on focus */
  outline: none;
  /* Remove default focus outline */
}

.btn-group .btn {
  background-color: transparent;
  /* Change background to transparent */
  border: 2px solid #a0aec0;
  /* Add border and set initial color */
  color: #a0aec0;
  /* Set text color to match the border */
  padding: 10px 20px;
  /* Keep padding */
  cursor: pointer;
  margin-top: 8px;
  /* Keep margin top */
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  /* Add transition for color and border color */
  border-radius: 4px;
  /* Keep rounded corners */
}

.btn-group .btn.active,
.btn-group .btn:hover {
  border-color: #2c3e50;
  /* Green border for active/hover state */
  color: #2c3e50;
  /* Green text for active/hover state */
  background-color: transparent;
  /* Keep background transparent */
}


.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #2c3e50;
  /* Darker shade for the button */
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  /* Smaller font size */
  margin-top: 20px;
  /* Reduced margin */
  transition: background-color 0.3s ease;
  /* Smooth transition */
}

.submit-button:hover {
  background-color: #434190;
  /* Darker shade on hover */
}

.table-section {
  width: 100%;
  max-width: 700px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: center;
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
}

th {
  border-top: 1px solid #e0e0e0;
}

td {
  border-bottom: 1px solid #e0e0e0;
}
</style>