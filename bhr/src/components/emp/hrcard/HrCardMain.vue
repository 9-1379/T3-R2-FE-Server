<template>
    <div class="app-container">
        <div class="list-section">
            <EmployeesList :employees="filteredEmployees" :deptNames="deptNames" @employeeSelected="selectEmployee"
                @deptChanged="filterEmployeesByDept" />
        </div>
        <div class="profile-section">
            <EmployeeProfile :employee="selectedEmployee" />
        </div>
    </div>
</template>

<script>
import axiosInstance from '@/axios';
import EmployeeProfile from './EmployeeProfile.vue';
import EmployeesList from './EmployeesList.vue';

export default {
    components: {
        EmployeeProfile,
        EmployeesList,
    },
    data() {
        return {
            employees: [],
            deptNames: [],
            selectedEmployee: null,
            filteredEmployees: [],
        };
    },
    methods: {
        async fetchEmployeesAndDeptNames() {
            try {
                const employeesResponse = await axiosInstance.get('/api/hrCard/empList');
                const deptNamesResponse = await axiosInstance.get('/api/hrCard/deptList');
                this.employees = employeesResponse.data;
                this.filteredEmployees = employeesResponse.data; // 초기에는 모든 직원 목록을 표시
                this.deptNames = deptNamesResponse.data;
            } catch (error) {
                console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
            }
        },
        selectEmployee(employee) {
            this.selectedEmployee = employee;
        },
        filterEmployeesByDept(deptName) {
            if (deptName === '') {
                this.filteredEmployees = this.employees;
            } else {
                this.filteredEmployees = this.employees.filter(
                    (employee) => employee.deptName === deptName
                );
            }
        },
    },
    mounted() {
        this.fetchEmployeesAndDeptNames();
    },
};
</script>

<style>
.app-container {
    display: flex;
}

.list-section {
    flex: 1;
}

.profile-section {
    flex: 1;
}
</style>