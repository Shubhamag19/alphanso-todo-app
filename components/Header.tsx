import React from "react";
import { IoSearchOutline } from "react-icons/io5";

interface HeaderProps {
  searchTerm: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isCompletedSelected: boolean;
  isIncompleteSelected: boolean;
  handleAllClick: () => void;
  handleCompletedClick: () => void;
  handleIncompleteClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  handleInputChange,
  isCompletedSelected,
  isIncompleteSelected,
  handleAllClick,
  handleCompletedClick,
  handleIncompleteClick,
}) => {
  return (
    <div className="md:flex md:items-center md:justify-between">
      <h1 className="text-2xl font-bold">Today</h1>
      <div className="mt-4 md:mt-0 md:grow md:mx-7 border-2 border-gray-300 rounded-full px-4 py-2 md:py-1 flex items-center gap-3">
        <div>
          <IoSearchOutline className="text-xl text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
          className="outline-none text-lg w-full"
        />
      </div>
      <div className="mt-6 md:mt-0 flex gap-4 md:gap-2">
        <button
          className={`px-2 py-0.5 text-white ${
            !isCompletedSelected && !isIncompleteSelected
              ? "bg-green-500"
              : "bg-gray-400"
          }`}
          onClick={handleAllClick}
        >
          All
        </button>
        <button
          className={`px-2 py-0.5 text-white ${
            isCompletedSelected ? "bg-green-500" : "bg-gray-400"
          }`}
          onClick={handleCompletedClick}
        >
          Completed
        </button>
        <button
          className={`px-2 py-0.5 text-white ${
            isIncompleteSelected ? "bg-green-500" : "bg-gray-400"
          }`}
          onClick={handleIncompleteClick}
        >
          Incomplete
        </button>
      </div>
    </div>
  );
};

export default Header;
