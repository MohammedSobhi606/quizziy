import useMyContext from "@/context/quizzContext";
import { createQuiz, modifyQuiz } from "@/utils/ApiFuncs";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "../Loader";
import { useState } from "react";

const QuizzbuildHeder = ({ newQuiz, quizzQuestions }) => {
  const { allquizzes, setAllquizzes, mode, user } = useMyContext();
  const [loading, setLoading] = useState(false);
  const { setUpdateMode, UpdateMode } = mode;
  const router = useRouter();
  // function to validate all fields of new quiz  and all questions
  const validateQuiz = () => {
    // validate quiz title
    if (!newQuiz.title.trim("")) {
      return { valid: false, message: "Please enter a quiz title" };
    }
    // validate questions
    for (let question of quizzQuestions) {
      // check if main question is empty
      if (!question.mainQuestion.trim("")) {
        return { valid: false, message: "Please enter a question" };
      }
      // check if all choices are filled
      if (question.choices.some((choice) => !choice.trim("").substring(2))) {
        return {
          valid: false,
          message: "Please fill at least 2 choices for a question",
        };
      }
      // check if correct answer is selected
      if (question.correctAnswer === null) {
        return {
          valid: false,
          message: `Please select a correct answer for  this question=> ${question.mainQuestion}`,
        };
      }
    }
    return { valid: true };
    // validate each question
  };

  const handleSaveQuiz = async () => {
    const { valid, message } = validateQuiz();

    if (!valid) {
      return toast.error(message);
    }

    if (UpdateMode) {
      setLoading(true);
      await modifyQuiz(newQuiz._id, newQuiz);
      setUpdateMode(false);
      // update the quiz in state
      allquizzes.forEach((quiz, index) => {
        if (quiz._id === newQuiz._id) {
          allquizzes[index] = newQuiz;
        }
      });
      setAllquizzes([...allquizzes]);
      window.location.assign("/");
      router.push("/");
      toast.success("Quiz updated successfully");
      setLoading(true);
      return;
    }
    setLoading(true);
    await createQuiz(user.userId, newQuiz); // save quiz to database
    // update state
    setAllquizzes([...allquizzes, newQuiz]);
    setLoading(false);
    // clear all inputs and reset state
    toast.success("Quiz saved successfully!");
    window.location.assign("/");
    router.push("/");
  };

  return (
    <header className="flex  max-sm:flex-col gap-4  items-center justify-between  ">
      <div className="center gap-4 capitalize  ">
        <img
          src="/quizzAssets/clipboard-add.svg"
          className="max-md:size-12 size-20 bg-slate-200 rounded-full p-2"
          alt=""
        />
        <div className="text-2xl font-bold space-x-2">
          {" "}
          <span>quizz</span>
          <span className=" text-green-500">builder</span>
        </div>
      </div>
      <button
        onClick={handleSaveQuiz}
        className="px-8 bg-gradient-to-r from-green-700 to-emerald-400 hover:from-green-700 hover:to-emerald-400  hover:bg-gradient-to-l   active:scale-95  shadow-lg py-2 capitalize rounded-md text-white  ease-in-out transition-[background] duration-300"
      >
        {loading ? (
          <Loader color={"white"} />
        ) : UpdateMode ? (
          "Update Quiz"
        ) : (
          "Save"
        )}
      </button>
    </header>
  );
};

export default QuizzbuildHeder;
