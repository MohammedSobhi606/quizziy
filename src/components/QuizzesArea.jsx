"use client";
import QuizCard from "./QuizCard";
import PlaceholderArea from "./PlaceholderArea";
import useMyContext from "@/context/quizzContext";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function QuizzesArea() {
  const { allquizzes } = useMyContext();

  return (
    <section className="paddX mt-10 mb-20">
      {allquizzes?.length === 0 ? (
        <PlaceholderArea />
      ) : (
        <>
          {/* Quizzes will be rendered here */}
          <h2 className="font-bold text-xl max-sm:text-center">My Quizzes </h2>
          <div className=" mt-6 flex gap-8 flex-wrap justify-center ">
            {/* <QuizCard /> */}
            {allquizzes?.map((quiz, inx) => (
              <QuizCard key={inx} quiz={quiz} />
            ))}

            <CreateQuizz />
          </div>
        </>
      )}
    </section>
  );
}

export default QuizzesArea;

const CreateQuizz = () => {
  return (
    <Link
      href={"/quizzBuilder"}
      className="center flex-col w-72 p-4 bg-white border border-gray-200 rounded-lg hover:text-green-600  hover:shadow-lg  hover:border-green-500 transition-all ease-linear  space-y-2"
    >
      <FontAwesomeIcon icon={faPlus} className="opacity-20 size-36  " />
      <span className="text-xl ">Create Quiz</span>
    </Link>
  );
};
