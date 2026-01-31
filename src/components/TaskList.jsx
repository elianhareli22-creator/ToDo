import TaskItem from './TaskItem';
import styles from './TaskList.module.css';

function TaskList({ tasks, onToggleTask, onUpdateTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyStateText}>
          No tasks found. Add a new task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
