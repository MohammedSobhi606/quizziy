"use client";
import QuizzQuestions from "@/components/QuizzQuestions";
import QuizzStartHeader from "@/components/QuizzStartHeader";
import useMyContext from "@/context/quizzContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function page({}) {
  const { quizToStartObjict, allquizzes } = useMyContext();
  const { startquizzId } = quizToStartObjict;
  const router = useRouter();
  // عملنا كده ليه ؟ عشان وقعنا فخطا ان مينفعش نحدث الاستيت الا اما نستخدم يوزافكت او اي ايفنت هاندلر
  const [timeOut, setTimeOut] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleStartQuiz = () => {
    setTimeout(() => {
      router.push(`/`);
    }, 1000);
  };
  useEffect(() => {
    if (!startquizzId) {
      handleStartQuiz();
    }
  }, []);

  const selectedQuiz = allquizzes.find((q) => q.id === startquizzId);
  if (!startquizzId) {
    return (
      // if no quiz to start, render a placeholder message
      <div className="center flex-col h-screen w-full">
        <Image
          width={250}
          height={250}
          src={"/quizzAssets/error-svgrepo-com.svg"}
          alt="selecte a quizz "
          priority
        />
        <h2 className="font-bold text-xl text-slate-800">No Quiz Selected</h2>
        <p className="text-lg font-thin text-slate-700">
          Please select a quiz to start.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-[35px] px-4 lg:px-24">
      {/* quizz start header */}
      <QuizzStartHeader
        title={selectedQuiz.title}
        icon={selectedQuiz.icon}
        description={selectedQuiz.description}
        numberOfquestions={selectedQuiz.quizzQuestions.length}
        setTimeOut={setTimeOut}
        currentQuestion={currentQuestion}
      />
      <div className="mt-10 center ">
        {/* questions */}
        <QuizzQuestions
          questions={selectedQuiz.quizzQuestions}
          selectedQuiz={selectedQuiz}
          setCurrentQuestion={setCurrentQuestion}
          currentQuestion={currentQuestion}
          timeOut={timeOut}
          setTimeOut={setTimeOut}
        />
      </div>
    </div>
  );
}
export default page;
