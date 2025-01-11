const {Schema, model} = require('mongoose')
const CohortSchema = new Schema({
    cohortSlug: {
        type: String,
        required: true
    },
    cohortName: {
        type: String,
        required: true
    },
    program: {
        type: String,
        enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]
    },
    format: {
        type: String,
        enum: ["Full Time", "Part Time"]
    },
    campus: {
        type: String,
        enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"]
    },
    startDate: {
        type: Date,
        default:Date.now
        
    },
    endDate: Date,
    inProgress: Boolean,
    programManager: {
        type: String,
        required: true
    },
    leadTeacher: {
        type: String,
        required: true
    },
    totalHours: {
        type: Number,
        default: 360
    }


});

const StudenSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    linkedinUrl: {
        type: String,
    },
    languages: {
        type: String,
        enum: ["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"]
        
    },
    program: {
        type: String,
        enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]
    },
    image: {
        type: String,
        default: "https://i.imgur.com/r8bo8u7.png"
    },
    cohort: {
        type: Schema.Types.ObjectId,
        ref:"cohorts"
    },
    projects: Array


});


const CohortModel = model ('cohorts', CohortSchema)
const StudentModel = model ('students', StudenSchema)
module.exports = {CohortModel, StudentModel}