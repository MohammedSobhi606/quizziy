"use client";
import QuizzesArea from "@/components/QuizzesArea";
import Navbare from "@/components/Navbare";
import useMyContext from "@/context/quizzContext";
import { useEffect } from "react";

export default function Home() {
  const { quizToStartObjict } = useMyContext()
  const { setstartquizzId } = quizToStartObjict
  useEffect(() => {
    setstartquizzId(null) // reset quiz id when navigating to new route
  }, [])
  return (
    <>

      <header >
        <Navbare />
      </header>
      <QuizzesArea />
    </>
  );
}
