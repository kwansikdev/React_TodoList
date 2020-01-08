import React, { useState } from 'react';
import Input from './Input/Input';
import Navigation from './Navigation/Navigation';
import Todo from './Todo/Todo';
import Footer from './Footer/Footer';

const MainView = props => {
  // state
  const [todos, setTodos] = useState([
    { id: 3, content: 'Javascript', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'HTML', completed: false }
  ]);

  const [navState, setNavState] = useState('all');

  // _todos
  const _todos = todos.filter(todo =>
    navState === 'all'
      ? todo
      : navState === 'active'
      ? !todo.completed
      : todo.completed
  );

  //
  const generatorId = () =>
    todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

  const addTodo = content => {
    setTodos([
      { id: generatorId(), content: content, completed: false },
      ...todos
    ]);
  };

  const toggleCompleted = id => {
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
      navItem.classList.toggle('active', target.id === navItem.id);
    });

    setNavState(target.id);
  };

  return (
    <div className="container">
      <h1 className="title">Todos</h1>
      <div className="ver">2.0</div>

      <Input addTodo={addTodo} />
      <Navigation toggleNav={toggleNav} />
      <Todo
        todos={_todos}
        toggleCompleted={toggleCompleted}
        removeTodo={removeTodo}
      />
      <Footer
        todos={todos}
        allToggleComplet={allToggleComplet}
        removeCompleted={removeCompleted}
      />
    </div>
  );
};

export default MainView;
