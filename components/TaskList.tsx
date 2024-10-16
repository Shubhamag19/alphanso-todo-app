import React from "react";
import { IoIosClose } from "react-icons/io";
import { FaRegCircle } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import { Task } from "@/types/TaskType";

interface TaskListProps {
  displayUserTasks: Task[];
  handleTaskStatusUpdate: (id: string, status: boolean) => void;
  handleDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  displayUserTasks,
  handleTaskStatusUpdate,
  handleDeleteTask,
}) => {
  return (
    <div className="mt-6">
      {displayUserTasks?.map((singleTask) => {
        const { id, task, isCompleted } = singleTask;
        return (
          <div
            key={id}
            className={`flex items-center justify-between w-full mb-4 border-2 border-gray-300 py-3 px-4 rounded-md ${
              isCompleted ? "bg-green-100 border-green-400" : ""
            }`}
          >
            <div className="flex gap-3 items-center">
              {isCompleted ? (
                <IoIosCheckmarkCircleOutline
                  className="cursor-pointer text-green-500 scale-150"
                  onClick={() => handleTaskStatusUpdate(id, false)}
                />
              ) : (
                <FaRegCircle
                  className="cursor-pointer text-gray-400 scale-125"
                  onClick={() => handleTaskStatusUpdate(id, true)}
                />
              )}
              <p className="">{task}</p>
            </div>
            <IoIosClose
              className="text-2xl scale-150 text-gray-300 cursor-pointer hover:text-red-400"
              onClick={() => handleDeleteTask(id)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
