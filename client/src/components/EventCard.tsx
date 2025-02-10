import { TEvent } from "@/types/events";

const EventCard = ({ event }: { event: TEvent }) => {
  return <div className="p-4">{event.name}</div>;
};

export default EventCard;
