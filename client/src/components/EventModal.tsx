import { TEvent } from "@/types/events";

const EventModal = ({ event }: { event: TEvent }) => {
  return <div className="p-4">{event.event_type}</div>;
};

export default EventModal;
