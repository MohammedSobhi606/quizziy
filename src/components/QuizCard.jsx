import Image from "next/image";
import React, { useState } from "react";
import { FaCode, FaEllipsis, FaPlay } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import useMyContext from "@/context/quizzContext";
import quizIcons from "@/Icons";
import DropDown from "./DropDown";
import { faClose, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";
function QuizCard({ quiz }) {
  const [loading, setLoading] = useState(false);
  // calculate the success rate which will be the success attempts divided by the total number of attempts
  //  لكل سؤال مش لكل كويز
  // to that make a function take quisitions as a parameter to map it and calculate the success rate for each quisition
  const calculateSuccessRate = (quizzQuestions) => {
    let totalAttempts = 0;
    let correctAttempts = 0;
    let successRate = 0;
    console.log(quizzQuestions);

    quizzQuestions?.forEach((quisition) => {
      correctAttempts += quisition.statistics?.correctAttempts;
      totalAttempts += quisition.statistics?.totalAttempts;
    });
    successRate = Math.ceil((correctAttempts / totalAttempts) * 100);

    return successRate;
  };

  const { quizToStartObjict } = useMyContext();
  const { setstartquizzId } = quizToStartObjict;
  const [openDropDown, setopenDropDown] = useState(false);
  return (
    <div className="w-72 p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow transition-all ease-linear  space-y-2">
      {/* big card icon  */}
      <div className="relative flex items-center justify-center h-32 w-full bg-green-600 rounded-md shadow-md">
        <div className="  text-white w-20 h-20 ">
          <FontAwesomeIcon
            icon={quizIcons[quiz.icon].icon}
            className="w-full h-full"
          />
        </div>
        <FontAwesomeIcon
          icon={openDropDown ? faClose : faEllipsis}
          onClick={(e) => {
            if (e) {
              e.stopPropagation(); // prevent double click event  propagation on close button click event
            }
            setopenDropDown(!openDropDown);
          }}
          className="absolute right-3 top-1 w-7 h-7 text-white cursor-pointer transition-all ease-linear duration-300"
        />
        {openDropDown && (
          <DropDown quizId={quiz._id} setopenDropDown={setopenDropDown} />
        )}
      </div>
      {/* title area */}
      <div className="">
        <h5 className="mb-1 text-xl font-bold ">{quiz.title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {quiz.quizzQuestions.length} questions
        </p>
      </div>
      {/*  footer success rate area */}
      <div className="flex items-center justify-evenly bg-green-200 p-4 rounded-md">
        {/* succes */}
        <div className=" flex gap-1 items-center ">
          <Image
            width={20}
            height={10}
            src={"/quizzAssets/icons8-light-bulb-48 (1).png"}
            alt="icon"
            className="h-6 w-6"
          />
          <span className="text-[12px] font-bold text-gray-700  capitalize">
            Success rate :{" "}
            <span className="text-green-700 text-lg">
              {" "}
              {calculateSuccessRate(quiz.quizzQuestions)}%
            </span>
          </span>
        </div>
        {/*  play quizz icon */}
        <Link
          onClick={() => {
            setLoading(true);
            setstartquizzId(quiz._id);
            setTimeout(() => {
              setLoading(false);
            }, 1000); // simulate loading time for 1 second
          }}
          href={"/quizz-start"}
          className="center w-8 h-8 hover:scale-125 transition-all ease-in-out  bg-green-700 cursor-pointer rounded-full"
        >
          {loading ? (
            <Loader color={"white"} />
          ) : (
            <FaPlay className="text-white text-xl" />
          )}
        </Link>
        <div> </div>
      </div>
    </div>
  );
}

export default QuizCard;
