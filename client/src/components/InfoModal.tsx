import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

import Guy from "../../public/little-guy.png";
import Floating1 from "../../public/floating-1.png";
import Floating2 from "../../public/floating-2.png";

type ModalProps = {
  onClose: () => void;
};

const InfoModal = ({ onClose }: ModalProps) => {
  return (
    <div className="relative flex flex-row jusitfy-between items-end w-full bg-darkOffWhite rounded-2xl">
      <div className="flex flex-col gap-4 p-6 w-full">
        <div className="absolute right-6 top-6">
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-hgGray text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">Are you an attendee?</h2>
          <p className="text-base">
            There are even more events waiting for you!
          </p>
        </div>
        <div className="flex">
          <Link
            className="py-2 px-6 text-base bg-offBlack text-white rounded-full active:scale-95 transition hover:opacity-70"
            href="/login"
          >
            Log In
          </Link>
        </div>
      </div>
      <div className="hidden sm:relative sm:flex justify-end items-end max-w-[360px] px-6">
        <div className="absolute bottom-0 z-[1] h-[129px] w-[240px]">
          <Image src={Guy} alt="Hacker Guy" width={400} height={400} />
        </div>
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [7, 0, -5, 0, 7] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute bottom-0 right-8 z-[2] h-[129px] w-[240px]"
        >
          <Image
            src={Floating1}
            alt="Floating Objects"
            width={400}
            height={400}
          />
        </motion.div>
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-3, 0, 3, 0, -3] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute bottom-0 right-8 z-[2] h-[129px] w-[240px]"
        >
          <Image
            src={Floating2}
            alt="Floating Objects"
            width={400}
            height={400}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default InfoModal;
