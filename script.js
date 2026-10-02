/* =====================================================
   script.js
   Full Stack Web Development (CS-301L)
   Contains: Lab 04 - Arrays, Loops, Functions, ES6
   (Add your earlier Lab 01 - 03 code above this line)
   Lab 05 code is in lab05.js (loaded as a module)
===================================================== */

/* =====================================================
   LAB 04
   1. ARRAYS
===================================================== */
let lab04Students = [
  "Ali",
  "Ahmed",
  "Sara",
  "Ayesha"
];

document.getElementById("arrayOutput").innerHTML =
  "Students: " + lab04Students.join(", ") +
  "<br><br>" +
  "First Student: " + lab04Students[0] +
  "<br>" +
  "Second Student: " + lab04Students[1] +
  "<br>" +
  "Total Students: " + lab04Students.length;

/* =====================================================
   LAB 04
   2. ARRAY METHODS
===================================================== */
let lab04Courses = [
  "Web Development",
  "Database Systems",
  "Artificial Intelligence"
];

lab04Courses.push("Computer Vision");

let lab04HasAI = lab04Courses.includes("Artificial Intelligence");

document.getElementById("arrayMethodsOutput").innerHTML =
  "Courses: " + lab04Courses.join(", ") +
  "<br><br>" +
  "Total Courses: " + lab04Courses.length +
  "<br><br>" +
  "Artificial Intelligence exists: " + lab04HasAI;

/* =====================================================
   LAB 04
   3. FOR LOOP
===================================================== */
let lab04ForLoopResult = "";

for (let i = 0; i < lab04Students.length; i++) {
  lab04ForLoopResult +=
    "Student " + (i + 1) + ": " + lab04Students[i] + "<br>";
}

document.getElementById("forLoopOutput").innerHTML =
  lab04ForLoopResult;

/* =====================================================
   LAB 04
   4. FOR...OF LOOP
===================================================== */
let lab04ForOfResult = "";

for (let lab04Student of lab04Students) {
  lab04ForOfResult += lab04Student + "<br>";
}

document.getElementById("forOfOutput").innerHTML =
  lab04ForOfResult;

/* =====================================================
   LAB 04
   5. FOR...IN LOOP
===================================================== */
let lab04StudentInfo = {
  name: "Ahmed",
  age: 21,
  department: "Computer Science",
  semester: 6
};

let lab04ForInResult = "";

for (let lab04Key in lab04StudentInfo) {
  lab04ForInResult +=
    lab04Key + ": " + lab04StudentInfo[lab04Key] + "<br>";
}

document.getElementById("forInOutput").innerHTML =
  lab04ForInResult;

/* =====================================================
   LAB 04
   6. FOREACH
===================================================== */
let lab04ForEachResult = "";

lab04Students.forEach(
  function (student, index) {
    lab04ForEachResult +=
      (index + 1) + ". " + student + "<br>";
  }
);

document.getElementById("forEachOutput").innerHTML =
  lab04ForEachResult;

/* =====================================================
   LAB 04
   7. FUNCTIONS
===================================================== */
function lab04CalculateTotal(assignment, midterm, finalExam) {
  let total = assignment + midterm + finalExam;
  return total;
}

let lab04StudentTotal = lab04CalculateTotal(18, 22, 42);

document.getElementById("functionOutput").innerHTML =
  "Assignment Marks: 18" +
  "<br>" +
  "Midterm Marks: 22" +
  "<br>" +
  "Final Exam Marks: 42" +
  "<br><br>" +
  "<strong>Total Marks: " + lab04StudentTotal + "</strong>";

/* =====================================================
   LAB 04
   8. ARROW FUNCTIONS
===================================================== */
const lab04CalculateAverage = (mark1, mark2, mark3) => {
  return (mark1 + mark2 + mark3) / 3;
};

let lab04Average = lab04CalculateAverage(18, 22, 42);

document.getElementById("arrowOutput").innerHTML =
  "Marks: 18, 22, 42" +
  "<br>" +
  "Average: " + lab04Average.toFixed(2);

/* =====================================================
   LAB 04
   9. ES6 CLASS
===================================================== */
class Lab04Student {
  constructor(name, semester, cgpa) {
    this.name = name;
    this.semester = semester;
    this.cgpa = cgpa;
  }

  getInfo() {
    return this.name +
      " - Semester " + this.semester +
      " - CGPA " + this.cgpa;
  }
}

let lab04Student1 = new Lab04Student("Ali", 6, 3.5);
let lab04Student2 = new Lab04Student("Sara", 6, 3.75);
let lab04Student3 = new Lab04Student("Ahmed", 5, 2.8);

document.getElementById("classOutput").innerHTML =
  lab04Student1.getInfo() + "<br>" +
  lab04Student2.getInfo() + "<br>" +
  lab04Student3.getInfo();

/* =====================================================
   LAB 04
   10. OBJECT DESTRUCTURING
===================================================== */
const lab04StudentData = {
  name: "Sara",
  semester: 6,
  cgpa: 3.75
};

const {
  name: lab04Name,
  semester: lab04Semester,
  cgpa: lab04CGPA
} = lab04StudentData;

document.getElementById("destructuringOutput").innerHTML =
  "Name: " + lab04Name +
  "<br>" +
  "Semester: " + lab04Semester +
  "<br>" +
  "CGPA: " + lab04CGPA;

/* =====================================================
   LAB 04
   11. TERNARY OPERATOR
===================================================== */
const lab04Marks = 78;

const lab04Status = lab04Marks >= 50 ? "Passed" : "Failed";

document.getElementById("ternaryOutput").innerHTML =
  "Marks: " + lab04Marks +
  "<br>" +
  "Status: " + lab04Status;

/* =====================================================
   LAB 04
   12. STUDENT PERFORMANCE DASHBOARD
===================================================== */
const lab04StudentRecords = [
  { name: "Ali", semester: 6, marks: 82 },
  { name: "Ahmed", semester: 5, marks: 67 },
  { name: "Sara", semester: 6, marks: 91 },
  { name: "Ayesha", semester: 4, marks: 48 }
];

// Function: grade calculation
function lab04CalculateGrade(marks) {
  if (marks >= 80) {
    return "A";
  } else if (marks >= 70) {
    return "B";
  } else if (marks >= 60) {
    return "C";
  } else if (marks >= 50) {
    return "D";
  } else {
    return "F";
  }
}

// Arrow function + ternary operator
const lab04GetStatus = marks =>
  marks >= 50 ? "Passed" : "Failed";

let lab04DashboardOutput = "";

lab04StudentRecords.forEach(student => {
  // Object destructuring with aliases
  const {
    name: studentName,
    semester: studentSemester,
    marks: studentMarks
  } = student;

  const grade = lab04CalculateGrade(studentMarks);
  const status = lab04GetStatus(studentMarks);

  lab04DashboardOutput +=
    "<div class='border rounded p-3 mb-3'>" +
    "<h5>" + studentName + "</h5>" +
    "<p>" +
    "<strong>Semester:</strong> " + studentSemester + "<br>" +
    "<strong>Marks:</strong> " + studentMarks + "<br>" +
    "<strong>Grade:</strong> " + grade + "<br>" +
    "<strong>Status:</strong> " + status +
    "</p>" +
    "</div>";
});

document.getElementById("studentDashboardOutput").innerHTML =
  lab04DashboardOutput;
