"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Task } from "@/types/TaskType";

import Header from "@/components/Header";
import TaskList from "@/components/TaskList";
import AddTask from "@/components/AddTask";

import { debounce } from "@/utility/Debounce";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCompletedSelected, setIsCompletedSelected] = useState(false);
  const [isIncompleteSelected, setIsIncompleteSelected] = useState(false);

  const [currentTask, setCurrentTask] = useState("");

  const [userTasks, setUserTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("userTasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    }
    return [];
  });
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [displayUserTasks, setDisplayUserTasks] = useState<Task[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    console.log(term);
    setSearchTerm(term);
  };

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTask(e.target.value);
  };

  const handleAllClick = () => {
    setIsCompletedSelected(false);
    setIsIncompleteSelected(false);
  };

  const handleCompletedClick = () => {
    setIsCompletedSelected((prev) => !prev);
    setIsIncompleteSelected(false);
  };

  const handleIncompleteClick = () => {
    setIsIncompleteSelected((prev) => !prev);
    setIsCompletedSelected(false);
  };

  const handleAddTask = () => {
    if (currentTask) {
      setUserTasks((prevTasks) => {
        return [
          ...prevTasks,
          {
            id: uuidv4(),
            task: currentTask,
            isCompleted: false,
          },
        ];
      });
      setCurrentTask("");
    }
  };

  const handleTaskStatusUpdate = (id: string, status: boolean) => {
    setUserTasks((prevTasks) => {
      return prevTasks.map((task) => {
        return task.id === id ? { ...task, isCompleted: status } : task;
      });
    });
  };

  const handleDeleteTask = (id: string) => {
    setUserTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== id);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userTasks", JSON.stringify(userTasks));
    }
  }, [userTasks]);

  useEffect(() => {
    if (searchTerm) {
      if (isCompletedSelected) {
        setDisplayUserTasks(
          filteredTasks.filter((task) => task.isCompleted === true)
        );
      } else if (isIncompleteSelected) {
        setDisplayUserTasks(
          filteredTasks.filter((task) => task.isCompleted === false)
        );
      } else {
        setDisplayUserTasks(filteredTasks);
      }
    } else {
      if (isCompletedSelected) {
        setDisplayUserTasks(
          userTasks.filter((task) => task.isCompleted === true)
        );
      } else if (isIncompleteSelected) {
        setDisplayUserTasks(
          userTasks.filter((task) => task.isCompleted === false)
        );
      } else {
        setDisplayUserTasks(userTasks);
      }
    }
  }, [
    filteredTasks,
    userTasks,
    searchTerm,
    isCompletedSelected,
    isIncompleteSelected,
  ]);

  const debouncedFilter = debounce((term: string) => {
    if (term) {
      setFilteredTasks(
        userTasks.filter((singleTask) =>
          singleTask.task.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setFilteredTasks(userTasks);
    }
  }, 500);

  useEffect(() => {
    debouncedFilter(searchTerm);
  }, [searchTerm, userTasks]);

  return (
    <div className="mt-[10vh] w-[90%] mx-auto md:w-[75%] lg:w-[65%]">
      <Header
        searchTerm={searchTerm}
        handleInputChange={handleInputChange}
        isCompletedSelected={isCompletedSelected}
        isIncompleteSelected={isIncompleteSelected}
        handleAllClick={handleAllClick}
        handleCompletedClick={handleCompletedClick}
        handleIncompleteClick={handleIncompleteClick}
      />

      <TaskList
        displayUserTasks={displayUserTasks}
        handleTaskStatusUpdate={handleTaskStatusUpdate}
        handleDeleteTask={handleDeleteTask}
      />

      <AddTask
        currentTask={currentTask}
        handleTaskChange={handleTaskChange}
        handleKeyDown={handleKeyDown}
        handleAddTask={handleAddTask}
      />
    </div>
  );
}
