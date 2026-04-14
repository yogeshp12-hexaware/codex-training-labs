const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const tasks = [];
let nextId = 1;

const sortTasks = (list) => [...list].sort((a, b) => {
  if (b.priority !== a.priority) {
    return b.priority - a.priority;
  }
  return b.id - a.id;
});

app.get('/api/tasks', (req, res) => {
  res.json({ tasks: sortTasks(tasks) });
});

const validPriorities = Array.from({ length: 10 }, (_, index) => index + 1);

app.post('/api/tasks', (req, res) => {
  const text = typeof req.body.text === 'string' ? req.body.text.trim() : '';
  const priorityValue = Number(req.body.priority);
  const priority = Number.isInteger(priorityValue) && validPriorities.includes(priorityValue)
    ? priorityValue
    : 5;

  if (!text) {
    return res.status(400).json({ error: 'Please provide a non-empty task text' });
  }

  const task = { id: nextId++, text, priority };
  tasks.push(task);
  res.status(201).json({ task });
});

const port = process.env.PORT || 5200;
app.listen(port, () => {
  console.log(`Todo API listening on http://localhost:${port}`);
});
