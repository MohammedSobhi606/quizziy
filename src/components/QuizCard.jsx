import Image from "next/image";
import React from "react";
import { FaCode, FaEllipsis, FaPlay } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import useMyContext from "@/context/quizzContext";
function QuizCard({ quiz }) {
  // calculate the success rate which will be the success attempts divided by the total number of attempts
  //  لكل سؤال مش لكل كويز
  // to that make a function take quisitions as a parameter to map it and calculate the success rate for each quisition
  const calculateSuccessRate = (quizzQuestions) => {
    let totalAttempts = 0;
    let correctAttempts = 0;
    let successRate = 0;

    quizzQuestions.forEach((quisition) => {
      correctAttempts += quisition.statstics.correctAttempts;
      totalAttempts += quisition.statstics.totalAttempts;
    });
    successRate = Math.ceil((correctAttempts / totalAttempts) * 100);

    return successRate;
  };

  const { quizToStartObjict } = useMyContext();
  const { setstartquizzId } = quizToStartObjict;

  return (
    <div className=" p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow transition-all ease-linear  space-y-2">
      {/* big card icon  */}
      <div className="relative flex items-center justify-center h-32 w-full bg-green-600 rounded-md shadow-md">
        <div className="  text-white w-20 h-20 ">
          <FontAwesomeIcon icon={quiz.icon} className="w-full h-full" />
        </div>
        <FaEllipsis className="absolute right-3 top-1 w-7 h-7 text-white cursor-pointer" />
      </div>
      {/* title area */}
      <div className="">
        <h5 className="mb-1 text-xl font-bold ">{quiz.title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {quiz.quizzQuestions.length} questions
        </p>
      </div>
      {/*  footer success rate area */}
      <div className="flex gap-3">
        {/* succes */}
        <div className=" flex gap-1 items-center ">
          <Image
            width={20}
            height={10}
            src={"/quizzAssets/icons8-light-bulb-48 (1).png"}
            alt="icon"
            className="h-6 w-6"
          />
          <span className="text-[12px] text-gray-600 capitalize">
            Success rate :{calculateSuccessRate(quiz.quizzQuestions)}%
          </span>
        </div>
        {/*  play quizz icon */}
        <Link
          onClick={() => {
            setstartquizzId(quiz.id);
          }}
          href={"/quizz-start"}
          className="center w-8 h-8  bg-green-700 cursor-pointer rounded-full"
        >
          <FaPlay className="text-white text-xl" />
        </Link>
      </div>
    </div>
  );
}

export default QuizCard;
