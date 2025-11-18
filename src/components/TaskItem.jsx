import React, { useState, useContext } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GoTrash } from "react-icons/go";
import { TaskContext } from "../TaskContext";

const TaskItem = ({ taskItem }) => {
  const { taskItems, setTaskItems, handleEditTask, handleDeleteTask } =
    useContext(TaskContext);
  const [controlToggle, setControlToggle] = useState(false);

  const hasDueDate =
    taskItem.dueDate && taskItem.dueDate !== "No Due Date" ? true : false;
  const dueDate = hasDueDate ? new Date(taskItem.dueDate) : null;
  const now = new Date();
  const isOverdue = hasDueDate ? dueDate < now : false;

  const formattedDueDate = dueDate
    ? dueDate.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      })
    : "No due date";

  const dueLabel = hasDueDate
    ? isOverdue
      ? `Overdue • ${formattedDueDate}`
      : `Due ${formattedDueDate}`
    : "No due date";

  const dueState = hasDueDate ? (isOverdue ? "danger" : "success") : "idle";

  const handleCheck = () => {
    const updatedItems = taskItems.map((item) =>
      item.id === taskItem.id
        ? { ...taskItem, checked: !taskItem.checked }
        : item
    );
    setTaskItems(updatedItems);
  };

  return (
    <article className="task-card">
      <div className="task-card__left">
        <button
          onClick={handleCheck}
          className={`check-toggle ${taskItem.checked ? "checked" : ""}`}
          aria-label={taskItem.checked ? "Mark as incomplete" : "Mark as done"}
        >
          {taskItem.checked && <IoCheckmarkOutline />}
        </button>
        <div className="task-card__content">
          <p
            className={`task-card__title ${
              taskItem.checked ? "completed" : ""
            }`}
          >
            {taskItem.value}
          </p>
          <span className="task-card__meta">{`Created on ${taskItem.date}`}</span>
          <div className="task-card__pills">
            <span
              className={`priority-chip ${taskItem.priority?.toLowerCase()}`}
            >
              {taskItem.priority} priority
            </span>
            <span className={`due-chip ${dueState}`}>{dueLabel}</span>
          </div>
        </div>
      </div>

      <div className="controls__container">
        <div className="controls hidden md:flex items-center gap-[.8rem]">
          <button
            onClick={() => handleEditTask(taskItem)}
            className="icon-btn"
            aria-label="Edit task"
          >
            <FiEdit />
          </button>
          <button
            onClick={() => handleDeleteTask(taskItem)}
            className="icon-btn danger"
            aria-label="Delete task"
          >
            <GoTrash />
          </button>
        </div>

        <div className="mobile__controls-container md:hidden relative">
          <span
            onClick={() => setControlToggle((prev) => !prev)}
            className="toggle__btn text-[1.2rem] cursor-pointer"
            aria-label="Open task actions"
          >
            <BiDotsVerticalRounded />
          </span>
          {controlToggle && (
            <div className="mobile__controls-board">
              <button
                onClick={() => handleEditTask(taskItem)}
                className="icon-btn"
              >
                <FiEdit />
              </button>
              <button
                onClick={() => handleDeleteTask(taskItem)}
                className="icon-btn danger"
              >
                <GoTrash />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default TaskItem;