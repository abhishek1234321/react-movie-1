import React from 'react';

import './Header.css';

const Header = (props) => {
  return (
    <header className="Header">
      <h2>{props.text}</h2>  
    </header>
  );
}

export default Header;