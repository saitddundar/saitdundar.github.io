import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <a href="#" className="logo">Mehmet Sait Dündar</a>
        <nav>
          <a href="https://github.com/saitddundar" target="_blank" rel="noopener noreferrer">Github</a>
          <a href="#about">About</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;