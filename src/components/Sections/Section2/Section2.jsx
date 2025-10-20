import React, { useRef } from 'react';
import VariableProximity from '../../VariableProximity/VariableProximity';
import './Section2.css';

const Section2 = () => {
  const containerRef = useRef(null);

  return (
    <section className="section2" id="about">
      <div className="section2-content" ref={containerRef}>
        <h2 className="about-section-title">About Me</h2>
        <VariableProximity
          label="A CS Student passionate about backend development, cloud, and solving complex problems. I love exploring new technologies and building scalable applications that make a difference. My journey in computer science has led me to specialize in server-side development and cloud architecture. I enjoy working with databases, APIs, and creating efficient solutions for real-world challenges. When I'm not coding, you can find me learning about emerging technologies or contributing to open-source projects. I believe in continuous learning and staying updated with the latest trends in software development."
          className="main-text"
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={containerRef}
          radius={100}
          falloff="linear"
        />
        
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
