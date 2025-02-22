import { defineQuery } from "groq";
import { sanityFetch } from "../live";

export async function getLessonById(lessonId: string) {
  const getLessonQuery =
    defineQuery(`*[_type == "lesson" && _id == $lessonId][0] {
    ...,
    "module": module->{
      ...,
      "course": course->{...}
    }
  }`);

  const lesson = await sanityFetch({
    query: getLessonQuery,
    params: { lessonId },
  });

  return lesson.data;
}
