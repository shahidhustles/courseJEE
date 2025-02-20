import { SearchIcon } from "lucide-react";
import Form from "next/form";

const SearchInput = () => {
  return (
    <Form
      action="/search"
      className="flex flex-row md:ml-4  border border-border px-2 py-1 rounded-full
     items-center justify-center focus:ring-2 focus:ring-primary"
    >
      <SearchIcon className="w-6 h-6" />
      <input
        name="term"
        className="focus:outline-none text-sm "
        placeholder="Search for courses"
      />
    </Form>
  );
};
export default SearchInput;
