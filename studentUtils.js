export const DEPARTMENT_NAME = "Computer Science";

// Named export with rest parameter
export function calculateTotal(...marks) {
  let total = 0;

  for (const mark of marks) {
    total += mark;
  }

  return total;
}

// Named export with arrow function
export const calculateAverage = (...marks) => {
  return calculateTotal(...marks) / marks.length;
};

// Named export
export function getGrade(marks) {
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

// Arrow function + ternary
export const getStatus = marks =>
  marks >= 50 ? "Pass" : "Fail";

// Default export
export default function formatStudentResult(
  name,
  rollNumber,
  total
) {
  return `${name} - ${rollNumber} - Total: ${total}`;
}