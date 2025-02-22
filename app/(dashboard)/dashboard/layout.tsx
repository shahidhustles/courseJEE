import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { SanityLive } from "@/sanity/lib/live";
import { SidebarProvider } from "@/components/providers/SidebarProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

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
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <div className="h-full">{children}</div>
        </SidebarProvider>
      </ThemeProvider>
      <SanityLive />
    </ClerkProvider>
  );
}
