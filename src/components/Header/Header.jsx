import React, { useEffect } from 'react';
import './Header.css';
import Magnet from '../Magnet/Magnet';
import StarBorder from '../StarBorder/StarBorder';

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

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/docs/MehmetSaitDündarCV.docx';
    link.download = 'MehmetSaitDündarCV.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-links">
          <li>
            <a href="https://github.com/saitddundar" target="_blank" rel="noopener noreferrer">
              Github
            </a>
          </li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects" onClick={handleProjectsClick}>Projects</a></li>
          <li style={{ position: 'relative' }}>
            <a href="#contact" onClick={handleContactClick}>Contact</a>
          </li>
        </ul>
        <Magnet padding={50} disabled={false} magnetStrength={40}>
          <StarBorder
            as="button"
            className="cv-button-wrapper"
            color="#7c3aed"
            speed="5s"
            thickness={2.5}
            onClick={handleDownloadCV}
            aria-label="Download CV"
          >
            <span className="cv-button-text">Download CV</span>
          </StarBorder>
        </Magnet>
      </nav>
    </header>
  );
};

export default Header;