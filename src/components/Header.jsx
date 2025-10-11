import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">Mehmet Sait Dündar</div>
        <nav>
          <a href="#">Github</a>
          <a href="#about">About</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;