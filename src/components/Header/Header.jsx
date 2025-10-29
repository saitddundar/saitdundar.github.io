import React, { useEffect } from 'react';
import './Header.css';

const Header = () => {
  useEffect(() => {
    // Set the default hash to #home on page load
    if (window.location.hash !== '#home') {
      window.location.hash = '#home';
    }
  }, []);

  const handleProjectsClick = () => {
    document.getElementById('section3').scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-links">
          <li><a href="https://github.com/saitddundar" target="_blank" rel="noopener noreferrer">Github</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects" onClick={handleProjectsClick}>Projects</a></li>
          <li style={{ position: 'relative' }}>
            <a href="#contact" onClick={handleContactClick}>Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;