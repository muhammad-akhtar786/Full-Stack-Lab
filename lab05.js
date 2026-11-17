/* =====================================================
   Lab 05 - ES6 Features, Modules, Callbacks,
   Promises and Async/Await
   Course: Full Stack Web Development (CS-301L)
   NOTE: loaded with <script type="module">
   Run with Live Server (modules do not work on file://)
===================================================== */

import formatStudentResult, {
  DEPARTMENT_NAME,
  calculateTotal,
  calculateAverage,
  getGrade,
  getStatus as checkStatus
} from "./studentUtils.js";

/* =====================================================
   LAB 05
   HELPER FUNCTION
===================================================== */
function lab05Append(id, html) {
  document.getElementById(id).innerHTML += html + "<br>";
}

/* =====================================================
   TASK 1 - UNIVERSITY COURSE ENROLLMENT MANAGER
===================================================== */

// Required arrays
const coreCourses = [
  "Web Development",
  "Database Systems",
  "Data Structures"
];

const electiveCourses = [
  "Artificial Intelligence",
  "Computer Networks",
  "Cloud Computing"
];

// Required student object
const student = {
  name: "Ali",
  rollNumber: "BSCS-001",
  department: "Computer Science",
  semester: 6
};

// At least 5 CGPA values
const cgpaValues = [3.20, 3.45, 2.90, 3.75, 3.30];

// Merge arrays using spread
const allCourses = [...coreCourses, ...electiveCourses];

// Copy array using spread
const copiedCourses = [...allCourses];
copiedCourses.push("Software Engineering");

// Update object using spread
const updatedStudent = {
  ...student,
  semester: 7,
  cgpa: 3.45
};

// Rest parameter
function enrollStudent(name, ...courses) {
  return `${name} enrolled in ${courses.length} course(s): ${courses.join(", ")}`;
}

// Rest parameter + arrow function
const calculateAverageCGPA = (...cgpas) => {
  let total = 0;

  cgpas.forEach(cgpa => {
    total += cgpa;
  });

  return total / cgpas.length;
};

// Spread with Math.max
const highestCGPA = Math.max(...cgpaValues);

// Default parameter
function getStudentInfo(
  name,
  department = "Computer Science"
) {
  return `${name} - ${department}`;
}

// Display output
document.getElementById("task1Output").innerHTML = `
  <strong>Core Courses:</strong>
  ${coreCourses.join(", ")}
  <br><br>

  <strong>Elective Courses:</strong>
  ${electiveCourses.join(", ")}
  <br><br>

  <strong>All Courses (${allCourses.length}):</strong>
  ${allCourses.join(", ")}
  <br><br>

  <strong>Copy after adding a course (${copiedCourses.length}):</strong>
  ${copiedCourses.join(", ")}
  <br>

  <strong>Original still has ${allCourses.length} courses</strong>
  <br><br>

  <strong>Original Student:</strong>
  ${student.name}, Semester ${student.semester}
  <br>

  <strong>Updated Student:</strong>
  ${updatedStudent.name}, Semester ${updatedStudent.semester},
  CGPA ${updatedStudent.cgpa}
  <br><br>

  ${enrollStudent(
    student.name,
    "Web Development",
    "Database Systems",
    "Artificial Intelligence"
  )}
  <br><br>

  <strong>Average CGPA:</strong>
  ${calculateAverageCGPA(...cgpaValues).toFixed(2)}
  <br>

  <strong>Highest CGPA:</strong>
  ${highestCGPA}
  <br>

  <strong>Department (default):</strong>
  ${getStudentInfo(student.name)}
`;

/* =====================================================
   TASK 2 - STUDENT UTILITY MODULE
===================================================== */

const students = [
  {
    name: "Sara",
    rollNumber: "BSCS-023",
    assignment: 18,
    midterm: 24,
    finalExam: 40
  },
  {
    name: "Ahmed",
    rollNumber: "BSCS-002",
    assignment: 15,
    midterm: 20,
    finalExam: 32
  },
  {
    name: "Ayesha",
    rollNumber: "BSCS-014",
    assignment: 10,
    midterm: 12,
    finalExam: 26
  },
  {
    name: "Hassan",
    rollNumber: "BSCS-031",
    assignment: 17,
    midterm: 23,
    finalExam: 34
  }
];

let task2HTML = `
  <strong>Department:</strong> ${DEPARTMENT_NAME}
  <br><br>
`;

students.forEach(student => {

  // Object destructuring
  const {
    name,
    rollNumber,
    assignment,
    midterm,
    finalExam
  } = student;

  const total = calculateTotal(
    assignment,
    midterm,
    finalExam
  );

  const average = calculateAverage(
    assignment,
    midterm,
    finalExam
  );

  const grade = getGrade(total);

  const status = checkStatus(total);

  task2HTML += `
    <div class="border rounded p-3 mb-3">
      <strong>
        ${formatStudentResult(name, rollNumber, total)}
      </strong>
      <br>

      Average: ${average.toFixed(2)}
      <br>

      Grade: ${grade}
      <br>

      Status: ${status}
    </div>
  `;
});

document.getElementById("task2Output").innerHTML =
  task2HTML;

 
 /* =====================================================
   TASK 3 - ONLINE EXAMINATION WORKFLOW
===================================================== */

function verifyStudent(roll, callback) {
  setTimeout(() => {
    if (!roll) {
      callback("Roll number is required", null);
    } else {
      callback(null, `Student ${roll} verified`);
    }
  }, 1000);
}

function loadExamPaper(callback) {
  setTimeout(() => {
    callback("Exam paper loaded");
  }, 1500);
}

function submitAnswers(callback) {
  setTimeout(() => {
    callback("Answers submitted");
  }, 2000);
}

function generateResult(callback) {
  setTimeout(() => {
    callback("Result generated: 82 marks");
  }, 1000);
}

function runExamWorkflow(roll, outputId) {

  const output = document.getElementById(outputId);

  output.innerHTML = "Exam workflow started...<br>";

  // Callback hell: each callback is nested inside the previous callback.
  verifyStudent(roll, (error, message) => {

    if (error) {
      output.innerHTML += `Error: ${error}<br>`;
      return;
    }

    output.innerHTML += `Step 1: ${message}<br>`;

    loadExamPaper((message) => {

      output.innerHTML += `Step 2: ${message}<br>`;

      submitAnswers((message) => {

        output.innerHTML += `Step 3: ${message}<br>`;

        generateResult((message) => {

          output.innerHTML += `Step 4: ${message}<br>`;
          output.innerHTML +=
            "<strong>Exam completed successfully!</strong>";

        });

      });

    });

  });
}

// Test with valid roll number
runExamWorkflow(
  "BSCS-001",
  "task3ValidOutput"
);

// Test with empty roll number
runExamWorkflow(
  "",
  "task3ErrorOutput"
);

/* =====================================================
   TASK 4 - UNIVERSITY RESULT PORTAL
===================================================== */

const studentDatabase = [
  {
    name: "Ali",
    rollNumber: "BSCS-001",
    department: "Computer Science",
    semester: 6,
    assignment: 18,
    midterm: 22,
    finalExam: 42
  },
  {
    name: "Ahmed",
    rollNumber: "BSCS-002",
    department: "Computer Science",
    semester: 5,
    assignment: 15,
    midterm: 20,
    finalExam: 32
  },
  {
    name: "Sara",
    rollNumber: "BSCS-023",
    department: "Computer Science",
    semester: 6,
    assignment: 20,
    midterm: 25,
    finalExam: 40
  },
  {
    name: "Ayesha",
    rollNumber: "BSCS-014",
    department: "Computer Science",
    semester: 4,
    assignment: 10,
    midterm: 12,
    finalExam: 26
  },
  {
    name: "Hassan",
    rollNumber: "BSCS-031",
    department: "Computer Science",
    semester: 6,
    assignment: 18,
    midterm: 24,
    finalExam: 33
  }
];

// Promise 1
function findStudent(rollNumber) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      const student = studentDatabase.find(
        s => s.rollNumber === rollNumber
      );

      if (student) {
        resolve(student);
      } else {
        reject("Student not found");
      }

    }, 1000);
  });
}

// Promise 2
function calculateResult(student) {
  return new Promise((resolve) => {
    setTimeout(() => {

      const {
        assignment,
        midterm,
        finalExam
      } = student;

      const total = calculateTotal(
        assignment,
        midterm,
        finalExam
      );

      const average = calculateAverage(
        assignment,
        midterm,
        finalExam
      );

      const grade = getGrade(total);

      const status =
        total >= 50 ? "Pass" : "Fail";

      resolve({
        ...student,
        total,
        average,
        grade,
        status
      });

    }, 1000);
  });
}

function displayStudent(result) {
  return `
    <div class="border rounded p-3 mb-3">
      <strong>Student:</strong> ${result.name}<br>
      <strong>Roll No:</strong> ${result.rollNumber}<br>
      <strong>Department:</strong> ${result.department}<br>
      <strong>Semester:</strong> ${result.semester}<br>
      <strong>Total:</strong> ${result.total}<br>
      <strong>Average:</strong> ${result.average.toFixed(2)}<br>
      <strong>Grade:</strong> ${result.grade}<br>
      <strong>Status:</strong> ${result.status}
    </div>
  `;
}

// Part A - Promise Chain
function searchWithPromise(rollNumber) {
  const output = document.getElementById("task4Output");

  output.innerHTML = "Searching...<br>";

  findStudent(rollNumber)
    .then(student => calculateResult(student))
    .then(result => {
      output.innerHTML += displayStudent(result);
    })
    .catch(error => {
      output.innerHTML +=
        `<span class="text-danger">Error: ${error}</span><br>`;
    })
    .finally(() => {
      output.innerHTML += "Search completed";
    });
}

// Part B/C - Async Await
async function showResult(rollNumber) {
  const output = document.getElementById("task4Output");

  output.innerHTML = "Searching...<br>";

  try {
    const student = await findStudent(rollNumber);
    const result = await calculateResult(student);

    output.innerHTML += displayStudent(result);

  } catch (error) {

    output.innerHTML +=
      `<span class="text-danger">Error: ${error}</span><br>`;

  } finally {

    output.innerHTML += "Search completed";
  }
}

// Part D - Promise.all
async function loadAllResults() {
  const output = document.getElementById("task4Output");

  output.innerHTML = "Loading all results...<br><br>";

  try {

    const results = await Promise.all(
      studentDatabase.map(student =>
        calculateResult(student)
      )
    );

    let html = "";

    results.forEach(result => {
      html += displayStudent(result);
    });

    const passed =
      results.filter(r => r.status === "Pass").length;

    const failed =
      results.filter(r => r.status === "Fail").length;

    html += `
      <strong>Final Statistics</strong><br>
      Total Students: ${results.length}<br>
      Passed Students: ${passed}<br>
      Failed Students: ${failed}
    `;

    output.innerHTML = html;

  } catch (error) {
    output.innerHTML =
      `<span class="text-danger">Error: ${error}</span>`;
  }
}

// Search button
document
  .getElementById("searchResultBtn")
  .addEventListener("click", () => {

    const roll =
      document.getElementById("rollInput")
        .value
        .trim();

    showResult(roll);
  });

// Load all button
document
  .getElementById("loadAllBtn")
  .addEventListener("click", loadAllResults);

// Part A automatic test using Promise chain
searchWithPromise("BSCS-001");