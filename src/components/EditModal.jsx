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
        <h1>MODIFY_TASK_PARAMETERS</h1>

        <div className="modal-content__fields">
          <input
            className="task-field"
            type="text"
            placeholder="TASK_DESIGNATION..."
            value={currentTask.value}
            onChange={(e) => handleInputUpdate(e)}
            style={{ border: '2px solid #000' }}
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
            style={{ border: '2px solid #000' }}
          />
        </div>

        <div className="modal-content__actions">
          <button
            onClick={handleSaveTask}
            className="primary-btn"
          >
            CONFIRM_EDITS
          </button>
          <button
            onClick={handleCancelEdit}
            className="primary-btn"
            style={{ background: '#fff', color: '#000' }}
          >
            ABORT
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditModal;
