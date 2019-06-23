const express = require('express');
const studentRoutes = express.Router();

const {
    getHome,
    getAbout,
    getContact,
    getAPI,
    getStudents,
    getSingleStudent,
    getAddStudent,
    getEditStudent,
    allStudentsAPI,
    singleStudentAPI,
    postStudentAPI,
    editStudentAPI,
    deleteStudentAPI
} = require('../controllers/student.controllers');

// pages rendering
studentRoutes.get('/', getHome);
studentRoutes.get('/about', getAbout);
studentRoutes.get('/contact', getContact);
studentRoutes.get('/api', getAPI);
studentRoutes.get('/students', getStudents);
studentRoutes.get('/student/:id', getSingleStudent);
studentRoutes.get('/add-student', getAddStudent);
studentRoutes.get('/edit-student/:id', getEditStudent);

// API Operations
studentRoutes.get('/api/v1.0/students', allStudentsAPI);
studentRoutes.get('/api/v1.0/student/:id', singleStudentAPI);
studentRoutes.get('/api/v1.0/delete-student/:id', deleteStudentAPI);
studentRoutes.post('/api/v1.0/students', postStudentAPI);
studentRoutes.post('/api/v1.0/edit-student/:id', editStudentAPI);

module.exports = studentRoutes;
