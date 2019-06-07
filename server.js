const express = require('express');
const app = express();
const PORT = process.env.PORT || 7000;
const bodyParser = require('body-parser');
const students = require('./students');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json()); // this is used to parse the form data into req.body object

// const students = require('./students');

app.get('/', (req, res) => {
    console.log(`the user is checking ${req.url}`);
    console.log(req.url);
    res.send('This is the index page has total of ' + students.length + ' students');
});

app.get('/students', (req, res) => {
    console.log(`the user is checking ${req.url}`);
    console.log('the current path is ' + req.url);
    res.json(students);
});

app.get('/students/:search', (req, res) => {
    const id = parseInt(req.params.search);
    const name = req.params.search.toLowerCase();

    let found = false;
    for (let i = 0; i < students.length; i++) {
        if (students[i].id === id || students[i].name === name) {
            res.json(students[i]);
            found = true;
            break;
        }
    }
    if (!found) {
        res.send(`A student with the id: ${id} was not found`);
    }
});

// create - post
app.post('/students', (req, res) => {
    console.log(req.body);
    const newStudent = req.body;
    const id = students.length + 1;
    newStudent.id = id;
    students.push(newStudent);
    res.send('A new student has been added');
});

// edit
app.put('/students/:id', (req, res) => {
    const { name, country, age, bio } = req.body;
    let found = false;
    const id = parseInt(req.params.id);
    students.forEach(student => {
        if (student.id === id) {
            student.name = name;
            student.country = country;
            student.age = age;
            student.bio = bio;
            found = true;
            // break;
        }
    });

    if (!found) {
        res.send(`A student with the id: ${id} was not found`);
    }
});

// delete
app.delete('/students/:search', (req, res) => {
    const id = parseInt(req.params.search);
    const name = req.params.search.toLowerCase();

    let found = false;
    for (let i = 0; i < students.length; i++) {
        if (students[i].id === id || students[i].name === name) {
            students.splice(i, 1);
            res.send(`A student with an id ${id} has been removed`);
            found = true;
            break;
        }
    }
    if (!found) {
        res.send(`A student with the id: ${id} was not found`);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}...`);
});
