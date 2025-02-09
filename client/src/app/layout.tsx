import type { Metadata } from "next";
import { Sen } from "next/font/google";
import "../styles/globals.css";
import { UserProvider } from "@/contexts/userProvider";

const sen = Sen({
  variable: "--font-sen",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <html lang="en">
        <body className={`${sen.variable} antialiased`}>{children}</body>
      </html>
    </UserProvider>
  );
}
