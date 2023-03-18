import Course from "./Course.js";
/*
  This file is used to read the json files and create the course objects
  The objects are stored in an array called courses

*/
var courses = []; // stores course objects

/***
  Immediately Invoked Function to read the json files
  no return value
*/
(function readFile() {
  read("math_courses.json");
  read("cse_courses.json");
  read("bus_courses.json");
})();

/***
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
var courses2 = [
  new Course(
    "MATH 021",
    "Calculus I",
    4,
    "MATH",
    false,
    false,
    "N/A",
    1,
    [],
    "N/A",
    "Both"
  ),
  new Course(
    "MATH 022",
    "Calculus II",
    4,
    "MATH",
    false,
    false,
    "N/A",
    1,
    ["MATH 021"],
    "N/A",
    "Both"
  ),
  new Course(
    "MATH 205",
    "Lin Alg",
    4,
    "MATH",
    false,
    false,
    "N/A",
    2,
    ["MATH 022"],
    "N/A",
    "Both"
  ),
];
export default courses;
