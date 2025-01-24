import React, { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') {
      return;
    }
    setTodos([{ text: newTodo, completed: false }, ...todos]);
    setNewTodo('');
  };

  const handleToggle = (index) => {
    const newTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(index)}
              />
              <label style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
              </label>
              <button onClick={() => handleDelete(index)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;