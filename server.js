require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 7000;
const bodyParser = require('body-parser');

const students = require('./data/students');

// set view engine as ejs
app.set('view engine', 'ejs');

// serve static files
app.use(express.static('public'));

// parse application/x-www-form-urlencoded - to parse string and array from html forms
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

// RENDERING EJS VIEWS
// GET - homepage
app.get('/', (req, res) => {
    res.render('pages/index');
});
// GET - about page
app.get('/about', (req, res) => {
    res.render('pages/about');
});

// GET - contact page
app.get('/contact', (req, res) => {
    res.render('pages/contact');
});

// GET - all students page
app.get('/students', (req, res) => {
    res.render('pages/students', { students });
});

// GET - single student page
app.get('/student/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let found = false;
    for (let student of students) {
        if (student.id === id) {
            res.render('pages/student', { student });
            found = true;
            break;
        }
    }

    if (!found) {
        // res.send(`A student with the id: "${id}" was not found`);
        res.render('pages/error', { id });
    }
});

// GET - add-student page
app.get('/add-student', (req, res) => {
    res.render('pages/add-student');
});

// POST - create a new student
app.post('/students', (req, res) => {
    const newStudent = req.body;
    console.log(req.body);
    const id = students.length + 1;
    newStudent.id = id;
    students.push(newStudent);
    // res.send('A new student has been added');
    // res.render('pages/students', { students });
    res.redirect('/students');
});

// GET - delete a student
app.get('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let found = false;
    for (let student of students) {
        if (student.id === id) {
            students.splice(students.indexOf(student), 1);
            found = true;
            res.redirect('/students');
            return;
        }
    }
    if (!found) {
        res.render('pages/error', { id });
    }
});

// GET - edit-student page
app.get('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let found = false;
    for (student of students) {
        if (student.id === id) {
            res.render('pages/edit-student', { student });
            found = true;
            return;
        }
    }
    if (!found) {
        res.render('pages/error', { id });
    }
});

// POST - edited student
app.post('/student/:id', (req, res) => {
    const { name, country, age, bio } = req.body;
    const id = parseInt(req.params.id);
    let found = false;
    for (student of students) {
        if (student.id === id) {
            student.name = name;
            student.country = country;
            student.age = age;
            students.bio = bio;
            found = true;
            res.redirect('/students');
            return;
        }
    }

    if (!found) {
        res.render('pages/error', { id });
    }
});

//GET - api page
app.get('/api/v1/students', (req, res) => {
    res.json(students);
});

app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT} ...`);
});
