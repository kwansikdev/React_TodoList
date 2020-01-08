import React from 'react';

const Footer = props => {
  const completedItems = props.todos.filter(todo => todo.completed).length;
  const leftedItems = props.todos.filter(todo => !todo.completed).length;
  return (
    <div className="footer">
      <div className="complete-all">
        <input
          className="custom-checkbox"
          type="checkbox"
          id="ck-complete-all"
          onChange={({ target }) => props.allToggleComplet(target.checked)}
        />
        <label htmlFor="ck-complete-all">Mark all as complete</label>
      </div>
      <div className="clear-completed">
        <button className="btn" onClick={() => props.removeCompleted()}>
          Clear completed (
          <span className="completed-todos">{completedItems}</span>)
        </button>
        <strong className="active-todos">{leftedItems}</strong> items left
      </div>
    </div>
  );
};

export default Footer;
