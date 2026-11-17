import { Course, CourseDepartment } from './course.entity';

export const SEED_COURSES: Course[] = [
  {
    code: 'CS101', title: 'Programming Fundamentals',
    department: CourseDepartment.CS, credits: 3, instructor: 'Dr. Ali', capacity: 40,
  },
  {
    code: 'CS202', title: 'Data Structures',
    department: CourseDepartment.CS, credits: 3, instructor: 'Dr. Khan', capacity: 35,
  },
  {
    code: 'CS-301L', title: 'Database Systems',
    department: CourseDepartment.CS, credits: 3, instructor: 'Dr. Ahmed', capacity: 32,
  },
  {
    code: 'SE210', title: 'Software Requirements',
    department: CourseDepartment.SE, credits: 3, instructor: 'Dr. Noor', capacity: 30,
  },
  {
    code: 'SE320', title: 'Software Quality Assurance',
    department: CourseDepartment.SE, credits: 3, instructor: 'Dr. Malik', capacity: 28,
  },
  {
    code: 'DS220', title: 'Applied Statistics',
    department: CourseDepartment.DS, credits: 2, instructor: 'Dr. Hussain', capacity: 25,
  },
];
