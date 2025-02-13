import { TEvent } from "@/types/events";
import { useQuery } from "@tanstack/react-query";

const EVENTS_QUERY_KEY = ["events"];

const getAllEvents = async (): Promise<TEvent[]> => {
  const res = await fetch("https://api.hackthenorth.com/v3/events", {
    method: "GET",
  });

  if(!res.ok) {
    console.error("Could not get events", res.statusText);
  }

  return await res.json() as TEvent[];
}

export const useEvents = () =>
  useQuery({
    queryKey: EVENTS_QUERY_KEY,
    queryFn: getAllEvents,
  });