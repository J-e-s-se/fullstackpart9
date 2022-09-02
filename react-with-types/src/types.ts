// export interface CoursePart {
//   name: string;
//   exerciseCount: number;
// }

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartMedium extends CoursePartBase {
  description: string
}

interface CourseNormalPart extends CoursePartMedium {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartMedium {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartMedium {
  type: "special"
  requirements: Array<string>
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;
