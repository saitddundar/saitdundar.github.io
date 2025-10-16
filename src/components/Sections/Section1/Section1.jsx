import React from 'react';
import './Section1.css';

const Section1 = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section1" id="home">
      <div className="section1-content">
        <h1 className="main-title">
          Mehmet Sait Dündar
        </h1>
        <p className="subtitle">A computer science student passionate about backend development, cloud, and solving complex problems.</p>
        
        <div className="scroll-indicator" onClick={scrollToAbout}>
          <div className="scroll-arrow"> </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
