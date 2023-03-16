import courses from "../data/courses.js";

const course = ["HELLO", "TEST", "TEST2", "TEST3"]; // for some reason courses ARRAY is not working properly
const grid = document.querySelector(".grid");

(function addCourses() {
  courses.forEach((item) => {
    console.log(1);
    const box = document.createElement("li");
    box.classList.add("box");
    box.innerText = item.title;
    grid.appendChild(box);
  });
})();
