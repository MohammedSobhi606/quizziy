import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FaCode } from "react-icons/fa6";
import { RxStopwatch } from "react-icons/rx";
import Timer from "./Timer";
import quizIcons from "@/Icons";
function QuizzStartHeader({
  title,
  setTimeOut,
  icon,
  numberOfquestions,
  currentQuestion,
}) {
  return (
    <div className="flex justify-between max-md:text-sm flex-wrap gap-4">
      {/* quizz name */}
      <div className="center gap-2">
        {/* icons */}
        <div className="relative flex items-center justify-center max-md:w-8 max-md:h-8 w-12 h-12  p-2 max-md:p-1 bg-green-600 rounded-md shadow-md">
          <FontAwesomeIcon
            icon={quizIcons[icon].icon}
            className="w-full h-full text-white"
          />
        </div>
        {/* title */}
        <div>
          <h2 className="text-2xl max-md:text-lg font-bold text-gray-900 ">
            {title}
          </h2>
          <p className="text-gray-600 font-bold">
            {numberOfquestions} questions
          </p>
        </div>
      </div>
      {/* timer */}
      <div className="flex items-center gap-2">
        <RxStopwatch className="text-green-600  max-md:w-8 max-md:h-8 w-12 h-12 " />
        <span className="text-gray-800">
          00:00:
          {<Timer setTimeOut={setTimeOut} questionNumber={currentQuestion} />}
        </span>
      </div>
    </div>
  );
}

export default QuizzStartHeader;
