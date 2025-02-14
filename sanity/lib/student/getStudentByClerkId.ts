import { defineQuery } from "groq";
import { sanityFetch } from "../live";

export async function getStudentByClerkId(clerkId: string) {
  //query should be unique
  const getStudentByClerkIdQuery = defineQuery(
    `*[_type == studentType && clerkId == $clerkId][0]`
  );

  const student = await sanityFetch({
    query: getStudentByClerkIdQuery,
    params: { clerkId },
  });

  return student.data;
}
