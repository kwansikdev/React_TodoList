import React from 'react';

const Input = props => {
  const handleEnter = add => e => {
    if (e.key !== 'Enter' || e.target.value.trim() === '') return;

    add(e.target.value.trim());
    e.target.value = '';
  };

  return (
    <input
      className="input-todo"
      placeholder="What needs to be done?"
      onKeyPress={handleEnter(props.addTodo)}
      autoFocus
    />
  );
};

export default Input;
