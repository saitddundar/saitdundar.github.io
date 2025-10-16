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
          <li><a href="https://github.com/saitddundar" target="_blank" rel="noopener noreferrer">GITHUB</a></li>
          <li><a href="#ABOUT">ABOUT</a></li>
          <li><a href="#section3" onClick={handleProjectsClick}>PROJECTS</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); handleContactClick(); }}>CONTACT</a></li>
        </ul>
      </nav>
      
      {isContactOpen && (
        <div className="contact-card" onMouseLeave={handleContactMouseLeave}>
          <h3>Get in Touch</h3>
          <div className="contact-links">
            <a href="mailto:your-email@example.com" target="_blank" rel="noopener noreferrer">
              📧 Email
            </a>
            <a href="https://linkedin.com/in/mehmet-sait-dundar" target="_blank" rel="noopener noreferrer">
              💼 LinkedIn
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;