import React, { useState, useEffect } from 'react';
import './AboutSection.css';

const AboutSection = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Scroll olayını dinle
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // 2. sayfada olup olmadığımızı kontrol et
      if (scrollY > viewportHeight * 0.5 && scrollY < viewportHeight * 1.5) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    // AnimatedText'ten gelen olayları dinle
    const handleAboutEvent = (event) => {
      if (event.detail && event.detail.visible) {
        setIsActive(true);
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('showAboutSection', handleAboutEvent);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('showAboutSection', handleAboutEvent);
    };
  }, []);

  // Bir sonraki sayfaya geç
  const goToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight * 2, // 3. sayfaya git
      behavior: 'smooth'
    });
  };

  // İlk sayfaya dön
  const goToFirstSection = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section className={`page-section about-section ${isActive ? 'active' : ''}`} id="about">
      <div className="about-container">
        <div className="about-layout">
          <div className="photo-section">
            <img 
              src="/kim-busik.webp" 
              alt="Profile Photo" 
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
        
        <div className="about-navigation">
          <button 
            onClick={goToFirstSection} 
            className="section-nav-button"
          >
            ← Back
          </button>
          
          <button 
            onClick={goToNextSection} 
            className="section-nav-button"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
