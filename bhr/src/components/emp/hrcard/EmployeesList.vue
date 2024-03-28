<template>
    <div class="employees-section">
        <select v-model="selectedDept" @change="$emit('deptChanged', selectedDept)">
            <option value="">모든 부서</option>
            <option v-for="dept in deptNames" :key="dept" :value="dept">
                {{ dept }}
            </option>
        </select>
        <div class="table-section">
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
                    <tr v-for="employee in employees" :key="employee.empNo"
                        @click="$emit('employeeSelected', employee)">
                        <td>{{ employee.empNo }}</td>
                        <td>{{ employee.name }}</td>
                        <td>{{ employee.deptName }}</td>
                        <td>{{ employee.email }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
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

<style scoped>
.employees-section {
    margin: 20px;
}

.employees-section select {
    width: 100%;
    padding: 8px 12px;
    margin-bottom: 20px;
    border: 1px solid #cbd5e0;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075);
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}

.employees-section select:focus {
    border-color: #4d90fe;
    outline: none;
    box-shadow: 0 0 8px rgba(77, 144, 254, 0.6);
}

.table-section {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    font-size: 0.9rem;
}

th,
td {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f8f8f8;
}

tr:hover {
    background-color: #f2f2f2;
}

td {
    cursor: pointer;
}
</style>