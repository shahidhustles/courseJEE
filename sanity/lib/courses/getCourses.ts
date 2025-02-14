import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export async function getCourses() {
  const getCoursesQuery = defineQuery(`*[_type == "course"] {
    ...,
    "slug": slug.current,
    //follows the reference to the linked category document and expands its fields
    "category": category->{...},
    "instructor": instructor->{...}
  }`);

  const courses = await sanityFetch({ query: getCoursesQuery });
  return courses.data;
}
