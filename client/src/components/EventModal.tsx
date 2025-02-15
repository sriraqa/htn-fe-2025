import { useEvent } from "@/hooks/useEvent";
import { BarLoader } from "react-spinners";
import { motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { TEventType } from "@/types/events";

import Workshop from "../../public/workshop.png";
import Activity from "../../public/activity.png";
import TechTalk from "../../public/tech-talk.png";
import { convertMSToLocalDate, convertMSToLocalTime } from "@/utils/utils";
import { useContext, useState } from "react";
import Link from "next/link";
import { UserContext } from "@/contexts/userProvider";
import SuggestedCard from "./SuggestedCard";

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
  const user = useContext(UserContext);
  const [currentEventId, setCurrentEventId] = useState(eventId);

  const { isLoading, data: event } = useEvent(currentEventId);
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
      className="fixed flex justify-center items-center p-4 sm:p-10 z-30 w-full h-dvh top-0 left-0"
    >
      <motion.div
        variants={foregroundTransition}
        initial="closed"
        animate="open"
        exit="closed"
        className="flex flex-col bg-background rounded-2xl w-full h-full max-w-3xl text-black overflow-y-scroll"
      >
        <div className="sm:sticky top-0 flex w-full justify-end pt-4 pr-4">
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
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="sm:sticky top-8 px-8 sm:pl-12 w-full sm:w-1/3 flex flex-row items-end justify-between sm:flex-col sm:items-start sm:justify-start gap-4 max-h-[200px]">
                <div
                  className={`p-4 w-1/3 flex flex-col sm:w-full justify-center items-center rounded-2xl aspect-square ${
                    EVENT_COLORS[event.event_type]
                  }`}
                >
                  <Image src={EVENT_IMAGES[event.event_type]} alt="Image" />
                </div>
                <div className="flex flex-col gap-1">
                  <Link
                    href={`${event.public_url}`}
                    target="_blank"
                    className="underline flex flex-row gap-1 items-center"
                  >
                    <p className="text-sm">View event</p>
                    <ArrowUpRight size={16} />
                  </Link>
                  {user.authenticated && event.private_url && (
                    <Link
                      href={`${event.private_url}`}
                      target="_blank"
                      className="underline flex flex-row gap-1 items-center"
                    >
                      <p className="text-sm">Join event</p>
                      <ArrowUpRight size={16} />
                    </Link>
                  )}
                </div>
              </div>

              <div className="px-8 sm:pr-12 w-full flex flex-col gap-6">
                <div className="w-full flex flex-col gap-0">
                  <h2 className="w-full capitalize text-[16px] text-start">
                    {event.event_type.replaceAll("_", " ")}
                  </h2>
                  <h1 className="w-full font-semibold text-[24px] text-start">
                    {event.name}
                  </h1>
                  <h2 className="w-full text-[16px] text-start">
                    {startDate} at {startTime} -{" "}
                    {endDate === startDate ? "" : endDate} {endTime}
                  </h2>
                </div>
                {event.description && (
                  <div className="w-full flex flex-col gap-3">
                    <h2 className="w-full capitalize text-[20px] font-semibold text-start">
                      About
                    </h2>
                    <p>{event.description}</p>
                  </div>
                )}
                <div className="w-full flex flex-col gap-3 pb-4">
                  <h2 className="w-full capitalize text-[20px] font-semibold text-start">
                    Speakers
                  </h2>
                  <p>
                    {event.speakers.map((speaker, index) => {
                      return (
                        speaker.name +
                        `${index === event.speakers.length - 1 ? "" : ", "}`
                      );
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-4 pb-4">
              <h2 className="w-full px-8 sm:px-12 capitalize text-[20px] font-semibold text-start">
                Related Events
              </h2>
              <div className="flex px-8 sm:px-12 sm:pb-6 flex-row overflow-x-scroll gap-4">
                {event.related_events.length > 0 &&
                  event.related_events.map((relatedId) => (
                    <SuggestedCard
                      eventId={relatedId}
                      onClick={() => setCurrentEventId(relatedId)}
                      key={relatedId}
                    />
                  ))}
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
