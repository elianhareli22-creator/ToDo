# Task Manager Application

A modern Task Manager application built with React 19 and Vite. Manage your tasks with features like adding, editing, completing, and deleting tasks. Tasks are automatically saved to localStorage and can be filtered by status.

## Features

- Add, edit, toggle completion, and delete tasks
- Filter tasks by All, Active, or Completed
- Automatic localStorage persistence
- Task counter showing remaining active tasks
- Clear all completed tasks

## Components

### TaskApp
Main container component that manages global application state. **Responsibility**: Handles all CRUD operations (add, update, delete, toggle), manages tasks array and filter state, syncs with localStorage, and renders all child components.

### TaskInput
Component for creating new tasks. **Responsibility**: Provides text input field with submit button, validates input to prevent empty submissions, and calls parent's `onAddTask` handler with task text.

### TaskList
Component that renders the collection of tasks. **Responsibility**: Receives filtered tasks array from parent, maps over tasks to render `TaskItem` components, and displays empty state message when no tasks match the filter.

### TaskItem
Component that displays and manages individual task items. **Responsibility**: Displays task text with completion status, provides inline editing functionality, handles toggle completion via checkbox, manages delete functionality with confirmation, and supports keyboard shortcuts (Enter to save, Escape to cancel).

### TaskFilters
Component that provides filtering and task management controls. **Responsibility**: Displays filter buttons (All, Active, Completed), highlights the currently active filter, shows count of remaining active tasks, and provides "Clear Completed" button when applicable.

## Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

## Running Tests

Run the unit tests:
```bash
npm test
```

The test suite includes tests for `TaskInput` and `TaskItem` components, covering user interactions, component functionality, input validation, and edge cases.
