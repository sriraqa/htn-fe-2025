import { TEndpointResponse } from "@/types/events";
import { useQuery } from "@tanstack/react-query";

const fetchEventQueryKey = (id: string) => {
  const queryKey = ["event", `eventId:${id}`];
  return queryKey;
}

const getAllEvents = async (id: string): Promise<TEndpointResponse> => {
  const res = await fetch(`https://api.hackthenorth.com/v3/events/${id}`, {
    method: "GET",
  });

  if(!res.ok) {
    console.error(`Could not get event with ID: ${id}`, res.statusText);
  }

  return await res.json();
}

export const useEvents = (id: string) =>
  useQuery({
    queryKey: fetchEventQueryKey(id),
    queryFn: () => getAllEvents(id),
  });