import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskItem from '../components/TaskItem';

// Mock window.confirm
const mockConfirm = vi.fn();

describe('TaskItem', () => {
  beforeEach(() => {
    window.confirm = mockConfirm;
    mockConfirm.mockReturnValue(true);
  });

  const mockTask = {
    id: 'test-id-1',
    text: 'Test task',
    completed: false,
  };

  it('renders task text and action buttons', () => {
    const mockToggle = vi.fn();
    const mockUpdate = vi.fn();
    const mockDelete = vi.fn();

    render(
      <TaskItem
        task={mockTask}
        onToggle={mockToggle}
        onUpdate={mockUpdate}
        onDelete={mockDelete}
      />
    );

    expect(screen.getByText('Test task')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('calls onToggle when checkbox is clicked', async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();
    const mockUpdate = vi.fn();
    const mockDelete = vi.fn();

    render(
      <TaskItem
        task={mockTask}
        onToggle={mockToggle}
        onUpdate={mockUpdate}
        onDelete={mockDelete}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockToggle).toHaveBeenCalledWith('test-id-1');
  });

  it('enters edit mode when Edit button is clicked', async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();
    const mockUpdate = vi.fn();
    const mockDelete = vi.fn();

    render(
      <TaskItem
        task={mockTask}
        onToggle={mockToggle}
        onUpdate={mockUpdate}
        onDelete={mockDelete}
      />
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    expect(screen.getByDisplayValue('Test task')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('calls onUpdate with correct task ID and new text when Save is clicked', async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();
    const mockUpdate = vi.fn();
    const mockDelete = vi.fn();

    render(
      <TaskItem
        task={mockTask}
        onToggle={mockToggle}
        onUpdate={mockUpdate}
        onDelete={mockDelete}
      />
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    const input = screen.getByDisplayValue('Test task');
    await user.clear(input);
    await user.type(input, 'Updated task');

    const saveButton = screen.getByRole('button', { name: /save/i });
    await user.click(saveButton);

    expect(mockUpdate).toHaveBeenCalledTimes(1);
    expect(mockUpdate).toHaveBeenCalledWith('test-id-1', 'Updated task');
  });

  it('cancels edit mode when Cancel button is clicked', async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();
    const mockUpdate = vi.fn();
    const mockDelete = vi.fn();

    render(
      <TaskItem
        task={mockTask}
        onToggle={mockToggle}
        onUpdate={mockUpdate}
        onDelete={mockDelete}
      />
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(screen.getByText('Test task')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('Test task')).not.toBeInTheDocument();
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('calls onDelete with correct task ID when Delete is clicked and confirmed', async () => {
    const user = userEvent.setup();
    mockConfirm.mockReturnValue(true);
    const mockToggle = vi.fn();
    const mockUpdate = vi.fn();
    const mockDelete = vi.fn();

    render(
      <TaskItem
        task={mockTask}
        onToggle={mockToggle}
        onUpdate={mockUpdate}
        onDelete={mockDelete}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    expect(mockConfirm).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith('test-id-1');
  });

  it('does not call onDelete when Delete is clicked but confirmation is cancelled', async () => {
    const user = userEvent.setup();
    mockConfirm.mockReturnValue(false);
    const mockToggle = vi.fn();
    const mockUpdate = vi.fn();
    const mockDelete = vi.fn();

    render(
      <TaskItem
        task={mockTask}
        onToggle={mockToggle}
        onUpdate={mockUpdate}
        onDelete={mockDelete}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    expect(mockConfirm).toHaveBeenCalledTimes(1);
    expect(mockDelete).not.toHaveBeenCalled();
  });

  it('displays completed task with strikethrough styling', () => {
    const completedTask = {
      id: 'test-id-2',
      text: 'Completed task',
      completed: true,
    };

    const mockToggle = vi.fn();
    const mockUpdate = vi.fn();
    const mockDelete = vi.fn();

    render(
      <TaskItem
        task={completedTask}
        onToggle={mockToggle}
        onUpdate={mockUpdate}
        onDelete={mockDelete}
      />
    );

    const taskText = screen.getByText('Completed task');
    expect(taskText).toHaveClass('line-through');
  });

  it('saves edit when Enter key is pressed', async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();
    const mockUpdate = vi.fn();
    const mockDelete = vi.fn();

    render(
      <TaskItem
        task={mockTask}
        onToggle={mockToggle}
        onUpdate={mockUpdate}
        onDelete={mockDelete}
      />
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    const input = screen.getByDisplayValue('Test task');
    await user.clear(input);
    await user.type(input, 'Updated task{Enter}');

    expect(mockUpdate).toHaveBeenCalledTimes(1);
    expect(mockUpdate).toHaveBeenCalledWith('test-id-1', 'Updated task');
  });

  it('cancels edit when Escape key is pressed', async () => {
    const user = userEvent.setup();
    const mockToggle = vi.fn();
    const mockUpdate = vi.fn();
    const mockDelete = vi.fn();

    render(
      <TaskItem
        task={mockTask}
        onToggle={mockToggle}
        onUpdate={mockUpdate}
        onDelete={mockDelete}
      />
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    const input = screen.getByDisplayValue('Test task');
    await user.type(input, '{Escape}');

    expect(screen.getByText('Test task')).toBeInTheDocument();
    expect(mockUpdate).not.toHaveBeenCalled();
  });
});
