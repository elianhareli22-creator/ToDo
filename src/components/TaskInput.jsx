import { useState } from 'react';
import './TaskInput.css';

function TaskInput({ onAddTask }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    
    if (trimmedValue) {
      onAddTask(trimmedValue);
      setInputValue('');
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="inputContainer">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Add a new task..."
          className="input"
        />
        <button
          type="submit"
          className="button"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default TaskInput;
