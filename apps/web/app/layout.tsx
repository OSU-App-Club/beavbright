import { ThemeProvider } from "@/components/theme-provider";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import { Toaster } from "@ui/components/sonner";
import "@ui/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <HMSRoomProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </HMSRoomProvider>
      </body>
    </html>
  );
}
