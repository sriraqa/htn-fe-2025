"use client";

import InfoModal from "@/components/InfoModal";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/userProvider";
import { useEvents } from "@/hooks/useEvents";
import EventCard from "@/components/EventCard";
import { BarLoader } from "react-spinners";

export default function Events() {
  const user = useContext(UserContext);
  const { isLoading, data: events } = useEvents();
  const sortedEvents = events?.sort((a, b) => a.start_time - b.start_time);

  const [showModal, setShowModal] = useState(!user.authenticated);

  return (
    <div className="flex flex-col justify-center items-center">
      <main className="flex flex-col gap-6 w-full h-full">
        {showModal && <InfoModal onClose={() => setShowModal(false)} />}
        {sortedEvents ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sortedEvents.map((event) => {
              return (
                <div key={event.id}>
                  <EventCard event={event} />
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
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
