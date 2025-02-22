import { defineQuery } from "groq";
import { getStudentByClerkId } from "../student/getStudentByClerkId";
import { sanityFetch } from "../live";
import { calculateCourseProgress } from "@/lib/calculateCourseProgress";
import { Module } from "@/sanity.types";

export async function getCourseProgress(clerkId: string, courseId: string) {
  const student = await getStudentByClerkId(clerkId);

  if (!student?._id) {
    throw new Error("student not found in db.");
  }

  const progressQuery = defineQuery(`{
    "completedLessons": *[_type == "lessonCompletion" && student._ref == $studentId && course._ref == $courseId] {
        ...,
        "lesson": lesson->{...},
        "module": module->{...}
    },
    "course": *[_type == "course" && _id == $courseId][0] {
        ...,
        "modules": modules[]-> {
            ...,
            "lessons": lessons[]-> {...}
        }
    }
  }`);

  const result = await sanityFetch({
    query: progressQuery,
    params: { studentId: student._id, courseId },
  });

  //destructure completed lessons in an array
  const { completedLessons = [], course } = result.data;

  //TODO: make calculate function
  const courseProgress = calculateCourseProgress(
    (course?.modules as unknown as Module[]) || null,
    completedLessons
  );

  return {
    completedLessons,
    courseProgress,
  };
}
