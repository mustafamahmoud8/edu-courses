export type AssignmentStatus = "pending" | "submitted" | "graded" | "late";

export type Assignment = {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  dueDate: string;
  status: AssignmentStatus;
  grade?: number;
  maxGrade: number;
  submittedAt?: string;
  feedback?: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  type: "assignment" | "lesson" | "exam" | "live";
  courseId?: string;
  color: string;
};
