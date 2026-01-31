import { useState } from 'react';
import styles from './TaskItem.module.css';

function TaskItem({ task, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(task.text);
  };

  const handleSave = () => {
    const trimmedValue = editValue.trim();
    if (trimmedValue && trimmedValue !== task.text) {
      onUpdate(task.id, trimmedValue);
    } else if (!trimmedValue) {
      setEditValue(task.text);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(task.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleDelete = () => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/132e220e-9b56-43ec-941c-97e6e29d6314',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'TaskItem.jsx:handleDelete-entry',message:'handleDelete invoked',data:{taskId:task.id},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2-H3'})}).catch(()=>{});
    // #endregion
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  return (
    <li className={styles.taskItem}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className={styles.checkbox}
      />
      
      {isEditing ? (
        <div className={styles.editContainer}>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            autoFocus
            className={styles.editInput}
          />
          <button
            onClick={handleSave}
            className={`${styles.actionButton} ${styles.saveButton}`}
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className={`${styles.actionButton} ${styles.cancelButton}`}
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <span
            onClick={handleEdit}
            className={`${styles.taskText} ${
              task.completed ? styles.taskTextCompleted : ''
            }`}
          >
            {task.text}
          </span>
          <button
            onClick={handleEdit}
            className={styles.editButton}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className={styles.deleteButton}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}

export default TaskItem;
