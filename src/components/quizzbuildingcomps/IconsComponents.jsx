"use client";

import quizIcons from "@/Icons";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const IconsComponents = ({
  setSelectedIconIndex,
  openBoxIcons,
  setopenBoxIcons,
}) => {
  const [icons, setIcons] = useState(quizIcons);
  // set selected icon
  const handleSelectIcon = (iconIndex) => {
    setSelectedIconIndex(iconIndex);
    setIcons(
      icons.map((icon, index) =>
        index === iconIndex
          ? { ...icon, is_selected: true }
          : { ...icon, is_selected: false }
      )
    );
  };

  return (
    <div
      className={`${
        openBoxIcons ? "" : "hidden"
      } bg-white border border-green-500 w-[60%] shadow-md max-md:w-[70%] max-sm:w-[80%] h-auto flex flex-col  gap-3 rounded-md fixed  z-10 left-[50%] translate-x-[-50%] translate-y-[-50%] top-[50%] p-4 smooth-appearance-top `}
    >
      <div className="flex justify-between items-center">
        {" "}
        <h1 className="text-3xl max-sm:text-sm font-bold capitalize text-green-500">
          Select Quiz Icon:
        </h1>
        {/* close button  */}
        <FontAwesomeIcon
          onClick={() => setopenBoxIcons(false)}
          icon={faClose}
          className="size-6 max-sm:size-4 py-1 text-red-700 cursor-pointer hover:text-green-500 px-4  border rounded-md"
        />
      </div>
      <div className="h-72 overflow-auto flex flex-wrap gap-4 p-4 rounded-md border shadow-md">
        {icons.map((icon, index) => (
          <FontAwesomeIcon
            key={index}
            onClick={() => handleSelectIcon(index)}
            icon={icon.icon}
            className={`${
              icon.is_selected
                ? "outline-green-500 text-green-500 outline-double"
                : "text-slate-700"
            } size-8 max-sm:size-5 py-1  cursor-pointer hover:text-green-500 px-4  border rounded-md`}
          />
        ))}
      </div>
      <div className="flex justify-end gap-4"></div>
    </div>
  );
};

export default IconsComponents;
