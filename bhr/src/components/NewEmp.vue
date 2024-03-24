<template>
    <div>
      <TopMenuBar />
      <div class="signup-form-container">
        <div class="signup-form">
          <h2 class="form-title">신규 직원 정보 추가</h2>
          <div class="form-columns">
            <div class="form-section">
              <h3 class="section-title">기본정보 입력</h3>
              <div class="form-group">
                <!-- <label for="name">이름</label> -->
                <input type="text" id="name" v-model="form.name" required placeholder="이름">
              </div>
              <div class="form-group">
                <!-- <label>성별</label> -->
                <div class="btn-group">
                  <button type="button" class="btn btn-secondary rounded" @click="setGender('남자')" :class="{ active: form.gender === '남자' }">남자</button>
                  <button type="button" class="btn btn-secondary rounded" @click="setGender('여자')" :class="{ active: form.gender === '여자' }">여자</button>
                </div>
                <input type="hidden" v-model="form.gender">
              </div>
              <div class="form-group">
                <!-- <label for="address">주소</label> -->
                <input type="text" id="address" v-model="form.address" placeholder="주소">
              </div>
              <div class="form-group">
                <!-- <label for="phone">전화번호</label> -->
                <input type="text" id="phone" v-model="form.phone" required placeholder="전화번호">
              </div>
              <div class="form-group">
                <!-- <label for="email">이메일</label> -->
                <input type="email" id="email" v-model="form.email" class="blur-text" placeholder="이메일 [선택]">
              </div>
              <div class="form-group">
                <label for="email">생년월일</label>
                <input type="date" id="birth" v-model="form.birth" aria-label="생년월일 입력" placeholder="생년월일">
              </div>
            </div>
  
            <div class="form-section">
              <h3 class="section-title">인사정보 입력</h3>
              <div class="form-group">
                <!-- <label for="employeeId">임직원 ID</label> -->
                <input type="text" id="employeeId" v-model="form.employeeId" placeholder="임직원 ID">
              </div>
              <div class="form-group">
                <!-- <label for="employeeNumber">사번</label> -->
                <input type="text" id="employeeNumber" v-model="form.employeeNumber" placeholder="사번">
              </div>
              <div class="form-group">
                <!-- <label for="userId">ID</label> -->
                <input type="text" id="userId" v-model="form.userId" placeholder="ID">
              </div>
              <div class="form-group">
                <!-- <label for="password">비밀번호</label> -->
                <input type="password" id="password" v-model="form.password" placeholder="비밀번호">
              </div>
              <div class="form-group">
                <!-- <label for="departmentCode">부서코드</label> -->
                <input type="text" id="departmentCode" v-model="form.departmentCode" placeholder="부서코드">
              </div>
              <div class="form-group">
                <!-- <label for="position">직위</label> -->
                <input type="text" id="position" v-model="form.position" placeholder="직위">
              </div>
              <div class="form-group">
                <!-- <label for="job">직무</label> -->
                <input type="text" id="job" v-model="form.job" placeholder="직무">
              </div>
              <div class="form-group">
                <label for="hireDate">입사일</label>
                <input type="date" id="hireDate" v-model="form.hireDate" placeholder="입사일">
              </div>
            </div>
          </div>
          <button class="submit-button" @click="submitForm">사원정보 등록</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import TopMenuBar from '@/components/menu/AdminMenu.vue';
  
  export default {
    data() {
      return {
        form: {
          name: '',
          gender: '',
          address: '',
          phone: '',
          email: '',
          birth: '',
          employeeId: '',
          employeeNumber: '',
          userId: '',
          password: '',
          departmentCode: '',
          position: '',
          job: '',
          hireDate: ''
        },
      };
    },
    methods: {
      submitForm() {
        console.log(this.form);
      },
      setGender(gender) {
        this.form.gender = gender;
      }
    },
    components: {
      TopMenuBar
    }
  };
  </script>
  
  <style scoped>
  .signup-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 110vh;
    background-color: #edf2f7; /* Lighter shade for background */
  }
  
  .signup-form {
    background: #ffffff;
    padding: 20px; /* Reduced padding */
    border-radius: 16px; /* Slightly rounded corners */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Softer shadow */
    width: 100%;
    max-width: 840px; /* Reduced maximum width */
  }
  
  .form-title,
  .section-title {
    color: #2b2d42; /* Darker shade for better readability */
    text-align: left; /* Align to left for conventional reading */
    margin-bottom: 20px; /* Reduced margin */
    font-size: 15px; /* Smaller font size */
  }
  
  .form-columns {
    display: flex;
    gap: 40px; /* Reduced space between columns */
  }
  
  .form-section {
    flex: 1; /* Adjust the width dynamically */
  }
  
  .form-group {
    margin-bottom: 16px; /* Reduced margin */
  }
  
  .form-group label {
    display: block;
    color: #4a5568; /* Darker label color */
    margin-bottom: 6px; /* Reduced margin */
    font-weight: 500; /* Slightly bolder */
  }
  
  .form-group input[type="text"],
  .form-group input[type="email"],
  .form-group input[type="date"],
  .form-group input[type="password"] {
    width: 100%;
    padding: 10px 12px; /* Reduced padding */
    border: 1px solid #cbd5e0; /* Slightly thinner border */
    border-radius: 6px;
    box-sizing: border-box;
    transition: border-color 0.2s ease; /* Smooth transition */
  }
  
  .form-group input[type="text"]:hover,
  .form-group input[type="email"]:hover,
  .form-group input[type="date"]:hover,
  .form-group input[type="password"]:hover {
    border-color: #a0aec0; /* Darker border on hover */
  }
  
  .form-group input[type="text"]:focus,
  .form-group input[type="email"]:focus,
  .form-group input[type="date"]:focus,
  .form-group input[type="password"]:focus {
    border-color: #4c51bf; /* Highlighted border on focus */
    outline: none; /* Remove default focus outline */
  }
  
  .btn-group .btn {
    background-color: transparent; /* Change background to transparent */
    border: 2px solid #a0aec0; /* Add border and set initial color */
    color: #a0aec0; /* Set text color to match the border */
    padding: 10px 20px; /* Keep padding */
    cursor: pointer;
    margin-top: 8px; /* Keep margin top */
    transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease; /* Add transition for color and border color */
    border-radius: 4px; /* Keep rounded corners */
  }
  
  .btn-group .btn.active,
  .btn-group .btn:hover {
    border-color: #2c3e50; /* Green border for active/hover state */
    color: #2c3e50; /* Green text for active/hover state */
    background-color: transparent; /* Keep background transparent */
  }
  
  
  .submit-button {
    width: 100%;
    padding: 12px;
    background-color: #2c3e50; /* Darker shade for the button */
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px; /* Smaller font size */
    margin-top: 20px; /* Reduced margin */
    transition: background-color 0.3s ease; /* Smooth transition */
  }
  
  .submit-button:hover {
    background-color: #434190; /* Darker shade on hover */
  }
  </style>
  
  
  
  
  