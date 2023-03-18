// SERVER SIDE
const express = require("express");
const path = require("path");

let app = express();

let publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.listen(3000, () => console.log("Starting up ..."));

console.log("In server side");

class Course {
    constructor(
        title,
        description,
        credits,
        designation,
        completed,
        used,
        grade,
        level,
        prereqs,
        coreqs,
        offered
    ) 
    {
        this.title = title;
        this.description = description;
        this.credits = credits;
        this.designation = designation;
        this.completed = completed;
        this.used = used;
        this.grade = grade;
        this.level = level;
        this.prereqs = prereqs;
        this.coreqs = coreqs;
        this.offered = offered;
    }
}

let courses = []; // array of courses
let counter = 0; // counter for courses array

const fs = require('fs');
const bus_courses = fs.readFileSync('data/bus_courses.json', 'utf8');
const cse_courses = fs.readFileSync('data/cse_courses.json', 'utf8');
const math_courses = fs.readFileSync('data/math_courses.json', 'utf8');

// convert text to JSON
const bus_courses_json = JSON.parse(bus_courses);
const cse_courses_json = JSON.parse(cse_courses);
const math_courses_json = JSON.parse(math_courses);

// read json data into courses array
readData(bus_courses_json);
readData(cse_courses_json);
readData(math_courses_json);

// function to read json data into courses array
function readData(filename) {
    // console.log("In readData function");
    for (let i = 0; i < filename.length; i++) {
        courses[counter] = new Course(
            filename[i].title,
            filename[i].description,
            filename[i].credits,
            filename[i].designation,
            filename[i].completed,
            filename[i].used,
            filename[i].grade,
            filename[i].level,
            filename[i].prereqs,
            filename[i].coreqs,
            filename[i].offered
        );
        counter++;
    }
}

console.log(courses);

// handle GET request for courses
app.get("/courses", (req, res) => {
    res.send(JSON.stringify(courses));
});