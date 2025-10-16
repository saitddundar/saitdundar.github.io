import React, { useState } from 'react';
import './Header.css';

const Header = ({ onContactToggle }) => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleProjectsClick = () => {
    document.getElementById('section3').scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    setIsContactOpen(!isContactOpen);
    if (onContactToggle) {
      onContactToggle(!isContactOpen);
    }
  };

  const handleContactMouseLeave = () => {
    setIsContactOpen(false);
    if (onContactToggle) {
      onContactToggle(false);         
    }
  };

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-links">
          <li><a href="https://github.com/saitddundar" target="_blank" rel="noopener noreferrer">Github</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#section3" onClick={handleProjectsClick}>Projects</a></li>
          <li style={{ position: 'relative' }}>
            <a href="#" onClick={(e) => { e.preventDefault(); handleContactClick(); }}>Contact</a>
            {isContactOpen && (
              <div className="contact-card minimal-contact-card" onMouseLeave={handleContactMouseLeave}>
                <div className="contact-links">
                  <a href="mailto:saitdndr51@gmail.com" target="_blank" rel="noopener noreferrer"> E-mail</a>
                  <a href="https://www.linkedin.com/in/sait-d%C3%BCndar-267533202/" target="_blank" rel="noopener noreferrer"> LinkedIn</a>
                </div>
              </div>
            )}
          </li>
        </ul>
      </nav>
      
    </header>
  );
};

export default Header;