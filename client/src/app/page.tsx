"use client";

import InfoModal from "@/components/InfoModal";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/userProvider";

export default function Events() {
  const user = useContext(UserContext);
  const [showModal, setShowModal] = useState(!user.authenticated);

  return (
    <div className="flex flex-col justify-center items-center">
      <main className="flex flex-col w-full h-full">
        {showModal && <InfoModal onClose={() => setShowModal(false)} />}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
