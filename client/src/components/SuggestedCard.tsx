import { TEvent, TEventType } from "@/types/events";
import Image, { StaticImageData } from "next/image";
import { convertMSToLocalDate, convertMSToLocalTime } from "@/utils/utils";
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

const SuggestedCard = ({
  eventId,
  onClick,
}: {
  eventId: number;
  onClick: () => void;
}) => {
  const { isLoading, data: event } = useEvent(eventId);
  if (!event) return;

  const startDate = convertMSToLocalDate(event.start_time);
  const startTime = convertMSToLocalTime(event.start_time);
  const endTime = convertMSToLocalTime(event.end_time);

  return (
    <button
      className={`min-w-[200px] max-w-[200px] h-[200px] p-4 flex flex-col justify-between items-center rounded-2xl aspect-square ${
        EVENT_COLORS[event.event_type]
      } text-base hover:opacity-70 transition-opacity`}
      onClick={onClick}
    >
      <div className="w-full flex flex-col gap-1 sm:gap-0">
        <h2 className="w-full capitalize text-[16px] sm:text-[14px] text-start">
          {event.event_type.replaceAll("_", " ")}
        </h2>
        <h1 className="w-full font-semibold text-[16px] sm:text-[14px] line-clamp-2 text-start">
          {event.name}
        </h1>
      </div>
      <div className="flex flex-col justify-start gap-0 items-start w-full">
        <h2 className="text-[16px] sm:text-[14px] text-start line-clamp-1">
          {startDate}
        </h2>
        <h2 className="text-[16px] sm:text-[14px] text-start line-clamp-1">
          {startTime} - {endTime}
        </h2>
      </div>
    </button>
  );
};

export default SuggestedCard;
