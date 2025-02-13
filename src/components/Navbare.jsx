import useMyContext from "@/context/quizzContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbare() {
  const { user } = useMyContext();

  return (
    <nav className=" shadow-md  border-gray-200 paddX py-2.5 dark:bg-gray-800">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link href="" className="flex items-center p-2 bg-black rounded-md">
          <Image
            width={24}
            height={24}
            src="/quizzAssets/Mlogo.svg"
            className="mr-3 h-6 sm:h-9"
            alt=" Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            Quizzy
          </span>
        </Link>
        <div className="flex items-center lg:order-2">
          {user ? (
            <div className="flex gap-4 items-center">
              <span>
                Hello{" "}
                <span className="text-green-800 font-bold uppercase">
                  👋{user.username}
                </span>
              </span>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.href = "/";
                }}
                className="border p-1 hover:bg-red-600 rounded-md border-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-white  focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-gray-900 focus:outline-none dark:focus:ring-gray-800 bg-black"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbare;
