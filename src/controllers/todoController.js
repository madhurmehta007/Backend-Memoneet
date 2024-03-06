// controllers/todoController.js
const Todo = require('../models/todoModel');

let todos = [];

// CRUD operations
exports.getTodos = (req, res) => {
  res.json(todos);
};

exports.getTodoById = (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === todoId);

  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
};

exports.createTodo = (req, res) => {
  const { title, completed } = req.body;

  // Input validation
  if (!title || typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  const newTodo = new Todo(todos.length + 1, title, completed);
  todos.push(newTodo);

  res.status(201).json(newTodo);
};

exports.updateTodo = (req, res) => {
  const todoId = parseInt(req.params.id);
  const { title, completed } = req.body;

  // Input validation
  if (!title || typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  const index = todos.findIndex(todo => todo.id === todoId);

  if (index !== -1) {
    todos[index] = { ...todos[index], title, completed };
    res.json(todos[index]);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
};

exports.deleteTodo = (req, res) => {
  const todoId = parseInt(req.params.id);
  const index = todos.findIndex(todo => todo.id === todoId);

  if (index !== -1) {
    const deletedTodo = todos.splice(index, 1);
    res.json(deletedTodo[0]);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
};
