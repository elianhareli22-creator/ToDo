import './TaskFilters.css';
import { filters } from '../constants/filters';

function TaskFilters({ currentFilter, onFilterChange, activeTaskCount, onClearCompleted, hasCompletedTasks }) {

  return (
    <div className="container">
      <div className="filtersContainer">
        <div className="filtersGroup">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`filterButton ${
                currentFilter === filter.id
                  ? 'filterButtonActive'
                  : ''
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div className="infoContainer">
          <span className="taskCount">
            {activeTaskCount} {activeTaskCount === 1 ? 'task' : 'tasks'} remaining
          </span>
          {hasCompletedTasks && (
            <button
              onClick={onClearCompleted}
              className="clearButton"
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
