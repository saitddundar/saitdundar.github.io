import React from 'react';
import './Section2.css';

const Section2 = () => {
  return (
    <section className="section2" id="about">
      <div className="section2-content">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Merhaba! Ben Sait Dündar, tutkulu bir Full Stack Developer'ım. 
              Modern web teknolojileri ile kullanıcı dostu ve performanslı 
              uygulamalar geliştirmeyi seviyorum.
            </p>
            <p>
              React, Node.js, Python ve diğer modern teknolojilerle projeler 
              geliştiriyorum. Sürekli öğrenmeye ve kendimi geliştirmeye odaklanıyorum.
            </p>
          </div>
          <div className="skills">
            <h3>Skills</h3>
            <div className="skills-grid">
              <span className="skill-tag">React</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">Python</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">CSS3</span>
              <span className="skill-tag">HTML5</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
