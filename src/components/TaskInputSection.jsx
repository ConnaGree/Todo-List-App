import { useContext } from "react";
import { TaskContext } from "../TaskContext";
import { GoPlus } from "react-icons/go";
import PriorityDropdown from "./PriorityDropdown";

const TaskInputSection = () => {
  const {
    inputTaskItem,
    priority,
    setInputTaskItem,
    setPriority,
    setDueDate,
    handleAddTaskItem,
  } = useContext(TaskContext);

  return (
    <div className="task-input-grid">
      <input
        value={inputTaskItem}
        onChange={(e) => setInputTaskItem(e.target.value)}
        type="text"
        className="task-field col-span-2 md:col-span-3"
        placeholder="ENTER_OBJECTIVE..."
      />
      <PriorityDropdown
        value={priority}
        onChange={setPriority}
      />
      <input
        type="date"
        className="task-field"
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={handleAddTaskItem} className="primary-btn w-full flex items-center gap-3">
        <GoPlus />
        INITIALIZE_TASK
      </button>
    </div>
  );
}
export default TaskInputSection