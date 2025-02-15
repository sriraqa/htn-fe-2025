import Footer from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-104px)] size-full">
      <main className="flex flex-col items-center gap-8 w-full h-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold text-center">About</h1>
          <p className="text-base text-black/50 text-center">
            Quick links to the related websites
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 w-full">
          <a
            className="flex flex-row items-center gap-1 text-base text-center underline"
            href="https://held-abacus-753.notion.site/Writeup-Sarah-Qiao-19acf3c2aee5805ba537ed1c07f49b1b"
            target="_blank"
          >
            <p>View writeup on Notion</p>
            <ArrowUpRight size={16} />
          </a>
          <a
            className="flex flex-row items-center gap-1 text-base text-center underline"
            href="https://github.com/sriraqa/htn-fe-2025"
            target="_blank"
          >
            <p>View the repo on GitHub</p>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
