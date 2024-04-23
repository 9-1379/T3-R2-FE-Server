<template>
    <div class="app-container">
        <header class="header-section">
            <UserMenu />
        </header>
        <main class="main-section">
            <div class="list-section">
                <EmployeesList :employees="filteredEmployees" :deptNames="deptNames" @employeeSelected="selectEmployee"
                    @deptChanged="filterEmployeesByDept" />
            </div>
            <div class="profile-section">
                <EmployeeProfile :employee="selectedEmployee" />
                <ProfileBadge :employeeId="selectedEmployee?.id" />
            </div>
        </main>
    </div>
</template>

<script>
import axiosInstance from '@/axios';
import EmployeeProfile from './EmployeeProfile.vue';
import EmployeesList from './EmployeesList.vue';
import UserMenu from '@/components/menu/UserMenu.vue';

export default {
    components: {
        EmployeeProfile,
        EmployeesList,
        UserMenu
    },
    data() {
        return {
            employees: [],
            deptNames: [],
            jobId: [],
            selectedEmployee: null,
            filteredEmployees: []
        };
    },
    methods: {
        async fetchEmployeesAndDeptNames() {
            try {
                const employeesResponse = await axiosInstance.get('/api/hrCard/empList');
                const deptNamesResponse = await axiosInstance.get('/api/hrCard/deptList');
                const jobIdResponse = await axiosInstance.get('/api/hrCard/jobId');
                this.employees = employeesResponse.data;
                this.filteredEmployees = this.employees;
                this.deptNames = deptNamesResponse.data;
                this.jobId = jobIdResponse.data;
            } catch (error) {
                console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
            }
        },
        selectEmployee(employee) {
            this.selectedEmployee = employee;
        },
        filterEmployeesByDept(deptName) {
            this.filteredEmployees = deptName === ''
                ? this.employees
                : this.employees.filter(employee => employee.deptName === deptName);
        }
    },
    mounted() {
        this.fetchEmployeesAndDeptNames();
    }
};
</script>

<style scoped>
.app-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #edf2f7;
}

.main-section {
    display: flex;
    flex: 1;
    /* 남은 공간을 모두 사용 */
    gap: 20px;
    padding: 20px;
    overflow-y: auto;
    /* 필요 시 스크롤 */
}

.list-section,
.profile-section {
    flex: 1;
    background: #ffffff;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    /* 섹션 내 스크롤 */
}

/* 선택된 부서 드롭다운 스타일 */
.employees-section select {
    width: 100%;
    padding: 0.8rem;
    border-radius: 8px;
    border: 1px solid #cbd5e0;
    background-color: #f7f7f7;
    margin-bottom: 1rem;
}

.table-section {
    max-width: 840px;
    margin: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 0.5rem;
}

th {
    background-color: #f8f8f8;
    color: #333;
    font-weight: 600;
}

td {
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
}

td:hover {
    background-color: #f0f0f0;
}

th,
td {
    text-align: left;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #e0e0e0;
}

/* 버튼 스타일링 */
.btn {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
}

.btn-primary {
    background-color: #4c51bf;
    color: white;
}

.btn-primary:hover {
    background-color: #434190;
}

.btn-secondary {
    background-color: transparent;
    color: #4a5568;
    border: 1px solid #cbd5e0;
}

.btn-secondary:hover {
    background-color: #edf2f7;
}

/* 배지 스타일링 */
.badge {
    padding: 0.25rem 0.75rem;
    background-color: #e2e8f0;
    border-radius: 2rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    display: inline-flex;
    align-items: center;
}

.badge img {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
}
</style>