"use client";

import { useTheme } from "next-themes";
import Squares from "./Sqaures";

const Hero = () => {
  const { theme, resolvedTheme } = useTheme();
  return (
    <div className="relative h-[45vh] w-full">
      {theme === "dark" || resolvedTheme === "dark" ? (
        <Squares
          speed={0.3}
          squareSize={40}
          direction="diagonal" // up, down, left, right, diagonal
          borderColor="#fff"
          hoverFillColor="#222"
        />
      ) : (
        <>
          <div
            className="absolute insert-0 bg-gradient-to-b from-black/10 to-black/55
     dark:from-white/15 dark:to-black/40 "
          ></div>
          <div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/80 
      to-background/20"
          ></div>
        </>
      )}
      {/*  */}
      <div className="absolute top-0 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <h1
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 
              bg-clip-text text-transparent"
          >
            Expand Your Knowledge With our Courses
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover a world of learning with out expertly crafted courses.
            Learn from industry professionals and take your skills to the next
            level.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Hero;