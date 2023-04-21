// CLIENT SIDE

const grid = document.querySelector(".grid");
let courses = [];
console.log("In client side");
let graph;
var courseCard = [];

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
	// preprocess
	let numxCoordLevel1_BUS = 0, numxCoordLevel1_MATH = 0, numxCoordLevel1_CSE = 0;
	let numxCoordLevel1_5_BUS = 0, numxCoordLevel1_5_MATH = 0, numxCoordLevel1_5_CSE = 0;
	let numxCoordLevel2_BUS = 0, numxCoordLevel2_MATH = 0, numxCoordLevel2_CSE = 0, numxCoordLevel2_CSB = 0;
	let numxCoordLevel2_5_BUS = 0, numxCoordLevel2_5_MATH = 0, numxCoordLevel2_5_CSE = 0, numxCoordLevel2_5_CSB = 0;
	let numxCoordLevel3_BUS = 0, numxCoordLevel3_CSE = 0, numxCoordLevel3_CSB = 0;
	let numxCoordLevel3_5_BUS = 0, numxCoordLevel3_5_CSE = 0, numxCoordLevel3_5_CSB = 0;
	let numxCoordLevel4_BUS = 0, numxCoordLevel4_CSE = 0, numxCoordLevel4_CSB = 0;
	for (let i = 0; i < courses.length; i++) {
		switch(courses[i].level) {
			case 1:
				if (courses[i].designation === "MATH") {
					numxCoordLevel1_MATH++;
				} else if (courses[i].designation === "CSE") {	
					numxCoordLevel1_CSE++;
				} else {	
					numxCoordLevel1_BUS++;
				}
				break;
			case 1.5:
				if (courses[i].designation === "MATH") {
					numxCoordLevel1_5_MATH++;
				} else if (courses[i].designation === "CSE") {	
					numxCoordLevel1_5_CSE++;
				} else {	
					numxCoordLevel1_5_BUS++;
				}
				break;
			case 2:
				if (courses[i].designation === "MATH") {
					numxCoordLevel2_MATH++;
				} else if (courses[i].designation === "CSE") {	
					numxCoordLevel2_CSE++;
				} else if (courses[i].designation === "CSB") {	
					numxCoordLevel2_CSB++;
				} else {	
					numxCoordLevel2_BUS++;
				}		
				break;
			case 2.5: 
				if (courses[i].designation === "MATH") {
					numxCoordLevel2_5_MATH++;
				} else if (courses[i].designation === "CSE") {
					numxCoordLevel2_5_CSE++;
				} else if (courses[i].designation === "CSB") {
					numxCoordLevel2_5_CSB++;
				} else {
					numxCoordLevel2_5_BUS++;
				}
				break;
			case 3:
				if (courses[i].designation === "CSE") {	
					numxCoordLevel3_CSE++;
				} else if (courses[i].designation === "CSB") {	
					numxCoordLevel3_CSB++;
				} else {	
					numxCoordLevel3_BUS++;
				}	
				break;	
			case 3.5:
				if (courses[i].designation === "MATH") {
					numxCoordLevel3_5_MATH++;
				} else if (courses[i].designation === "CSE") {	
					numxCoordLevel3_5_CSE++;
				} else if (courses[i].designation === "CSB") {	
					numxCoordLevel3_5_CSB++;
				} else {	
					numxCoordLevel3_5_BUS++;
				}		
				break;
			case 4:
				if (courses[i].designation === "CSE") {	
					numxCoordLevel4_CSE++;
				} else if (courses[i].designation === "CSB") {	
					numxCoordLevel4_CSB++;
				} else {	
					numxCoordLevel4_BUS++;
				}		
				break;
		}
	}

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
	// for x-coordinate, the first one for that level is 100, the second one is 200, the third one is 300, etc.
	let xCoordLevel1_BUS = 100, xCoordLevel1_MATH = 750, xCoordLevel1_CSE = 950;
	let xCoordLevel1_5_BUS = 100 , xCoordLevel1_5_MATH = 750, xCoordLevel1_5_CSE = 950; //830
	let xCoordLevel2_BUS = 300, xCoordLevel2_MATH = 750, xCoordLevel2_CSE = 830, xCoordLevel2_CSB = 670;
	let xCoordLevel2_5 = 300;
	let xCoordLevel3_BUS = 100, xCoordLevel3_CSE = 870, xCoordLevel3_CSB = 670; //830
	let xCoordLevel3_5 = 100;
	let xCoordLevel4_BUS = 300, xCoordLevel4_CSE = 920, xCoordLevel4_CSB = 670;

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

// mouse enter event for each course card
var rects = graph.getCells().filter(cell => cell.get('type') === 'standard.Rectangle');

rects.forEach((cell) => {
	cell.on('mouseenter', () => {
		cell.attr('body/fill', 'grey');
	});
	createEvent(findCourse(cell), cell, "mouseenter", 'red'); // for prereqs
});
rects.forEach((cell) => {
	cell.on('mouseleave', () => {
		if (cell.prop('offered') === "Spring") {
			cell.attr('body/fill', 'green');
		} else if (cell.prop('offered') === "Fall") {
			cell.attr('body/fill', 'red');
		} else {
			cell.attr('body/fill', 'blue');
		}
	});
	createEvent(findCourse(cell), cell, "mouseleave", 'pink'); // for prereqs
});
function createEvent(courseObj, cell, mouseEvent, action) {
  	courseObj.prereqs.forEach((item) => {
		const preReq = rects.find((cell) => cell.prop('title') === item);
		preReq.on(mouseEvent, () => {
			cell.attr('body/fill', action);
		});
  	});
}
function drawLines() {
	// prerequisites
	for (let i = 0; i < courseCard.length; i++) { // loop through all the courses
		let title = courseCard[i].prop('title');
		let course = findCourseByTitle(title);
		for (let j = 0; j < course.prereqs.length; j++) { // loop through all the prereqs for each course
			for (let k = 0; k < courseCard.length; k++) { // loop through all the courses to find the course object that matches the prereq
				if (courseCard[k].prop('title') === course.prereqs[j]) { 
					createFlow(courseCard[k], courseCard[i], "black");
				}
			}		
		}
	}
	// Coreqs
	for (let i = 0; i < courseCard.length; i++) {
		let title = courseCard[i].prop('title');
		let course = findCourseByTitle(title);
		for (let j = 0; j < course.coreqs.length; j++) {
			for (let k = 0; k < courseCard.length; k++) {
				if (courseCard[k].prop('title') === course.coreqs[j]) {
					createFlow(courseCard[k], courseCard[i], "red");
				}
			}		
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


<<<<<<< HEAD
function createStart(x, y, title, color) {
	let rect = new joint.shapes.standard.Rectangle({
		position: { x, y },
		size: { width: 60, height: 50 },
		z: 1,
		attrs: {
		body: {
			rx: 10,
			ry: 10,
			fill: color,
			stroke: 'none'
		},
		label: {
			text: title,
			fill: 'white',
			textWrap: {
			width: 0,
			height: 0
			}
		}
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
	return rect;
=======
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
>>>>>>> c6832e1 (render all courses)
}

function createStep(x, y, title, color) {
	let rect =  new joint.shapes.standard.Rectangle({
		position: { x, y },
		size: { width: 60, height: 50 },
		z: 1,
		attrs: {
		body: {
			rx: 10,
			ry: 10,
			fill: color,
			stroke: 'none'
		}, 
		label: {
			text: title,
			textWrap: {
			width: 0,
			height: 0
			},
			fill: 'white'
		}
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
	return rect;
}

function createDecision(x, y, title, color) {
	let rect = new joint.shapes.standard.Rectangle({
		position: {x, y},
		size: { width: 60, height: 50 },
		z: 1,
		attrs: {
		body: {
			rx: 10,
			ry: 10,
			fill: color,
			stroke: 'none'
		},
		label: {
			text: title,
			fill: 'white',
			textWrap: {
			width: 0,
			height: 0
			}
		}
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
	return rect;
}

function createFlow(source, target, color) {
	let rect =  new joint.shapes.standard.Link({
		source: { id: source.id },
		target: { id: target.id },
		z: 2,
		attrs: {
		line: {
			stroke: color
		}
		},
		defaultLabel: {
		attrs: {
			labelBody: {
			ref: 'labelText',
			x: 'calc(x - 8)',
			y: 'calc(y - 8)',
			width: 'calc(w + 16)',
			height: 'calc(h + 16)',
			fill: 'black',
			stroke: 'none',
			rx: 5,
			ry: 5
			},
			labelText: {            
			textAnchor: 'middle',
			textVerticalAnchor: 'middle'
			}
		},
		markup: [
			{
			tagName: 'rect',
			selector: 'labelBody'
			}, 
			{
			tagName: 'text',
			selector: 'labelText'
			}
		],
		}
	});
	rect.addTo(graph);
}