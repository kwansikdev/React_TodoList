import React, { Component, createRef } from 'react';
import './App.css';

export default class TodoClass extends Component {
  constructor(props) {
    super(props);

    const todos = [
      { id: 1, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 3, content: 'Javascript', completed: false }
    ];

    this.state = {
      todos: [...todos.sort((t1, t2) => t2.id - t1.id)],
      navState: 'all'
    };

    this.defaultState = this.state;

    Object.getOwnPropertyNames(TodoClass.prototype).forEach(
      key => (this[key] = this[key].bind(this))
    );
  }

  gerneratorID = () =>
    this.state.todos.length
      ? Math.max(...this.state.todos.map(todo => todo.id)) + 1
      : 1;

  AddTodo = ({ target, key }) => {
    if (key !== 'Enter' || target.value.trim() === '') {
      return;
    }

    this.setState({
      todos: [
        {
          id: this.gerneratorID(),
          content: target.value.trim(),
          completed: false
        },
        ...this.state.todos
      ]
    });

    target.value = '';
  };

  ToggleCompleted = id => {
    this.setState({
      todos: this.state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    });
  };

  RemoveTodo = id => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  };

  AllCompleted = checked => {
    this.setState({
      todos: this.state.todos.map(todo => ({ ...todo, completed: checked }))
    });
  };

  AllRemoveTodo = () => {
    this.setState({
      todos: this.state.todos.filter(todo => !todo.completed)
    });
  };

  ToggleNav = target => {
    if (!target.id) return;

    [...target.parentNode.children].forEach(navItem => {
      navItem.classList.toggle('active', target.id === navItem.id);
    });

    this.setState({ navState: target.id });
  };

  render() {
    const _todos = this.state.todos.filter(todo =>
      this.state.navState === 'all'
        ? todo
        : this.state.navState === 'active'
        ? !todo.completed
        : todo.completed
    );
    return (
      <>
        <div className="container">
          <h1 className="title">Todos</h1>
          <div className="ver">2.0</div>

          <input
            className="input-todo"
            placeholder="What needs to be done?"
            onKeyPress={this.AddTodo}
            autoFocus
          />
          <ul
            ref={ref => (this.nav = ref)}
            className="nav"
            onClick={e => this.ToggleNav(e.target)}
          >
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
                  checked={todo.completed ? 'checked' : ''}
                  onChange={() => this.ToggleCompleted(todo.id)}
                />
                <label htmlFor={`ck-${todo.id}`}>{todo.content}</label>
                <i
                  className="remove-todo far fa-times-circle"
                  onClick={() => this.RemoveTodo(todo.id)}
                />
              </li>
            ))}
          </ul>
          <div className="footer">
            <div className="complete-all">
              <input
                className="custom-checkbox"
                type="checkbox"
                id="ck-complete-all"
                onChange={({ target }) => this.AllCompleted(target.checked)}
              />
              <label htmlFor="ck-complete-all">Mark all as complete</label>
            </div>
            <div className="clear-completed">
              <button className="btn" onClick={() => this.AllRemoveTodo()}>
                Clear completed (
                <span className="completed-todos">
                  {this.state.todos.filter(todo => todo.completed).length}
                </span>
                )
              </button>
              <strong className="active-todos">
                {this.state.todos.filter(todo => !todo.completed).length}
              </strong>{' '}
              items left
            </div>
          </div>
        </div>
      </>
    );
  }
}
