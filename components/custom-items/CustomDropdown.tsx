"use client";

import { useState } from "react";

interface CustomDropdownProps {
  filter: string;
  setFilter: (value: string) => void;
  items: any[];
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  filter,
  items,
  setFilter,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectOption = (option: string) => {
    setFilter(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-32 mr-6 ">
      <button
        onClick={toggleDropdown}
        className="text-left w-full px-3 py-2 bg-[#afaeae08] text-[#191919] border border-gray-300 rounded-md shadow-sm"
      >
        <span>
          {filter
            ? items.find((item: any) => item.value === filter)?.name
            : items[0].name}
        </span>
        {!filter && <span className="text-zinc-400"> &#9660;</span>}{" "}
        {/* This is the down arrow symbol */}{" "}
      </button>
      {isOpen && (
        <div className="absolute top-0 w-full  bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {items.map((item: any, index: number) => (
            <div
              key={index}
              onClick={() => selectOption(item.value)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
