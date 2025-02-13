"use client";

import useMyContext from "@/context/quizzContext";
import { faClose, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";

const DropDown = ({ setopenDropDown, quizId }) => {
  const { mode, allquizzes, setAllquizzes, quizToStartObjict } = useMyContext();

  const { setUpdateMode, UpdateMode } = mode;
  const { startquizzId, setstartquizzId } = quizToStartObjict;
  const menu = [
    { icon: faPencil, name: "Modify" },
    { icon: faTrash, name: "Delete" },
  ];
  const router = useRouter();
  // make a hook to close the dropDown when clicking outside of the dropDown

  const dropDownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setopenDropDown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropDownRef, setopenDropDown]);

  const handleButtonClick = (name) => {
    setopenDropDown(false);

    // delete quiz function with id
    async function deleteQuiz(quizId) {
      const response = await fetch(`/api/quizzes?quizId=${quizId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete quiz");
      }
      const updatedQuizzes = allquizzes.filter((quiz) => quiz._id !== quizId);
      setAllquizzes(updatedQuizzes);
      window.location.assign("/");
      toast.success("Quiz deleted successfully!");
    }

    // modify quiz function
    function modifyQuiz() {
      setUpdateMode(true);
      setstartquizzId(quizId);

      router.push(`/quizzBuilder`);
    }

    if (name === "Delete") {
      toast((t) => (
        <div className="flex flex-col gap-4 text-center p-4">
          <h1 className="text-center capitalize">
            Do you want to delete this quiz!
          </h1>
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                deleteQuiz(quizId);
              }}
              className="bg-red-800 text-white h-8 w-20 rounded-md hover:bg-red-600 p-2 "
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-slate-800 text-white h-8 w-20 rounded-md space-x-2 p-2 "
            >
              <FontAwesomeIcon icon={faClose} />
              <span>Close </span>
            </button>
          </div>
        </div>
      ));
    } else {
      modifyQuiz();
    }
  };
  return (
    <div
      ref={dropDownRef}
      className="absolute right-8 top-8 p-4 rounded-md size-32 bg-white smooth-appearance-top"
    >
      <div className="flex flex-col gap-4">
        {menu.map((item, index) => (
          <button
            key={index}
            className="flex items-center gap-2 active:scale-90 ease-in-out rounded-md border border-slate-200 p-2 hover:bg-green-400 transition-[background-color]"
            onClick={() => handleButtonClick(item.name)}
          >
            <FontAwesomeIcon
              icon={item.icon}
              className={`${
                item.icon == faTrash ? "text-red-500" : "text-green-600"
              } size-5 `}
            />
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DropDown;
