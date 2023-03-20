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

  // for x-coordinate, the first one for that level is 100, the second one is 200, the third one is 300, etc.
  let xCoordLevel1 = 100;
  let xCoordLevel1_5 = 100;
  let xCoordLevel2 = 100;
  let xCoordLevel2_5 = 100;
  let xCoordLevel3 = 100;
  let xCoordLevel3_5 = 100;
  let xCoordLevel4 = 100;

  // traverse through array of courses and create a rectangle for each course
  for (let i = 0; i < courses.length; i++) {
    // createCourseBox(100, 30, courses[i].title);
    // there are multiple levels of courses, render the y-coordinate of the rectangle based on the level
    // level 1: 30, level 1.5: 45, level 2: 60, level 2.5: 75, level 3: 90, level 3.5: 105, level 4: 120
    let yCoord;
    if (courses[i].level === 1) {
      yCoord = 50;
      createCourseBox(xCoordLevel1, yCoord, courses[i].title);
      // increment the x-coordinate for the next course at this level
      xCoordLevel1 += 120;
    } else if (courses[i].level === 1.5) {
      yCoord = 150;
      createCourseBox(xCoordLevel1_5, yCoord, courses[i].title);
      // increment the x-coordinate for the next course at this level
      xCoordLevel1_5 += 120;
      createCourseBox(xCoordLevel1_5, yCoord, courses[i].title);
    } else if (courses[i].level === 2) {
      yCoord = 250;
      createCourseBox(xCoordLevel2, yCoord, courses[i].title);
      // increment the x-coordinate for the next course at this level
      xCoordLevel2 += 120;
    } else if (courses[i].level === 2.5) {
      yCoord = 350;
      createCourseBox(xCoordLevel2_5, yCoord, courses[i].title);
      // increment the x-coordinate for the next course at this level
      xCoordLevel2_5 += 120;
    } else if (courses[i].level === 3) {
      yCoord = 450;
      createCourseBox(xCoordLevel3, yCoord, courses[i].title);
      // increment the x-coordinate for the next course at this level
      xCoordLevel3 += 120;
    } else if (courses[i].level === 3.5) {
      yCoord = 550;
      createCourseBox(xCoordLevel3_5, yCoord, courses[i].title);
      // increment the x-coordinate for the next course at this level
      xCoordLevel3_5 += 120;
    } else if (courses[i].level === 4) {
      yCoord = 650;
      createCourseBox(xCoordLevel4, yCoord, courses[i].title);
      // increment the x-coordinate for the next course at this level
      xCoordLevel4 += 120;
    }
  }
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
  // Set custom attributes based on the course
  let course = findCourseByTitle(title);
  rect.prop('title', course.title);
  rect.prop('description', course.description);
  rect.prop('credits', course.credits);
  rect.prop('designation', course.designation);
  rect.prop('completed', course.prerequisites);
  rect.prop('used', course.used);
  rect.prop('grade', course.grade);
  rect.prop('level', course.level);
  rect.prop('prereqs', course.prerequisites);
  rect.prop('coreqs', course.corequisites);
  rect.prop('offered', course.offered);
  rect.addTo(graph);
  // console.log(rect.toJSON()); // COMMENT OUT THIS LINE TO SEE THE ATTRIBUTES OF THE RECTANGLE
}

