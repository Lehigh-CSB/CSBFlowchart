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
  const classContainer = document.getElementById("class-container");
  // Loop through the classes array and create a box for each class
  for (let i = 0; i < courses.length; i++) {
    // Create a new div element for the class box
    const classBox = document.createElement("div");
    classBox.classList.add("class-box");

    // Create a heading element for the class code
    const codeHeading = document.createElement("h2");
    codeHeading.textContent = courses[i].title;

    // Create a paragraph element for the class credits
    const creditsPara = document.createElement("p");
    creditsPara.textContent = `Credits: ${courses[i].credits}`;

    // Append the heading and paragraph elements to the class box
    classBox.appendChild(codeHeading);
    classBox.appendChild(creditsPara);

    // Append the class box to the class container element
    classContainer.appendChild(classBox);
  }
}
