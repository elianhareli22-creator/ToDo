import { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import TaskFilters from './TaskFilters';
import { loadTasks, saveTasks } from '../utils/localStorage';
import styles from './TaskApp.module.css';

function TaskApp() {
  // Initialize tasks from localStorage so we don't overwrite with [] on first render
  const [tasks, setTasks] = useState(() => loadTasks());
  const [filter, setFilter] = useState('all');

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Generate unique ID for new tasks
  const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // Add a new task
  const handleAddTask = (text) => {
    const newTask = {
      id: generateId(),
      text: text,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Toggle task completion status
  const handleToggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Update task text
  const handleUpdateTask = (id, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  // Delete a task
  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Change filter
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Clear all completed tasks
  const handleClearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  // Filter tasks based on current filter
  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();
  const activeTaskCount = tasks.filter((task) => !task.completed).length;
  const hasCompletedTasks = tasks.some((task) => task.completed);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Task Manager
      </h1>
      
      <TaskInput onAddTask={handleAddTask} />
      
      <TaskFilters
        currentFilter={filter}
        onFilterChange={handleFilterChange}
        activeTaskCount={activeTaskCount}
        onClearCompleted={handleClearCompleted}
        hasCompletedTasks={hasCompletedTasks}
      />
      
      <TaskList
        tasks={filteredTasks}
        onToggleTask={handleToggleTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default TaskApp;
