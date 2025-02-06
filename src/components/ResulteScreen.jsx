import {
  faCheckCircle,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const ResulteScreen = ({
  scale,
  setdisplayresult,
  score,
  setscore,
  numberOfQues,
  setCurrentQuestion,
  setclassNameOfSelectedAns,
  setselctedAnswerId,
  setendQuestionIndicator,
}) => {
  const percentage = (score / numberOfQues) * 100;
  let emoji =
    percentage > 80 ? "smile" : percentage >= 50 ? "sad" : "exploding";

  const emojis = {
    smile: "/quizzAssets/smiling-face.svg",
    sad: "/quizzAssets/nerd-face-svgrepo-com.svg",
    exploding: "/quizzAssets/exploding-head-svgrepo-com.svg",
  };

  function handelTryAgain() {
    setdisplayresult(0);
    setCurrentQuestion(0);
    setclassNameOfSelectedAns("");
    setselctedAnswerId(null);
    setscore(0);
    setendQuestionIndicator(false);
  }
  return (
    <div
      className={`w-full h-screen bg-black bg-opacity-80 center fixed scale-${scale} transition-[transform] ease-in-out duration-500 origin-center z-10 top-0 left-0`}
    >
      <section className="max-md:w-[95%] p-6  w-5/12 bg-white shadow-sm rounded-md center flex-col gap-4 ">
        <img
          className="  w-40 object-contain "
          src={emojis[emoji]}
          alt="Smiling face"
        />
        <h1 className="text-4xl font-bold capitalize ">
          your score:{percentage}%{" "}
        </h1>
        <h1 className="text-5xl font-light px-2 rounded-md outline-double outline-green-600">
          {score}/<span className="text-red-700">{numberOfQues}</span>
        </h1>
        <button
          onClick={() => handelTryAgain()}
          className="h-9  px-6  hover:bg-green-600 bg-green-500 flex items-center  outline-double outline-green-500 ease-linear transition-[background] active:scale-95 text-white rounded-md  capitalize"
        >
          {" "}
          try again
        </button>
        <div className="space-y-2">
          <p className="text-gray-600 capitalize flex gap-2 items-center">
            {" "}
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-green-500 size-6"
            />
            correct Answer:{score}
          </p>
          <p className="text-gray-600 capitalize flex gap-2 items-center">
            <FontAwesomeIcon
              icon={faXmarkCircle}
              className="text-red-500 size-6"
            />{" "}
            wrong Answer:{numberOfQues - score}
          </p>
        </div>
        <Link
          href={"/"}
          className="capitalize text-green-600 hover:underline text-lg"
        >
          select another quizz{" "}
        </Link>
      </section>
    </div>
  );
};

export default ResulteScreen;
