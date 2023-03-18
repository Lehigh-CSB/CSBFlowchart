import courses from "../data/courses.js";

const course = [
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
]; // for some reason courses ARRAY is not working properly
const grid = document.querySelector(".grid");

/***
 * Function to add the courses to the grid
 * no return value
 */
(function addCourses() {
  courses.forEach((item) => {
    const box = document.createElement("li");
    box.classList.add("box");
    box.id = item.title;
    box.innerText = item.title;
    grid.appendChild(box);
  });
})();

/**/
//Event Listeners for the boxes
const box = document.querySelectorAll(".box");
// Mouse enter event
box.forEach((cell) => {
  cell.addEventListener("mouseenter", () => {
    cell.style.backgroundColor = "blue";
  });
  createEvent(findCourse(cell), cell, "mouseenter", "red"); // for prereqs
});
// Mouse leave event
box.forEach((cell) => {
  cell.addEventListener("mouseleave", () => {
    cell.style.backgroundColor = "";
  });
  createEvent(findCourse(cell), cell, "mouseleave", ""); // for prereqs
});
/**/

/***
 * Helper function to find the course object
 * @param testCourse: the course object
 * @return the course object
 */
function findCourse(testCourse) {
  courses.forEach((item) => {
    if (item.title == testCourse.id) {
      return item;
    }
  });
}

/***
 * Function to create the event listeners for the prereqs
 * @param courseObj: the course object
 * @param cell: the cell that the event listener is attached to
 * @param mouseEvent: the mouse event
 * @param action: the action to be performed
 * no return value
 */
function createEvent(courseObj, cell, mouseEvent, action) {
  courseObj.prereqs.forEach((item) => {
    const preReq = document.getElementById(item);
    cell.addEventListener(mouseEvent, () => {
      preReq.style.backgroundColor = action;
    });
  });
}

function tempFunc(i, cell, mouseEvent, action) {
  courses2[i].prereqs.forEach((item) => {
    const preReq = document.getElementById(item);
    cell.addEventListener(mouseEvent, () => {
      preReq.style.backgroundColor = action;
    });
  });
}
