import courses from "../data/courses.js";

const course = ["HELLO", "TEST", "TEST2", "TEST3"]; // for some reason courses ARRAY is not working properly
const grid = document.querySelector(".grid");

(function addCourses() {
  course.forEach((item) => {
    console.log(1);
    const box = document.createElement("li");
    box.classList.add("box");
    box.innerText = item;
    grid.appendChild(box);
  });
})();

/*
    Event Listeners for the boxes
*/
const box = document.querySelectorAll(".box");
// Mouse enter event
box.forEach((cell) => {
  cell.addEventListener("mouseenter", () => {
    cell.style.backgroundColor = "blue";
  });
});
// Mouse leave event
box.forEach((cell) => {
  cell.addEventListener("mouseleave", () => {
    cell.style.backgroundColor = "";
  });
});

/*
    Method to return a list of prerequisites for a given course
    @param  testCourse: the course to find the prerequisites for
    @return preReqs: a list of prerequisites for the given course
*/
function findPreReq(testCourse) {
  // need work
  //     let preReqs = [];
  //     testCourse.forEach((item) => {
  //         item.prereqs.forEach((item2) => {
  //             if(item2 === courses) {
  //                 preReqs.push(item);
  //             }
  //         });
  //     });
  //   return preReq;
}
