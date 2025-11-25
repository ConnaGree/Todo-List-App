import { TaskContext } from "../TaskContext";
import { useContext } from "react";
import PriorityDropdown from "./PriorityDropdown";

const EditModal = () => {
  const {
    handleCancelEdit,
    handleInputUpdate,
    handlePriorityUpdate,
    handleDateUpdate,
    handleSaveTask,
    isEditModalOpen,
    currentTask
  } = useContext(TaskContext);


  if (!isEditModalOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h1>Edit Task</h1>

        <div className="modal-content__fields">
          <input
            className="task-field"
            type="text"
            placeholder="Task name..."
            value={currentTask.value}
            onChange={(e) => handleInputUpdate(e)}
          />

          <PriorityDropdown
            value={currentTask.priority}
            onChange={(value) => handlePriorityUpdate({ target: { value } })}
          />

          <input
            type="date"
            className="task-field"
            value={currentTask.dueDate}
            onChange={handleDateUpdate}
          />
        </div>

        <div className="modal-content__actions">
          <button
            onClick={handleSaveTask}
            className="primary-btn"
          >
            Save Changes
          </button>
          <button
            onClick={handleCancelEdit}
            className="secondary-btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditModal;
