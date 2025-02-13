import type { Metadata } from "next";
import { Sen } from "next/font/google";
import "../styles/globals.css";
import { UserProvider } from "@/contexts/userProvider";
import Navbar from "@/components/Navbar";
import { QueryClientContextProvider } from "@/contexts/QueryClientContextProvider";
import Footer from "@/components/Footer";

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
    <QueryClientContextProvider>
      <UserProvider>
        <html lang="en">
          <body
            className={`${sen.variable} antialiased font-[family-name:var(--font-sen)] flex flex-col justify-center items-center`}
          >
            <Navbar />
            <div className="max-w-3xl pt-6 px-6 md:px-0 w-full h-full">
              {children}
            </div>
            <Footer />
          </body>
        </html>
      </UserProvider>
    </QueryClientContextProvider>
  );
}
