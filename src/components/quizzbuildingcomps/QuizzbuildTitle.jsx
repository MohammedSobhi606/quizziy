"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import IconsComponents from "./IconsComponents";
import quizIcons from "@/Icons";

const QuizzbuildTitle = ({ focusProp }) => {
  // on focus prop, we will enable auto-focus on input field using ref
  // destructure of focusprop
  // selected icon index in use state
  const [selectedIconIndex, setSelectedIconIndex] = useState(1);
  const [openBoxIcons, setopenBoxIcons] = useState(false);

  const { focus, setNewQuiz, newQuiz } = focusProp;
  const titleRef = useRef(null);

  useEffect(() => {
    if (focus) {
      titleRef.current.focus();
    }
  }, []);
  useEffect(() => {
    setNewQuiz({
      ...newQuiz,

      icon: selectedIconIndex,
    });
  }, [selectedIconIndex]);

  return (
    <div className="p-3  flex items-center justify-between border border-green-500 rounded-md">
      <div className="flex items-center flex-1">
        {" "}
        <h1 className="text-2xl max-sm:text-sm text-gray-700 font-bold">
          Quizz Name:
        </h1>{" "}
        <input
          ref={titleRef}
          value={newQuiz.title}
          onChange={(e) =>
            setNewQuiz({
              ...newQuiz,
              title: e.target.value,
            })
          }
          type="text"
          className="flex-1 max-sm:text-sm max-sm:mx-1 mx-4 outline-none text-xl border-b block focus:border-green-500"
          placeholder="Enter Quizz Name"
        />
      </div>
      <FontAwesomeIcon
        icon={quizIcons[selectedIconIndex].icon}
        className="size-8 max-sm:size-5 py-1  shrink-0 bg-green-600 active:ring-1 active:ring-green-500 active:scale-90 transition-all ease-in-out text-white cursor-pointer  px-4  border rounded-md"
        title="select"
        onClick={() => setopenBoxIcons(!openBoxIcons)}
      />
      <IconsComponents
        setSelectedIconIndex={setSelectedIconIndex}
        openBoxIcons={openBoxIcons}
        setopenBoxIcons={setopenBoxIcons}
      />
    </div>
  );
};

export default QuizzbuildTitle;
