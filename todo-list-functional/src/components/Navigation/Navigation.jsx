import React from 'react';

const Navigation = props => {
  const navState = props.navState;
  const navList = navState.map(navItem => (
    <li
      key={navItem.id}
      id={navItem.id}
      className={navItem.toggle ? 'active' : null}
      onClick={() => props.toggleNav(navItem)}
    >
      {navItem.id}
    </li>
  ));
  return <ul className="nav">{navList}</ul>;
};

export default Navigation;
