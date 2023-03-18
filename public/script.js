// CLIENT SIDE

const grid = document.querySelector(".grid");
let courses = [];
console.log("In client side");

// make a get request to the server to get the courses and print them to the console
// the server will send back a stringified version of the courses array
fetch("/courses")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    // data is an array of courses
    courses = data;
    addCourses();
  });

function addCourses() {
  // console.log("In addCourses function");
  courses.forEach((item) => {
    // console.log("In forEach loop");
    // const box = document.createElement("li");
    // box.classList.add("box");
    // box.innerText = item.title;
    // grid.appendChild(box);

    // grid is <ul class="grid"></ul>
    // add a <li> element to the grid for each course
    grid.innerHTML += `<li class="box">${item.title}</li>`;
  });
}

/*
    Event Listeners for the boxes
*/
// const box = document.querySelectorAll(".box");
// // Mouse enter event
// box.forEach((cell) => {
//   cell.addEventListener("mouseenter", () => {
//     cell.style.backgroundColor = "blue";
//   });
// });
// // Mouse leave event
// box.forEach((cell) => {
//   cell.addEventListener("mouseleave", () => {
//     cell.style.backgroundColor = "";
//   });
// });

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
