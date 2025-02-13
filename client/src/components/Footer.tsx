"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.png";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-4 items-start justify-start w-full p-4 max-w-6xl">
      <div className="flex flex-row justify-between items-start gap-4 w-full ">
        <Link className="flex flex-row items-center gap-2 p-2 text-lg" href="/">
          <div className="h-8 w-8 flex items-center">
            <Image src={Logo} alt="Logo" width={40} height={18} />
          </div>
          <h2>Hackathon Global</h2>
        </Link>
        <div className="flex flex-row gap-10">
          <div className="flex flex-col gap-2 justify-start text-end">
            <Link className="p-2 hover:opacity-60 text-base" href="/">
              Events
            </Link>
            <Link className="p-2 hover:opacity-60 text-base" href="/about">
              About
            </Link>
          </div>
          <div className="flex flex-col gap-2 justify-start text-end">
            <Link
              className="p-2 hover:opacity-60 text-base"
              href="https://github.com/sriraqa/htn-fe-2025"
              target="_blank"
            >
              Github
            </Link>
            <Link
              className="p-2 hover:opacity-60 text-base"
              href="/"
              target="_blank"
            >
              Write Up
            </Link>
            <Link
              className="p-2 hover:opacity-60 text-base"
              href="https://sriraqa.github.io/"
              target="_blank"
            >
              Website
            </Link>
          </div>
        </div>
      </div>
      <hr className="text-hgGray bg-hgGray w-full" />
      <div className="flex flex-row justify-between w-full p-2">
        <p className="text-hgGray">Created by Sarah Qiao</p>
        <p className="text-hgGray">HTN FE Application 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
