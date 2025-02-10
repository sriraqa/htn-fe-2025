import type { Metadata } from "next";
import { Sen } from "next/font/google";
import "../../styles/globals.css";

const sen = Sen({
  variable: "--font-sen",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Log In",
  description: "Next app with TailwindCSS",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${sen.variable} antialiased font-[family-name:var(--font-sen)]`}
    >
      {children}
    </div>
  );
}
