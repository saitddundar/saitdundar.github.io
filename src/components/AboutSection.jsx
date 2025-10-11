import React, { useState, useEffect } from 'react';
import './AboutSection.css';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      // Show About section when scrolling down
      if (scrollTop > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Handle About link click
    const handleAboutClick = (e) => {
      e.preventDefault();
      setIsVisible(true);
    };

    // Add click listener to About link
    const aboutLink = document.querySelector('a[href="#about"]');
    if (aboutLink) {
      aboutLink.addEventListener('click', handleAboutClick);
    }

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (aboutLink) {
        aboutLink.removeEventListener('click', handleAboutClick);
      }
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div className={`about-section ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="about-layout">
        <div className="photo-section">
          <img 
            src="/kim-busik.webp" 
            alt="Kim Busik" 
            className="about-photo"
          />
        </div>
        <div className="about-content">
          <h2>About</h2>
          <p>
            I am a passionate developer with a love for creating beautiful and functional web experiences. 
            My journey in technology has led me to explore various aspects of software development, 
            from frontend design to backend architecture.
          </p>
          <p>
            When I'm not coding, you can find me exploring new technologies, 
            contributing to open source projects, or enjoying a good cup of coffee 
            while brainstorming the next big idea.
          </p>
          <p>
            I believe in the power of clean code, user-centered design, and continuous learning. 
            Every project is an opportunity to grow and create something meaningful.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
