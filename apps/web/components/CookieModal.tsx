"use client";

import { useState } from "react";
import { acceptCookies } from "@/app/lib/actions";

const CookieModal = () => {
  const [showModal, setShowModal] = useState(true);

  const handleAcceptCookies = async () => {
    await acceptCookies(); // Call the server action to update the session
    setShowModal(false);
  };

  return (
    <div className="w-full right-0 fixed bottom-0 pl-[55px]">
      <div
        className={` m-auto bg-gray-800 text-white p-4 transition-transform transform ${
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
            <button
              className="bg-orange-500 text-white py-2 px-4 rounded"
              onClick={handleAcceptCookies}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieModal;
