const Student = require('../models/Student');

// GET/SHOW callback functions
const getHome = (req, res) => {
    res.render('pages/index');
};

const getAbout = (req, res) => {
    res.render('pages/about');
};
const getContact = (req, res) => {
    res.render('pages/about');
};

const getAPI = (req, res) => {
    res.render('pages/api');
};

const getStudents = (req, res) => {
    Student.find({}, (err, students) => {
        if (err) {
            return res.status(404).send('Students not found');
        }
        res.render('pages/students', { students });
    });
};

const getSingleStudent = (req, res) => {
    const _id = req.params.id;
    Student.findOne({ _id }, (err, student) => {
        if (err) {
            return res.status(404).send(`The student with the ${_id} was not found`);
        }
        res.render('pages/student', { student });
    });
};

const getAddStudent = (req, res) => {
    res.render('pages/add-student');
};

const getEditStudent = (req, res) => {
    const _id = req.params.id;
    Student.findOne({ _id }, (err, student) => {
        if (err) {
            return res.status(404).send(`The student with the ${_id} was not found`);
        }
        res.render('pages/edit-student', { student });
    });
};

// POST/SEND callback functions
const postStudentAPI = (req, res) => {
    const newStudent = new Student(req.body);
    newStudent.save(err => {
        if (err) {
            // return res.status(404).send('The new student was not posted')
            return res.status(404).json(err);
        }
        res.redirect('/students');
    });
};

const editStudentAPI = (req, res) => {
    const _id = req.params.id;
    const { name, country, age, bio } = req.body;
    Student.findOne({ _id }, (err, student) => {
        student.name = name;
        student.country = country;
        student.age = age;
        student.bio = bio;
        student.save(err => {
            if (err) {
                res.status(404).send(`The student with ${_id} was not edited`);
            }
            res.redirect('/students');
        });
    });
};

const deleteStudentAPI = (req, res) => {
        const _id = req.params.id;
       
             Student.deleteOne({ _id }, (err, student) => {
                if (err) {
                    return res.status(404).send(`The student with the ${_id} was not found`);
                    }
                    setTimeout(()=>{
                        res.redirect('/students');
                    }, 1500)
            });

};

const allStudentsAPI = (req, res) => {
    Student.find({}, (err, students) => {
        if (err) {
            return res.status(404).send('Students not found');
        }
        res.json(students);
    });
};

const singleStudentAPI = (req, res) => {
    const _id = req.params.id;
    Student.findOne({ _id }, (err, student) => {
        if (err) {
            return res.status(404).send(`The student with the ${_id} was not found`);
        }
        res.json(student);
    });
};

module.exports = {
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
};
