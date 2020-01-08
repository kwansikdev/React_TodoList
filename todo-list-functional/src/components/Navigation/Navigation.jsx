import React, { useState } from 'react';

const Navigation = props => {
  const [navState] = useState([
    { id: 'all' },
    { id: 'active' },
    { id: 'completed' }
  ]);

  // onClick={({ target }) => props.toggleNav(target)}
  const navList = navState.map(navItem => (
    <li
      key={navItem.id}
      id={navItem.id}
      className={navItem.id === 'all' ? 'active' : null}
      onClick={({ target }) => props.toggleNav(target)}
    >
      {navItem.id}
    </li>
  ));
  return <ul className="nav">{navList}</ul>;
};

export default Navigation;
