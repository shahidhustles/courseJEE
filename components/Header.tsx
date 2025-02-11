import Link from "next/link";
import { ModeToggle } from "./DarkModeToggle";
import { BookMarkedIcon, BookOpen } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import SearchInput from "./SearchInput";

const Header = () => {
  return (
    <header
      className="sticky top-0 z-50 bg-background/80
    background-blur-sm border-b border-border"
    >
      <div className="mx-auto px-4 container">
        <div className="flex h-16 items-center justify-between gap-4 ">
          {/* Left  */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
            >
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                CourseJEE
              </span>
            </Link>

            {/* Search Comp  */}
            <SearchInput />
          </div>

          {/* Right  */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <nav>
              <SignedIn>
                <Link
                  href="/mycourses"
                  className="flex space-x-2 items-center text-sm font-medium
                   text-muted-foreground hover:text-foreground transition-colors
                   md:border md:border-border md:rounded-md md:px-4 md:py-2"
                >
                  <BookMarkedIcon className="h-4 w-4" />
                  <span className="hidden md:block">My Courses</span>
                </Link>
              </SignedIn>
            </nav>
            <ModeToggle />

            <SignedIn>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline">Sign In</Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
