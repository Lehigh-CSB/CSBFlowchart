const courses = [];
// Read Courses
function readFile() {
  readBUS();
  readMATH();
  readCSE();
}
function readBUS() {
  fetch("data/bus_courses.json")
    .then((response) => response.json())
    .then((data) => {
      for (let i = courses.legth; i < data.length + courses.length; i++) {
        courses.push(data[i].title);
        courses[i].credits = data[i].credits;
      }
    });
}
function readMATH() {
  fetch("data/MATH_courses.json")
    .then((response) => response.json())
    .then((data) => {
      for (let i = courses.legth; i < data.length + courses.length; i++) {
        courses.push(data[i].title);
        courses[i].credits = data[i].credits;
      }
    });
}
function readCSE() {
  fetch("data/cse_courses.json")
    .then((response) => response.json())
    .then((data) => {
      for (let i = courses.legth; i < data.length + courses.length; i++) {
        courses.push(data[i].title);
        courses[i].credits = data[i].credits;
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
