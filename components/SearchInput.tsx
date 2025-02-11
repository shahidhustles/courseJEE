"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const SearchInput = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  return (
    <form
      className="flex flex-row md:ml-4  border border-border px-2 py-1 rounded-full
     items-center justify-center"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="focus:outline-none text-sm focus:ring-2 focus:ring-primary"
        placeholder="Search for courses"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <SearchIcon className="w-6 h-6" />
    </form>
  );
};
export default SearchInput;
