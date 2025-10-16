import React from 'react';
import './Section2.css';

const Section2 = () => {
  return (
    <section className="section2" id="about">
      <div className="section2-content">
        <div className="red-card">
          <h2 className="about-section-title">About Me</h2>
          <p className="main-text">
            
           A CS Student passionate about backend development, cloud, and solving complex problems.
          
          </p>
          
        </div>
        
        <div className="services-list">
          <span className="service-item">Visual Front-End Development</span>
          <span className="service-item">Back-End Development</span>
          <span className="service-item">Integration</span>
          <span className="service-item">Motion Design</span>
          <span className="service-item">UX Design</span>
          <span className="service-item">Visual Design</span>
        </div>
      </div>
    </section>
  );
};

export default Section2;
