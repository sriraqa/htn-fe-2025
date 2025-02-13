import { useEvent } from "@/hooks/useEvent";
import { BarLoader } from "react-spinners";
import { motion } from "motion/react";
import { X } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { TEventType } from "@/types/events";

import Workshop from "../../public/workshop.png";
import Activity from "../../public/activity.png";
import TechTalk from "../../public/tech-talk.png";
import { convertMSToLocalDate, convertMSToLocalTime } from "@/utils/utils";

const EVENT_COLORS: Record<TEventType, string> = {
  workshop: "bg-hgLightPurple text-hgDarkPurple",
  activity: "bg-hgLightBlue text-hgDarkBlue",
  tech_talk: "bg-hgLightGreen text-hgDarkGreen",
};

const EVENT_IMAGES: Record<TEventType, StaticImageData> = {
  workshop: Workshop,
  activity: Activity,
  tech_talk: TechTalk,
};

const backgroundTransition = {
  open: {
    backgroundColor: "rgb(0 0 0 / 0.5)",
    transition: {
      backgroundColor: { ease: "linear", duration: 0.2 },
    },
  },
  closed: {
    backgroundColor: "rgb(0 0 0 / 0)",
    transition: {
      backgroundColor: { ease: "linear", duration: 0.2 },
    },
  },
};

const foregroundTransition = {
  open: {
    opacity: 1,
    transition: {
      opacity: { ease: "linear", duration: 0.2 },
    },
  },
  closed: {
    opacity: 0,
    transition: {
      opacity: { ease: "linear", duration: 0.2 },
    },
  },
};

const EventModal = ({
  eventId,
  onClose,
}: {
  eventId: number;
  onClose: () => void;
}) => {
  const { isLoading, data: event } = useEvent(eventId);
  const startDate =
    event && event.start_time
      ? convertMSToLocalDate(event?.start_time)
      : "No start time";
  const startTime =
    event && event.start_time
      ? convertMSToLocalTime(event?.start_time).toLowerCase()
      : "";
  const endDate =
    event && event.end_time
      ? convertMSToLocalDate(event?.end_time)
      : "No start time";
  const endTime =
    event && event.end_time
      ? convertMSToLocalTime(event?.end_time).toLowerCase()
      : "";

  return (
    <motion.div
      variants={backgroundTransition}
      initial="closed"
      animate="open"
      exit="closed"
      className="absolute flex justify-center items-center p-10 z-30 w-full h-full top-0 left-0"
    >
      <motion.div
        variants={foregroundTransition}
        initial="closed"
        animate="open"
        exit="closed"
        className="flex flex-col bg-background rounded-2xl w-full h-full max-w-3xl text-black p-4"
      >
        <div className="flex w-full justify-end">
          <button
            className="flex justify-center items-center h-8 w-8 rounded-full bg-hgGray text-white active:scale-90 transition"
            onClick={onClose}
          >
            <X />
          </button>
        </div>
        {isLoading ? (
          <div className="flex w-full justify-center pt-10">
            <BarLoader role="status" />
          </div>
        ) : event ? (
          <div className="flex flex-col sm:flex-row gap-6 px-8">
            <div
              className={`w-1/3 p-4 flex flex-col justify-center items-center rounded-2xl aspect-square ${
                EVENT_COLORS[event.event_type]
              } text-base hover:opacity-70 transition-opacity`}
            >
              <Image src={EVENT_IMAGES[event.event_type]} alt="Image" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <h2 className="w-full capitalize text-[16px] text-start">
                {event.event_type.replaceAll("_", " ")}
              </h2>
              <div className="w-full flex flex-col gap-0">
                <h1 className="w-full font-semibold text-[24px] text-start">
                  {event.name}
                </h1>
                <h2 className="w-full text-[16px] text-start">
                  {startDate} at {startTime} -{" "}
                  {endDate === startDate ? "" : endDate} {endTime}
                </h2>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full justify-center pt-10">
            There was an error loading this page. Please try again
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default EventModal;
