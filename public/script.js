// CLIENT SIDE

const grid = document.querySelector(".grid");
let courses = [];
console.log("In client side");
let graph;

// // make a get request to the server to get the courses and print them to the console
// // the server will send back a stringified version of the courses array
fetch("/courses")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    // data is an array of courses
    courses = data;
    // addCourses();
    // renderCourses is put in the fetch function so that it will only run after the data is received
    renderCourses();
  });

// function addCourses() {
//   // console.log("In addCourses function");
//   courses.forEach((item) => {
//     grid.innerHTML += `<li class="box">${item.title}</li>`;
//   });
// }

// USE LIBRARY GOJS

function renderCourses() {
  // console.log("In renderCourses function");
  
  var namespace = joint.shapes;
  graph = new joint.dia.Graph({}, { cellNamespace: namespace });

  var paper = new joint.dia.Paper({
      // el is the DOM element that will contain the paper
      el: document.getElementById('myholder'),
      // model is the graph that will be rendered inside the paper
      model: graph,
      // make paper fit the size of the container
      gridSize: 1,
      cellViewNamespace: namespace,
      // make paper non-responsive to pointer events so that elements are not draggable
      interactive: false
  });

  let course = findCourseByTitle("CSE 007");
  // create a rectangle for the course
  createCourseBox(100, 30, course.title);
}

function findCourseByTitle(title) {
  return courses.find((course) => course.title === title);
}

function createCourseBox(xCoord, yCoord, title) {
  var rect = new joint.shapes.standard.Rectangle();
  rect.position(xCoord, yCoord);
  rect.resize(100, 40);
  rect.attr({
      body: {
          fill: 'black',
          // set rectangle's border rounded
          rx: 10,
          ry: 10,
      },
      label: {
          text: title,
          fill: 'white',
      }
  });
  // Set the draggable attribute to false
  rect.attr('rect/draggable', false);
  rect.addTo(graph);
}


