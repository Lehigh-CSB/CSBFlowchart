import Course from "./Course.js";
/*
  This file is used to read the json files and create the course objects
  The objects are stored in an array called courses

*/
var courses = []; // stores course objects

/*
  Immediately Invoked Function to read the json files
  no return value
*/
(function readFile() {
  read("math_courses.json");
  read("cse_courses.json");
  read("bus_courses.json");
})();

/*
  Helper function to read the json files. It creates the course objects and stores them in the courses array
  @param  path: the path to the json file
  no return value
*/
function read(path) {
  fetch("http://localhost:5501/data/" + path)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        courses.push(
          new Course(
            item.title,
            item.description,
            item.credits,
            item.designation,
            item.completed,
            item.used,
            item.grade,
            item.level,
            item.prereqs,
            item.coreqs,
            item.offered
          )
        );
      });
    });
}

console.log(courses);

export default courses;
