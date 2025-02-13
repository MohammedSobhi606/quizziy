"use client";

import { useEffect, useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
//=====================sounds hook================
import useSound from "use-sound";
import ResulteScreen from "./ResulteScreen";

function QuizzQuestions({
  quizzQuestions,
  selectedQuiz,
  timeOut,
  setTimeOut,
  currentQuestion,
  setCurrentQuestion,
}) {
  // ===============
  //=======================sounds hook to extract functions
  const [correctSound] = useSound("/sounds/correct-ans.wav");
  const [wrongSound] = useSound("/sounds/wrong-ans.wav");
  const [selectSound] = useSound("/sounds/select.wav");
  //=======================sounds hook to extract functions
  const [selctedAnswerId, setselctedAnswerId] = useState(null);
  const [questions, setquizzQuestions] = useState(quizzQuestions);
  // save score to display after quizz ended
  const [score, setscore] = useState(0);
  // display depend on scall
  const [displayresult, setdisplayresult] = useState(null);
  //================================================================
  const [classNameOfSelectedAns, setclassNameOfSelectedAns] = useState("");
  const [correctAnswer, setcorrectAnswer] = useState(null);

  const [endQuestionIndicator, setendQuestionIndicator] = useState(false);

  // use effect to detect the end state of quiz question and reset the correct answer
  useEffect(() => {
    setcorrectAnswer(questions[currentQuestion].correctAnswer);
    if (currentQuestion + 1 === questions.length) {
      setendQuestionIndicator(true);
    } else {
      setendQuestionIndicator(false);
    }
  }, [currentQuestion]);

  const handelNextquestion = () => {
    if (endQuestionIndicator) {
      setdisplayresult(100);
      setclassNameOfSelectedAns("");
      setselctedAnswerId(null);
      return;
    }
    if (selctedAnswerId === null) {
      return alert("please select answer");
    }
    setCurrentQuestion((prev) => prev + 1);
    setclassNameOfSelectedAns("");
    setselctedAnswerId(null);
  };
  const handelSelectAnswer = (answerId) => {
    selectSound();
    setselctedAnswerId(answerId);
    setclassNameOfSelectedAns("active");
  };
  // check if the selectedanswer is correct or not
  useEffect(() => {
    if (selctedAnswerId !== null) {
      if (selctedAnswerId === correctAnswer) {
        updateQuizStatstics(true);
        setscore((prev) => prev + 1);
        setTimeout(() => {
          setclassNameOfSelectedAns("active correct");
          correctSound();
        }, 1000);
      } else {
        setTimeout(() => {
          setclassNameOfSelectedAns("active wrong");
          wrongSound();
        }, 1000);
        updateQuizStatstics(false);
      }
    }
  }, [selctedAnswerId]);

  // function to update the statstics of the selctedquizz questions
  const updateQuizStatstics = (isCorrect) => {
    const updatedQuestionState = questions[currentQuestion];
    updatedQuestionState.answeredResult = isCorrect ? 1 : 0;
    updatedQuestionState.statistics.totalAttempts++;
    updatedQuestionState.statistics.correctAttempts += isCorrect ? 1 : 0;
    updatedQuestionState.statistics.incorrectAttempts += isCorrect ? 0 : 1;
  };

  useEffect(() => {
    if (selctedAnswerId !== null && timeOut) {
      handelNextquestion();
      setTimeOut(false);
      return;
    }
    if (timeOut) {
      if (!endQuestionIndicator && selctedAnswerId === null) {
        wrongSound();
        setCurrentQuestion((prev) => prev + 1);
        setclassNameOfSelectedAns("");
        updateQuizStatstics(false);
        setTimeOut(false);
        return;
      }
      if (endQuestionIndicator && selctedAnswerId !== null) {
        handelNextquestion();
        setTimeOut(false);
      }
      if (endQuestionIndicator && selctedAnswerId === null) {
        updateQuizStatstics(false);
        setdisplayresult(100);
        setTimeOut(false);
      }
    }
  }, [timeOut]);

  if (questions.length > 0) {
    return (
      <div className="rounded-md border w-full lg:w-9/12 lg:m-9 p-4 space-y-8 max-md:text-sm ">
        {/* question part */}
        <div className="flex items-center gap-2">
          <span className=" flex items-center ring ring-green-400 justify-center max-md:h-8 max-md:w-8 h-11 w-11 text-white p-3 bg-green-700 rounded-md shadow-md">
            {currentQuestion + 1}
          </span>
          {/*  question */}
          <p className="text-lg max-md:text-sm text-gray-900">
            {questions[currentQuestion].mainQuestion}
          </p>
        </div>
        <hr className="bg-gray-500" />
        {/* answers part */}
        <div className="flex flex-col gap-2 mt-7 md:ml-11 ">
          {questions[currentQuestion].choices.length > 0 &&
            questions[currentQuestion].choices.map((option, inx) => (
              <div
                key={inx}
                onClick={() => handelSelectAnswer(inx)}
                className={` ${
                  selctedAnswerId === inx && `${classNameOfSelectedAns}`
                } select-none ease-linear  transition-[background]  cursor-pointer text-gray-900 w-full border border-slate-600 p-3 rounded hover:bg-amber-400  capitalize`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                </div>
              </div>
            ))}
        </div>
        {/* submit & next buuton */}
        {!endQuestionIndicator ? (
          <NextButton handelNextquestion={handelNextquestion} />
        ) : (
          <SubmitButton setdisplayresult={setdisplayresult} />
        )}
        <ResulteScreen
          displayresult={displayresult}
          setdisplayresult={setdisplayresult}
          score={score}
          setscore={setscore}
          numberOfQues={questions.length}
          setCurrentQuestion={setCurrentQuestion}
          setclassNameOfSelectedAns={setclassNameOfSelectedAns}
          setselctedAnswerId={setselctedAnswerId}
          setendQuestionIndicator={setendQuestionIndicator}
          setTimeOut={setTimeOut}
        />
      </div>
    );
  }
  return (
    <div className="h-screen w-full center text-3xl text-green-600">
      {" "}
      no questions in this quiz
    </div>
  );
}

export default QuizzQuestions;

const NextButton = ({ handelNextquestion }) => {
  return (
    <button
      onClick={handelNextquestion}
      className="h-9  px-6  hover:bg-green-500 ml-auto flex items-center  outline-double outline-green-500 ease-linear transition-[background] active:scale-95 hover:text-white rounded-md "
    >
      Next
      <IoMdArrowDropright className="w-6 h-6 " />
    </button>
  );
};
const SubmitButton = ({ setdisplayresult }) => {
  return (
    <button
      onClick={() => setdisplayresult("showResultScreen")}
      className="h-9  px-6  bg-green-500 ml-auto flex items-center  outline-double outline-green-500 ease-linear transition-[background] active:scale-95 text-white rounded-md "
    >
      End Quizz
    </button>
  );
};
