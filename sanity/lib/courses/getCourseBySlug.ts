import { defineQuery } from "groq";
import { sanityFetch } from "../live";

export async function getCourseBySlug(slug: string) {
  const slugQuery =
    defineQuery(`*[_type == "course" && slug.current == $slug][0] {
    ...,
    "category": category->{...},
      "instructor": instructor->{...},
      "modules": modules[]-> {
        ...,
        "lessons": lessons[]-> {...}
      }
  }`);

  const course = await sanityFetch({
    query: slugQuery,
    params: { slug },
  });

  return course.data;
}
