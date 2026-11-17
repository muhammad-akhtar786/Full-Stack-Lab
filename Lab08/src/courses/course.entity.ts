export enum CourseDepartment {
  CS = 'Computer Science',
  SE = 'Software Engineering',
  DS = 'Data Science',
}

export interface Course {
  code: string;
  title: string;
  department: CourseDepartment;
  credits: number;
  instructor: string;
  capacity: number;
}

export interface CourseStatistics {
  totalCourses: number;
  totalCredits: number;
  averageCredits: number;
  overloaded: boolean;
  byDepartment: Record<string, number>;
}
