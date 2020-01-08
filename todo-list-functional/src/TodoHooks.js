import React, { useState, useEffect } from 'react';
import './App.css';

const TodoHooks = props => {
  const [todos, setTodos] = useState([
    { id: 3, content: 'Javascript', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'HTML', completed: false }
  ]);

  const [navState, setNavState] = useState('all');
  const [_todos, _setTodos] = useState(todos);
  useEffect(() => {
    _setTodos(
      todos.filter(todo =>
        navState === 'all'
          ? todo
          : navState === 'active'
          ? !todo.completed
          : todo.completed
      )
    );
  }, [navState]);

  const generateId = () =>
    todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

  const addTodo = ({ target, key }) => {
    if (key !== 'Enter' || target.value.trim() === '') return;
    setTodos([
      { id: generateId(), content: target.value.trim(), completed: false },
      ...todos
    ]);
    target.value = '';
  };

  const toggleTodo = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const allToggleComplet = checked => {
    setTodos(todos.map(todo => ({ ...todo, completed: checked })));
  };

  const removeCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const toggleNav = target => {
    if (target.classList.value === 'nav') return;

    [...target.parentNode.children].forEach(navItem => {
      navItem.classList.toggle('active', navItem.id === target.id);
    });

    setNavState(target.id);
  };

  return (
    <div className="container">
      <h1 className="title">Todos</h1>
      <div className="ver">2.0</div>

      <input
        className="input-todo"
        placeholder="What needs to be done?"
        autoFocus
        onKeyPress={addTodo}
      />
      <ul className="nav" onClick={({ target }) => toggleNav(target)}>
        <li id="all" className="active">
          All
        </li>
        <li id="active">Active</li>
        <li id="completed">Completed</li>
      </ul>

      <ul className="todos">
        {_todos.map(todo => (
          <li id={todo.id} key={todo.id} className="todo-item">
            <input
              className="custom-checkbox"
              type="checkbox"
              id={`ck-${todo.id}`}
              defaultChecked={todo.completed ? true : false}
              onChange={() => toggleTodo(todo.id)}
            />
            <label htmlFor={`ck-${todo.id}`}>{todo.content}</label>
            <i
              className="remove-todo far fa-times-circle"
              onClick={() => removeTodo(todo.id)}
            ></i>
          </li>
        ))}
      </ul>
      <div className="footer">
        <div className="complete-all">
          <input
            className="custom-checkbox"
            type="checkbox"
            id="ck-complete-all"
            onChange={({ target }) => allToggleComplet(target.checked)}
          />
          <label htmlFor="ck-complete-all">Mark all as complete</label>
        </div>
        <div className="clear-completed">
          <button className="btn" onClick={() => removeCompleted()}>
            Clear completed (
            <span className="completed-todos">
              {todos.filter(todo => todo.completed).length}
            </span>
            )
          </button>
          <strong className="active-todos">
            {todos.filter(todo => !todo.completed).length}
          </strong>{' '}
          items left
        </div>
      </div>
    </div>
  );
};

export default TodoHooks;
