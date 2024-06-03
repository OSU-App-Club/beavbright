"use client";

import { acceptCookies } from "@/app/lib/actions";
import { Button } from "@ui/components/ui/button";
import { useState } from "react";

const CookieModal = ({ show }: { show: boolean }) => {
  const [showModal, setShowModal] = useState(show);

  const handleAcceptCookies = async () => {
    await acceptCookies(); // Call the server action to update the session
    setShowModal(false);
  };

  return (
    <div className="w-full right-0 fixed bottom-0 pl-[55px]">
      <div
        className={` m-auto bg-background border-t-2 dark:brightness-150 p-4 transition-transform transform ${
          showModal ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ transition: "transform 0.3s ease-in-out" }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <p className="mb-2">
              We use cookies to improve your experience on our site. By
              accepting, you consent to our use of cookies.
            </p>
          </div>
          <div>
            <Button onClick={handleAcceptCookies}>Accept</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieModal;
