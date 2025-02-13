import { TEvent } from "@/types/events";
import { useQuery } from "@tanstack/react-query";

const fetchEventQueryKey = (id: number) => {
  const queryKey = ["event", `eventId:${id}`];
  return queryKey;
}

const getAllEvent = async (id: number): Promise<TEvent> => {
  const res = await fetch(`https://api.hackthenorth.com/v3/events/${id}`, {
    method: "GET",
  });

  if(!res.ok) {
    console.error(`Could not get event with ID: ${id}`, res.statusText);
  }

  return await res.json() as TEvent;
}

export const useEvent = (id: number) =>
  useQuery({
    queryKey: fetchEventQueryKey(id),
    queryFn: () => getAllEvent(id),
  });