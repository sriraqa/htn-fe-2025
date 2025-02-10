import type { Metadata } from "next";
import { Sen } from "next/font/google";
import "../../styles/globals.css";

const sen = Sen({
  variable: "--font-sen",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "About",
  description: "Next app with TailwindCSS",
};

export default function AboutLayout({
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
