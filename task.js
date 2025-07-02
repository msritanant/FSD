import express from 'express'
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [
  {
    id: 1,
    title: 'Learn Java',
    description: 'constructor, thread, exception',
    status: 'pending'
  },
  {
    id: 2,
    title: 'Complete project',
    description: 'Finish the Express.js API',
    status: 'in-progress'
  }
];

let nextId = 3;

app.get('/tasks', (req, res) => {
  res.send(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).send({ error: 'Task not found' });
  }
  res.send(task);
});

app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).send({ error: 'Title and description are required' });
  }
  const newTask = {
    id: nextId++,
    title,
    description,
    status: 'pending'
  };
  tasks.push(newTask);
  res.send(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).send({ error: 'Task not found' });
  }

  const { title, description, status } = req.body;

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;

  res.send(task);
});

app.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send({ error: 'Task not found' });
  }

  const deletedTask = tasks.splice(index, 1);
  res.send(deletedTask[0]);
});

app.listen(PORT, () => {
  console.log(`Task management app running on http://localhost:${PORT}`);
});
