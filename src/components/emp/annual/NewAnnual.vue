<template>
  <div>
    <UserMenu></UserMenu>
    <div class="list-form">
      <div>
        <h2>연차신청</h2>
        <div>
          <span>연차시작일</span>
          <input class="input-annual" type="date" v-model="form.startDate"/>
          -
          <span>연차종료일</span>
          <input class="input-annual" type="date" v-model="form.endDate" />
          <button class="btn-annual" @click="annualSave">신청</button>
        </div>
      </div>
      <div>
        <h2>연차사용내역</h2>
        <table class="table-section">
          <th>번호</th>
          <th>연차사용일자</th>
          <th>상태</th>
        </table>
      </div>
      <div>
        <table
          class="table-section"
          v-for="(annualList, index) in annualLists"
          v-bind:key="index"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ annualList.startDate }} - {{ annualList.endDate }}</td>
          <td>
            <button
              v-if="isCancelable(annualList.startDate)"
              @click="annualDelete(annualList.id)"
            >
              취소
            </button>
          </td>
        </table>
      </div>
    </div>
  </div>
</template>
  
<script>
import UserMenu from "@/components/menu/UserMenu.vue";
import axiosInstance from "../../../axios";

export default {
  components: {
    UserMenu,
  },
  data() {
    return {
      form: {
        id: "",
        annualYear: "",
        startDate: "",
        endDate: "",
      },
      annualLists: [],
    };
  },
  methods: {
    async annualSave() {
      await axiosInstance.post("/annualSave", this.form);
      await this.fetchAnnualList();
      alert("연차를 신청하였습니다.");
    },
    async fetchAnnualList() {
      const annualListResponse = await axiosInstance.get("/annualList");
      this.annualLists = annualListResponse.data;
    },
    async annualDelete(id) {
      if (confirm("정말로 연차를 취소하시겠습니까?")) {
        await axiosInstance.delete(`/annualList/${id}`);
        await this.fetchAnnualList();
        alert("연차를 취소하였습니다.");
      }
    },
    isCancelable(startDate) {
      const currentDate = new Date();
      const startDateObj = new Date(startDate);
      return startDateObj > currentDate;
    },
  },
  watch: {
    "form.startDate"(newDate) {
      this.form.annualYear = newDate.split("-")[0];
    },
  },
  mounted() {
    this.fetchAnnualList();
  },
};
</script>
  
<style scoped>
table {
  width: 100%;
  table-layout: fixed;
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

.shadow {
  box-shadow: 5px 10px 10rgba (217, 32, 32, 0.03);
}
.table-section {
  width: 100%;
  max-width: 800px;
}

.list-form {
  background: #f8fbff;
  padding: 20px;
  /* Reduced padding */
  border-radius: 16px;
  /* Slightly rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Softer shadow */
  width: 100%;
  max-width: 840px;
  /* Reduced maximum width */
  margin-left: auto;
  margin-right: auto;
  margin-top: 3%;
}
.input-annual {
  margin: 10px;
}
.btn-annual {
  margin: 30px;
}
</style>