import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskInput from '../components/TaskInput';

describe('TaskInput', () => {
  it('renders input field and submit button', () => {
    const mockAddTask = vi.fn();
    render(<TaskInput onAddTask={mockAddTask} />);

    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('calls onAddTask handler when form is submitted with valid input', async () => {
    const user = userEvent.setup();
    const mockAddTask = vi.fn();
    render(<TaskInput onAddTask={mockAddTask} />);

    const input = screen.getByPlaceholderText('Add a new task...');
    const submitButton = screen.getByRole('button', { name: /add/i });

    await user.type(input, 'New task');
    await user.click(submitButton);

    expect(mockAddTask).toHaveBeenCalledTimes(1);
    expect(mockAddTask).toHaveBeenCalledWith('New task');
  });

  it('clears input after submission', async () => {
    const user = userEvent.setup();
    const mockAddTask = vi.fn();
    render(<TaskInput onAddTask={mockAddTask} />);

    const input = screen.getByPlaceholderText('Add a new task...');
    const submitButton = screen.getByRole('button', { name: /add/i });

    await user.type(input, 'New task');
    await user.click(submitButton);

    expect(input).toHaveValue('');
  });

  it('does not call onAddTask when input is empty', async () => {
    const user = userEvent.setup();
    const mockAddTask = vi.fn();
    render(<TaskInput onAddTask={mockAddTask} />);

    const submitButton = screen.getByRole('button', { name: /add/i });
    await user.click(submitButton);

    expect(mockAddTask).not.toHaveBeenCalled();
  });

  it('does not call onAddTask when input contains only whitespace', async () => {
    const user = userEvent.setup();
    const mockAddTask = vi.fn();
    render(<TaskInput onAddTask={mockAddTask} />);

    const input = screen.getByPlaceholderText('Add a new task...');
    const submitButton = screen.getByRole('button', { name: /add/i });

    await user.type(input, '   ');
    await user.click(submitButton);

    expect(mockAddTask).not.toHaveBeenCalled();
  });

  it('trims whitespace from input before submitting', async () => {
    const user = userEvent.setup();
    const mockAddTask = vi.fn();
    render(<TaskInput onAddTask={mockAddTask} />);

    const input = screen.getByPlaceholderText('Add a new task...');
    const submitButton = screen.getByRole('button', { name: /add/i });

    await user.type(input, '  Task with spaces  ');
    await user.click(submitButton);

    expect(mockAddTask).toHaveBeenCalledWith('Task with spaces');
  });
});
