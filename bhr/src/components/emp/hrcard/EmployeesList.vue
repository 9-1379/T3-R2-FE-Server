<template>
    <div class="employees-section">
        <div class="checkbox-section">
            <div v-for="dept in deptNames" :key="dept" class="checkbox-container">
                <input type="checkbox" :id="dept" :value="dept" v-model="selectedDepts">
                <label :for="dept">{{ dept }}</label>
            </div>
        </div>
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
                    <tr v-for="employee in filteredEmployees" :key="employee.empNo"
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
            selectedDepts: [],
        };
    },
    computed: {
        filteredEmployees() {
            if (this.selectedDepts.length === 0) {
                return this.employees;
            }
            return this.employees.filter(employee =>
                this.selectedDepts.includes(employee.deptName));
        },
    },
};
</script>

<style scoped>
.checkbox-container {
    display: inline-block;
    /* Use flex layout to arrange children inline */

    /* Center items vertically */
    margin-right: 20px;
    /* Adds some space to the right of each container */
}

.checkbox-container input[type="checkbox"] {
    margin-right: 0px;
    /* Adds some space between the checkbox and the label */
}

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