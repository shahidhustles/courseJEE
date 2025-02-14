import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "Welcome to courseJEE",
  description: "...",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
      </div>

      <SanityLive />
    </ClerkProvider>
  );
}
