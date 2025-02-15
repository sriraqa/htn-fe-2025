import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import Graphic from "../../public/info-graphic.png";

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
      <div className="hidden sm:flex justify-end items-end max-w-[360px] px-6">
        <Image src={Graphic} alt="graphic" />
      </div>
    </div>
  );
};

export default InfoModal;
