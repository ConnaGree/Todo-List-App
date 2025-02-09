import React, { useState, useContext } from 'react'
import { IoCheckmarkOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GoTrash } from "react-icons/go";
import { TaskContext } from '../TaskContext';

const TaskItem = ({taskItem}) => {
  const { taskItems, setTaskItems, handleEditTask, handleDeleteTask} = useContext(TaskContext);
  const [controlToggle, setControlToggle] = useState(false);

  // Due Date Calculation
  const isOverdue = new Date(taskItem.dueDate) < new Date();
  
  // Check Task
  const handleCheck = () => {
    const updatedItems = taskItems.map((item) =>
      item.id === taskItem.id
        ? { ...taskItem, checked: !taskItem.checked }
        : item
    );
    setTaskItems(updatedItems);
  };



  return (
    <div className="flex items-center justify-between border-[1px] p-[1rem] mb-[1rem]">
      <div className="left__section">
        <div className="task__desc flex items-center gap-[1rem]">
          <div
            className="check__box w-[30px] h-[30px] border-[1px]"
            onClick={handleCheck}
          >
            {taskItem.checked ? (
              <span className="w-full h-full bg-blue-600 p-1 flex shrink-0 items-center justify-center text-white">
                <IoCheckmarkOutline />
              </span>
            ) : (
              ""
            )}
          </div>
          <span
            className={`${
              taskItem.checked ? "line-through text-gray-500" : ""
            } flex items-center gap-[1rem] text-[.8rem]`}
          >
            {taskItem.value}{" "}
            <span className="date text-[.8rem] text-gray-400">{`created on ${taskItem.date}`}</span>
          </span>
        </div>
        <div className="flex items-center mt-4 gap-4">
          <span
            className={`task-priority w-[100px] text-[.8rem] ml-[3rem] px-[1rem] py-[.3rem] rounded-[50px] text-white ${taskItem.priority}`}
          >
            {taskItem.priority}
          </span>{" "}
          <span
            className={`w-[150px] text-[.8rem] px-[1rem] py-[.3rem] rounded-[50px] ${
              isOverdue ? "bg-red-500" : "bg-green-500"
            }`}
          >
            Due {taskItem.dueDate}
          </span>
        </div>
      </div>
      <div className="controls__container">
        <div className="controls hidden md:flex items-center gap-[.8rem]">
          <button
            onClick={() => handleEditTask(taskItem)}
            className="edit__btn p-2 text-white text-[1.2rem]"
          >
            <FiEdit />
          </button>
          <button
            onClick={() => handleDeleteTask(taskItem)}
            className="delete__btn p-2  text-white text-[1.2rem]"
          >
            <GoTrash />
          </button>
        </div>

        <div className="mobile__controls-container md:hidden relative">
          <span
            onClick={() => setControlToggle(true)}
            className="toggle__btn text-[1.2rem] cursor-pointer"
          >
            <BiDotsVerticalRounded />
          </span>
          {controlToggle && (
            <div className="mobile__controls-board absolute top-[1rem] right-[.6rem] bg-[#212733] shadow p-[1rem] rounded-[.5rem]">
              <button
                onClick={() => handleEditTask(taskItem)}
                className="edit__btn p-2 text-white text-[1.2rem]"
              >
                <FiEdit />
              </button>
              <button
                onClick={() => handleDeleteTask(taskItem)}
                className="delete__btn p-2  text-white text-[1.2rem]"
              >
                <GoTrash />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

}

export default TaskItem;