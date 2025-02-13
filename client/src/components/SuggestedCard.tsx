import { useEvent } from "@/hooks/useEvent";

const SuggestedCard = ({ eventId }: { eventId: number }) => {
  const { isLoading, data: event } = useEvent(eventId);

  return event && <div className="p-4">{event?.name}</div>;
};

export default SuggestedCard;
