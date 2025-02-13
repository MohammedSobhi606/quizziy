import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";

const Choices = ({
  questionIndex,
  question,
  quizzQuestions,
  setquizzQuestions,
}) => {
  const alphabets = ["A.", "B.", "C.", "D.", "E."];
  const position = ["first", "second", "third", "fourth", "fifth"];
  // destructure the question choices
  const { choices } = question;
  // function to add new choice with a limit to five choices
  const addNewChoice = () => {
    // check if last choice is empty
    if (
      choices[choices.length - 1].trim() ===
      alphabets[choices.length - 1] + ""
    ) {
      toast.error("You cannot add a new choice as the last choice is empty");
      return;
    }

    if (choices.length >= 5) {
      return toast.error("You cannot add more than 5 choices");
    }
    // copy quizz questions
    const updatedQuestions = [...quizzQuestions];
    // add new choice to the question

    const newChoice = `${
      alphabets[updatedQuestions[questionIndex].choices.length]
    }`;
    // reset correct answer
    updatedQuestions[questionIndex].choices.push(newChoice);
    setquizzQuestions(updatedQuestions);
  };
  // function to delete a choice
  const deleteChoice = (choiceIndex) => {
    // copy quizz questions
    const updatedQuestions = [...quizzQuestions];
    // reset correct answer
    updatedQuestions[questionIndex].correctAnswer = null;
    updatedQuestions[questionIndex].choices.splice(choiceIndex, 1);

    setquizzQuestions(updatedQuestions);
  };
  // function to handle choice input change
  const handleChoiceInput = (value, choiceIndex, questionIndex) => {
    // copy quizz questions
    const updatedQuestions = [...quizzQuestions];
    updatedQuestions[questionIndex].choices[choiceIndex] =
      alphabets[choiceIndex] + value;
    setquizzQuestions(updatedQuestions);
  };
  return (
    <div className="flex items-center  max-sm:flex-col max-sm:justify-center gap-4 w-full ">
      <h1 className="text-xl max-sm:text-sm  ">Choices:</h1>
      {/* choices */}
      <div className="border border-black p-4 flex flex-col w-full gap-4 rounded-md">
        {/* choicies */}
        {choices?.map((choice, choiceIndex) => (
          <div
            key={choiceIndex}
            className="flex  items-center relative smooth-appearance-top"
          >
            <span className="font-bold text-lg">{alphabets[choiceIndex]}</span>
            <textarea
              value={choice.substring(2)}
              autoFocus
              onChange={(e) =>
                handleChoiceInput(e.target.value, choiceIndex, questionIndex)
              }
              type="text"
              className=" flex-1 max-sm:text-sm max-sm:mx-1 mx-4 h-14 leading-none w-full resize-none outline-none text-lg   border p-4 pr-4 rounded-md  focus:border-green-500"
              placeholder={`Enter your ${position[choiceIndex]} Choice ...`}
            ></textarea>{" "}
            {choiceIndex >= 2 && (
              <FontAwesomeIcon
                onClick={() => deleteChoice(choiceIndex)}
                icon={faClose}
                className="absolute  cursor-pointer active:scale-75 transition-[scale] ease-in-out right-6 top-4 text-red-600 size-4 bg-slate-200 p-1 rounded-full  "
              />
            )}
          </div>
        ))}

        {/* add more choices button */}

        <button
          onClick={addNewChoice}
          className="self-end hover:bg-emerald-600   transition-all ease-in-out active:ring-2 ring-emerald-600  bg-emerald-500 mt-4 px-8 text-white py-2 rounded-md select-none"
        >
          + Add More Choices{" "}
        </button>
      </div>
    </div>
  );
};
export default Choices;
