"use client";

import InfoModal from "@/components/InfoModal";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/userProvider";
import { useEvents } from "@/hooks/useEvents";
import EventCard from "@/components/EventCard";
import { BarLoader } from "react-spinners";
import { AnimatePresence } from "motion/react";
import EventModal from "@/components/EventModal";
import { TEvent } from "@/types/events";
import { convertMSToLocalDate } from "@/utils/utils";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function Events() {
  const user = useContext(UserContext);
  const { isLoading, data: events } = useEvents();
  const router = useRouter();

  const sortedEvents = events
    ?.filter((e) => {
      if (!user.authenticated) {
        return e.permission !== "private";
      } else {
        return e;
      }
    })
    .sort((a, b) => a.start_time - b.start_time);

  const [showModal, setShowModal] = useState(!user.authenticated);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const handleOpenEvent = (eventId: number) => {
    setSelectedEventId(eventId);
  };

  const handleCloseEvent = () => {
    setSelectedEventId(null);
  };

  const groupDates = (events: TEvent[]): Record<string, TEvent[]> => {
    const groups: Record<string, TEvent[]> = {};

    events.forEach((event) => {
      const date = new Date(event.start_time);
      const dayKey = date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      if (!groups[dayKey]) {
        groups[dayKey] = [];
      }

      groups[dayKey].push(event);
    });

    return groups;
  };

  const groupedEvents = groupDates(sortedEvents ?? []);

  return (
    <div
      // Prevent scrolling in the background when modal is open
      // TODO: Move selectedEventId to a global state so that it stays open
      className={`${
        selectedEventId !== null && "h-[calc(100vh-104px)] overflow-clip"
      } flex flex-col justify-center items-center`}
    >
      <AnimatePresence>
        {selectedEventId && (
          <EventModal eventId={selectedEventId} onClose={handleCloseEvent} />
        )}
      </AnimatePresence>

      <main className="flex flex-col gap-8 w-full h-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold text-center">All Events</h1>
          <p className="text-base text-black/50 text-center">
            View all of the upcoming events in one place!
          </p>
        </div>
        {showModal && <InfoModal onClose={() => setShowModal(false)} />}
        {groupedEvents ? (
          <div className="flex flex-col gap-6 pb-14">
            {Object.keys(groupedEvents).map((time) => {
              return (
                <div className="flex flex-col gap-3" key={time}>
                  <h2 className="text-xl font-semibold">
                    {convertMSToLocalDate(groupedEvents[time][0].start_time)}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {groupedEvents[time].map((event) => {
                      return (
                        <div key={event.id}>
                          <EventCard
                            eventId={event.id}
                            onClick={() => handleOpenEvent(event.id)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : isLoading ? (
          <div className="flex w-full justify-center pt-10">
            <BarLoader role="status" />
          </div>
        ) : (
          <div>No events to show</div>
        )}
      </main>
      {selectedEventId === null && <Footer />}
    </div>
  );
}
