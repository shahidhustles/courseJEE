import { defineQuery } from "groq";
import { sanityFetch } from "../live";

export async function getEnrolledCourses(clerkId: string) {
  //first searches for the student
  // and get its student id to then get enrolled courses in enrollment type.
  // you could also get student id from getStudentByClerkId and then student.data._id
  const getEnrolledCoursesQuery =
    defineQuery(`*[_type == "student" && clerkId == $clerkId][0] {
    "enrolledCourses": *[_type == "enrollment" && student._ref == ^._id] {
      ...,
      "course": course-> {
        ...,
        "slug": slug.current,
        "category": category->{...},
        "instructor": instructor->{...}
      }
    }
  }`);

  const courses = await sanityFetch({
    query: getEnrolledCoursesQuery,
    params: { clerkId },
  });

  return courses?.data?.enrolledCourses || [];
}
