import type { Metadata } from "next";
import { Sen } from "next/font/google";
import "../styles/globals.css";
import { UserProvider } from "@/contexts/userProvider";
import Navbar from "@/components/Navbar";

const sen = Sen({
  variable: "--font-sen",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hackathon Global",
  description: "Next app with TailwindCSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <html lang="en">
        <body
          className={`${sen.variable} antialiased font-[family-name:var(--font-sen)] flex flex-col justify-center items-center`}
        >
          <Navbar />
          <div className="max-w-3xl p-6 w-full h-full">{children}</div>
        </body>
      </html>
    </UserProvider>
  );
}
