// Each event will belong to one of the following types
export type TEventType = "workshop" | "activity" | "tech_talk";
export type TPermission = "public" | "private";

type TSpeaker = {
  name: string;
};

// The information for an event will look like so
export type TEvent = {
  id: number;
  name: string;
  event_type: TEventType;
  permission?: TPermission;

  start_time: number; // unix timestamp (ms)
  end_time: number; // unix timestamp (ms)

  description?: string; // a paragraph describing the event
  speakers: TSpeaker[]; // a list of speakers for the event

  public_url?: string; // a url to display for the general public
  private_url: string; // a url to display for hackers
  related_events: number[]; // a list ids corresponding to related events
};

// What the endpoints will return
export type TEndpointResponse = TEvent | TEvent[];