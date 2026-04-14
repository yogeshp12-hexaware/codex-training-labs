import { useEffect, useState } from 'react';

export default function App() {
  const [taskText, setTaskText] = useState('');
  const [taskPriority, setTaskPriority] = useState('5');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sortTasks = (list) => [...list].sort((a, b) => {
    if (b.priority !== a.priority) {
      return b.priority - a.priority;
    }
    return b.id - a.id;
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) {
        throw new Error('Failed to load tasks');
      }
      const data = await response.json();
      setTasks(sortTasks(data.tasks));
    } catch (err) {
      setError('Unable to reach the backend. Please start the server first.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedText = taskText.trim();
    if (!trimmedText) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmedText, priority: Number(taskPriority) })
      });

      if (!response.ok) {
        throw new Error('Could not save task');
      }

      const data = await response.json();
      setTasks((previous) => sortTasks([...previous, data.task]));
      setTaskText('');
      setTaskPriority('5');
    } catch (err) {
      setError('Something went wrong while saving this task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <main className="card">
        <header>
          <p className="eyebrow">Module 01 - Todo UI</p>
          <h1>Your simple todo list</h1>
          <p>Type a task in the box below and press "Add Task."</p>
        </header>

        <form className="task-form" onSubmit={handleSubmit}>
          <label htmlFor="new-task">New task</label>
          <div className="input-row">
            <input
              id="new-task"
              value={taskText}
              onChange={(event) => setTaskText(event.target.value)}
              placeholder="Buy milk, plan presentation, etc."
            />
            <label htmlFor="task-priority" className="priority-label">
              Priority (1 = lowest, 10 = highest)
            </label>
            <select
              id="task-priority"
              value={taskPriority}
              onChange={(event) => setTaskPriority(event.target.value)}
            >
              {[...Array(10)].map((_, index) => {
                const value = String(index + 1);
                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Add Task'}
            </button>
          </div>
        </form>

        {error && <p className="error">{error}</p>}

        <section className="task-list">
          <h2>Tasks</h2>
          {loading && tasks.length === 0 ? (
            <p className="muted">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="muted">Task list is empty. Add something above.</p>
          ) : (
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  <div className="task-row">
                    <span>{task.text}</span>
                    <span className="task-priority">Priority {task.priority ?? 5}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
