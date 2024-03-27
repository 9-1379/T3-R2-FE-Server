<template>
    <div class="employees-section">
        <select v-model="selectedDept" @change="$emit('deptChanged', selectedDept)">
            <option value="">모든 부서</option>
            <option v-for="dept in deptNames" :key="dept" :value="dept">
                {{ dept }}
            </option>
        </select>
        <table>
            <thead>
                <tr>
                    <th>사번</th>
                    <th>이름</th>
                    <th>부서</th>
                    <th>이메일</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="employee in employees" :key="employee.empNo" @click="$emit('employeeSelected', employee)">
                    <td>{{ employee.empNo }}</td>
                    <td>{{ employee.name }}</td>
                    <td>{{ employee.deptName }}</td>
                    <td>{{ employee.email }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        employees: {
            type: Array,
            default: () => [],
        },
        deptNames: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            selectedDept: '',
        };
    },
};
</script>

<style>
/* 직원 목록 섹션 스타일링 */
</style>