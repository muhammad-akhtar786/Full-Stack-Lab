/* =====================================================
   LAB 05 - UTILITY MODULE
===================================================== */

// Named export (constant)
export const COURSE_CODE = "CS-301L";

// Named export (function with rest parameters)
export function calculateTotal(...marks) {
  let total = 0;
  for (const mark of marks) {
    total += mark;
  }
  return total;
}

// Named export (arrow function)
export const calculateAverage = (...marks) =>
  calculateTotal(...marks) / marks.length;

// Named export (function)
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

// Default export
export default function formatResult(name, marks) {
  return `${name} - Total: ${marks}, Grade: ${getGrade(marks)}`;
}
