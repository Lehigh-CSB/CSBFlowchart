let courses = [];
var courseCard = [];
var paper;
var graph;
var ConstraintElementView = joint.dia.ElementView.extend({
	events: {
		'mouseover': 'mouseovercard',
		'mouseout': 'mouseoutcard',
	},

	mouseovercard: function(evt, x, y) {
		// prereqs is an array of strings
		var prereqs = findAllPrereqs(this.model.attributes.title);
		for (let i = 0; i < prereqs.length; i++) {
			var current = findCourseBoxByTitle(prereqs[i]);
			setHoverColor(current.attributes.title);
		}

	},

	mouseoutcard: function(evt, x, y) {
		// prereqs is an array of strings
		var prereqs = findAllPrereqs(this.model.attributes.title);
		for (let i = 0; i < prereqs.length; i++) {
			var current = findCourseBoxByTitle(prereqs[i]);
			if (current.attributes.clicked === false) {
				setOriginalColor(current.attributes.title);
			} else {
				setClickColor(current.attributes.title);
			}
		}
	}
});


// make a get request to the server to get the courses and print them to the console
// the server will send back a stringified version of the courses array
fetch("/courses")
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		courses = data;
		renderCourses(); // renderCourses is put in the fetch function so that it will only run after the data is received
	});
  
// RETURN AN ARRAY OF STRINGS
// each string is a course title
function findAllPrereqs(title) {
	// recursive function to find all prereqs of a course
	let course = findCourseByTitle(title); 
	let allPrereqs = findAllPrereqsHelper(title, []);
	return allPrereqs;
}
// RECURSIVE FUNCTION
function findAllPrereqsHelper(title, prereqs) {
	let course = findCourseByTitle(title);
	if (course.prereqs.length === 0) {
		return prereqs;
	}
	for (let i = 0; i < course.prereqs.length; i++) {
		prereqs.push(course.prereqs[i]);
		findAllPrereqsHelper(course.prereqs[i], prereqs);
	}
	return prereqs;
}

// RETURN A COURSE BOX OBJECT
function findCourseBoxByTitle(title) {
  for (let i = 0; i < courseCard.length; i++) {
    if (courseCard[i].attributes.title === title) {
      return courseCard[i];
    }
  }
  return null;
}


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

  	var namespace = joint.shapes;
  	graph = new joint.dia.Graph({}, { cellNamespace: namespace });

  	paper = new joint.dia.Paper({
		// el is the DOM element that will contain the paper
		el: document.getElementById('myholder'),
		// model is the graph that will be rendered inside the paper
		model: graph,
		// make paper fit the size of the container
		gridSize: 1,
		cellViewNamespace: namespace,
		// make paper non-responsive to pointer events so that elements are not draggable
		interactive: false,
    elementView: ConstraintElementView,
  	});

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
		// there are multiple levels of courses, render the y-coordinate of the rectangle based on the level
		// level 1: 30, level 1.5: 45, level 2: 60, level 2.5: 75, level 3: 90, level 3.5: 105, level 4: 120
		
		// determine courseCard color based on the semester it is offered
		let cardColor = 'blue'; 
		if (courses[i].offered === "Spring") {
			cardColor = 'green';
		} else if (courses[i].offered === "Fall") {
			cardColor = 'red';
		}
		switch(courses[i].level) {
			case 1:
				if (courses[i].designation === "MATH") {
					if (courses[i].prereqs.length === 0) {
						courseCard.push(createCourseBox(xCoordLevel1_MATH, 50, courses[i].title));
					} else {
						courseCard.push(createCourseBox(xCoordLevel1_MATH, 50, courses[i].title));
					}
					xCoordLevel1_MATH += 80;
				} else if (courses[i].designation === "CSE") {
					courseCard.push(createCourseBox(xCoordLevel1_CSE, 50, courses[i].title));    
					xCoordLevel1_CSE += 80;
				} else if (courses[i].designation === "ENGL") {
					courseCard.push(createCourseBox(580, 50, courses[i].title));
				} else {
					courseCard.push(createCourseBox(xCoordLevel1_BUS, 50, courses[i].title));
					xCoordLevel1_BUS += 80; // increment the x-coordinate for the next course at this level
				}
				break;
			case 1.5:
				if (courses[i].designation === "MATH") {
					courseCard.push(createCourseBox(xCoordLevel1_5_MATH, 150, courses[i].title));
					xCoordLevel1_5_MATH += 80;
				} else if (courses[i].designation === "CSE") {
					courseCard.push(createCourseBox(xCoordLevel1_5_CSE, 150, courses[i].title));
					xCoordLevel1_5_CSE += 80;
				} else if (courses[i].designation === "ENGL") {
					courseCard.push(createCourseBox(900, 150, courses[i].title));
				} else {
					courseCard.push(createCourseBox(xCoordLevel1_5_BUS, 150, courses[i].title));
					xCoordLevel1_5_BUS += 80; 
				}
				break;
			case 2:
				if (courses[i].designation === "MATH") {
					courseCard.push(createCourseBox(xCoordLevel2_MATH, 250, courses[i].title));
					xCoordLevel2_MATH += 80;
				} else if (courses[i].designation === "CSE") {
					courseCard.push(createCourseBox(xCoordLevel2_CSE, 250, courses[i].title));
					xCoordLevel2_CSE += 80;
				} else if (courses[i].designation === "CSB") {
					courseCard.push(createCourseBox(xCoordLevel2_CSB, 250, courses[i].title));
					xCoordLevel2_CSB += 80;
				} else {
					courseCard.push(createCourseBox(xCoordLevel2_BUS, 250, courses[i].title));
					xCoordLevel2_BUS += 80; 
				}
				break;
			case 2.5:
				courseCard.push(createCourseBox(xCoordLevel2_5, 350, courses[i].title));
				xCoordLevel2_5 += 80;
				break;
			case 3:
				if (courses[i].designation === "CSE") {
					courseCard.push(createCourseBox(xCoordLevel3_CSE, 450, courses[i].title));
					xCoordLevel3_CSE += 80;
				} else if (courses[i].designation === "CSB") {
					courseCard.push(createCourseBox(xCoordLevel3_CSB, 450, courses[i].title));
					xCoordLevel3_CSB += 80;
				} else {
					courseCard.push(createCourseBox(xCoordLevel3_BUS, 450, courses[i].title));
					xCoordLevel3_BUS += 80; 
				}
				break;
			case 3.5:
				courseCard.push(createCourseBox(xCoordLevel3_5, 550, courses[i].title));
				xCoordLevel3_5 += 80;
				break;
			case 4:
				if (courses[i].designation === "CSE") {
					courseCard.push(createCourseBox(xCoordLevel4_CSE, 650, courses[i].title));
					xCoordLevel4_CSE += 80;
				} else if (courses[i].designation === "CSB") {
					courseCard.push(createCourseBox(xCoordLevel4_CSB, 650, courses[i].title));
					xCoordLevel4_CSB += 80;
				} else {
					courseCard.push(createCourseBox(xCoordLevel4_BUS, 650, courses[i].title));
					xCoordLevel4_BUS += 80; 
				}
				break;
		}
	}
	drawLines();
}


function addClickListener(rect){
  paper.on('element:pointerclick', function(elementView) {    
    if (elementView.model.attributes.clicked === false) {
		setClickColor(elementView.model.attributes.title);
	  	var prereqs = findAllPrereqs(elementView.model.attributes.title);
		for (let i = 0; i < prereqs.length; i++) {
			setClickColor(prereqs[i]);
		}
	// WHEN RECLICKED
    } else { // when clicked attribute is true
		setOriginalColor(elementView.model.attributes.title);
		var postCourses = findAllCoursesAfter(elementView.model.attributes.title);
		for (let i = 0; i < postCourses.length; i++) {
			setOriginalColor(postCourses[i]);
		}
    }
  });
}

function findAllCoursesAfter(title) {
	let coursesAfter = [];
	// courseAfter is an array of strings containing all courses that have title as a prereq
	for (let i = 0; i < courses.length; i++) {
		for (let j = 0; j < courses[i].prereqs.length; j++) {
			if (courses[i].prereqs[j] === title) {
				coursesAfter.push(courses[i].title);
			}
		}
	}
	return coursesAfter;
}

function setOriginalColor(title) {
	let courseCard = findCourseBoxByTitle(title);
	courseCard.attr({
		body: {
			fill: 'white',
			stroke: 'black'
		},
		label: {
			fill: 'black'
		}
	});
	courseCard.attributes.clicked = false;
}

function setClickColor(title) {
	let courseCard = findCourseBoxByTitle(title);
	courseCard.attr({
		body: {
			fill: '#68BBE3',
			stroke: '#68BBE3'
		},
		label: {
			fill: 'white'
		}
	});
	courseCard.attributes.clicked = true;
}

function setHoverColor(title) {
	let courseCard = findCourseBoxByTitle(title);
	courseCard.attr({
		body: {
			fill: 'black',
			stroke: '#FFFFFF',
		},
		label: {
			fill: 'white',
		}
	});
}

function addAllEventListeners(rect) {
  addClickListener(rect);
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

// RETURN THE COURSE OBJECT THAT MATCHES THE TITLE 
// COURSE OBJECTS ARE STORED IN THE COURSES ARRAY
function findCourseByTitle(title) {
  	return courses.find((course) => course.title === title);
}


function createCourseBox(x, y, title) {
	let rect =  new joint.shapes.standard.Rectangle({
		position: { x, y },
		size: { width: 60, height: 50 },
		z: 1,
		attrs: {
			body: {
				rx: 10,
				ry: 10,
				fill: 'white',
				stroke: 'black'
			}, 
			label: {
				text: title,
				textWrap: {
				width: 0,
				height: 0
				},
				fill: 'black'
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
	rect.prop('prereqs', course.prereqs);
	rect.prop('coreqs', course.coreqs);
	rect.prop('offered', course.offered);
  	rect.prop('clicked', false);
	rect.addTo(graph);
	addAllEventListeners(rect);
	// console.log(rect);
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