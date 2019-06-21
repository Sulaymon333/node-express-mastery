const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 20
    },
    country: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    bio: {
        type: String,
        required: true,
        min: 20
    },
    createdAt: {
        type: Date
    }
});

const Student = mongoose.model('student', studentSchema);

module.exports = Student;
