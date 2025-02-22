import { client } from "../adminClient";
import { getStudentByClerkId } from "../student/getStudentByClerkId";

interface UncompleteLessonParams {
  lessonId: string;
  clerkId: string;
}

export async function uncompleteLessonById({
  lessonId,
  clerkId,
}: UncompleteLessonParams) {
  // Get Sanity student ID from Clerk ID
  const student = await getStudentByClerkId(clerkId);
  if (!student) {
    throw new Error("Student not found");
  }

  // Find and delete the lesson completion record
  await client.delete({
    query: `*[_type == "lessonCompletion" && student._ref == $studentId && lesson._ref == $lessonId][0]`,
    params: { studentId: student._id, lessonId },
  });
}
