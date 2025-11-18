import React from "react";
import TaskItem from './TaskItem'
import { Reorder } from "framer-motion";
import { useContext } from "react";
import { TaskContext } from "../TaskContext";

const TaskContentContainer = () => {
  const {taskItems, setTaskItems} = useContext(TaskContext)

  return (
    <div className="task-list">
      <Reorder.Group
        values={taskItems}
        onReorder={setTaskItems}
        className="space-y-4"
      >
        {taskItems.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet.</p>
            <span>Add a task above to get started.</span>
          </div>
        ) : (
          taskItems.map((taskItem) => (
            <Reorder.Item value={taskItem} key={taskItem.id}>
              <TaskItem taskItem={taskItem} />
            </Reorder.Item>
          ))
        )}
      </Reorder.Group>
    </div>
  );
};

export default TaskContentContainer;
