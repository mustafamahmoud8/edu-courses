import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProgressProvider } from "@/contexts/ProgressContext";
import "./globals.css";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "EduCourses — منصة التعلّم الإلكتروني",
  description:
    "تعلّم من أفضل المدرّسين في التكنولوجيا والتصميم والتسويق والمزيد.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={leagueSpartan.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <AuthProvider>
            <ProgressProvider>
              {children}
              <Toaster
                position="bottom-left"
                toastOptions={{
                  duration: 3500,
                  style: {
                    fontFamily: "var(--font-league-spartan)",
                    direction: "rtl",
                  },
                }}
              />
            </ProgressProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
