import { useContext } from "react";
import { TaskContext } from "../TaskContext";
import { GoPlus } from "react-icons/go";

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
        placeholder="Capture a new task..."
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="task-field"
      >
        <option value="Low">Low priority</option>
        <option value="Medium">Medium priority</option>
        <option value="High">High priority</option>
      </select>
      <input
        type="date"
        className="task-field"
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={handleAddTaskItem} className="primary-btn w-full">
        <GoPlus />
        Add task
      </button>
    </div>
  );
}
export default TaskInputSection