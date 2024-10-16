import React from "react";

interface AddTaskProps {
  currentTask: string;
  handleTaskChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleAddTask: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({
  currentTask,
  handleTaskChange,
  handleKeyDown,
  handleAddTask,
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Type something"
        value={currentTask}
        onChange={handleTaskChange}
        onKeyDown={handleKeyDown}
        className="w-full outline-none py-3 px-4 rounded-md border-2 border-gray-300"
      />
      <div className="mt-4 pb-8">
        <button
          className="text-white bg-black w-full py-3 rounded-md"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTask;
