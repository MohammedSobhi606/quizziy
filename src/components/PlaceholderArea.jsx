import useMyContext from "@/context/quizzContext";
import Link from "next/link";
import React from "react";
import { CiInboxIn } from "react-icons/ci";

function PlaceholderArea() {
  // use context api  to get user info
  const { user } = useMyContext();

  return (
    <div className="center flex-col gap-3 p-4">
      <CiInboxIn className="w-64 h-full text-green-600 font-light" />

      <h2 className="text-2xl font-bold text-gray-600">No Quizzes yet!</h2>
      <span className="text-[13px] font-light capitalize ">
        {" "}
        click below to begin your journey
      </span>
      {user ? (
        <Link
          href={"/quizzBuilder"}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md"
        >
          Create a new Quiz
        </Link>
      ) : (
        <Link
          href={"/login"}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md"
        >
          login to Create a new Quiz
        </Link>
      )}
    </div>
  );
}

export default PlaceholderArea;
