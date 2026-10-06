/* =====================================================
   Lab 06 - DOM Manipulation, Events, Form Validation
   and Dynamic Updates
   Course: Full Stack Web Development (CS-301L)
===================================================== */

/* =====================================================
   LAB 06
   HELPER FUNCTIONS
===================================================== */
function lab06Show(id, html) {
  document.getElementById(id).innerHTML = html;
}

// Converts special characters so user text is displayed
// as text, never as HTML (prevents HTML injection)
function lab06Escape(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function lab06ShowAlert(id, type, message) {
  lab06Show(
    id,
    `<div class="alert alert-${type} mb-0">${message}</div>`
  );
}

/* =====================================================
   LAB 06
   1. DOM SELECTION
===================================================== */
const lab06List = document.getElementById("lab06CourseList");
const lab06Heading =
  document.querySelector("#lab06 .section-heading h2");
const lab06Courses = document.querySelectorAll(".lab06-course");
const lab06Important =
  document.querySelector(".lab06-important");

let lab06CourseNames = "";
lab06Courses.forEach((course, index) => {
  lab06CourseNames +=
    (index + 1) + ". " + course.textContent.trim() + "<br>";
});

lab06Show(
  "selectionOutput",
  "Section Heading: " + lab06Heading.textContent +
  "<br>" +
  "Total Courses Found: " + lab06Courses.length +
  "<br>" +
  "Important Course: " + lab06Important.textContent.trim() +
  "<br>" +
  "First Child: " +
  lab06List.firstElementChild.textContent.trim() +
  "<br>" +
  "Last Child: " +
  lab06List.lastElementChild.textContent.trim() +
  "<br><br>" +
  "<strong>All Courses:</strong><br>" + lab06CourseNames
);

/* =====================================================
   LAB 06
   2. CHANGING CONTENT, STYLES AND ATTRIBUTES
===================================================== */
const lab06Text = document.getElementById("manipulateText");
const lab06Link = document.getElementById("manipulateLink");
let lab06TextChanged = false;
let lab06ColorIndex = 0;
const lab06Colors = ["#c0392b", "#27ae60", "#2980b9", "#8e44ad"];

// Change content
document.getElementById("changeTextBtn")
  .addEventListener("click", () => {
    lab06TextChanged = !lab06TextChanged;

    if (lab06TextChanged) {
      lab06Text.innerHTML =
        "This text was <strong>changed</strong> using innerHTML.";
    } else {
      lab06Text.textContent = "This is the original text.";
    }

    lab06Show("manipulateOutput", "Content updated.");
  });

// Toggle a CSS class
document.getElementById("toggleStyleBtn")
  .addEventListener("click", () => {
    lab06Text.classList.toggle("lab06-highlight");

    lab06Show(
      "manipulateOutput",
      "Has highlight class: " +
      lab06Text.classList.contains("lab06-highlight")
    );
  });

// Change inline style
document.getElementById("changeColorBtn")
  .addEventListener("click", () => {
    const color = lab06Colors[lab06ColorIndex];
    lab06Text.style.color = color;
    lab06Text.style.fontSize = "20px";
    lab06ColorIndex = (lab06ColorIndex + 1) % lab06Colors.length;

    lab06Show("manipulateOutput", "Text color changed to " + color);
  });

// Change attributes
document.getElementById("changeLinkBtn")
  .addEventListener("click", () => {
    lab06Link.setAttribute("href", "https://www.w3schools.com");
    lab06Link.setAttribute("target", "_blank");
    lab06Link.textContent = "Visit W3Schools";

    lab06Show(
      "manipulateOutput",
      "href = " + lab06Link.getAttribute("href") +
      "<br>target = " + lab06Link.getAttribute("target")
    );
  });

/* =====================================================
   LAB 06
   3. CREATING AND REMOVING ELEMENTS
===================================================== */
const lab06ExtraCourses = [
  "Software Engineering",
  "Computer Vision",
  "Cloud Computing",
  "Data Structures",
  "Mobile Development"
];
let lab06AddIndex = 0;
const lab06DynamicList = document.getElementById("dynamicList");

function lab06UpdateCount() {
  lab06Show(
    "dynamicOutput",
    "Items in list: " + lab06DynamicList.children.length
  );
}

document.getElementById("addItemBtn")
  .addEventListener("click", () => {
    if (lab06AddIndex >= lab06ExtraCourses.length) {
      lab06Show("dynamicOutput", "No more courses to add.");
      return;
    }

    const li = document.createElement("li");
    li.textContent = lab06ExtraCourses[lab06AddIndex];
    li.className = "lab06-item";
    lab06DynamicList.appendChild(li);

    lab06AddIndex++;
    lab06UpdateCount();
  });

document.getElementById("removeItemBtn")
  .addEventListener("click", () => {
    const last = lab06DynamicList.lastElementChild;

    if (last) {
      last.remove();
      lab06AddIndex--;
    }
    lab06UpdateCount();
  });

lab06UpdateCount();

/* =====================================================
   LAB 06
   4. CLICK EVENTS
===================================================== */
let lab06ClickCount = 0;

document.getElementById("clickBtn")
  .addEventListener("click", function (event) {
    lab06ClickCount++;

    lab06Show(
      "clickOutput",
      "Button clicked " + lab06ClickCount + " time(s)" +
      "<br>Event type: " + event.type +
      "<br>Target id: " + event.target.id +
      "<br>Mouse position: X = " + event.clientX +
      ", Y = " + event.clientY
    );
  });

document.getElementById("resetClickBtn")
  .addEventListener("click", () => {
    lab06ClickCount = 0;
    lab06Show("clickOutput", "Counter has been reset.");
  });

/* =====================================================
   LAB 06
   5. INPUT AND CHANGE EVENTS
===================================================== */
const lab06NameInput = document.getElementById("liveName");
const lab06CourseSelect = document.getElementById("liveCourse");

function lab06UpdateInputOutput() {
  const name = lab06NameInput.value.trim();
  const course = lab06CourseSelect.value;
  const remaining =
    lab06NameInput.maxLength - lab06NameInput.value.length;

  lab06Show(
    "inputOutput",
    "Hello, " + lab06Escape(name || "Guest") + "!" +
    "<br>Characters left: " + remaining +
    "<br>Favourite course: " +
    lab06Escape(course || "Not selected")
  );
}

lab06NameInput.addEventListener("input", lab06UpdateInputOutput);
lab06CourseSelect.addEventListener("change", lab06UpdateInputOutput);

lab06UpdateInputOutput();

/* =====================================================
   LAB 06
   6. FORM SUBMIT EVENT
===================================================== */
const lab06FeedbackForm = document.getElementById("feedbackForm");

lab06FeedbackForm.addEventListener("submit", function (event) {
  event.preventDefault();   // stop the page from reloading

  const data = Object.fromEntries(new FormData(lab06FeedbackForm));
  const name = data.name.trim();
  const message = data.message.trim();

  if (name === "" || message === "") {
    lab06ShowAlert(
      "feedbackOutput",
      "danger",
      "Please enter both your name and message."
    );
    return;
  }

  lab06ShowAlert(
    "feedbackOutput",
    "success",
    `Thank you, <strong>${lab06Escape(name)}</strong>!<br>` +
    `Your message: ${lab06Escape(message)}`
  );

  lab06FeedbackForm.reset();
});

/* =====================================================
   LAB 06
   7. BASIC JAVASCRIPT VALIDATION
===================================================== */
// Shows or clears the error message for one field.
// Returns true when the field is valid.
function lab06SetError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + "Error");
  const isValid = message === "";

  error.textContent = message;
  field.classList.toggle("is-invalid", !isValid);
  field.classList.toggle("is-valid", isValid);

  return isValid;
}

function lab06ValidateName() {
  const value = document.getElementById("basicName").value.trim();
  let message = "";

  if (value === "") {
    message = "Name is required.";
  } else if (value.length < 3) {
    message = "Name must be at least 3 characters.";
  } else if (!/^[A-Za-z ]+$/.test(value)) {
    message = "Name can contain letters and spaces only.";
  }
  return lab06SetError("basicName", message);
}

function lab06ValidateEmail() {
  const value = document.getElementById("basicEmail").value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let message = "";

  if (value === "") {
    message = "Email is required.";
  } else if (!pattern.test(value)) {
    message = "Please enter a valid email address.";
  }
  return lab06SetError("basicEmail", message);
}

function lab06ValidateAge() {
  const value = document.getElementById("basicAge").value.trim();
  const age = Number(value);
  let message = "";

  if (value === "") {
    message = "Age is required.";
  } else if (isNaN(age)) {
    message = "Age must be a number.";
  } else if (age < 16 || age > 60) {
    message = "Age must be between 16 and 60.";
  }
  return lab06SetError("basicAge", message);
}

// Validate when the user leaves a field
document.getElementById("basicName")
  .addEventListener("blur", lab06ValidateName);
document.getElementById("basicEmail")
  .addEventListener("blur", lab06ValidateEmail);
document.getElementById("basicAge")
  .addEventListener("blur", lab06ValidateAge);

// Validate everything when the form is submitted
document.getElementById("basicForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Run all checks (the array makes sure no check is skipped)
    const results = [
      lab06ValidateName(),
      lab06ValidateEmail(),
      lab06ValidateAge()
    ];
    const allValid = results.every((result) => result === true);

    if (allValid) {
      lab06ShowAlert(
        "basicOutput", "success",
        "All fields are valid. Form accepted!"
      );
    } else {
      lab06ShowAlert(
        "basicOutput", "danger",
        "Please fix the errors shown above."
      );
    }
  });

/* =====================================================
   LAB 06
   8. HTML5 FORM VALIDATION
===================================================== */
const lab06H5Form = document.getElementById("html5Form");
const lab06Username = document.getElementById("h5Username");
const lab06Password = document.getElementById("h5Password");
const lab06Confirm = document.getElementById("h5Confirm");

// Live username feedback using the validity object
function lab06ShowUsernameState() {
  const state = lab06Username.validity;
  const box = document.getElementById("h5UsernameState");
  let message = "";

  if (state.valueMissing) {
    message = "Username is required.";
  } else if (state.tooShort) {
    message = "Too short: minimum 4 characters.";
  } else if (state.patternMismatch) {
    message = "Only letters, numbers and underscore allowed.";
  } else {
    message = "Username looks good.";
  }

  box.textContent = message;
  box.className = state.valid
    ? "form-text text-success"
    : "form-text text-danger";
}

lab06Username.addEventListener("input", lab06ShowUsernameState);

// Custom rule: both passwords must match
function lab06CheckPasswordMatch() {
  if (lab06Confirm.value !== lab06Password.value) {
    lab06Confirm.setCustomValidity("Passwords do not match.");
  } else {
    lab06Confirm.setCustomValidity("");
  }
}

lab06Password.addEventListener("input", lab06CheckPasswordMatch);
lab06Confirm.addEventListener("input", lab06CheckPasswordMatch);

// Show Bootstrap's green/red styles after the first attempt
document.getElementById("h5SubmitBtn")
  .addEventListener("click", () => {
    lab06CheckPasswordMatch();
    lab06H5Form.classList.add("was-validated");
  });

// This runs ONLY when every field is valid
lab06H5Form.addEventListener("submit", function (event) {
  event.preventDefault();

  lab06ShowAlert(
    "html5Output",
    "success",
    `Welcome, <strong>${lab06Escape(lab06Username.value)}</strong>!` +
    `<br>Email: ${lab06Escape(
      document.getElementById("h5Email").value
    )}` +
    `<br>Age: ${document.getElementById("h5Age").value}`
  );

  lab06H5Form.reset();
  lab06H5Form.classList.remove("was-validated");
  document.getElementById("h5UsernameState").textContent = "";
});

/* =====================================================
   LAB 06
   9. STUDENT REGISTRATION SYSTEM
===================================================== */
const lab06Students = [
  {
    name: "Ali Khan", rollNumber: "BSCS-001",
    email: "ali@example.com", department: "Computer Science",
    semester: 6, cgpa: 3.45
  },
  {
    name: "Sara Ahmed", rollNumber: "BSCS-023",
    email: "sara@example.com", department: "Software Engineering",
    semester: 5, cgpa: 3.8
  },
  {
    name: "Ayesha Noor", rollNumber: "BSCS-014",
    email: "ayesha@example.com", department: "Data Science",
    semester: 4, cgpa: 1.9
  },
  { name: "Hamza Ali", rollNumber: "BSCS-002", email: "hamza@example.com", department: "Computer Science", semester: 3, cgpa: 2.9 },
  { name: "Noor Fatima", rollNumber: "BSCS-003", email: "noor@example.com", department: "Data Science", semester: 2, cgpa: 2.3 },
  { name: "Usman Ahmed", rollNumber: "BSCS-004", email: "usman@example.com", department: "Software Engineering", semester: 7, cgpa: 3.77 }
];

const lab06RegForm = document.getElementById("regForm");
const lab06RegFields = [
  "regName", "regRoll", "regEmail",
  "regDept", "regSemester", "regCgpa"
].map((id) => document.getElementById(id));

// Converts the validity state into a readable message
function lab06GetMessage(field) {
  const state = field.validity;

  if (state.badInput) return "Please enter a valid number.";
  if (state.valueMissing) return "This field is required.";
  if (state.typeMismatch) return "Please enter a valid email.";
  if (state.patternMismatch) return field.title || "Invalid format.";
  if (state.tooShort) {
    return "Minimum " + field.minLength + " characters required.";
  }
  if (state.rangeUnderflow) return "Minimum value is " + field.min + ".";
  if (state.rangeOverflow) return "Maximum value is " + field.max + ".";
  if (state.stepMismatch) return "Use whole semesters and CGPA with up to two decimal places.";
  if (state.customError) return field.validationMessage;
  return "";
}

function lab06ValidateField(field) {
  field.setCustomValidity("");
  if (field.type === "text" || field.type === "email") field.value = field.value.trim();
  let message = lab06GetMessage(field);
  if (!message && field.id === "regName" && field.value.length < 3) {
    message = "Name must be at least 3 characters.";
  }
  if (!message && field.id === "regEmail" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
    message = "Please enter a valid email address.";
  }
  if (!message && field.id === "regRoll" && lab06Students.some((student) => student.rollNumber === field.value)) {
    message = "This roll number is already registered.";
  }
  field.setCustomValidity(message);
  return lab06SetError(field.id, message);
}

function lab06ClearValidation() {
  lab06RegFields.forEach((field) => {
    field.setCustomValidity("");
    field.classList.remove("is-valid", "is-invalid");
    document.getElementById(field.id + "Error").textContent = "";
  });
}

function lab06Status(cgpa) {
  return cgpa >= 3 ? "Excellent" : cgpa >= 2.5 ? "Good" : cgpa >= 2 ? "Satisfactory" : "Academic Warning";
}
let lab06SearchText = "";
let lab06Department = "";
let lab06SortDescending = null;
let lab06EditingRoll = "";

function lab06RenderStudents() {
  const container = document.getElementById("regList");
  container.innerHTML = "";

  const visible = lab06Students.filter((student) => {
    const text = lab06SearchText.toLowerCase();
    return (student.name.toLowerCase().includes(text) ||
           student.rollNumber.toLowerCase().includes(text)) &&
           (lab06Department === "" || student.department === lab06Department);
  });

  if (lab06SortDescending !== null) {
    visible.sort((a, b) => lab06SortDescending ? b.cgpa - a.cgpa : a.cgpa - b.cgpa);
  }
  if (visible.length === 0) {
    container.innerHTML =
      "<p class='text-muted'>No students found.</p>";
    return;
  }

  visible.forEach((student) => {
    const { name, rollNumber, email, department, semester, cgpa } = student;
    const status = lab06Status(cgpa);
    const color = cgpa >= 2.0 ? "text-success" : "text-danger";

    const card = document.createElement("div");
    card.className = "student-card border rounded p-3 mb-3";
    card.innerHTML = `
      <div class="d-flex justify-content-between">
        <div>
          <h5>${lab06Escape(name)}</h5>
          <p class="mb-0">
            <strong>Roll No:</strong> ${lab06Escape(rollNumber)}<br>
            <strong>Email:</strong> ${lab06Escape(email)}<br>
            <strong>Department:</strong> ${lab06Escape(department)}<br>
            <strong>Semester:</strong> ${semester}<br>
            <strong>CGPA:</strong> ${cgpa.toFixed(2)}<br>
            <strong>Status:</strong>
            <span class="${color}">${status}</span>
          </p>
        </div>
        <div>
          <button class="btn btn-outline-primary btn-sm" data-action="edit" data-roll="${lab06Escape(rollNumber)}">Edit CGPA</button>
          <button data-action="delete" class="btn btn-outline-danger btn-sm"
                  data-roll="${lab06Escape(rollNumber)}">Delete</button>
        </div>
      </div>`;
    container.appendChild(card);
  });
}

function lab06RenderStats() {
  const total = lab06Students.length;
  const warnings = lab06Students.filter((s) => s.cgpa < 2).length;
  const highest = lab06Students.reduce((best, s) => !best || s.cgpa > best.cgpa ? s : best, null);
  const sum =
    lab06Students.reduce((result, s) => result + s.cgpa, 0);
  const average = total > 0 ? (sum / total).toFixed(2) : "0.00";

  const stat = (label, value) => `
    <div class="col-md-3">
      <div class="border rounded p-2 bg-white">
        <div class="fs-4 fw-bold">${value}</div>
        <div class="small text-muted">${label}</div>
      </div>
    </div>`;

  lab06Show(
    "regSummary",
    stat("Total Students", total) +
    stat("Average CGPA", average) +
    stat("Highest CGPA", highest ? highest.cgpa.toFixed(2) + " (" + lab06Escape(highest.name) + ")" : "None") +
    stat("Academic Warning", warnings)
  );
}

function lab06Refresh() {
  lab06RenderStudents();
  lab06RenderStats();
}

// Validate each field when the user leaves it, and re-check
// while typing once the field has been marked invalid
lab06RegFields.forEach((field) => {
  field.addEventListener("change", () => lab06ValidateField(field));
  field.addEventListener("blur", () => lab06ValidateField(field));
  field.addEventListener("input", () => {
    lab06ValidateField(field);
  });
});

// Register a new student
lab06RegForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const results = lab06RegFields.map(lab06ValidateField);
  const allValid = results.every((result) => result === true);

  if (!allValid) {
    lab06ShowAlert(
      "regMessage", "danger",
      "Please correct the highlighted fields."
    );
    lab06RegForm.querySelector(".is-invalid").focus();
    return;
  }

  const student = {
    name: document.getElementById("regName").value.trim(),
    rollNumber: document.getElementById("regRoll").value.trim(),
    email: document.getElementById("regEmail").value.trim(),
    department: document.getElementById("regDept").value,
    semester: Number(document.getElementById("regSemester").value),
    cgpa: Number(document.getElementById("regCgpa").value)
  };

  lab06Students.push(student);

  // Reset FIRST: the reset event also clears regMessage,
  // so the success message must be shown after it
  lab06RegForm.reset();
  lab06ClearValidation();
  lab06Refresh();

  lab06ShowAlert(
    "regMessage", "success",
    `<strong>${lab06Escape(student.name)}</strong> ` +
    "was registered successfully."
  );
});

// Reset button
lab06RegForm.addEventListener("reset", () => {
  lab06ClearValidation();
  lab06Show("regMessage", "");
});

// Live search
document.getElementById("regSearch")
  .addEventListener("input", function () {
    lab06SearchText = this.value.trim();
    lab06RenderStudents();
  });

// Event delegation: ONE listener handles every Delete button,
// even for cards that are created later
document.getElementById("regList")
  .addEventListener("click", (event) => {
    const button = event.target.closest("button[data-roll]");
    if (!button) return;

    const index = lab06Students.findIndex(
      (student) => student.rollNumber === button.dataset.roll
    );

    if (index !== -1 && button.dataset.action === "edit") {
      lab06EditingRoll = button.dataset.roll;
      document.getElementById("editForm").hidden = false;
      document.getElementById("editLabel").textContent = "New CGPA for " + lab06Students[index].name;
      document.getElementById("editCgpa").value = lab06Students[index].cgpa;
      document.getElementById("editError").textContent = "";
      document.getElementById("editCgpa").classList.remove("is-valid", "is-invalid");
      document.getElementById("editCgpa").focus();
      return;
    }
    if (index !== -1) {
      if (lab06EditingRoll === button.dataset.roll) document.getElementById("editForm").hidden = true;
      const removed = lab06Students.splice(index, 1)[0];
      button.closest(".student-card").remove();
      lab06Refresh();
      lab06ShowAlert(
        "regMessage", "warning",
        `${lab06Escape(removed.name)} was removed.`
      );
    }
  });

// Show the initial data when the page loads
lab06Refresh();

/* Task 1: based on the manual's dynamic list and classList examples. */
const plannerInput = document.getElementById("plannerInput");
const plannerList = document.getElementById("plannerList");
function plannerUpdateCount() {
  const total = plannerList.children.length;
  const completed = plannerList.querySelectorAll(".completed").length;
  document.getElementById("plannerCount").textContent =
    `Total Courses: ${total} | Completed: ${completed} | Remaining: ${total - completed}`;
}
document.getElementById("plannerAdd").addEventListener("click", () => {
  const name = plannerInput.value.trim();
  const courses = plannerList.querySelectorAll(".course-name");
  let duplicate = false;
  courses.forEach((course) => {
    if (course.textContent.toLowerCase() === name.toLowerCase()) duplicate = true;
  });
  if (!name || duplicate) {
    lab06ShowAlert("plannerMessage", "danger", duplicate ? "Course already exists." : "Please enter a course name.");
    return;
  }
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.className = "course-name";
  span.textContent = name;
  const button = document.createElement("button");
  button.textContent = "Delete";
  button.className = "btn btn-outline-danger btn-sm";
  li.appendChild(span);
  li.appendChild(button);
  plannerList.appendChild(li);
  plannerInput.value = "";
  plannerInput.focus();
  lab06Show("plannerMessage", "");
  plannerUpdateCount();
});
plannerList.addEventListener("click", (event) => {
  if (event.target.matches("button")) event.target.parentElement.remove();
  if (event.target.matches(".course-name")) event.target.classList.toggle("completed");
  plannerUpdateCount();
});
document.getElementById("plannerClear").addEventListener("click", () => {
  plannerList.innerHTML = "";
  lab06Show("plannerMessage", "");
  plannerUpdateCount();
});
document.getElementById("plannerLongest").addEventListener("click", () => {
  let longest = null;
  plannerList.querySelectorAll("li").forEach((li) => {
    li.classList.remove("lab06-highlight");
    if (!longest || li.firstElementChild.textContent.length > longest.firstElementChild.textContent.length) longest = li;
  });
  if (longest) longest.classList.add("lab06-highlight");
});
plannerUpdateCount();

/* Task 2: based on the manual's input/change events and style examples. */
const idForm = document.getElementById("idForm");
function updateIdCard() {
  const name = document.getElementById("idName").value.trim() || "Your Name";
  const roll = document.getElementById("idRoll").value.trim() || "Your Roll Number";
  const dept = document.getElementById("idDept").value || "Your Department";
  const semester = document.getElementById("idSemester").value || "Your Semester";
  const showCgpa = document.getElementById("idShowCgpa").checked;
  const cgpa = document.getElementById("idCgpa").value || "Your CGPA";
  const details = `Roll No: ${roll}\nDepartment: ${dept}\nSemester: ${semester}`;
  document.getElementById("idCardName").textContent = name;
  document.getElementById("idCardDetails").textContent = details;
  document.getElementById("idCard").style.backgroundColor = document.getElementById("idColor").value;
  document.getElementById("idCount").textContent = "Characters left: " + (30 - document.getElementById("idName").value.length);
  document.getElementById("idCgpaBox").hidden = !showCgpa;
  document.getElementById("idBadge").hidden = !showCgpa;
  document.getElementById("idBadge").textContent = "CGPA: " + cgpa;
  document.getElementById("idSummary").value = `Name: ${name}\n${details}${showCgpa ? "\nCGPA: " + cgpa : ""}`;
}
idForm.querySelectorAll('input:not([type="checkbox"])').forEach((field) => field.addEventListener("input", updateIdCard));
idForm.querySelectorAll('select, input[type="checkbox"]').forEach((field) => field.addEventListener("change", updateIdCard));
idForm.addEventListener("submit", (event) => event.preventDefault());
idForm.addEventListener("reset", () => setTimeout(updateIdCard, 0));
updateIdCard();

/* Task 3: extends the manual's HTML5 and custom password validation. */
const courseForm = document.getElementById("courseForm");
const crPassword = document.getElementById("crPassword");
const crConfirm = document.getElementById("crConfirm");
const crDob = document.getElementById("crDob");
function validateCourseRules() {
  const name = document.getElementById("crName");
  const email = document.getElementById("crEmail");
  name.setCustomValidity(name.value.trim() && name.value.trim().length < 3 ? "Name must be at least 3 characters." : name.value && !name.value.trim() ? "Name is required." : "");
  email.setCustomValidity(email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) ? "Please enter a valid email address." : "");
  crPassword.setCustomValidity(crPassword.value && crPassword.value.length < 8 ? "Password must be at least 8 characters." : crPassword.value && !/[0-9]/.test(crPassword.value) ? "Password must contain a digit." : "");
  crConfirm.setCustomValidity(crConfirm.value && crConfirm.value !== crPassword.value ? "Passwords do not match." : "");
  crDob.setCustomValidity("");
  if (crDob.value) {
    const birthday = new Date(crDob.value + "T00:00:00");
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    if (today.getMonth() < birthday.getMonth() || (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate())) age--;
    crDob.setCustomValidity(age < 16 ? "Student must be at least 16 years old." : "");
  }
}
function showCourseFeedback() {
  validateCourseRules();
  ["crName", "crEmail", "crDob", "crPassword", "crConfirm"].forEach((id) => {
    const field = document.getElementById(id);
    document.getElementById(id + "Error").textContent = field.validationMessage;
    if (field.value || courseForm.classList.contains("was-validated")) {
      field.classList.toggle("is-invalid", !field.validity.valid);
      field.classList.toggle("is-valid", field.validity.valid);
    }
  });
}
["crName", "crEmail", "crDob", "crPassword", "crConfirm"].forEach((id) => {
  const field = document.getElementById(id);
  field.addEventListener("input", showCourseFeedback);
  field.addEventListener("blur", showCourseFeedback);
});
document.getElementById("crPhone").addEventListener("input", function () {
  const state = this.validity;
  const box = document.getElementById("crPhoneState");
  box.textContent = state.valueMissing ? "Phone is required." : state.patternMismatch ? "Phone must look like 03001234567." : state.valid ? "Phone looks good." : "Invalid phone.";
  box.className = state.valid ? "text-success" : "text-danger";
});
document.getElementById("crShow").addEventListener("change", function () {
  crPassword.type = crConfirm.type = this.checked ? "text" : "password";
});
// Native validation can stop submit, so invalid is also handled in capture mode.
courseForm.addEventListener("invalid", () => {
  courseForm.classList.add("was-validated");
  showCourseFeedback();
}, true);
document.getElementById("crSubmit").addEventListener("click", () => {
  validateCourseRules();
  courseForm.classList.add("was-validated");
  showCourseFeedback();
});
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  validateCourseRules();
  courseForm.classList.add("was-validated");
  if (!courseForm.reportValidity()) return;
  const data = new FormData(courseForm);
  lab06ShowAlert("courseSummary", "success", `<h4>Registration Successful</h4>
    Name: ${lab06Escape(data.get("crName"))}<br>
    Email: ${lab06Escape(data.get("crEmail"))}<br>
    Phone: ${lab06Escape(data.get("crPhone"))}<br>
    Date of Birth: ${lab06Escape(data.get("crDob"))}<br>
    Course: ${lab06Escape(data.get("crCourse"))}<br>Terms: Accepted`);
  courseForm.reset();
  crPassword.type = crConfirm.type = "password";
  validateCourseRules();
  courseForm.classList.remove("was-validated");
  courseForm.querySelectorAll("input").forEach((field) => {
    field.setCustomValidity("");
    field.classList.remove("is-valid", "is-invalid");
  });
  courseForm.querySelectorAll(".invalid-feedback").forEach((box) => box.textContent = "");
  document.getElementById("crPhoneState").textContent = "";
});

/* Task 4: additional dashboard events using the manual's event delegation. */
document.getElementById("regFilter").addEventListener("change", function () {
  lab06Department = this.value;
  lab06RenderStudents();
});
document.getElementById("regSort").addEventListener("click", function () {
  lab06SortDescending = lab06SortDescending === null ? true : !lab06SortDescending;
  this.textContent = "Sort by CGPA: " + (lab06SortDescending ? "Highest First" : "Lowest First");
  lab06RenderStudents();
});
document.getElementById("editCancel").addEventListener("click", () => document.getElementById("editForm").hidden = true);
document.getElementById("editForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const field = document.getElementById("editCgpa");
  if (!validateEditedCgpa()) return;
  const index = lab06Students.findIndex((student) => student.rollNumber === lab06EditingRoll);
  if (index === -1) return;
  lab06Students[index].cgpa = Number(field.value);
  this.hidden = true;
  lab06Refresh();
  lab06ShowAlert("regMessage", "success", "CGPA updated successfully.");
});

function validateEditedCgpa() {
  const field = document.getElementById("editCgpa");
  const message = lab06GetMessage(field);
  document.getElementById("editError").textContent = message;
  field.classList.toggle("is-invalid", !field.validity.valid);
  field.classList.toggle("is-valid", field.validity.valid);
  return field.validity.valid;
}
document.getElementById("editCgpa").addEventListener("input", validateEditedCgpa);
document.getElementById("editCgpa").addEventListener("blur", validateEditedCgpa);
