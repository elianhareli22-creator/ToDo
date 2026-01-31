import styles from './TaskFilters.module.css';

function TaskFilters({ currentFilter, onFilterChange, activeTaskCount, onClearCompleted, hasCompletedTasks }) {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.filtersContainer}>
        <div className={styles.filtersGroup}>
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`${styles.filterButton} ${
                currentFilter === filter.id
                  ? styles.filterButtonActive
                  : styles.filterButtonInactive
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div className={styles.infoContainer}>
          <span className={styles.taskCount}>
            {activeTaskCount} {activeTaskCount === 1 ? 'task' : 'tasks'} remaining
          </span>
          {hasCompletedTasks && (
            <button
              onClick={onClearCompleted}
              className={styles.clearButton}
            >
              Delete all completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskFilters;
