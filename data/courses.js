import Course from "./Course.js";

const courses = [];
// Read Courses
function readFile() {
  read("data/MATH_courses.json");
  read("data/cse_courses.json");
  read("data/bus_courses.json");
}
function read(path) {
  fetch(path)
    .then((response) => response.json())
    .then((data) => {
      for (let i = courses.legth; i < data.length; i++) {
        const tmpCourse = new Course(
          "title",
          "description",
          0,
          "designation",
          false,
          false,
          "grade",
          1,
          "prereqs",
          "coreqs",
          "offered"
        );
        courses.push(tmpCourse);
      }
    });
}
function createBox() {
  readFile().catch((error) => console.error(error));
  const container = document.getElementById("container");
  courses.forEach((item) => {
    const box = document.createElement("div");
    box.classList.add("box");
    box.innerText = item.title;
    box.innerText = item.credits;
    container.appendChild(box);
  });
}

export default courses;
