import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-brand">
          <h1>Mehmet Sait Dündar</h1>
        </div>
        <ul className="nav-links">
          <li><a href="https://github.com/saitdundar" target="_blank" rel="noopener noreferrer">Github</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
