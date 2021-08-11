import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        students: []
    },
    getters: {
        students: state => state.students.map(student =>({
            ...student, fullName: student.firstName + ' ' + student.lastName
        })),
        findStudent: state => id => state.students.find(s => s.id == id),
        isLoaded: state => !!state.students.length
    },
    mutations: {
        setStudents(state, students) {
            console.log('students', students)
            state.students = students;
        },
        addStudents(state, student) {
            state.students.push(student)
        }
    },

    actions: {
        async getStudents(context) {
            let result =  await axios.get('http://localhost:3000/students');
            context.commit('setStudents',result.data)
        },
        async addStudent(context, {firstName, lastName}) {
            let result = await  axios.post("http://localhost:3000/students", {firstName, lastName});
            context.commit('addStudents',result.data)
        },
        async editStudent(context, {id, names}) {
            axios.put(`http://localhost:3000/students/${id}`, names);
        }
    }
}) 