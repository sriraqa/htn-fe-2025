"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import Logo from "../../public/logo.png";
import { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { UserContext } from "@/contexts/userProvider";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const { authenticated, setAuthenticated } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  });

  const handleResize = () => {
    if (window.innerWidth < 640) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const handleAuth = () => {
    if (!authenticated) {
      router.push("/login");
    } else {
      setAuthenticated(false);
    }
    router.refresh();
  };

  return (
    <nav className="flex flex-row items-center justify-between gap-4 max-w-6xl w-full p-4">
      <Link className="flex flex-row items-center gap-2 p-2 text-lg" href="/">
        <div className="h-8 w-8 flex items-center">
          <Image src={Logo} alt="Logo" width={40} height={18} />
        </div>
        <h2>Hackathon Global</h2>
      </Link>
      {isMobile ? (
        <>
          <button onClick={() => setShowDrawer(true)}>
            <Menu />
          </button>
          <AnimatePresence>
            {showDrawer && <Drawer onClose={() => setShowDrawer(false)} />}
          </AnimatePresence>
        </>
      ) : (
        <div className="flex flex-row gap-4">
          <Link className="p-2 hover:opacity-60 text-base" href="/">
            Events
          </Link>
          <Link className="p-2 hover:opacity-60 text-base" href="/about">
            About
          </Link>
          <button
            className="py-2 px-6 text-base text-center bg-offBlack text-white rounded-full active:scale-95 transition hover:opacity-70"
            onClick={handleAuth}
          >
            {!authenticated ? "Log In" : "Sign Out"}
          </button>
        </div>
      )}
    </nav>
  );
};

const Drawer = ({ onClose }: { onClose: () => void }) => {
  const { authenticated, setAuthenticated } = useContext(UserContext);
  const router = useRouter();

  const handleAuth = () => {
    if (!authenticated) {
      router.push("/login");
    } else {
      setAuthenticated(false);
    }
    router.refresh();
  };

  const drawerVariants = {
    visible: { x: 0 },
    hidden: { x: 400 },
    exit: { x: 640 },
  };

  return (
    <motion.div
      variants={drawerVariants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      transition={{
        x: { type: "spring", bounce: 0 },
        duration: 6000,
      }}
      className="fixed top-0 left-0 z-20 size-full bg-background overscroll-none py-6 px-4"
    >
      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-end">
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        <Link
          className="p-2 hover:opacity-60 text-base"
          href="/"
          onClick={onClose}
        >
          Events
        </Link>
        <Link
          className="p-2 hover:opacity-60 text-base"
          href="/about"
          onClick={onClose}
        >
          About
        </Link>
        <button
          className="py-2 px-6 max-w-[120px] text-center text-base bg-offBlack text-white rounded-full active:scale-95 transition hover:opacity-70"
          onClick={handleAuth}
        >
          {!authenticated ? "Log In" : "Sign Out"}
        </button>
      </div>
    </motion.div>
  );
};

export default Navbar;
