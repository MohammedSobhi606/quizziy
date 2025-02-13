"use client";
import { useEffect, useState } from "react";

const CorrectAnswer = ({
  quizzQuestions,
  currentQuestion,
  setquizzQuestions,
}) => {
  // handle options
  const handleCorrectAns = (value) => {
    // update quizzQuestions
    const updatedQuestions = [...quizzQuestions];

    updatedQuestions[currentQuestion].correctAnswer = Number(value);
    setquizzQuestions(updatedQuestions);
  };

  return (
    <div>
      <div className="flex items-center  max-sm:flex-col max-sm:justify-center gap-4 w-full  ">
        <h1 className="text-xl max-sm:text-sm whitespace-nowrap ">
          Correct Answer:
        </h1>
        {/* choices */}
        <div className=" p-4 flex flex-col   gap-4 rounded-md">
          {/* radio group*/}
          <RadioGroup
            options={quizzQuestions[currentQuestion].choices}
            onChange={(e) => handleCorrectAns(e.target.value)}
            selectedOption={quizzQuestions[currentQuestion].correctAnswer}
          />
        </div>
      </div>
    </div>
  );
};

export default CorrectAnswer;

const RadioGroup = ({ options, name, selectedOption, onChange }) => {
  const alphabets = ["A", "B", "C", "D", "E"];

  return (
    <div className="grid grid-cols-2 gap-10 ">
      {options.map((option, optionIndex) => (
        <label
          key={optionIndex}
          className="flex items-center space-x-2 cursor-pointer "
        >
          <input
            type="radio"
            value={optionIndex}
            checked={selectedOption === optionIndex}
            onChange={onChange}
            className="appearance-none cursor-pointer w-5 h-5 border-2 border-gray-300 rounded-sm checked:bg-green-500 checked:border-green-500 focus:outline-none checked:ring-2 checked:ring-green-500 checked:ring-offset-2"
          />
          <span className="text-gray-800 font-bold text-xl hover:text-green-500">
            {alphabets[optionIndex]}
          </span>
        </label>
      ))}
    </div>
  );
};
