"use client";
import QuizCard from "./QuizCard";
import PlaceholderArea from "./PlaceholderArea";
import useMyContext from "@/context/quizzContext";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function QuizzesArea() {
  const { allquizzes } = useMyContext();

  return (
    <section className="paddX mt-10">
      {allquizzes.length === 0 ? (
        <PlaceholderArea />
      ) : (
        <>
          <h2 className="font-bold text-xl">My Quizzes </h2>
          {/* Quizzes will be rendered here */}
          <div className=" mt-6 flex gap-2 flex-wrap ">
            {/* <QuizCard /> */}
            {allquizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
            {/* add quiz button */}
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
      className="center flex-col w-48 p-4 bg-white border border-gray-200 rounded-lg hover:text-green-600  hover:shadow-lg  hover:border-green-500 transition-all ease-linear  space-y-2"
    >
      <FontAwesomeIcon icon={faPlus} className="opacity-20 size-36  " />
      <span className="text-xl ">Create Quiz</span>
    </Link>
  );
};
