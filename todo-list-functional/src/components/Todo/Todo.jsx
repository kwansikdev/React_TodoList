import React, { useState } from 'react';

const Todo = props => {
  console.log(props.todos);
  const todo = props.todos.map(todo => (
    <li id={todo.id} key={todo.id} className="todo-item">
      <input
        className="custom-checkbox"
        type="checkbox"
        id={`ck-${todo.id}`}
        checked={todo.completed ? 'checked' : ''}
        onChange={() => props.toggleCompleted(todo.id)}
      />
      <label htmlFor={`ck-${todo.id}`}>{todo.content}</label>
      <i
        className="remove-todo far fa-times-circle"
        onClick={() => props.removeTodo(todo.id)}
      ></i>
    </li>
  ));

  return <ul className="todos">{todo}</ul>;
};

export default Todo;
