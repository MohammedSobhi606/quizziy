"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createRef,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import Choices from "./Choices";
import CorrectAnswer from "./CorrectAnswer";

const QuizzBuildQuestions = ({
  focusProp,
  quizzQuestions,
  setquizzQuestions,
}) => {
  const randomId = uuidv4();
  const { focus, setTitleFocus } = focusProp;

  const endOfListRef = useRef(); // to move down to last created question input
  // we will add it to the end of list with conditional rendering if length of list is equal index of question

  // auto focus functionality using textarea ref
  const textareaRefs = useRef(quizzQuestions.map(() => createRef()));

  function handleInputChange(questionIndex, value) {
    const updatedQuestions = quizzQuestions.map((q, i) =>
      i === questionIndex ? { ...q, mainQuestion: value } : q
    );
    setquizzQuestions(updatedQuestions);
  }

  function addNewQuestion() {
    setTitleFocus(false);
    if (quizzQuestions[quizzQuestions.length - 1].mainQuestion.trim() === "") {
      textareaRefs.current[textareaRefs.current.length - 1].current.focus();
      return toast.error(
        `you cannot add a new question as the question ${quizzQuestions.length} is empty`
      );
    }
    const newQuestion = {
      id: randomId,
      mainQuestion: "",
      choices: ["A.", "B."],
      correctAnswer: null,
      answeredResult: -1,
      statstics: {
        totalAttempts: 0,
        correctAttempts: 0,
        incorrectAttempts: 0,
      },
    };
    setquizzQuestions([...quizzQuestions, newQuestion]);
    textareaRefs.current = [...textareaRefs.current, createRef()]; // update textarea refs
  }

  function deleteQuestion(question) {
    const updatedQuestions = quizzQuestions.filter(
      (q, i) => q._id !== question._id
    );
    // filter refs also
    textareaRefs.current = textareaRefs.current.filter(
      (ref, i) => quizzQuestions[i].id !== question.id
    );
    setquizzQuestions(updatedQuestions);
  }

  useLayoutEffect(() => {
    // scroll to bottom when new question is added
    if (quizzQuestions.length > 0 && endOfListRef.current) {
      setTimeout(() => {
        endOfListRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
    // if quizzQuestions length is 0, we don't need to scroll to bottom.
  }, [quizzQuestions.length]);

  useEffect(() => {
    // auto focus on the last ref

    if (textareaRefs.current.length >= 0 && focus) {
      textareaRefs.current[textareaRefs.current.length - 1].current.focus();
    }
    // we should delete ref after delete the question on delete function
  }, [quizzQuestions.length]);

  return (
    <div className="border rounded-md p-4 shadow-md flex flex-col">
      <h1 className="text-2xl max-sm:text-sm mb-8 font-bold">
        Quizz Questions:
      </h1>{" "}
      <div className="flex flex-col gap-4 transition-all ease-linear duration-500">
        {quizzQuestions.map((question, questionIndex) => (
          <div
            key={questionIndex}
            ref={
              quizzQuestions.length - 1 === questionIndex ? endOfListRef : null
            }
            className="relative px-6 py-4 flex-col gap-8  flex   border border-fuchsia-900 rounded-md smooth-appearance-top"
          >
            <SingleQuizzQuestion
              ref={textareaRefs.current[questionIndex]}
              question={question}
              questionIndex={questionIndex}
              value={question.mainQuestion}
              onchange={(e) => {
                handleInputChange(questionIndex, e.target.value);
              }}
            />
            {/* delete icon */}
            {questionIndex !== 0 && (
              <FontAwesomeIcon
                onClick={() => deleteQuestion(question)}
                icon={faClose}
                className="absolute cursor-pointer active:scale-75 transition-[scale] ease-in-out right-1 top-1 text-red-600 size-4 bg-slate-200 p-2 rounded-full   "
              />
            )}

            <Choices
              questionIndex={questionIndex}
              question={question}
              quizzQuestions={quizzQuestions}
              setquizzQuestions={setquizzQuestions}
            />
            {/* correct answer */}
            <CorrectAnswer
              currentQuestion={questionIndex}
              question={question}
              quizzQuestions={quizzQuestions}
              setquizzQuestions={setquizzQuestions}
            />
          </div>
        ))}
      </div>
      <button
        onClick={addNewQuestion}
        className="self-center hover:bg-green-600   transition-all ease-in-out active:ring-2 ring-emerald-600  bg-green-500 mt-4 px-8 text-white py-2 rounded-md select-none"
      >
        + Add New Question{" "}
      </button>
    </div>
  );
};

export default QuizzBuildQuestions;

const SingleQuizzQuestion = forwardRef(function SingleQuizzQuestion(
  { questionIndex, value, onchange },
  ref
) {
  return (
    <div className="flex items-center max-sm:flex-col max-sm:justify-center gap-4 w-full">
      <h1 className="text-xl max-sm:text-sm  ">
        Question: {questionIndex + 1}
      </h1>

      <textarea
        onChange={onchange}
        type="text"
        value={value}
        ref={ref}
        className="flex-1 max-sm:text-sm max-sm:mx-1 mx-4 h-14 leading-none w-full resize-none outline-none text-lg   border p-4 rounded-md  focus:border-green-500"
        placeholder="Enter Your Question Here..."
      ></textarea>
    </div>
  );
});
