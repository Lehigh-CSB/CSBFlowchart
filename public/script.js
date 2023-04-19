
  let courses = [];

const startColor = 'blue';
const flowColor = 'black';
const stepColor = 'blue';
const decisionColor = '#80aaff';

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
  
// USE LIBRARY GOJS
function renderCourses() {  
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
  let xCoordLevel1_BUS = 100, xCoordLevel1_MATH = 750, xCoordLevel1_CSE = 950;
  let xCoordLevel1_5_BUS = 100 , xCoordLevel1_5_MATH = 750, xCoordLevel1_5_CSE = 950; //830
  let xCoordLevel2_BUS = 100, xCoordLevel2_MATH = 750, xCoordLevel2_CSE = 830, xCoordLevel2_CSB = 670;
  let xCoordLevel2_5 = 100;
  let xCoordLevel3_BUS = 100, xCoordLevel3_CSE = 830, xCoordLevel3_CSB = 670;
  let xCoordLevel3_5 = 100;
  let xCoordLevel4_BUS = 100, xCoordLevel4_CSE = 830, xCoordLevel4_CSB = 670;

  // traverse through array of courses and create a rectangle for each course
  for (let i = 0; i < courses.length; i++) {
    // there are multiple levels of courses, render the y-coordinate of the rectangle based on the level
    // level 1: 30, level 1.5: 45, level 2: 60, level 2.5: 75, level 3: 90, level 3.5: 105, level 4: 120
    switch(courses[i].level) {
      case 1:
        if (courses[i].designation === "MATH") {
          console.log(courses[i].prereqs.length)
          // if (courses[i].prereqs.length === 0) {
          
          // }//console.log(courses[10].prerequisites.length)
          
          var x = createStart(xCoordLevel1_MATH, 50, courses[i].title);

          
          xCoordLevel1_MATH += 80;
        } else if (courses[i].designation === "CSE") {
          var CSE007 = createStart(xCoordLevel1_CSE, 50, courses[i].title);
          xCoordLevel1_CSE += 80;
        } else if (courses[i].designation === "ENGL") {
          createStart(580, 50, courses[i].title);
        } else {
          createStart(xCoordLevel1_BUS, 50, courses[i].title);
          xCoordLevel1_BUS += 80; // increment the x-coordinate for the next course at this level
        }
        break;
      case 1.5:
        if (courses[i].designation === "MATH") {
          var y = createStep(xCoordLevel1_5_MATH, 150, courses[i].title);
          xCoordLevel1_5_MATH += 80;
        } else if (courses[i].designation === "CSE") {
          var CSE017 = createDecision(xCoordLevel1_5_CSE, 150, courses[i].title);
          xCoordLevel1_5_CSE += 80;
        } else if (courses[i].designation === "ENGL") {
          createStep(900, 150, courses[i].title);
        } else {
          createStep(xCoordLevel1_5_BUS, 150, courses[i].title);
          xCoordLevel1_5_BUS += 80; 
        }
      
        break;
      case 2:
        if (courses[i].designation === "MATH") {
          var z = createStep(xCoordLevel2_MATH, 250, courses[i].title);
          xCoordLevel2_MATH += 80;
        } else if (courses[i].designation === "CSE") {
          // createStep(xCoordLevel2_CSE, 250, courses[i].title);
          // xCoordLevel2_CSE += 80;
        } else if (courses[i].designation === "CSB") {
          createCourseBox(xCoordLevel2_CSB, 250, courses[i].title);
          xCoordLevel2_CSB += 80;
        } else {
          createCourseBox(xCoordLevel2_BUS, 250, courses[i].title);
          xCoordLevel2_BUS += 80; 
        }
        break;
      case 2.5:
        createCourseBox(xCoordLevel2_5, 350, courses[i].title);
        xCoordLevel2_5 += 80;
        break;
      case 3:
        if (courses[i].designation === "CSE") {
          createCourseBox(xCoordLevel3_CSE, 450, courses[i].title);
          xCoordLevel3_CSE += 80;
        } else if (courses[i].designation === "CSB") {
          createCourseBox(xCoordLevel3_CSB, 450, courses[i].title);
          xCoordLevel3_CSB += 80;
        } else {
          createCourseBox(xCoordLevel3_BUS, 450, courses[i].title);
          xCoordLevel3_BUS += 80; 
        }
        break;
      case 3.5:
        createCourseBox(xCoordLevel3_5, 550, courses[i].title);
        xCoordLevel3_5 += 80;
        break;
      case 4:
        if (courses[i].designation === "CSE") {
          createCourseBox(xCoordLevel4_CSE, 650, courses[i].title);
          xCoordLevel4_CSE += 80;
        } else if (courses[i].designation === "CSB") {
          createCourseBox(xCoordLevel4_CSB, 650, courses[i].title);
          xCoordLevel4_CSB += 80;
        } else {
          createCourseBox(xCoordLevel4_BUS, 650, courses[i].title);
          xCoordLevel4_BUS += 80; 
        }
        break;
    }
   
    
  }
  
  createSidebar();
  var CSE109 = createStep(830, 250, "CSE 109");
  var CSE140 = createStep(910, 250, "CSE 140");
  var CSE216 = createStep(990, 250, "CSE 216");
  var CSE241 = createStep(1070, 250, "CSE 241/341");
  createFlow(x, y);
  createFlow(y, z);
  createFlow(CSE007, CSE017);
  createFlow(x, CSE140);
  createFlow(CSE017, CSE216);
  createFlow(CSE017, CSE140);
  createFlow(CSE017, CSE109);
  createFlow(CSE017, CSE241);
   
  
}

function findCourseByTitle(title) {
  return courses.find((course) => course.title === title);
}

function createCourseBox(xCoord, yCoord, title) {
  var rect = new joint.shapes.standard.Rectangle();
  rect.position(xCoord, yCoord);
  rect.resize(50, 40);
  rect.attr({
    body: {
      fill: 'blue',
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

function createStart(x, y, title) {
  let rect = new joint.shapes.standard.Rectangle({
    position: { x, y },
    size: { width: 60, height: 50 },
    z: 1,
    attrs: {
      body: {
        rx: 10,
        ry: 10,
        fill: startColor,
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

// for sidebar
function createSidebar(){
  let accordion = document.getElementById('myAccordion');
  for (let i = 0; i < courses.length; i++) {
    let accordionItem1 = createAccordionItem(courses[i].title, courses[i].description);
    accordion.appendChild(accordionItem1);
  }
  // for sidebar 
}
function createAccordionItem(itemNumber, itemContent) {
  let accordionItem = document.createElement('div');
  accordionItem.className = 'accordion-item';

  let accordionHeader = document.createElement('h2');
  accordionHeader.className = 'accordion-header';
  accordionHeader.id = 'heading' + itemNumber;

  let accordionButton = document.createElement('button');
  accordionButton.className = 'accordion-button';
  accordionButton.type = 'button';
  accordionButton.setAttribute('data-bs-toggle', 'collapse');
  accordionButton.setAttribute('data-bs-target', '#collapse' + itemNumber);
  accordionButton.setAttribute('aria-expanded', 'false');
  accordionButton.setAttribute('aria-controls', 'collapse' + itemNumber);
  accordionButton.textContent = itemNumber;

  let accordionCollapse = document.createElement('div');
  accordionCollapse.id = 'collapse' + itemNumber;
  accordionCollapse.className = 'accordion-collapse collapse';
  accordionCollapse.setAttribute('aria-labelledby', 'heading' + itemNumber);
  accordionCollapse.setAttribute('data-bs-parent', '#myAccordion');

  let accordionBody = document.createElement('div');
  accordionBody.className = 'accordion-body';
  accordionBody.textContent = itemContent;

  accordionCollapse.appendChild(accordionBody);
  accordionHeader.appendChild(accordionButton);
  accordionItem.appendChild(accordionHeader);
  accordionItem.appendChild(accordionCollapse);

  return accordionItem;
}



function createStep(x, y, title) {
  let rect =  new joint.shapes.standard.Rectangle({
    position: { x, y },
    size: { width: 60, height: 50 },
    z: 1,
    attrs: {
      body: {
        rx: 10,
        ry: 10,
        fill: stepColor,
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

function createDecision(x, y, title) {
  let rect = new joint.shapes.standard.Rectangle({
    position: {x, y},
    size: { width: 60, height: 50 },
    z: 1,
    attrs: {
      body: {
        rx: 10,
        ry: 10,
        fill: 'blue',
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

function createFlow(source, target) {
  let rect =  new joint.shapes.standard.Link({
    source: { id: source.id },
    target: { id: target.id },
    z: 2,
    attrs: {
      line: {
        stroke: flowColor
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
          fill: flowColor,
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