import { TEvent, TEventType } from "@/types/events";
import Image, { StaticImageData } from "next/image";
import { convertMSToLocalTime } from "@/utils/utils";
import { Plus } from "lucide-react";

import Workshop from "../../public/workshop.png";
import Activity from "../../public/activity.png";
import TechTalk from "../../public/tech-talk.png";
import { useEvent } from "@/hooks/useEvent";

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

const EventCard = ({
  eventId,
  onClick,
}: {
  eventId: number;
  onClick: () => void;
}) => {
  const { isLoading, data: event } = useEvent(eventId);
  if (!event) return;

  const startTime = convertMSToLocalTime(event.start_time);
  const endTime = convertMSToLocalTime(event.end_time);

  return (
    <button
      className={`w-full p-4 flex flex-col justify-between items-center rounded-2xl aspect-square ${
        EVENT_COLORS[event.event_type]
      } text-base hover:opacity-70 transition-opacity`}
      onClick={onClick}
    >
      <div className="w-full flex flex-col gap-1 sm:gap-0">
        <h2 className="w-full capitalize text-[16px] sm:text-[14px] text-start">
          {event.event_type.replaceAll("_", " ")}
        </h2>
        <h1 className="w-full font-semibold text-[20px] sm:text-[16px] line-clamp-2 text-start">
          {event.name}
        </h1>
      </div>
      <div className="flex flex-col max-w-full w-[60%] h-[40%] items-center justify-center">
        <Image src={EVENT_IMAGES[event.event_type]} alt="Image" />
      </div>
      <div className="flex flex-row justify-between items-end w-full">
        <h2 className="text-[16px] sm:text-[14px] text-start">
          {startTime} - {endTime}
        </h2>
        <div className="flex justify-center items-center h-8 w-8 rounded-full bg-white">
          <Plus />
        </div>
      </div>
    </button>
  );
};

export default EventCard;
