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
              <input
                type="text"
                id="name"
                v-model="form.name"
                required
                placeholder="이름"
              />
            </div>
            <div class="form-group">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-secondary rounded"
                  @click="setGender('MALE')"
                  :class="{ active: form.gender === 'MALE' }"
                >
                  남자
                </button>
                <button
                  type="button"
                  class="btn btn-secondary rounded"
                  @click="setGender('FEMALE')"
                  :class="{ active: form.gender === 'FEMALE' }"
                >
                  여자
                </button>
              </div>
              <input type="hidden" v-model="form.gender" />
            </div>
            <div class="form-group">
              <input
                type="date"
                id="birth"
                v-model="form.birthday"
                aria-label="생년월일 입력"
                placeholder="생년월일"
                class="placeholder-gray"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                id="phone"
                v-model="form.phoneNumber"
                required
                placeholder="전화번호"
              />
            </div>
            <div class="form-group">
              <input
                type="email"
                id="email"
                v-model="form.email"
                class="blur-text"
                placeholder="이메일"
              />
            </div>
            <div class="form-group" style="display: flex">
              <input
                type="text"
                id="sample6_postcode"
                placeholder="우편번호"
                v-model="form.addr.postcode"
                style="flex: 5"
              />
              <button @click="execDaumPostcode" style="flex: 1; padding: 1px">
                찾기
              </button>
            </div>
            <div class="form-group" style="margin-top: -19px">
              <input
                type="text"
                id="sample6_address"
                placeholder="주소"
                v-model="form.addr.address"
              />
            </div>
            <div class="form-group" style="margin-top: -19px">
              <input
                type="text"
                id="sample6_detailAddress"
                placeholder="상세주소"
                v-model="form.addr.detailAddress"
              />
            </div>
            <div class="form-group" style="margin-top: -19px">
              <input
                type="text"
                id="sample6_extraAddress"
                placeholder="참고항목"
                v-model="form.addr.extraAddress"
              />
            </div>
          </div>

          <div class="form-section">
            <h3 class="section-title">인사정보 입력</h3>
            <div class="form-group" style="text-align: left">
              <label for="employeeId" style="font-size: 12px">임직원 ID</label>
              <input
                type="text"
                id="employeeId"
                v-model="form.empId"
                placeholder="임직원 ID"
                readonly
                style="font-size: 14px"
              />
            </div>
            <div class="form-group" style="text-align: left">
              <label for="employeeNumber" style="font-size: 12px">사번</label>
              <input
                type="text"
                id="employeeNumber"
                v-model="form.empNum"
                placeholder="사번"
                readonly
                style="font-size: 14px"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                id="userId"
                v-model="form.username"
                placeholder="ID"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                id="password"
                v-model="form.password"
                placeholder="비밀번호"
              />
            </div>
            <div class="form-group">
              <div class="select-container">
                <select id="departmentName" v-model="form.deptName" required>
                  <option disabled value="">부서</option>
                  <option
                    v-for="deptName in deptNames"
                    :key="deptName"
                    :value="deptName"
                  >
                    {{ deptName }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <input
                type="text"
                id="position"
                v-model="form.position"
                placeholder="직위"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                id="job"
                v-model="form.jobId"
                placeholder="직무"
              />
            </div>
            <div class="form-group">
              <input
                type="date"
                id="hireDate"
                v-model="form.hireDate"
                placeholder="입사일"
              />
            </div>
          </div>
        </div>
        <button class="submit-button" @click="submitForm">사원정보 등록</button>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/axios";
import TopMenuBar from "@/components/menu/AdminMenu.vue";

export default {
  components: {
    TopMenuBar,
  },
  data() {
    return {
      form: {
        name: "",
        gender: "",
        birthday: "",
        phoneNumber: "",
        email: "",
        position: "",
        jobId: "",
        hireDate: "",
        addr: {
          postcode: "",
          address: "",
          detailAddress: "",
          extraAddress: "",
        },
        username: "",
        password: "",
        deptName: "",
        empId: "",
        empNum: "",
      },
      deptNames: [], // 서버에서 가져온 부서명을 저장할 배열
    };
  },
  methods: {
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          // 주소 관련 데이터 처리 로직
          let extraAddr = "";
          if (data.userSelectedType === "R") {
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname;
            }
            if (data.buildingName !== "" && data.apartment === "Y") {
              extraAddr +=
                extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
            }
            extraAddr = extraAddr !== "" ? ` (${extraAddr})` : "";
          }
          this.form.addr = {
            postcode: data.zonecode,
            address:
              data.userSelectedType === "R"
                ? data.roadAddress
                : data.jibunAddress,
            extraAddress: extraAddr,
          };
        },
      }).open();
    },
    setGender(gender) {
      this.form.gender = gender;
    },
    async submitForm() {
      // 폼 제출 로직
      try {
        // eslint-disable-next-line no-unused-vars
        const { empId, empNum, ...submitData } = this.form;
        const response = await axiosInstance.post("/api/join", submitData);
        console.log(response.data);
        alert("신규 직원 정보가 성공적으로 등록되었습니다.");
        // 폼 초기화 또는 성공 메시
        // 폼 초기화 또는 성공 메시지 표시 등의 추가 작업
        this.$router.push("/list");
      } catch (error) {
        if (error.response && error.response.data) {
          console.error(error.response.data);
          // 오류 메시지가 객체 형태로 반환되는 경우
          if (
            typeof error.response.data === "object" &&
            error.response.data !== null
          ) {
            const messages = Object.values(error.response.data).join("\n");
            alert(messages);
          } else {
            // 기타 경우, 예를 들어 문자열 형태의 오류 메시지가 단순히 반환된 경우
            alert(error.response.data.message || "정보 등록에 실패했습니다.");
          }
        } else {
          // 네트워크 오류 등 기타 오류 처리
          console.error("서버 응답 없음:", error);
          alert("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
        }
      }
    },
    async fetchEmployeeInfo() {
      // 부서 정보 로딩
      try {
        const response = await axiosInstance.get("/api/join/new");
        this.form.empId = response.data.empId;
        this.form.empNum = response.data.empNum;
        this.deptNames = response.data.deptNames;
      } catch (error) {
        console.error("부서 정보를 불러오는 데 실패했습니다.", error);
      }
    },
  },
  mounted() {
    this.fetchEmployeeInfo(); // 컴포넌트 마운트 시 부서 정보 로딩
  },
};
</script>

<style scoped>
.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="date"],
.form-group input[type="password"],
.form-group select {
  width: 100%;
  padding: 10px 12px;
  margin-top: 2px; /* 입력란 위 여백 설정 */
  margin-bottom: 2px; /* 입력란 아래 여백 설정 */
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

.signup-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 110vh;
  background-color: #edf2f7;
  /* Lighter shade for background */
}

/* 찾기 버튼 스타일 */
.signup-form-container button {
  background-color: gray;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

.signup-form-container button:hover {
  background-color: #a0aec0;
  /* 더 밝은 회색으로 변경 */
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
  /* Reduced maximum width */
}

.form-title,
.section-title {
  color: #2b2d42;
  /* Darker shade for better readability */
  text-align: left;
  /* Align to left for conventional reading */
  margin-bottom: 20px;
  /* Reduced margin */
  font-size: 15px;
  /* Smaller font size */
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
  padding: 10px 85px;
  /* Keep padding */
  cursor: pointer;
  margin-top: 8px;
  /* Keep margin top */
  transition: background-color 0.2s ease, border-color 0.2s ease,
    color 0.2s ease;
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

.select-container {
  position: relative;
}

.select-container::after {
  content: "\25BC";
  font-size: 16px;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.select-container select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 10px 12px;
  width: 100%;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

.select-container select:hover {
  border-color: #a0aec0;
}

.select-container select:focus {
  border-color: #4c51bf;
  outline: none;
}

input[type="date"]:not(.has-value):before {
  color: gray;
  content: attr(placeholder);
}

.form-group input[type="text"][readonly] {
  background-color: #f4f4f4;
  /* Light gray background */
  pointer-events: none;
  /* Disable mouse events */
}

::placeholder,
select option {
  color: gray;
}
</style>
