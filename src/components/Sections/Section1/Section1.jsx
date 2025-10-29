import React, { useEffect } from 'react';
import DarkVeil from '../../DarkVeil';
import './Section1.css';

const Section1 = () => {
  useEffect(() => {
    // Scroll to Section1 (Home) on page load
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section className="section1" id="home">
      <DarkVeil />
      <div className="section1-content">
        <div className="text-content">
          <h1 className="main-title">
            <div className="name-line">Mehmet Sait Dündar</div>
          </h1>
          <p className="subtitle">A computer science student passionate about backend development, cloud and solving complex problems.</p>
        </div>
      </div>
    </section>
  );
};

export default Section1;
