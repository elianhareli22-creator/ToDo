# Task Manager Application

A modern, feature-rich Task Manager application built with React 19 and Vite. This application demonstrates component-based architecture, state management with React Hooks, localStorage persistence, and comprehensive unit testing.

## Features

- **Task Management**: Add, edit, toggle completion, and delete tasks
- **Filtering**: View all tasks, active tasks, or completed tasks
- **Persistence**: Automatic saving to localStorage
- **Task Counter**: Display count of remaining active tasks
- **Clear Completed**: Remove all completed tasks with one click
- **Modern UI**: Beautiful, responsive design with native CSS and CSS Modules
- **Accessibility**: Proper focus states and keyboard navigation

## Technology Stack

- **React 19**: Latest React with functional components and hooks
- **Vite**: Fast build tool and development server
- **CSS Modules**: Scoped styling for component-based architecture
- **Vitest**: Fast unit test framework
- **React Testing Library**: Testing utilities for React components

##  Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd "ToDo Task"
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## 🏃 Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in the terminal).

### Build for Production

Create an optimized production build:
```bash
npm run build
```

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## 🧪 Running Tests

Run the unit tests:
```bash
npm test
```

The test suite includes comprehensive tests for `TaskInput` and `TaskItem` components, covering:
- User interactions (clicks, typing, form submissions)
- Component functionality (add, edit, delete, toggle)
- Input validation
- Edge cases

## 📁 Project Structure

```
/Users/adinizri/ToDo Task/
├── package.json
├── vite.config.js
├── vitest.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── README.md
├── src/
│   ├── main.jsx              # Application entry point
│   ├── App.jsx               # Root component
│   ├── index.css             # Global base styles
│   ├── App.css               # App-level styles
│   ├── components/
│   │   ├── TaskApp.jsx       # Main container component (state management)
│   │   ├── TaskApp.module.css
│   │   ├── TaskInput.jsx     # Task input form component
│   │   ├── TaskInput.module.css
│   │   ├── TaskList.jsx      # Task list container component
│   │   ├── TaskList.module.css
│   │   ├── TaskItem.jsx      # Individual task item component
│   │   ├── TaskItem.module.css
│   │   ├── TaskFilters.jsx   # Filter controls component
│   │   └── TaskFilters.module.css
│   ├── utils/
│   │   └── localStorage.js   # localStorage utility functions
│   ├── test/
│   │   └── setup.js          # Test configuration
│   └── __tests__/
│       ├── TaskInput.test.jsx
│       └── TaskItem.test.jsx
└── public/
```

## 🧩 Component Responsibilities

### TaskApp
- **Purpose**: Main container component managing global application state
- **Responsibilities**:
  - Manages tasks array and filter state using `useState`
  - Handles all CRUD operations (add, update, delete, toggle)
  - Syncs with localStorage using `useEffect`
  - Implements filtering logic
  - Renders all child components and passes handlers as props

### TaskInput
- **Purpose**: Handles user input for creating new tasks
- **Responsibilities**:
  - Provides text input field with submit button
  - Validates input (prevents empty submissions)
  - Calls parent's `onAddTask` handler with task text
  - Clears input after successful submission

### TaskList
- **Purpose**: Renders the collection of tasks
- **Responsibilities**:
  - Receives filtered tasks array from parent
  - Maps over tasks to render `TaskItem` components
  - Displays empty state message when no tasks match the filter
  - Passes task handlers to individual `TaskItem` components

### TaskItem
- **Purpose**: Renders and manages individual task items
- **Responsibilities**:
  - Displays task text with completion status
  - Provides inline editing functionality
  - Handles toggle completion via checkbox
  - Manages delete functionality with confirmation
  - Supports keyboard shortcuts (Enter to save, Escape to cancel)

### TaskFilters
- **Purpose**: Provides filtering and task management controls
- **Responsibilities**:
  - Displays filter buttons (All, Active, Completed)
  - Highlights the currently active filter
  - Shows count of remaining active tasks
  - Provides "Clear Completed" button when applicable
  - Calls parent's filter change handler

### localStorage Utility
- **Purpose**: Manages data persistence
- **Functions**:
  - `loadTasks()`: Retrieves tasks from localStorage
  - `saveTasks(tasks)`: Saves tasks array to localStorage
  - Handles errors gracefully, returns empty array on failure

## 🔄 Data Flow

```
TaskApp (State Container)
  ├── TaskInput → addTask()
  ├── TaskFilters → setFilter(), clearCompleted()
  └── TaskList → filtered tasks
      └── TaskItem → toggleTask(), updateTask(), deleteTask()
```

All state changes flow upward to `TaskApp`, which updates localStorage and re-renders child components with new data.

## 🎨 Styling

The application uses native CSS with CSS Modules for styling, providing:
- Component-scoped styles using CSS Modules
- Responsive design that works on all screen sizes
- Dark mode support via CSS media queries
- Smooth transitions and hover effects
- Accessible focus states
- Modern, clean UI design

## 📝 Key Features Implementation

### Unique Task IDs
Tasks are assigned unique IDs using `crypto.randomUUID()` with a fallback to timestamp-based IDs for compatibility.

### localStorage Persistence
Tasks are automatically saved to localStorage on every state change and loaded on application mount. The storage key is `taskManager_tasks`.

### Filtering
Three filter modes:
- **All**: Shows all tasks
- **Active**: Shows only incomplete tasks
- **Completed**: Shows only completed tasks

The active filter is visually highlighted with a different background color.

### Inline Editing
Tasks can be edited by clicking the "Edit" button or clicking directly on the task text. Editing supports:
- Save on Enter key or Save button
- Cancel on Escape key or Cancel button
- Auto-save on blur

## 🧪 Testing

The application includes comprehensive unit tests using Vitest and React Testing Library:

- **TaskInput Tests**: Input validation, form submission, whitespace handling
- **TaskItem Tests**: Toggle completion, edit functionality, delete with confirmation, keyboard shortcuts

Run tests with `npm test`.

## 📄 License

This project is created for educational purposes as a university assignment.

## 👨‍💻 Development Notes

- Uses only React Hooks (`useState`, `useEffect`) for state management
- No external routing libraries (single-page application)
- Zero console errors or warnings
- Clean, readable code with meaningful variable names
- Functional components only (no class components)
