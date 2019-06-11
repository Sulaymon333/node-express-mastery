const express = require('express');
const app = express();
const PORT = process.env.PORT || 7000;
const bodyParser = require('body-parser');
const students = require('./data/students');

// set the view template
app.set('view engine', 'ejs');
// serving static file
app.use(express.static('public'));

//body-parser middleware  to parse the form data into req.body object
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// const students = require('./students');

// app.get('/', (req, res) => {
//     console.log(`the user is checking ${req.url}`);
//     console.log(req.url);
//     res.send('This is the index page has total of ' + students.length + ' students');
// });

// home page
app.get('/', (req, res) => {
    // console.log(__dirname); // to get the root folder of the current project
    // res.sendFile(__dirname + '/views/pages/index');
    res.render('pages/index');
});

// about page
app.get('/about', (req, res) => {
    res.render('pages/about');
});

// contact page
app.get('/contacts', (req, res) => {
    res.render('pages/contact');
});
app.get('/contacts', (req, res) => {
    res.render('pages/contact');
});

// individual student page
app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.filter(student => student.id === id)[0];
    console.log(student);
    res.render('pages/student', { student });
});

// individual student search by name/ id with error handling
app.get('/students/:search', (req, res) => {
    const id = parseInt(req.params.search);
    const name = req.params.search.toLowerCase();

    let found = false;
    // for (let student of students) {
    //     if (student.id === id || student.name.toLowerCase() === name) {
    //         res.json(student);
    //         console.log(student.name);
    //         found = true;
    //         break;
    //     }
    // }
    for (let i = 0; i < students.length; i++) {
        if (students[i].id == id || students[i].name.toLowerCase() === name) {
            // res.json(student);
            console.log(students[i].name);
            res.render('pages/student', { student: students[i] });
            found = true;
            break;
        }
    }

    // id or name not found
    if (!found) {
        res.send(id ? `student with id: "${id}" was not found` : `student with name: "${name}" name was not found`);
    }
});

// all students page
app.get('/students', (req, res) => {
    res.render('pages/students', { students });
});

// app.get('/students', (req, res) => {
//     console.log(`the user is checking ${req.url}`);
//     console.log('the current path is ' + req.url);
//     res.json(students);
// });

// all students api
app.get('/api/v1/students', (req, res) => {
    res.json(students);
});

// individual student api
app.get('/api/v1/students/:search', (req, res) => {
    const id = parseInt(req.params.search);
    const name = req.params.search.toLowerCase();
    let found = false;
    for (let student of students) {
        if (student.id === id || student.name.toLowerCase() === name) {
            res.json(student);
            found = false;
            return;
        }
    }
    if (!found) {
        res.send(id ? `student with id: "${id}" was not found` : `student with name: "${name}" name was not found`);
    }
});

// create - student using post method
app.post('/students', (req, res) => {
    console.log(req.body);
    const newStudent = req.body;
    const id = students.length + 1;
    newStudent.id = id;
    students.push(newStudent);
    res.send('A new student has been added');
});

// add student - must be post method. (post method is
// used for updating and creating data to sa server in HTML5)
app.get('/add-student', (req, res) => {
    res.render('pages/add-student');
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
        }
    });

    if (!found) {
        res.send(`A student with the id: "${id}" was not found`);
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
            res.send(`A student with an id: "${id}" has been removed`);
            found = true;
            break;
        }
    }
    if (!found) {
        res.send(`A student with the id: "${id}" was not found`);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}...`);
});
