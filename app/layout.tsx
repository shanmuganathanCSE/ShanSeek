import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@Clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";

const inter = Inter({
  weight: "400",
  variable: "--font-inter",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "ShanSeek",
  description: "Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <AppContextProvider>
          <html lang="en">
            <body
              className={`${inter.className} antialiased`}
            >
              {children}
            </body>
          </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
