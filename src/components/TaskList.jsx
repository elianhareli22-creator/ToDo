import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, onToggleTask, onUpdateTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return (
      <div className="emptyState">
        <p className="emptyStateText">
          No tasks found. Add a new task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <ul className="list">
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
