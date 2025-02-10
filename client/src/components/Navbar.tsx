import Image from "next/image";
import Link from "next/link";

import Logo from "../../public/logo.png";

const Navbar = () => {
  return (
    <nav className="flex flex-row items-center justify-between gap-4 max-w-6xl w-full p-4">
      <Link className="flex flex-row items-center gap-2 p-2 text-lg" href="/">
        <div className="h-10 w-10 flex items-center">
          <Image src={Logo} alt="Logo" width={40} height={18} />
        </div>
        <h2>Hackathon Global</h2>
      </Link>
      <div className="flex flex-row gap-4">
        <Link className="p-2 hover:opacity-60 text-base" href="/">
          Events
        </Link>
        <Link className="p-2 hover:opacity-60 text-base" href="/about">
          About
        </Link>
        <Link
          className="py-2 px-6 text-base bg-offBlack text-white rounded-full active:scale-95 transition hover:opacity-70"
          href="/login"
        >
          Log In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
