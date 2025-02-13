"use client";
import QuizzbuildHeder from "@/components/quizzbuildingcomps/QuizzbuildHeder";
import QuizzBuildQuestions from "@/components/quizzbuildingcomps/QuizzBuildQuestions";
import QuizzbuildTitle from "@/components/quizzbuildingcomps/QuizzbuildTitle";
import useMyContext from "@/context/quizzContext";
import quizIcons from "@/Icons";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const Page = () => {
  const randomId = uuidv4();
  const { mode, selectedQuiz } = useMyContext();
  const { setUpdateMode, UpdateMode } = mode;
  const [quizzQuestions, setquizzQuestions] = useState(
    UpdateMode
      ? selectedQuiz.quizzQuestions
      : [
          {
            // id: randomId,
            mainQuestion: "",
            choices: ["A.", "B."],
            correctAnswer: null,
            answeredResult: -1,
            statstics: {
              totalAttempts: 0,
              correctAttempts: 0,
              incorrectAttempts: 0,
            },
          },
        ]
  );

  // state for new quiz
  const [newQuiz, setNewQuiz] = useState(
    UpdateMode
      ? selectedQuiz
      : {
          // id: randomId,
          icon: 0,
          title: "",
          quizzQuestions: quizzQuestions,
        }
  );
  const [titleFocus, setTitleFocus] = useState(true);
  const quizTitleProps = {
    focusProp: { focus: titleFocus, setTitleFocus, setNewQuiz, newQuiz },
  };
  const quizQuesProps = {
    quizzQuestions,
    setquizzQuestions,
    focusProp: {
      focus: !titleFocus,
      setTitleFocus,
    },
  };
  // update  new quiz state
  useEffect(() => {
    setNewQuiz({ ...newQuiz, quizzQuestions });
  }, [quizzQuestions]);

  return (
    <div className="paddX mt-8 flex flex-col gap-8">
      <QuizzbuildHeder newQuiz={newQuiz} quizzQuestions={quizzQuestions} />
      <QuizzbuildTitle {...quizTitleProps} />
      <div className="center  max-sm:text-sm  gap-2 text-2xl">
        {" "}
        <hr className="bg-green-600 h-1 w-24  max-sm:w-12  " />
        Add Questions <hr className="bg-green-600 h-1 w-24  max-sm:w-12  " />{" "}
      </div>
      <QuizzBuildQuestions {...quizQuesProps} />
    </div>
  );
};

export default Page;
