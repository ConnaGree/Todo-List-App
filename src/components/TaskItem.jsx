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
      <button
        onClick={handleCheck}
        className={`check-toggle ${taskItem.checked ? "checked" : ""}`}
        aria-label={taskItem.checked ? "Mark as incomplete" : "Mark as done"}
      >
        {taskItem.checked && <IoCheckmarkOutline />}
      </button>

      <div className="task-card__content">
        <p className={`task-card__title ${taskItem.checked ? "completed" : ""}`} style={{ fontSize: '1.2rem', fontWeight: '700' }}>
          {taskItem.value.toUpperCase()}
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <span className="task-card__meta">{`CREATED: ${taskItem.date}`}</span>
          {hasDueDate && <span className={`task-card__meta`} style={{ fontWeight: 'bold' }}>{`// DUE: ${formattedDueDate}`}</span>}
        </div>

        <div className="task-card__pills">
          <span className={`priority-chip ${taskItem.priority?.toLowerCase()}`}>
            [{taskItem.priority}]
          </span>
          {isOverdue && <span className="priority-chip high">OVERDUE</span>}
        </div>
      </div>

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
    </article>
  );
};

export default TaskItem;