import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@ui/components/sonner";
import "@ui/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "BeavBright - Community Driven Study Platform for Oregon State University Students",
  description:
    "A fully-featured study-platform for Oregon State University Students. Find course materials, create study groups, and more.",
  openGraph: {
    type: "website",
    url: "https://beavbright-web.vercel.app/",
    title:
      "BeavBright - Community Driven Study Platform for Oregon State University Students",
    description:
      "A fully-featured study-platform for Oregon State University Students. Find course materials, create study groups, and more.",
    siteName: "BeavBright",
    images: [
      {
        url: "https://beavbright-web.vercel.app/images/og.png",
        secureUrl: "https://beavbright-web.vercel.app/images/og.png",
        width: 2880,
        height: 1612,
        alt: "BeavBright - Community Driven Study Platform for Oregon State University Students",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
