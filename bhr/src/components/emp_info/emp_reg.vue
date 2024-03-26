<template>
    <div class="signup-form-container">
      <div class="signup-form">
        <h2 class="form-title">신규 직원 상세</h2>
        <div class="form-section">
          <h3 class="section-title">기본정보 입력</h3>
          <div class="form-group">
            <label for="name">이름</label>
            <input type="text" id="name" v-model="form.name" required>
          </div>
          <div class="form-group">
            <label for="gender">성별</label>
            <div id="gender" class="btn-group">
              <button type="button" class="btn btn-secondary" onclick="setGender('남자')">남자</button>
              <button type="button" class="btn btn-secondary" onclick="setGender('여자')">여자</button>
            </div>
            <input type="hidden" id="genderInput" name="gender">
          </div>
          <div class="form-group">
            <label for="position">주소</label>
            <input type="text" id="position" v-model="form.address">
          </div>
          <div class="form-group">
            <label for="department">전화번호</label>
            <input type="text" id="department" v-model="form.department" required>
          </div>
          <div class="form-group">
            <label for="email">이메일</label>
            <input type="email" id="email" v-model="form.email" required class="blur-text" placeholder="[선택]">
          </div>
          <div class="form-group">
            <label for="birth">생년월일</label>
            <input type="date" id="birth" v-model="form.birth">
          </div>
        </div>
        <div class="form-section">
          <h3 class="section-title">인사정보 입력</h3>
          <div class="form-group">
            <label for="employeeId">임직원 ID</label>
            <input type="text" id="employeeId" v-model="form.employeeId">
          </div>
          <div class="form-group">
            <label for="startDate">사번</label>
            <input type="text" id="startDate" v-model="form.startDate">
          </div>
          <div class="form-group">
            <label for="userId">ID</label>
            <input type="text" id="userId" v-model="form.userId">
          </div>
          <div class="form-group">
            <label for="password">비밀번호</label>
            <input type="password" id="password" v-model="form.password">
          </div>
          <div class="form-group">
            <label for="team">부서코드</label>
            <input type="text" id="team" v-model="form.team">
          </div>
          <div class="form-group">
            <label for="team">직위</label>
            <input type="text" id="team" v-model="form.position">
          </div>
          <div class="form-group">
            <label for="team">직무</label>
            <input type="text" id="team" v-model="form.job">
          </div>
          <div class="form-group">
            <label for="team">입사일</label>
            <input type="date" id="team" v-model="form.hire_date">
          </div>
        </div>
        <button class="submit-button" @click="submitForm">사원정보 등록</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          name: '',
          age: '',
          address: '',
          department: '',
          email: '',
          birth: '',
          employeeId: '',
          startDate: '',
          userId: '',
          password: '',
          team: '',
          position: '',
          job: '',
          hire_date: ''
        }
      }
    },
    methods: {
      submitForm() {
        // Form submit logic here
        console.log(this.form);
      }
    }
  }
  </script>
  
  <style scoped>
  .signup-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f7f6;
  }
  
  .signup-form {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    width: 100%;
    max-width: 400px;
  }
  
  .form-title, .section-title {
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    color: #666;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .submit-button {
    width: 100%;
    padding: 12px;
    background-color: #5cb85c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: #4cae4c;
  }
  
  .btn-group .btn {
      background-color: #808080; /* Green background */
      border: 1px solid white; /* Green border */
      color: white; /* White text */
      padding: 10px 24px; /* Some padding */
      cursor: pointer; /* Pointer/hand icon */
      float: left; /* Float the buttons side by side */
  }
  
  .btn-group .btn:not(:last-child) {
      border-right: none; /* Prevent double borders */
  }
  
  .btn-group .btn.active {
      background-color: #808080;
  }
  
  /* Clear floats (clearfix hack) */
  .btn-group::after {
      content: "";
      clear: both;
      display: table;
  }
  </style>