import { CourseCard } from "@/components/CourseCard";
import { searchCourses } from "@/sanity/lib/courses/searchCourses";
import { Search } from "lucide-react";
import { redirect } from "next/navigation";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchTerm = (await searchParams).term;

  if (!searchTerm || typeof searchTerm !== "string") {
    return redirect("/");
  }
  const course = await searchCourses(searchTerm);

  return (
    <div className="h-full pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Search className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Search Results</h1>
            <p className="text-muted-foreground">
              Found {course.length} result{course.length === 1 ? "" : "s"} for
              &quot;{searchTerm}&quot;
            </p>
          </div>
        </div>

        {course.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">No courses found</h2>
            <p className="text-muted-foreground mb-8">
              Try searching with different keywords
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {course.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                href={`/courses/${course.slug}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchPage;
